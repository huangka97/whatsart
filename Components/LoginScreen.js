import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, Platform } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { SocialIcon, Divider, Button } from 'react-native-elements';
import { Video } from 'expo';

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      invalidLogin: false,
    }
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle='light-content' />
        <Video
          source={require('../assets/spiral.mp4')}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.7 }}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sign In</Text>
          <Divider style={{ width: '75%', backgroundColor: '#D3D3D3', marginTop: 20 }} />
        </View>
        <View style={{ flex: 4, justifyContent: 'flex-end', }}>
          <FormLabel>Username</FormLabel>
          <FormInput />
          { !this.state.invalidLogin ? null : <FormValidationMessage>Invalid username or password.</FormValidationMessage>}
          <FormLabel>Password</FormLabel>
          <FormInput />
          { !this.state.invalidLogin ? null : <FormValidationMessage>Invalid username or password.</FormValidationMessage>}
          <FormLabel labelStyle={{ alignSelf: 'center', fontSize: '14', color: '#D3D3D3' }}>Forgot Password?</FormLabel>
          <Button
            containerViewStyle={{ marginTop: 20 }}
            borderRadius={30}
            title='Sign In'
            backgroundColor='#4DB6AC'
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Divider style={{ width: '35%', backgroundColor: 'black' }} />
            <Text style={{ color: '#D3D3D3' }}> or </Text>
            <Divider style={{ width: '35%', backgroundColor: 'black' }} />
          </View>
        </View>
        <View style={{ flex: 4, }}>
          <SocialIcon title='Sign In With Facebook' button type='facebook' />
          <SocialIcon title='Sign In With Twitter' button type='twitter' />
          <Text style={{ alignSelf: 'center', fontSize: '14', color: 'black', marginTop: 10 }}>
            Don't have an account?
            <Text style={{fontWeight: "bold"}}> Sign up!</Text>
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  titleContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 60,
    fontFamily: Platform.OS === 'ios' ? 'Marker Felt' : 'sans-serif',
    color: 'black',
  },
});

export default LoginScreen;
