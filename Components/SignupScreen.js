import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Button, Divider } from 'react-native-elements';

class SignupScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      repeatPassword: '',
    }
  }

  handleSignup = () => {
    const { email, firstName, lastName, password, repeatPassword } = this.state;
    if ((email && firstName && lastName && password
        && repeatPassword && password === repeatPassword))
    {
      fetch('http://10.2.103.54:3000/signup', {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
        })
      })
      .then((resp) => resp.json())
      .then((response) => {
        if (response.success) {
          this.props.navigation.navigate("Login");
        }
        else {
          console.log('implement later');
        }
      })
      .catch((err)=>console.log("ERROR:", err));
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
          <FormLabel labelStyle={{ color: 'black' }}>First Name</FormLabel>
          <FormInput onChangeText={(firstName)=>this.setState({ firstName })} containerStyle={{ borderBottomColor: 'black' }}/>
          <FormLabel labelStyle={{ color: 'black' }}>Last Name</FormLabel>
          <FormInput onChangeText={(lastName)=>this.setState({ lastName })} containerStyle={{ borderBottomColor: 'black' }}/>
          <FormLabel labelStyle={{ color: 'black' }}>Email</FormLabel>
          <FormInput onChangeText={(email)=>this.setState({ email })} autoCapitalize='none' containerStyle={{ borderBottomColor: 'black' }}/>
          <FormLabel labelStyle={{ color: 'black' }}>Password</FormLabel>
          <FormInput onChangeText={(password)=>this.setState({ password })} secureTextEntry containerStyle={{ borderBottomColor: 'black' }}/>
          <FormLabel labelStyle={{ color: 'black' }}>Repeat Password</FormLabel>
          <FormInput onChangeText={(repeatPassword)=>this.setState({ repeatPassword })} secureTextEntry containerStyle={{ borderBottomColor: 'black' }}/>
          <Button
            onPress={this.handleSignup}
            containerViewStyle={{ marginTop: 20 }}
            borderRadius={30}
            title='Sign Up'
            backgroundColor='#4DB6AC'
          />
          <TouchableOpacity onPress={()=>this.props.navigation.navigate("Login")}>
            <Text style={{ alignSelf: 'center', marginTop: 16,  fontSize: 16 }}>Cancel</Text>
          </TouchableOpacity>
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
