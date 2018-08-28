import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Camera, Permissions } from 'expo';
import Ripple from 'react-native-material-ripple';

// To preview the image taken before deciding to process it
import CameraScreenPreview from './CameraScreenPreview.js';

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
    };
  }

  // Wait for User to Give Permissions
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  // Take a picture and set the current image in state to display
  snap = async () => {
    if (this.camera) {
      this.camera.takePictureAsync()
      .then(({ uri })=> {
        console.log(uri);
        this.setState({ currentImg: uri });
      });
    }
  };

  // To cancel the image and retake another picture
  handleCancel = () => {
    console.log('cancel')
    this.setState({ currentImg: null });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) { // Display Nothing while Asking User for Permissions
      return <View />;
    }
    else if (hasCameraPermission === false) { // Tell User that no Permissions were given
      return <View style={styles.noAccess}><Text>No access given to camera.</Text></View>;
    }
    else {
      return !this.state.currentImg ? ( // Return the Normal Camera Display
        <View style={styles.main}>
          <Camera style={styles.main} type={this.state.type} ref={ref => {this.camera = ref;}}>
            <View style={styles.cameraViewContainer}>
              <View style={styles.topBarContainer}>
                <Ripple rippleColor="#FFFFFF" rippleContainerBorderRadius={15}>
                  <Image style={styles.iconSize} source={require('../assets/guest.png')} />
                </Ripple>
              </View>
              <View style={styles.bottomBarContainer}>
                <Ripple rippleColor="#FFFFFF" rippleContainerBorderRadius={15}>
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
      ) : <CameraScreenPreview currentImg={this.state.currentImg} cancel={this.handleCancel} /> // Preview the Static Image Taken
    }
  }
}

const styles = StyleSheet.create({
  noAccess: {
    flex: 1,
    alignItems: 'center',
  },
  main: {
    flex: 1,
  },
  cameraViewContainer: {
    // borderWidth: 5,
    // borderColor: 'white',
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between'
  },
  topBarContainer: {
    // borderWidth: 5,
    // borderColor: 'green',
    flexDirection:'row',
    paddingTop: 20,
    paddingLeft: 10
  },
  bottomBarContainer: {
    // borderWidth: 5,
    // borderColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10
  },
  iconSize: {
    height: 50,
    width: 50,
  },
});

export default CameraScreen;
