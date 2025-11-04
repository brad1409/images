import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Snackbar
} from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { validateEmail } from '../../utils/validation';

const ForgotPasswordScreen = ({ navigation }) => {
  const { resetPassword, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ visible: false, message: '', type: 'error' });
  const [resetSent, setResetSent] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    const result = await resetPassword(email.trim());
    
    if (result.success) {
      setResetSent(true);
      setSnackbar({
        visible: true,
        message: 'Password reset email sent! Check your inbox.',
        type: 'success'
      });
    } else {
      setSnackbar({
        visible: true,
        message: result.error || 'Failed to send reset email. Please try again.',
        type: 'error'
      });
    }
  };

  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleBackToSignIn = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Image 
              source={{ uri: 'https://github.com/brad1409/images/raw/main/Materials/LOGO/logo.png' }}
              style={styles.image}
              resizeMode="contain"
            />
            <Text variant="headlineLarge" style={styles.title}>
              Reset Password
            </Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
              {resetSent 
                ? 'We\'ve sent you a password reset link'
                : 'Enter your email to receive a password reset link'
              }
            </Text>
          </View>

          {!resetSent ? (
            <View style={styles.form}>
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                error={!!errors.email}
                style={styles.input}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <Button
                mode="contained"
                onPress={handleResetPassword}
                loading={loading}
                disabled={loading}
                style={styles.resetButton}
                contentStyle={styles.buttonContent}
              >
                Send Reset Link
              </Button>

              <Button
                mode="text"
                onPress={handleBackToSignIn}
                style={styles.backButton}
                labelStyle={styles.backButtonLabel}
              >
                Back to Sign In
              </Button>
            </View>
          ) : (
            <View style={styles.successContainer}>
              <Text variant="bodyLarge" style={styles.successText}>
                Check your email for a password reset link. 
                If you don't see it, check your spam folder.
              </Text>
              
              <Button
                mode="contained"
                onPress={navigateToSignIn}
                style={styles.resetButton}
                contentStyle={styles.buttonContent}
              >
                Back to Sign In
              </Button>
              
              <Button
                mode="text"
                onPress={() => setResetSent(false)}
                style={styles.backButton}
                labelStyle={styles.backButtonLabel}
              >
                Resend Email
              </Button>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ visible: false, message: '', type: 'error' })}
        duration={4000}
        style={[styles.snackbar, snackbar.type === 'success' ? styles.successSnackbar : styles.errorSnackbar]}
      >
        {snackbar.message}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  keyboardView: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40
  },
  header: {
    alignItems: 'center',
    marginBottom: 40
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20
  },
  title: {
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 8
  },
  subtitle: {
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20
  },
  form: {
    width: '100%'
  },
  input: {
    marginBottom: 8
  },
  errorText: {
    color: '#B00020',
    fontSize: 12,
    marginBottom: 16,
    marginLeft: 16
  },
  resetButton: {
    backgroundColor: '#007AFF',
    marginBottom: 16,
    marginTop: 16
  },
  buttonContent: {
    paddingVertical: 8
  },
  backButton: {
    marginTop: 8
  },
  backButtonLabel: {
    color: '#007AFF'
  },
  successContainer: {
    alignItems: 'center',
    width: '100%'
  },
  successText: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24
  },
  snackbar: {
    marginBottom: 20
  },
  errorSnackbar: {
    backgroundColor: '#B00020'
  },
  successSnackbar: {
    backgroundColor: '#4CAF50'
  }
});

export default ForgotPasswordScreen;
