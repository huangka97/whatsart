import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class LoginScreen extends React.Component {
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

  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle='light-content' />
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
