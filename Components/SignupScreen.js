import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, Platform } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Button, Divider } from 'react-native-elements';

class SignupScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }
  // Implement Modal Box Instead??
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sign Up</Text>
          <Divider style={{ width: '75%', backgroundColor: 'black', marginTop: 20 }} />
        </View>
        <View style={{ flex: 4, marginTop: 30 }}>
          <FormLabel labelStyle={{ color: 'black' }}>Email</FormLabel>
          <FormInput containerStyle={{ borderBottomColor: 'black' }}/>
          <FormLabel labelStyle={{ color: 'black' }}>First Name</FormLabel>
          <FormInput containerStyle={{ borderBottomColor: 'black' }}/>
          <FormLabel labelStyle={{ color: 'black' }}>Last Name</FormLabel>
          <FormInput containerStyle={{ borderBottomColor: 'black' }}/>
          <FormLabel labelStyle={{ color: 'black' }}>Username</FormLabel>
          <FormInput containerStyle={{ borderBottomColor: 'black' }}/>
          <FormLabel labelStyle={{ color: 'black' }}>Password</FormLabel>
          <FormInput containerStyle={{ borderBottomColor: 'black' }}/>
          <FormLabel labelStyle={{ color: 'black' }}>Repeat Password</FormLabel>
          <FormInput containerStyle={{ borderBottomColor: 'black' }}/>
          <Button
            containerViewStyle={{ marginTop: 20 }}
            borderRadius={30}
            title='Sign Up'
            backgroundColor='#4DB6AC'
          />
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
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 60,
    fontFamily: Platform.OS === 'ios' ? 'Marker Felt' : 'sans-serif',
    color: 'black',
  },
});

export default SignupScreen;
