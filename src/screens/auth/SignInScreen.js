import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
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

const SignInScreen = ({ navigation }) => {
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ visible: false, message: '' });

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;

    const result = await signIn(email.trim(), password);
    
    if (!result.success) {
      setSnackbar({
        visible: true,
        message: result.error || 'Sign in failed. Please try again.'
      });
    }
    // Navigation is handled automatically by AuthContext
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
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
              source={{ uri: 'https://github.com/brad1409/images/raw/main/Materials/02-Sign-in-Page/signin.png' }}
              style={styles.image}
              resizeMode="contain"
            />
            <Text variant="headlineLarge" style={styles.title}>
              Welcome Back
            </Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
              Sign in to your account
            </Text>
          </View>

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

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              error={!!errors.password}
              style={styles.input}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <Button
              mode="text"
              onPress={navigateToForgotPassword}
              style={styles.forgotButton}
            >
              Forgot Password?
            </Button>

            <Button
              mode="contained"
              onPress={handleSignIn}
              loading={loading}
              disabled={loading}
              style={styles.signInButton}
              contentStyle={styles.buttonContent}
            >
              Sign In
            </Button>

            <View style={styles.signUpContainer}>
              <Text variant="bodyMedium">Don't have an account? </Text>
              <Button
                mode="text"
                onPress={navigateToSignUp}
                compact
                labelStyle={styles.signUpButtonLabel}
              >
                Sign Up
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ visible: false, message: '' })}
        duration={4000}
        style={styles.snackbar}
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
    width: 150,
    height: 150,
    marginBottom: 20
  },
  title: {
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 8
  },
  subtitle: {
    color: '#666',
    textAlign: 'center'
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
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 24
  },
  signInButton: {
    backgroundColor: '#007AFF',
    marginBottom: 24
  },
  buttonContent: {
    paddingVertical: 8
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpButtonLabel: {
    color: '#007AFF'
  },
  snackbar: {
    backgroundColor: '#B00020'
  }
});

export default SignInScreen;
