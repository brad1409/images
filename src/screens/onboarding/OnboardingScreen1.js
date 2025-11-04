import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Text, Button } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const OnboardingScreen1 = ({ navigation }) => {
  const handleNext = () => {
    navigation.navigate('OnboardingScreen2');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Image from Materials folder */}
        <Image 
          source={{ uri: 'https://github.com/brad1409/images/raw/main/Materials/01-Onboarding-Page/onboarding1.png' }}
          style={styles.image}
          resizeMode="contain"
        />
        
        <View style={styles.textContainer}>
          <Text variant="headlineMedium" style={styles.title}>
            Find Your Perfect Hotel
          </Text>
          <Text variant="bodyLarge" style={styles.description}>
            Discover amazing hotels around the world with just a few taps. 
            Browse through thousands of options and find the perfect place for your stay.
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <View style={styles.indicators}>
            <View style={[styles.indicator, styles.activeIndicator]} />
            <View style={styles.indicator} />
            <View style={styles.indicator} />
          </View>
          
          <Button 
            mode="contained" 
            onPress={handleNext}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Next
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    marginTop: 20
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
    fontWeight: 'bold'
  },
  description: {
    textAlign: 'center',
    color: '#666',
    lineHeight: 24
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center'
  },
  indicators: {
    flexDirection: 'row',
    marginBottom: 30
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 5
  },
  activeIndicator: {
    backgroundColor: '#007AFF'
  },
  button: {
    width: '100%',
    backgroundColor: '#007AFF'
  },
  buttonContent: {
    paddingVertical: 8
  }
});

export default OnboardingScreen1;
