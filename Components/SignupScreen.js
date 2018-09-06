import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Button, Divider } from 'react-native-elements';
import { Video } from 'expo';
import Modal from 'react-native-modalbox';
import axios from 'axios';

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
    if ((email && firstName && lastName && password && repeatPassword && password === repeatPassword))
    {
      axios.post('https://enigmatic-garden-90693.herokuapp.com/signup', {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
      })
      .then(({ data }) => {
        if (data.success) {
          this.props.onCancel();
        }
        else {
          console.log('implement later');
        }
      })
      .catch((err)=>console.log("ERROR:", err));
    }
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} animationDuration={800} style={styles.mainContainer}>
        <Video
          source={require('../assets/spiral.mp4')}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={styles.video}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sign Up</Text>
          <Divider style={styles.titleDivider} />
        </View>
        <View style={styles.formContainer}>
          <TextField
            label='First Name'
            value={this.state.firstName}
            onChangeText={(firstName)=>this.setState({ firstName })}
            textColor="black"
            baseColor="black"
            tintColor="rgb(0, 44, 178)"
          />
          <TextField
            label='Last Name'
            value={this.state.lastName}
            onChangeText={(lastName)=>this.setState({ lastName })}
            textColor="black"
            baseColor="black"
            tintColor="rgb(0, 44, 178)"
          />
          <TextField
            label='Email'
            value={this.state.email}
            onChangeText={(email)=>this.setState({ email })}
            textColor="black"
            baseColor="black"
            tintColor="rgb(0, 44, 178)"
            autoCapitalize='none'
          />
          <TextField
            label='Password'
            value={this.state.password}
            onChangeText={(password)=>this.setState({ password })}
            textColor="black"
            baseColor="black"
            tintColor="rgb(0, 44, 178)"
            secureTextEntry
          />
          <TextField
            label='Repeat Password'
            value={this.state.repeatPassword}
            onChangeText={(repeatPassword)=>this.setState({ repeatPassword })}
            textColor="black"
            baseColor="black"
            tintColor="rgb(0, 44, 178)"
            secureTextEntry
          />
          <Button
            onPress={this.handleSignup}
            containerViewStyle={{ marginTop: 20 }}
            borderRadius={30}
            title='Sign Up'
            backgroundColor='#4DB6AC'
          />
          <TouchableOpacity onPress={this.props.onCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.8,
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
  titleDivider: {
    width: '75%',
    backgroundColor: 'black',
    marginTop: 10 ,
  },
  formContainer: {
    flex: 4,
    marginTop: 30,
    paddingHorizontal: 30,
  },
  cancelText: {
    alignSelf: 'center',
    marginTop: 16,
    fontSize: 16,
  },
});

export default SignupScreen;
