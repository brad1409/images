import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { BookingProvider } from './src/context/BookingContext';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider as PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <AuthProvider>
        <BookingProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </BookingProvider>
      </AuthProvider>
    </PaperProvider>
  );
};

export default App;
