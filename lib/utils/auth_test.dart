import 'package:flutter/material.dart';
import 'package:daily_health_tips/services/auth_service.dart';
import 'package:daily_health_tips/services/user_service.dart';

class AuthTest {
  static Future<void> testAuthentication() async {
    debugPrint('🔥 Starting Authentication Test...');

    try {
      // Test 1: Check current user
      final currentUser = AuthService.currentUser;
      debugPrint('📱 Current User: ${currentUser?.email ?? 'None'}');

      // Test 2: Test user data retrieval
      final userData = await UserService.getUserData();
      debugPrint('👤 User Data: $userData');

      // Test 3: Check auth state
      AuthService.authStateChanges.listen((user) {
        debugPrint('🔄 Auth State Changed: ${user?.email ?? 'Signed Out'}');
      });

      debugPrint('✅ Authentication Test Completed');
    } catch (e) {
      debugPrint('❌ Authentication Test Failed: $e');
    }
  }

  static Future<void> testSignUp(String email, String password) async {
    debugPrint('🔥 Testing Sign Up for: $email');

    try {
      final result = await AuthService.signUpWithEmailAndPassword(
        email: email,
        password: password,
      );

      if (result != null) {
        debugPrint('✅ Sign Up Successful: ${result.user?.email}');

        // Test user document creation
        final userData = await UserService.getUserData();
        debugPrint('👤 User Document: $userData');
      } else {
        debugPrint('❌ Sign Up Failed: No result');
      }
    } catch (e) {
      debugPrint('❌ Sign Up Error: $e');
    }
  }

  static Future<void> testSignIn(String email, String password) async {
    debugPrint('🔥 Testing Sign In for: $email');

    try {
      final result = await AuthService.signInWithEmailAndPassword(
        email: email,
        password: password,
      );

      if (result != null) {
        debugPrint('✅ Sign In Successful: ${result.user?.email}');
      } else {
        debugPrint('❌ Sign In Failed: No result');
      }
    } catch (e) {
      debugPrint('❌ Sign In Error: $e');
    }
  }
}
