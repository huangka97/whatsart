import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

// Components
import LandingScreen from './Components/LandingScreen.js';
import LoginScreen from './Components/LoginScreen.js';
import CameraScreen from './Components/CameraScreen.js';

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
    }
  }
);

export default WhatsArt;
