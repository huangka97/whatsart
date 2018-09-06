import React from 'react';
import { StyleSheet, Text, View, Image, Alert, Platform } from 'react-native';
import { SocialIcon, Divider, Button } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import { Video, AuthSession } from 'expo';
import axios from 'axios';

import SignupScreen from './SignupScreen.js';

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: false,
      twitterRequestToken: '',
      twitterRequestTokenSecret: '',
      modalOpen: false,
    }
  }

  componentDidMount() {
    axios.get(`https://enigmatic-garden-90693.herokuapp.com/twitterRequestToken?callbackURL=${encodeURIComponent(AuthSession.getRedirectUrl())}`)
    .then(({ data }) => {
      this.setState({ twitterRequestToken: data.requestToken, twitterRequestTokenSecret: data.requestTokenSecret });
    });
  }

  handleLogin = () => {
    const { email, password } = this.state;
    if (email && password) {
      axios.post('https://enigmatic-garden-90693.herokuapp.com/login', {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.success) {
          this.props.navigation.navigate("Camera");
        }
      })
      .catch((err)=>{
        console.log("ERROR:", err);
        this.setState({ error: true });
      });
    }
  }

  facebookLogin = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('2159152801010115', {
      permissions: ['public_profile', 'email'],
    });
    if (type === 'success') {
      axios.post(`https://enigmatic-garden-90693.herokuapp.com/facebookLogin?access_token=${token}`)
      .then((resp) => {
        console.log(`${resp.data.firstName} has logged in!`);
        this.props.navigation.navigate("Camera");
      })
    }
  }

  twitterLogin = async () => {
    const { type, params } = await AuthSession.startAsync({
      authUrl: `https://twitter.com/oauth/authenticate?oauth_token=${this.state.twitterRequestToken}`
    });
    if (type === 'success') {
      axios.post('https://enigmatic-garden-90693.herokuapp.com/twitterOAuth', {
        requestToken: this.state.twitterRequestToken,
        requestTokenSecret: this.state.twitterRequestTokenSecret,
        oauth_verifier: params.oauth_verifier,
      })
      .then(({ data }) => {
        // Save Twitter Access Tokens if Using Other Twitter Functionalities (Tweets, Followers, etc.)
        return axios.get(`https://enigmatic-garden-90693.herokuapp.com/twitterLogin?oauth_token=${data.accessToken}&oauth_token_secret=${data.accessTokenSecret}&user_id=${data.user_id}`);
      })
      .then((resp) => {
        console.log(`${resp.data.firstName} has logged in!`);
        this.props.navigation.navigate("Camera");
      })
    }
  }

  toggleSignupModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Video
          source={require('../assets/spiral.mp4')}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={styles.video}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sign In</Text>
          <Divider style={styles.titleDivider} />
        </View>
        <View style={styles.normalLoginContainer}>
          <TextField
            label='Email'
            value={this.state.email}
            onChangeText={(email)=>this.setState({ email })}
            textColor="black"
            baseColor="black"
            tintColor="rgb(0, 44, 178)"
            autoCapitalize='none'
            error={!this.state.error ? '' : 'Invalid Email or Password'}
          />
          <TextField
            label='Password'
            value={this.state.password}
            onChangeText={(password)=>this.setState({ password })}
            textColor="black"
            baseColor="black"
            tintColor="rgb(0, 44, 178)"
            autoCapitalize='none'
            secureTextEntry
            error={!this.state.error ? '' : 'Invalid Email or Password'}
          />
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
          <Button
            onPress={this.handleLogin}
            containerViewStyle={{ marginTop: 10 }}
            borderRadius={30}
            title='Sign In'
            backgroundColor='#4DB6AC'
          />
        </View>
        <View style={styles.orDividerContainer}>
          <View style={styles.orDividerRow}>
            <Divider style={styles.orDivider} />
            <Text> or </Text>
            <Divider style={styles.orDivider} />
          </View>
        </View>
        <View style={styles.socialButtonsContainer}>
          <SocialIcon title='Sign In With Facebook' button type='facebook' onPress={this.facebookLogin} style={{ marginTop: 0 }} />
          <SocialIcon title='Sign In With Twitter' button type='twitter' onPress={this.twitterLogin} />
          <Text style={styles.noAccountText}>
            Don't have an account?
            <Text style={{ fontWeight: "bold" }} onPress={this.toggleSignupModal}> Sign up!</Text>
          </Text>
        </View>
        <SignupScreen isOpen={this.state.modalOpen} onCancel={this.toggleSignupModal} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  titleContainer: {
    flex: 3,
    justifyContent: 'center',
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
    marginTop: 10,
  },
  normalLoginContainer: {
    flex: 3,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
  },
  forgotPassword: {
    alignSelf: 'center',
    fontSize: 14,
    color: 'black',
    marginTop: 0,
  },
  noAccountText: {
    alignSelf: 'center',
    fontSize: 14,
    color: 'black',
    marginTop: 10,
  },
  orDivider: {
    width: '35%',
    backgroundColor: 'black',
  },
  orDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orDividerContainer: {
    flex: .5,
    justifyContent: 'center',
  },
  socialButtonsContainer: {
    flex: 4,
    paddingHorizontal: 40,
  },
});

export default LoginScreen;
