import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Text, Button } from 'react-native-paper';
import { setOnboardingCompleted } from '../../utils/storage';

const { width, height } = Dimensions.get('window');

const OnboardingScreen3 = ({ navigation }) => {
  const handleGetStarted = async () => {
    // Mark onboarding as completed
    await setOnboardingCompleted();
    // Navigate to auth stack
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }]
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Image from Materials folder */}
        <Image 
          source={{ uri: 'https://github.com/brad1409/images/raw/main/Materials/13-All-Reviews-Page/reviews.png' }}
          style={styles.image}
          resizeMode="contain"
        />
        
        <View style={styles.textContainer}>
          <Text variant="headlineMedium" style={styles.title}>
            Share Your Experience
          </Text>
          <Text variant="bodyLarge" style={styles.description}>
            Rate and review hotels after your stay. Help other travelers make 
            informed decisions and share your amazing experiences.
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <View style={styles.indicators}>
            <View style={styles.indicator} />
            <View style={styles.indicator} />
            <View style={[styles.indicator, styles.activeIndicator]} />
          </View>
          
          <View style={styles.buttonRow}>
            <Button 
              mode="outlined" 
              onPress={handleBack}
              style={[styles.button, styles.backButton]}
              contentStyle={styles.buttonContent}
            >
              Back
            </Button>
            
            <Button 
              mode="contained" 
              onPress={handleGetStarted}
              style={[styles.button, styles.nextButton]}
              contentStyle={styles.buttonContent}
            >
              Get Started
            </Button>
          </View>
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
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  button: {
    flex: 0.45
  },
  backButton: {
    borderColor: '#007AFF'
  },
  nextButton: {
    backgroundColor: '#007AFF'
  },
  buttonContent: {
    paddingVertical: 8
  }
});

export default OnboardingScreen3;
