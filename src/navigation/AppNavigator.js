import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { getOnboardingCompleted } from '../utils/storage';

// Navigation stacks
import OnboardingNavigator from './OnboardingNavigator';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

// Loading screen
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const [onboardingCompleted, setOnboardingCompleted] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const completed = await getOnboardingCompleted();
      setOnboardingCompleted(completed);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setOnboardingCompleted(false);
    } finally {
      setInitializing(false);
    }
  };

  // Show loading screen while checking auth and onboarding status
  if (loading || initializing) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Loading" component={LoadingScreen} />
      </Stack.Navigator>
    );
  }

  // Conditional navigation based on authentication and onboarding status
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // User is authenticated - show main app
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        // User is not authenticated
        <>
          {!onboardingCompleted ? (
            // First time user - show onboarding
            <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
          ) : (
            // Returning user - show auth screens
            <Stack.Screen name="Auth" component={AuthNavigator} />
          )}
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
