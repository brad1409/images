import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Main screens
import ExploreScreen from '../screens/main/ExploreScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import BookingsScreen from '../screens/main/BookingsScreen';
import HotelDetailScreen from '../screens/main/HotelDetailScreen';
import BookingScreen from '../screens/main/BookingScreen';
import BookingSuccessScreen from '../screens/main/BookingSuccessScreen';
import ReviewScreen from '../screens/main/ReviewScreen';
import AllReviewsScreen from '../screens/main/AllReviewsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          switch (route.name) {
            case 'Explore':
              iconName = 'explore';
              break;
            case 'Bookings':
              iconName = 'book-online';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'circle';
          }
          
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60
        }
      })}
    >
      <Tab.Screen 
        name="Explore" 
        component={ExploreScreen}
        options={{ tabBarLabel: 'Explore' }}
      />
      <Tab.Screen 
        name="Bookings" 
        component={BookingsScreen}
        options={{ tabBarLabel: 'My Bookings' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

// Main Stack Navigator
const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <Stack.Screen 
        name="HomeTabs" 
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="HotelDetail" 
        component={HotelDetailScreen}
        options={{ title: 'Hotel Details' }}
      />
      <Stack.Screen 
        name="Booking" 
        component={BookingScreen}
        options={{ title: 'Book Hotel' }}
      />
      <Stack.Screen 
        name="BookingSuccess" 
        component={BookingSuccessScreen}
        options={{ 
          title: 'Booking Confirmed',
          headerLeft: null,
          gestureEnabled: false
        }}
      />
      <Stack.Screen 
        name="Review" 
        component={ReviewScreen}
        options={{ title: 'Write Review' }}
      />
      <Stack.Screen 
        name="AllReviews" 
        component={AllReviewsScreen}
        options={{ title: 'All Reviews' }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
