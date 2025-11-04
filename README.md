# Hotel Booking App - React Native

## DSW02B1 Final Assessment Solution

A comprehensive React Native hotel booking application with Firebase backend integration, featuring user authentication, hotel listings, booking functionality, and reviews system.

## Features

### Section A: Mobile UI Implementation (60 marks)
- **A1. Onboarding Screens (5 marks)** - Multi-screen tutorial flow for new users
- **A2. Authentication Screens (15 marks)** - Sign Up, Sign In, Forgot Password with validation
- **A3. Explore Page (15 marks)** - Hotel listings with scrollable cards
- **A4. Booking Flow (15 marks)** - Hotel details and booking process
- **A5. Reviews (5 marks)** - Review system for hotels
- **A6. Profile Page (5 marks)** - User profile with bookings and logout

### Section B: Backend Integration (40 marks)
- **B1. Firebase Configuration (10 marks)** - Firebase setup with auth and database
- **B2. Firebase Authentication (10 marks)** - Complete auth implementation
- **B3. Data Storage (10 marks)** - User profiles, bookings, and reviews in Firebase
- **B4. Third-Party API Integration (10 marks)** - Fake Store API and OpenWeatherMap API

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/brad1409/images.git
   cd images
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **iOS Setup (macOS only):**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Firebase Setup:**
   - Create a new Firebase project at https://console.firebase.google.com
   - Enable Authentication with Email/Password
   - Enable Cloud Firestore
   - Download `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
   - Place them in the appropriate directories:
     - `android/app/google-services.json`
     - `ios/GoogleService-Info.plist`

5. **Environment Variables:**
   Create a `.env` file in the root directory:
   ```
   WEATHER_API_KEY=your_openweathermap_api_key
   ```

### Running the App

**For Android:**
```bash
npx react-native run-android
```

**For iOS:**
```bash
npx react-native run-ios
```

**Start Metro Bundler:**
```bash
npx react-native start
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Screen components
│   ├── auth/          # Authentication screens
│   ├── onboarding/    # Onboarding screens
│   ├── main/          # Main app screens
├── navigation/         # Navigation configuration
├── services/          # API services and Firebase config
├── utils/             # Utility functions
├── context/           # React Context providers
└── assets/            # Images and static assets
```

## API Integration

### Firebase Services Used:
- **Authentication:** Email/Password sign-in
- **Firestore:** User profiles, bookings, reviews storage
- **Real-time listeners:** Live data updates

### Third-Party APIs:
- **Fake Store API:** For recommended hotels/deals
- **OpenWeatherMap API:** Weather information for hotel locations

## Key Features Implementation

### Authentication Flow
- Conditional navigation based on auth state
- Secure credential handling
- Persistent login sessions
- Input validation and error handling

### Onboarding Experience
- First-time user tutorial
- AsyncStorage for onboarding state tracking
- Skip functionality for returning users

### Hotel Booking System
- Hotel listings with filtering/sorting
- Detailed hotel information
- Date selection for bookings
- Booking confirmation and storage

### Review System
- Star ratings and text reviews
- Real-time review updates
- User review submission

## Security Features
- Secure API key storage
- Protected routes for authenticated users only
- Input validation and sanitization
- Secure Firebase rules implementation

## Testing

Run tests with:
```bash
npm test
```

## Troubleshooting

### Common Issues:
1. **Metro bundler issues:** Clear cache with `npx react-native start --reset-cache`
2. **Android build issues:** Clean and rebuild with `cd android && ./gradlew clean && cd ..`
3. **iOS build issues:** Clean build folder in Xcode

### Firebase Setup Issues:
- Ensure Firebase config files are in correct locations
- Verify Firebase project settings match your app bundle ID
- Check that required Firebase services are enabled

## Author
Bradley Simango - DSW02B1 Final Assessment

## License
This project is for educational purposes only.
