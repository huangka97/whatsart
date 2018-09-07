import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import { Camera, Permissions, ImageManipulator } from 'expo';
import Ripple from 'react-native-material-ripple';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import config from "../config.json";

// To preview the image taken before deciding to process it
import CameraScreenPreview from './CameraScreenPreview.js';
import InformationScreen from './InformationScreen.js';

class CameraScreen extends React.Component {
  static navigationOptions = { // Don't display header for camera.
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      currentImg: null,
      showInformationScreen: false,
      webEntitiesArray: [],
    };
  }

  // Wait for User to Give Permissions to Camera
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  frameAnimation = () => {
    return new Promise((resolve, reject) => {
      setTimeout(()=>resolve('Animation done!'), 1000);
      this.frame.reset();
      this.frame.play();
    })
  }

  // Google Vision API Call
  async checkforLogos(base64) {
      return await
      axios.post(config.googleCloud.api+config.googleCloud.apiKey, {
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
        this.setState({ webEntitiesArray: googleVisionResults }, ()=>console.log(this.state.webEntitiesArray));
        return Promise.resolve();
      })
      .catch(err => console.log('Google Vision API ERROR:', err));
    }

  // Camera Functionality
  snap = async () => {
    if (this.camera) {
      this.frameAnimation()
      .then(() => {
        this.camera.takePictureAsync({ quality: 1 })
        .then(async ({ uri }) => {
          this.setState({ currentImg: uri });
          const imgResult = await ImageManipulator.manipulate(this.state.currentImg, [{ resize: { width: 480 } }], { compress: 0, base64: true })
          this.checkforLogos(imgResult.base64)
          .then(resp => console.log(resp))
          .then(() => console.log(this.state.webEntitiesArray));
        });
      });
    }
  };

  // Cancel Image
  handleCancel = () => {
    console.log('cancel')
    this.setState({ currentImg: null });
  }

  // Toogle InformationScreen
  toggleInformation=()=>{
    console.log("TOGGLED");
    this.setState({ showInformationScreen: !this.state.showInformationScreen });
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
      return ( // Return the Normal Camera Display
        !this.state.currentImg && !this.state.showInformationScreen ?
        <View style={styles.main}>
          <StatusBar hidden />
          <Camera style={styles.main} type={this.state.type} ref={ref => {this.camera = ref;}}>
            <View style={styles.cameraViewContainer}>
              <View style={styles.topBarContainer}>
                <Ripple rippleColor="#FFFFFF" rippleContainerBorderRadius={15} onPress={()=>this.props.navigation.navigate('Profile')}>
                  <Image style={styles.iconSize} source={require('../assets/guest.png')} />
                </Ripple>
              </View>
              <LottieView ref={ref => this.frame = ref} source={require('../assets/focus.json')} duration={1000} style={{ width: 800, alignSelf: 'center' }} />
              <View style={styles.bottomBarContainer}>
                <Ripple rippleColor="#FFFFFF" rippleContainerBorderRadius={15} onPress={()=>this.props.navigation.navigate("Collection")}>
                  <Image style={styles.iconSize} source={require('../assets/collections.png')} />
                </Ripple>
                <Ripple rippleColor="#FFFFFF" rippleContainerBorderRadius={15} onPress={this.snap}>
                  <Image style={styles.iconSize} source={require('../assets/camera.png')} />
                </Ripple>
                <View style={styles.iconSize} ></View>
              </View>
            </View>
          </Camera>
        </View>
      : !this.state.showInformationScreen? <CameraScreenPreview showInfo={this.toggleInformation} currentImg={this.state.currentImg} cancel={this.handleCancel}/>
      :<InformationScreen showInfo={this.toggleInformation} artNameArray={this.state.webEntitiesArray}/>
      )
    }
  }
}

const styles = StyleSheet.create({
  noAccess: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
  },
  cameraViewContainer: {
    flex: 1,
    backgroundColor: 'transparent',
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
});

export default CameraScreen;
