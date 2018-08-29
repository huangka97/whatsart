import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { zoomIn, fadeIn } from 'react-navigation-transitions';
import { Ionicons } from '@expo/vector-icons';

// All Screen Components
import LandingScreen from './Components/LandingScreen.js';
import LoginScreen from './Components/LoginScreen.js';
import SignupScreen from './Components/SignupScreen.js';
import CameraScreen from './Components/CameraScreen.js';
import TestScreen from './Components/TestScreen.js';

// For Navigation Between Screens
const WhatsArt = createStackNavigator(
  {
    Landing: { screen: LandingScreen },
    Login: { screen: LoginScreen },
    Signup: { screen: SignupScreen },
    Camera: { screen: CameraScreen },
    Test: { screen: TestScreen }, // Remove later, for testing purposes
  },
  {
    initialRouteName: 'Landing',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#1976D2',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    transitionConfig: (prop) => {
      const routeName = prop.scene.route.routeName;
      if (['Landing', 'Login'].includes(routeName)) {
        return fadeIn(600);
      }
      else if (routeName === 'Camera') {
        return zoomIn(600);
      }
      else {
        return fadeIn(600);
      }
    }
  }
);

console.disableYellowBox = true;
export default WhatsArt;
