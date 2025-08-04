const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Initialize the Firebase Admin SDK
admin.initializeApp();

const db = admin.firestore();

/**
 * A Cloud Function that runs daily at 9:00 AM Cairo timezone.
 * It finds relevant health tips for users and sends them a push notification.
 */
exports.sendDailyHealthTips = functions.pubsub.schedule("every day 09:00")
    .timeZone("Africa/Cairo")
    .onRun(async (context) => {
      console.log("Executing daily health tips function.");

      try {
        // 1. Fetch all health tips from the 'healthTips' collection.
        const tipsSnapshot = await db.collection("healthTips").get();
        if (tipsSnapshot.empty) {
          console.log("No health tips found in the database.");
          return null;
        }
        const tips = tipsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 2. Process users in batches to avoid memory issues
        const batchSize = 1000; // Process 1000 users at a time
        let lastDoc = null;
        let totalProcessed = 0;
        let totalNotificationsSent = 0;
        let totalFailures = 0;

        while (lastDoc !== null || totalProcessed === 0) {
          // Build query for current batch
          let usersQuery = db.collection("users").limit(batchSize);
          if (lastDoc) {
            usersQuery = usersQuery.startAfter(lastDoc);
          }

          const usersSnapshot = await usersQuery.get();

          if (usersSnapshot.empty) {
            console.log(`Finished processing all users. ` +
                `Total processed: ${totalProcessed}`);
            break;
          }

          const users = usersSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          totalProcessed += users.length;

          // 3. Optimize matching algorithm
          const notificationsToSend = new Map();

          // Group users by their criteria for efficient matching
          const userGroups = new Map();

          for (const user of users) {
            // Skip users without required data
            if (!user.fitnessGoal || !user.age || !user.fcmToken) continue;

            const key = `${user.fitnessGoal}_${user.age}`;
            if (!userGroups.has(key)) {
              userGroups.set(key, []);
            }
            userGroups.get(key).push(user);
          }

          // Match tips to user groups efficiently
          for (const tip of tips) {
            for (const [userKey, userGroup] of userGroups) {
              const [goal, age] = userKey.split("_");
              const userAge = parseInt(age);

              // Check if tip matches this user group
              if (goal === tip.targetGoal &&
                  userAge >= tip.minAge &&
                  userAge <= tip.maxAge) {
                // Assign tip to users in this group who don't have one yet
                for (const user of userGroup) {
                  if (!notificationsToSend.has(user.id)) {
                    notificationsToSend.set(user.id, {
                      token: user.fcmToken,
                      notification: {
                        title: `Your Daily ${tip.targetGoal} Tip!`,
                        body: tip.tip,
                      },
                      data: {
                        tipId: tip.id,
                        click_action: "FLUTTER_NOTIFICATION_CLICK",
                      },
                    });
                    break; // Only assign to one user per group per tip
                  }
                }
              }
            }
          }

          // 4. Send notifications in batches to avoid rate limits
          if (notificationsToSend.size > 0) {
            const messages = Array.from(notificationsToSend.values());
            console.log(`Processing batch: ${messages.length} notifications`);

            // Send in smaller batches to avoid FCM rate limits
            const fcmBatchSize = 100;
            for (let i = 0; i < messages.length; i += fcmBatchSize) {
              const batch = messages.slice(i, i + fcmBatchSize);

              const sendPromises = batch.map((message) =>
                admin.messaging().send(message).catch((error) => {
                  console.error(`Failed to send message to token ` +
                      `${message.token}:`, error);
                  return {error, token: message.token};
                }),
              );

              const results = await Promise.allSettled(sendPromises);
              const batchSuccessCount = results.filter((result) =>
                result.status === "fulfilled" && !result.value.error,
              ).length;
              const batchFailureCount = results.length - batchSuccessCount;

              totalNotificationsSent += batchSuccessCount;
              totalFailures += batchFailureCount;

              // Add small delay between batches to avoid rate limits
              if (i + fcmBatchSize < messages.length) {
                await new Promise((resolve) => setTimeout(resolve, 100));
              }
            }
          }

          // Update lastDoc for next batch
          lastDoc = usersSnapshot.docs[usersSnapshot.docs.length - 1];
        }

        console.log("Function completed successfully.");
        console.log(`Total users processed: ${totalProcessed}`);
        console.log(`Total notifications sent: ${totalNotificationsSent}`);
        console.log(`Total failures: ${totalFailures}`);

        return null;
      } catch (error) {
        console.error("Error sending health tips:", error);
        throw error; // Re-throw to mark function as failed
      }
    });
