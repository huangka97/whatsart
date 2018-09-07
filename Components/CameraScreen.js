import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, Dimensions, PixelRatio, Platform } from 'react-native';
import { Camera, Permissions, ImageManipulator } from 'expo';
import Ripple from 'react-native-material-ripple';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import { googleCloud } from "../config.json";

// To Show Artwork Information
import InformationModalScreen from './InformationModalScreen.js';

class CameraScreen extends React.Component {
  static navigationOptions = { // Don't display header for camera.
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      animationMode: 'frameAnimation',
      googleVisionResults: null,
      artworkInfo: {},
      informationModalOpen: false,
    };
  }

  // Wait for User to Give Permissions to Camera
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  // Camera Functionality
  snap = async () => {
    if (this.camera) {
      this.startFrameAnimation()
      .then(() => {
        this.camera.takePictureAsync({ onPictureSaved: this.processImage });
      });
    }
  };

  // Frame Animation
  startFrameAnimation = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('Frame animation done!'), 500);
      this.frameAnimation.reset();
      this.frameAnimation.play();
    })
  }

  processImage = async (data) => {
    this.setState({ animationMode: 'loadingAnimation' });
    this.camera.pausePreview();
    const compressedImg = await ImageManipulator.manipulate(data.uri, [{ resize: { width: 480 } }], { compress: 0, base64: true });
    this.googleVisionArtwork(compressedImg.base64)
    .then(() => {
      console.log('googleVisionResults:', this.state.googleVisionResults);
      return this.getArtworkInfo();
    })
    .then(() => {
      this.setState({ animationMode: 'successAnimation' });
      setTimeout(this.toggleInformationModal, 1500);
    })
    .catch((err) => {
      console.log('Image Processing ERROR:', err);
      this.setState({ animationMode: 'failAnimation' });
      setTimeout(this.resolveFailAnimation, 1900);
    });
  }

  // Google Vision API Call
  googleVisionArtwork = async (base64) => {
    return await
      axios.post(googleCloud.api + googleCloud.apiKey, {
        "requests":[{
          "image":{
            "content": base64
          },
          "features":[{
              "type": "WEB_DETECTION",
              maxResults: 3
            }]
        }]
      })
      .then(({ data: { responses } }) => {
        const googleVisionResults = responses[0].webDetection.webEntities.map(obj => obj.description);
        this.setState({ googleVisionResults: googleVisionResults });
        return Promise.resolve();
      })
      .catch(err => {
        console.log('Google Vision API ERROR:', err);
        return Promise.reject(err);
      });
  }

  // Send GoogleVision API Results to Backend for Artwork Information
  getArtworkInfo = async () => {
    return await
      axios.post('https://enigmatic-garden-90693.herokuapp.com/artwork', {
        artworkName: this.state.googleVisionResults,
      })
      .then(({ data: { artworkInfo } }) => {
        this.setState({ artworkInfo });
        return Promise.resolve();
      })
      .catch((err) => {
        console.log("Backend ERROR:", err);
        return Promise.reject(err);
      });
  }

  // Toggle Information Modal for Artwork
  toggleInformationModal = () => {
    if(!this.state.informationModalOpen) {
      this.setState({ animationMode: 'frameAnimation', informationModalOpen: true });
    } else {
      this.camera.resumePreview();
      this.setState({ informationModalOpen: false });
    }
  }

  getAnimation = () => {
    switch(this.state.animationMode) {
      case 'frameAnimation':
        return (
          <LottieView ref={ref => this.frameAnimation = ref} source={require('../assets/CameraScreen/focus.json')}
            duration={1500} loop={false} style={styles.frameAnimation} />
        );
      case 'loadingAnimation':
        return (
          <LottieView ref={ref => this.loadingAnimation = ref} source={require('../assets/CameraScreen/loading.json')}
            autoPlay style={styles.loadingAnimation} />
        );
      case 'successAnimation':
        return (
          <LottieView ref={ref => this.successAnimation = ref} source={require('../assets/CameraScreen/success1.json')}
            duration={1500} autoPlay loop={false} style={styles.successAnimation} />
        );
      case 'failAnimation':
        return (
          <LottieView ref={ref => this.failAnimation = ref} source={require('../assets/CameraScreen/fail.json')}
            duration={1500} autoPlay loop={false} style={styles.failAnimation} />
        );
    }
  }

  resolveFailAnimation = () => {
    this.setState({ animationMode: 'frameAnimation' });
    this.camera.resumePreview();
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) { // Display Nothing while Asking User for Permissions
      return <View />;
    }
    else if (hasCameraPermission === false) { // Tell User that no Permissions were given
      return (
        <View style={styles.noAccess}>
          <Image style={styles.iconSize} source={require('../assets/no-camera.png')} />
          <Text>No access given to camera.</Text>
        </View>
      );
    }
    else {
      return ( // Return the Normal Camera Display and Functionality
        <View style={styles.main}>
          <StatusBar hidden />
          <Camera style={styles.camera} type={this.state.type} ref={ref => this.camera = ref}>
            <View style={this.state.animationMode === 'frameAnimation' ? styles.cameraInnerViewContainer : styles.cameraInnerViewContainerMask}>
              <View style={styles.topBarContainer}>
                <Ripple rippleColor="#FFFFFF" rippleContainerBorderRadius={15} onPress={()=>this.props.navigation.navigate('Profile')}>
                  <Image style={styles.iconSize} source={require('../assets/CameraScreen/profile.png')} />
                </Ripple>
              </View>
              {this.getAnimation()}
              <View style={styles.bottomBarContainer}>
                <Ripple rippleColor="#FFFFFF" rippleContainerBorderRadius={15} onPress={()=>this.props.navigation.navigate("Collection")}>
                  <Image style={styles.iconSize} source={require('../assets/CameraScreen/collection.png')} />
                </Ripple>
                <Ripple rippleColor="#FFFFFF" rippleContainerBorderRadius={15} onPress={this.snap}>
                  <Image style={styles.iconSize} source={require('../assets/CameraScreen/camera.png')} />
                </Ripple>
                <View style={styles.iconSize} ></View>
              </View>
            </View>
          </Camera>
          <InformationModalScreen isOpen={this.state.informationModalOpen} onClose={this.toggleInformationModal} {...this.state.artworkInfo}/>
        </View>
      );
    }
  }
}

const { width } = Dimensions.get('window');
const pixelWidth = width * PixelRatio.get();

const styles = StyleSheet.create({
  noAccess: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
  },
  camera: {
    flex: 1
  },
  cameraInnerViewContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  cameraInnerViewContainerMask: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'space-between',
  },
  topBarContainer: {
    flexDirection:'row',
    paddingTop: 20,
    paddingLeft: 10
  },
  bottomBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
    paddingHorizontal: 10,
  },
  iconSize: {
    height: 50,
    width: 50,
  },
  frameAnimation: {
    width: Platform.OS === 'ios' ? pixelWidth * 0.65 : pixelWidth * 0.4,
    alignSelf: 'center',
  },
  loadingAnimation: {
    width: Platform.OS === 'ios' ? pixelWidth * 0.2 : pixelWidth * 0.15,
    alignSelf: 'center',
  },
  successAnimation: {
    width: Platform.OS === 'ios' ? pixelWidth * 0.25 : pixelWidth * 0.2,
    alignSelf: 'center',
  },
  failAnimation: {
    width: Platform.OS === 'ios' ? pixelWidth * 0.2 : pixelWidth * 0.2,
    alignSelf: 'center',
  },
});

export default CameraScreen;
