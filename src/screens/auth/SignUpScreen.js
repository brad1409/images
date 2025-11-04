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
import { validateEmail, validatePassword, validateName } from '../../utils/validation';

const SignUpScreen = ({ navigation }) => {
  const { signUp, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ visible: false, message: '', type: 'error' });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    const nameValidation = validateName(formData.name);
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.message;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }

    // Confirm password validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    const result = await signUp(
      formData.email.trim(),
      formData.password,
      formData.name.trim()
    );
    
    if (result.success) {
      setSnackbar({
        visible: true,
        message: 'Account created successfully! Welcome to HotelBook!',
        type: 'success'
      });
      // Navigation is handled automatically by AuthContext
    } else {
      setSnackbar({
        visible: true,
        message: result.error || 'Sign up failed. Please try again.',
        type: 'error'
      });
    }
  };

  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
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
              source={{ uri: 'https://github.com/brad1409/images/raw/main/Materials/05-Sign-up-Page/signup.png' }}
              style={styles.image}
              resizeMode="contain"
            />
            <Text variant="headlineLarge" style={styles.title}>
              Create Account
            </Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
              Join us and start booking amazing hotels
            </Text>
          </View>

          <View style={styles.form}>
            <TextInput
              label="Full Name"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              mode="outlined"
              autoCapitalize="words"
              error={!!errors.name}
              style={styles.input}
            />
            {errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}

            <TextInput
              label="Email"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
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
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
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

            <TextInput
              label="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              mode="outlined"
              secureTextEntry={!showConfirmPassword}
              right={
                <TextInput.Icon
                  icon={showConfirmPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
              error={!!errors.confirmPassword}
              style={styles.input}
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            <Button
              mode="contained"
              onPress={handleSignUp}
              loading={loading}
              disabled={loading}
              style={styles.signUpButton}
              contentStyle={styles.buttonContent}
            >
              Create Account
            </Button>

            <View style={styles.signInContainer}>
              <Text variant="bodyMedium">Already have an account? </Text>
              <Button
                mode="text"
                onPress={navigateToSignIn}
                compact
                labelStyle={styles.signInButtonLabel}
              >
                Sign In
              </Button>
            </View>
          </View>
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
  signUpButton: {
    backgroundColor: '#007AFF',
    marginBottom: 24,
    marginTop: 16
  },
  buttonContent: {
    paddingVertical: 8
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signInButtonLabel: {
    color: '#007AFF'
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

export default SignUpScreen;
