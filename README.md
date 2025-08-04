# Daily Health Tips App

A Flutter application that sends personalized health tips to users based on their fitness goals and age.

## Features

- **User Authentication**: Login/signup with email and password
- **Profile Management**: Set age and fitness goals
- **Push Notifications**: Receive daily personalized health tips
- **Firebase Integration**: Real-time data synchronization
- **Responsive UI**: Modern and intuitive interface

## Project Structure

```text
lib/
├── main.dart                 # App entry point and initialization
├── constants/
│   └── app_constants.dart    # App-wide constants
├── screens/
│   ├── auth_wrapper.dart     # Authentication state management
│   ├── login_screen.dart     # Login/signup screen
│   └── profile_screen.dart   # User profile management
├── services/
│   ├── fcm_service.dart      # Firebase Cloud Messaging operations
│   └── user_service.dart     # User data operations
└── firebase_options.dart     # Firebase configuration
```

## Key Optimizations

### 1. **Separation of Concerns**

- **Screens**: UI components only
- **Services**: Business logic and data operations
- **Constants**: App-wide configuration

### 2. **Enhanced Authentication**

- Form validation with proper error messages
- Email format validation
- Password strength requirements
- Better error handling and user feedback

### 3. **Improved FCM Handling**

- Centralized FCM service
- Proper permission handling
- Token refresh management
- Foreground message handling

### 4. **Better User Experience**

- Loading states for all async operations
- Form validation with real-time feedback
- Improved UI with icons and better styling
- Proper error handling with user-friendly messages

### 5. **Code Organization**

- Reusable services for common operations
- Constants for maintainable configuration
- Clean separation between UI and business logic
- Proper resource disposal

## Firebase Functions

The app includes a Cloud Function (`functions/index.js`) that:

- Runs daily at 9:00 AM Cairo time
- Processes users in batches for scalability
- Matches health tips to users based on age and fitness goals
- Sends personalized push notifications
- Handles large user bases efficiently

## Getting Started

1. **Clone the repository**
2. **Install dependencies**: `flutter pub get`
3. **Configure Firebase**: Update `firebase_options.dart`
4. **Deploy functions**: `firebase deploy --only functions`
5. **Run the app**: `flutter run`

## Dependencies

- `firebase_core`: Firebase initialization
- `firebase_auth`: User authentication
- `cloud_firestore`: Database operations
- `firebase_messaging`: Push notifications
- `flutter`: UI framework

## Architecture Benefits

- **Maintainable**: Clear separation of concerns
- **Scalable**: Efficient data processing
- **Testable**: Isolated business logic
- **Reusable**: Service-based architecture
- **User-friendly**: Enhanced UX with proper feedback
