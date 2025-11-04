import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator
} from 'react-native';
import { Text } from 'react-native-paper';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://github.com/brad1409/images/raw/main/Materials/LOGO/logo.png' }}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text variant="headlineMedium" style={styles.appName}>
        HotelBook
      </Text>
      <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20
  },
  appName: {
    color: '#007AFF',
    fontWeight: 'bold',
    marginBottom: 40
  },
  loader: {
    marginTop: 20
  }
});

export default LoadingScreen;
