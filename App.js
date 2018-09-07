import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { zoomIn, fadeIn, flipY, fromLeft } from 'react-navigation-transitions';

// All Screen Components
import LandingScreen from './Components/LandingScreen.js';
import LoginScreen from './Components/LoginScreen.js';
import CameraScreen from './Components/CameraScreen.js';
import ProfileScreen from './Components/ProfileScreen.js'
import CollectionScreen from './Components/CollectionScreen.js';

// For Navigation Between Screens
const WhatsArt = createStackNavigator(
  {
    Landing: { screen: LandingScreen },
    Login: { screen: LoginScreen },
    Camera: { screen: CameraScreen },
    Collection: { screen: CollectionScreen },
    Profile: { screen: ProfileScreen },
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
      else if (['Profile', 'Collection'].includes(routeName)) {
        return fromLeft(800);
      }
      else {
        return fadeIn(600);
      }
    }
  }
);

// https://stackoverflow.com/questions/46264767/react-navigation-pass-props-in-tabnavigator
// Implement screenProps with splash screen for faster immediate assets later on (images, videos)

console.disableYellowBox = true;
export default WhatsArt;
