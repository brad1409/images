import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Onboarding screens
import OnboardingScreen1 from '../screens/onboarding/OnboardingScreen1';
import OnboardingScreen2 from '../screens/onboarding/OnboardingScreen2';
import OnboardingScreen3 from '../screens/onboarding/OnboardingScreen3';

const Stack = createStackNavigator();

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false
      }}
    >
      <Stack.Screen 
        name="OnboardingScreen1" 
        component={OnboardingScreen1} 
      />
      <Stack.Screen 
        name="OnboardingScreen2" 
        component={OnboardingScreen2} 
      />
      <Stack.Screen 
        name="OnboardingScreen3" 
        component={OnboardingScreen3} 
      />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
