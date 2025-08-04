# Daily Health Tips 🏥💡

A Flutter application that provides personalized daily health tips with Firebase authentication and user profile management.

## 📱 Overview

Daily Health Tips is a cross-platform mobile application built with Flutter that helps users receive personalized health recommendations based on their age and fitness goals. The app features a complete authentication system with user profile management and push notification support.

## ✨ Features

### 🔐 Authentication System
- **Email/Password Authentication** - Secure user registration and login
- **Dual Mode Interface** - Toggle between Sign In and Sign Up modes
- **Password Reset** - Forgot password functionality via email
- **Form Validation** - Comprehensive input validation with user-friendly error messages
- **Authentication State Management** - Automatic routing based on user authentication status

### 👤 User Profile Management
- **Personal Information** - Store and manage user age and fitness goals
- **Profile Persistence** - Data stored securely in Firestore database
- **Real-time Updates** - Instant profile updates with server synchronization
- **User Dashboard** - Clean interface displaying user information and preferences

### 🔔 Push Notifications
- **Firebase Cloud Messaging** - Background and foreground notification support
- **FCM Token Management** - Automatic token registration and updates
- **Personalized Notifications** - Health tips based on user preferences

### 🎯 Fitness Goal Tracking
- **Multiple Goals** - Support for various fitness objectives:
  - Weight Loss
  - Muscle Gain
  - General Fitness
  - Stress Reduction

## 🏗️ Architecture

### Project Structure
```
lib/
├── main.dart                    # App entry point and Firebase initialization
├── constants/
│   └── app_constants.dart       # Application constants and configuration
├── screens/
│   ├── auth_wrapper.dart        # Authentication state management
│   ├── login_screen.dart        # Sign in/Sign up interface
│   └── profile_screen.dart      # User profile management
├── services/
│   ├── auth_service.dart        # Firebase Authentication service
│   ├── user_service.dart        # User data management service
│   └── fcm_service.dart         # Push notification service
└── utils/
    ├── validators.dart          # Input validation utilities
    └── auth_test.dart          # Authentication testing utilities
```

### Core Components

#### 🚀 Main Application (`main.dart`)
- Firebase initialization with platform-specific configuration
- Background message handler setup for push notifications
- Material Design app configuration with AuthWrapper as home screen

#### 🔒 Authentication Service (`lib/services/auth_service.dart`)
- **Sign Up**: `signUpWithEmailAndPassword()` - Create new user accounts
- **Sign In**: `signInWithEmailAndPassword()` - Authenticate existing users
- **Password Reset**: `sendPasswordResetEmail()` - Send reset emails
- **Account Management**: User deletion and profile updates
- **Error Handling**: Comprehensive Firebase error mapping

#### 👥 User Service (`lib/services/user_service.dart`)
- **Profile Management**: Save and retrieve user profile data
- **Firestore Integration**: Automatic user document creation and updates
- **Data Validation**: Age and fitness goal validation
- **FCM Token Management**: Push notification token handling

#### 📱 User Interface Components

**Login Screen** (`lib/screens/login_screen.dart`)
- Responsive form with email and password fields
- Toggle between Sign In and Sign Up modes
- Password visibility control
- Real-time form validation
- Loading states and error feedback
- Forgot password functionality

**Profile Screen** (`lib/screens/profile_screen.dart`)
- User information display
- Age and fitness goal management
- Profile update functionality
- Sign out capability
- FCM service initialization

**Auth Wrapper** (`lib/screens/auth_wrapper.dart`)
- Authentication state monitoring
- Automatic route protection
- Loading state management
- Error handling for auth state changes

## 🛠️ Technical Stack

### Frontend
- **Flutter** - Cross-platform mobile development framework
- **Dart** - Programming language
- **Material Design** - UI component library

### Backend & Services
- **Firebase Authentication** - User authentication and management
- **Cloud Firestore** - NoSQL document database for user data
- **Firebase Cloud Messaging** - Push notification service
- **Firebase Core** - Firebase SDK initialization

### Dependencies
```yaml
dependencies:
  flutter:
    sdk: flutter
  firebase_core: ^4.0.0      # Firebase SDK initialization
  firebase_auth: ^6.0.0      # Authentication service
  cloud_firestore: ^6.0.0    # Database service
  firebase_messaging: ^16.0.0 # Push notifications
```

## 🗄️ Database Schema

### Firestore Collections

#### Users Collection (`/users/{userId}`)
```json
{
  "uid": "string",              // Firebase Auth user ID
  "email": "string",            // User email address
  "displayName": "string",      // User display name (optional)
  "age": "number",              // User age (1-120)
  "fitnessGoal": "string",      // Selected fitness goal
  "fcmToken": "string",         // Push notification token
  "createdAt": "timestamp",     // Account creation time
  "lastSignIn": "timestamp",    // Last authentication time
  "lastUpdated": "timestamp",   // Last profile update
  "isActive": "boolean"         // Account status
}
```

### Supported Fitness Goals
- Weight Loss
- Muscle Gain
- General Fitness
- Stress Reduction

## 🔧 Setup Instructions

### Prerequisites
- Flutter SDK (latest stable version)
- Dart SDK
- Firebase project with Authentication and Firestore enabled
- Android Studio / VS Code with Flutter extensions

### 1. Clone Repository
```bash
git clone <repository-url>
cd daily_health_tips
```

### 2. Install Dependencies
```bash
flutter pub get
```

### 3. Firebase Configuration

⚠️ **Important**: The `lib/firebase_options.dart` file is excluded from version control for security reasons.

#### Create Firebase Configuration
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication with Email/Password provider
3. Enable Firestore Database
4. Enable Cloud Messaging
5. Generate configuration files for your platforms

#### Add Configuration File
Create `lib/firebase_options.dart` with your Firebase project configuration:
```dart
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) return web;
    switch (defaultTargetPlatform) {
      case TargetPlatform.android: return android;
      case TargetPlatform.iOS: return ios;
      case TargetPlatform.windows: return windows;
      case TargetPlatform.macOS: return macos;
      default: throw UnsupportedError('Platform not supported');
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'your-web-api-key',
    appId: 'your-web-app-id',
    messagingSenderId: 'your-sender-id',
    projectId: 'your-project-id',
    authDomain: 'your-project.firebaseapp.com',
    storageBucket: 'your-project.firebasestorage.app',
  );

  // Add configurations for other platforms...
}
```

### 4. Platform-Specific Setup

#### Android
- Add `google-services.json` to `android/app/`
- Configure `android/app/build.gradle` with Firebase plugins

#### iOS
- Add `GoogleService-Info.plist` to `ios/Runner/`
- Configure iOS project settings

#### macOS
- Add `GoogleService-Info.plist` to `macos/Runner/`

### 5. Firestore Security Rules
Configure database security rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 6. Run Application
```bash
flutter run
```

## 🔒 Security Features

### Input Validation
- **Email Validation**: RFC-compliant email format checking
- **Password Strength**: Minimum 6 characters requirement
- **Age Validation**: Range validation (1-120 years)
- **Required Fields**: Comprehensive null and empty checks

### Authentication Security
- **Firebase Auth Integration**: Industry-standard authentication
- **Secure Password Handling**: No plaintext password storage
- **Session Management**: Automatic token refresh and validation
- **Error Handling**: User-friendly error messages without exposing system details

### Data Protection
- **Firestore Security Rules**: User-specific data access control
- **Encrypted Communication**: HTTPS/TLS for all Firebase communication
- **Token-Based Authentication**: JWT tokens for API access
- **Automatic Session Expiry**: Built-in Firebase session management

## 🧪 Testing

### Manual Testing Checklist

#### Authentication Flow
- [ ] Sign up with valid email/password
- [ ] Sign up with invalid email format
- [ ] Sign up with weak password
- [ ] Sign in with valid credentials
- [ ] Sign in with invalid credentials
- [ ] Password reset functionality
- [ ] Sign out functionality

#### Profile Management
- [ ] Save profile with valid data
- [ ] Update existing profile
- [ ] Age validation (1-120 range)
- [ ] Fitness goal selection
- [ ] Profile data persistence

#### Error Handling
- [ ] Network connectivity issues
- [ ] Firebase service errors
- [ ] Form validation errors
- [ ] Authentication state changes

### Debug Testing
Use the `AuthTest` utility class in `lib/utils/auth_test.dart` for programmatic testing:
```dart
// Test authentication state
await AuthTest.testAuthentication();

// Test user registration
await AuthTest.testSignUp('test@example.com', 'password123');

// Test user login
await AuthTest.testSignIn('test@example.com', 'password123');
```

## 🚀 Deployment

### Build for Production

#### Android
```bash
flutter build apk --release
# or
flutter build appbundle --release
```

#### iOS
```bash
flutter build ios --release
```

### Environment Configuration
- Ensure production Firebase configuration
- Update Firestore security rules for production
- Configure proper app signing certificates
- Test on physical devices before release

## 🔧 Configuration

### Application Constants
Modify `lib/constants/app_constants.dart` for:
- Fitness goal options
- Validation parameters (min/max age, password length)
- App branding and titles

### Validation Rules
Customize validation in `lib/utils/validators.dart`:
- Email format requirements
- Password complexity rules
- Age range limits
- Custom field validation

## 📊 Monitoring & Analytics

### Firebase Console Monitoring
- Authentication metrics and user activity
- Firestore database usage and performance
- Cloud Messaging delivery statistics
- Crash reporting and error tracking

### Debug Logging
The app includes comprehensive debug logging:
- Authentication events
- Database operations
- FCM token management
- Error tracking and reporting

## 🤝 Contributing

### Development Guidelines
1. Follow Flutter/Dart style guidelines
2. Maintain comprehensive error handling
3. Add appropriate debug logging
4. Update documentation for new features
5. Test on multiple platforms before committing

### Code Structure
- Keep services separate from UI components
- Use proper error handling with try-catch blocks
- Implement loading states for async operations
- Follow Material Design principles for UI

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support & Troubleshooting

### Common Issues

#### Firebase Configuration
- Ensure `firebase_options.dart` exists and contains valid configuration
- Verify Firebase project has Authentication and Firestore enabled
- Check platform-specific configuration files are properly added

#### Authentication Errors
- Verify email format is valid
- Ensure password meets minimum requirements
- Check network connectivity
- Verify Firebase Authentication is enabled in console

#### Database Issues
- Confirm Firestore security rules allow user access
- Check user document structure matches expected schema
- Verify network permissions for database access

### Debug Information
Enable debug logging by checking console output for:
- `🔥 Authentication events`
- `👤 User data operations`
- `📱 FCM token management`
- `❌ Error messages and stack traces`

### Getting Help
1. Check Firebase Console for service status
2. Review Flutter doctor output for environment issues
3. Verify all dependencies are properly installed
4. Check platform-specific configuration requirements

---

**Built with ❤️ using Flutter and Firebase**