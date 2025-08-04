# Firebase Authentication Implementation Guide

## Overview
This implementation provides a complete Firebase Authentication system with Firestore user data storage for the Daily Health Tips app.

## Features Implemented

### 1. Authentication Service (`lib/services/auth_service.dart`)
- **Sign Up**: Create new user accounts with email/password
- **Sign In**: Authenticate existing users
- **Sign Out**: Secure logout functionality
- **Password Reset**: Send password reset emails
- **Account Deletion**: Remove user accounts and data
- **Error Handling**: User-friendly error messages
- **Firestore Integration**: Automatic user document creation

### 2. User Service (`lib/services/user_service.dart`)
- **User Data Management**: Store and retrieve user profile data
- **Profile Updates**: Age, fitness goals, and other preferences
- **FCM Token Management**: Push notification support
- **Data Validation**: Comprehensive input validation

### 3. UI Components

#### Login Screen (`lib/screens/login_screen.dart`)
- **Dual Mode**: Sign In / Sign Up toggle
- **Form Validation**: Email and password validation
- **Password Visibility**: Toggle password visibility
- **Forgot Password**: Password reset functionality
- **Loading States**: Visual feedback during authentication
- **Error Handling**: Clear error messages

#### Profile Screen (`lib/screens/profile_screen.dart`)
- **User Information**: Display current user details
- **Profile Management**: Update age and fitness goals
- **Sign Out**: Secure logout option
- **Data Persistence**: Save profile data to Firestore

#### Auth Wrapper (`lib/screens/auth_wrapper.dart`)
- **State Management**: Handle authentication state changes
- **Route Protection**: Redirect based on auth status
- **Loading States**: Show loading indicators
- **Error Handling**: Handle authentication errors

## Firestore Database Structure

### Users Collection (`/users/{userId}`)
```json
{
  "uid": "user_unique_id",
  "email": "user@example.com",
  "displayName": "User Name",
  "age": 25,
  "fitnessGoal": "Weight Loss",
  "fcmToken": "firebase_messaging_token",
  "createdAt": "2024-01-01T00:00:00Z",
  "lastSignIn": "2024-01-01T00:00:00Z",
  "lastUpdated": "2024-01-01T00:00:00Z",
  "isActive": true
}
```

## Security Features

### 1. Input Validation
- Email format validation
- Password strength requirements (minimum 6 characters)
- Age range validation (1-120 years)
- Required field validation

### 2. Error Handling
- Firebase Auth error code mapping
- User-friendly error messages
- Network error handling
- Graceful failure handling

### 3. Data Protection
- Secure password handling
- User data encryption (Firebase default)
- Authentication state management
- Automatic session management

## Usage Examples

### Sign Up New User
```dart
try {
  final result = await AuthService.signUpWithEmailAndPassword(
    email: 'user@example.com',
    password: 'securePassword123',
  );
  print('User created: ${result?.user?.email}');
} catch (e) {
  print('Sign up failed: $e');
}
```

### Sign In Existing User
```dart
try {
  final result = await AuthService.signInWithEmailAndPassword(
    email: 'user@example.com',
    password: 'securePassword123',
  );
  print('User signed in: ${result?.user?.email}');
} catch (e) {
  print('Sign in failed: $e');
}
```

### Save User Profile
```dart
try {
  await UserService.saveUserProfile(
    age: 25,
    fitnessGoal: 'Weight Loss',
  );
  print('Profile saved successfully');
} catch (e) {
  print('Profile save failed: $e');
}
```

### Get User Data
```dart
try {
  final userData = await UserService.getUserData();
  if (userData != null) {
    print('User age: ${userData['age']}');
    print('Fitness goal: ${userData['fitnessGoal']}');
  }
} catch (e) {
  print('Failed to get user data: $e');
}
```

## Common Issues and Solutions

### 1. "User not found" Error
- **Cause**: Trying to sign in with non-existent account
- **Solution**: Use sign up mode or create account first

### 2. "Email already in use" Error
- **Cause**: Attempting to create account with existing email
- **Solution**: Use sign in mode or password reset

### 3. "Weak password" Error
- **Cause**: Password doesn't meet minimum requirements
- **Solution**: Use password with at least 6 characters

### 4. Network Errors
- **Cause**: Poor internet connection or Firebase service issues
- **Solution**: Check connection and retry

## Testing

### Manual Testing Steps
1. **Sign Up Flow**:
   - Enter valid email and password
   - Verify account creation
   - Check Firestore user document creation

2. **Sign In Flow**:
   - Use existing credentials
   - Verify successful authentication
   - Check profile screen access

3. **Profile Management**:
   - Update age and fitness goal
   - Verify data persistence
   - Check Firestore updates

4. **Error Handling**:
   - Test invalid email formats
   - Test weak passwords
   - Test network disconnection

### Debug Testing
Use the `AuthTest` utility class for programmatic testing:
```dart
import 'package:daily_health_tips/utils/auth_test.dart';

// Test authentication state
await AuthTest.testAuthentication();

// Test sign up
await AuthTest.testSignUp('test@example.com', 'password123');

// Test sign in
await AuthTest.testSignIn('test@example.com', 'password123');
```

## Dependencies Required

Ensure these dependencies are in your `pubspec.yaml`:
```yaml
dependencies:
  firebase_core: ^4.0.0
  firebase_auth: ^6.0.0
  cloud_firestore: ^6.0.0
  firebase_messaging: ^16.0.0
```

## Firebase Configuration

1. **Firebase Project Setup**:
   - Create Firebase project
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Configure security rules

2. **Firestore Security Rules**:
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

## Next Steps

1. **Enhanced Security**:
   - Implement email verification
   - Add two-factor authentication
   - Implement account recovery

2. **User Experience**:
   - Add social login options
   - Implement biometric authentication
   - Add profile picture upload

3. **Data Management**:
   - Implement data export
   - Add account deletion confirmation
   - Implement data backup

## Support

For issues or questions:
1. Check Firebase Console for authentication logs
2. Review Firestore security rules
3. Verify network connectivity
4. Check app permissions