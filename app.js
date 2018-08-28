import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { zoomIn, flipY } from 'react-navigation-transitions';
import { Ionicons } from '@expo/vector-icons';

// All Screen Components
import LandingScreen from './Components/LandingScreen.js';
import LoginScreen from './Components/LoginScreen.js';
import CameraScreen from './Components/CameraScreen.js';

// For Navigation Between Screens
const WhatsArt = createStackNavigator(
  {
    Landing: { screen: LandingScreen },
    Login: { screen: LoginScreen },
    Camera: { screen: CameraScreen },
  },
  {
    initialRouteName: 'Camera',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#009688',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    transitionConfig: (prop) => {
      const routeName = prop.scene.route.routeName;
      if (routeName === 'Camera') {
        return zoomIn(600);
      } else {
        return flipY(4000);
      }
    }
  }
);

console.disableYellowBox = true;
export default WhatsArt;
