import React from 'react';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import Ripple from 'react-native-material-ripple';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import { Video } from 'expo';

class LandingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Ripple style={styles.backgroundContainer} rippleDuration={800} rippleFades rippleSize={400}
        onPressOut={()=>setTimeout(()=>this.props.navigation.navigate("Login"), 500)}>
        <View style={styles.main}>
          <Video
            source={require('../assets/LandingScreen/lines.mp4')}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={styles.video}
          />
          <View style={styles.titleContainer}>
            <Image source={require('../assets/LandingScreen/whatsartIcon.png')} style={styles.titleIcon} />
            <Animatable.Text animation="fadeInDown" iterationCount={1} delay={0}
              style={styles.title}>WhatsArt</Animatable.Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('../assets/LandingScreen/canvas.png')} style={styles.canvasImage} />
            <LottieView
              source={require('../assets/LandingScreen/searchAnimation.json')}
              speed={0.6}
              autoPlay
              loop
              style={{ marginBottom: 40}}
            />
          </View>
          <View style={styles.captionContainer}>
            <Animatable.Text animation="pulse" iterationCount="infinite" direction="alternate" delay={0}
              style={styles.caption}>Touch to enter.</Animatable.Text>
          </View>
        </View>
      </Ripple>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  backgroundContainer: {
    flex: 1
  },
  titleContainer: {
    //borderWidth: 10,
    //borderColor: 'green',
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleIcon: {
    width: 100,
    height: 100,
    marginBottom: -10,
  },
  title: {
    fontSize: 60,
    fontFamily: Platform.OS === 'ios' ? 'Marker Felt' : 'sans-serif',
    color: 'white',
  },
  imageContainer: {
    //borderWidth: 5,
    //borderColor:'blue'
    flex: 3,
    alignItems: 'center',
  },
  canvasImage: {
    width: 300,
    height: 300,
  },
  captionContainer: {
    //borderWidth: 10,
    //borderColor: 'red',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  caption: {
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Verdana' : 'sans-serif',
    color: 'white',
  },
});

export default LandingScreen;
