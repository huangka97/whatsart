import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Camera, Permissions } from 'expo';
import Ripple from 'react-native-material-ripple';
import vision from '@google-cloud/vision';
import ImageResizer from "react-native-image-resizer";


export default class CameraExample extends React.Component {
  static navigationOptions = {
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

  // Wait for User to give Permissions
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async () => {
    if (this.camera) {
      this.camera.takePictureAsync()
      .then((data)=> {
        console.log(data);
        this.setState({ currentImg: uri });
        imageResize(uri.path,(resizedImageUri)=>{
          NativeModules.RNImageToBase64.getBase64String(resizedImageUri,async(err,base64)=>{
            if(err){
              console.log(err)
            }
            console.log("succesful conversion");
            let apiResult=await checkForLogos(base64);
            console.log("THIS IS API RESULT: ",apiResult);
          })
        })

      }).catch((err)=>console.log(err));
    }
  };


// recomended image size for detection is 640x480
 imageResize(path,callback,width=640,height=480){
    ImageResizer.createResizedImage(path,width,480,'JPEG',80).then((resizedImageUri)=>{
      callback(resizedImageUri);
    }).catch((err)=>{
      console.log(err);
    });
  }

//API call to google cloud

// async checkForLogos(base64){
//   const client = new vision.ImageAnnotatorClient();
//
//   // Performs label detection on the image file
//   client.labelDetection(base64)
//     .then(results => {
//       const labels = results[0].labelAnnotations;
//
//       console.log('Labels succesful');
//       return results
//
//     })
//     .catch(err => {
//       console.error('ERROR:', err);
//     });
// }

  render() {
    const { hasCameraPermission } = this.state;
    const { width, height } = Dimensions.get('window');
    if (hasCameraPermission === null) { // Display Nothing while Asking User for Permissions
      return <View />;
    }
    else if (hasCameraPermission === false) { // Tell User that no Permissions were given
      return <View style={styles.noAccess}><Text>No access given to camera.</Text></View>;
    }
    else {
      return !this.state.currentImg ? ( // Return the Normal Camera Display
        <View style={styles.main}>
          <Camera style={styles.main} type={this.state.type} ref={(cam) => {this.camera = cam;}}>
            <View style={styles.cameraViewContainer}>
              <View style={{ flexDirection:'row', borderWidth: 5, borderColor: 'green' }}>
                <Ripple><Image style={{ width: 50, height: 50, borderWidth: 5, borderColor: 'blue' }} source={require('../assets/guest.png')} /></Ripple>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 5, borderColor: 'red' }}>
                <Ripple><Image style={{ width: 50, height: 50 }} source={require('../assets/collections.png')} /></Ripple>
                <Ripple onPress={this.snap.bind(this)}>
                  <Image style={{ width: 50, height: 50 }} source={require('../assets/camera.png')} />
                </Ripple>
                <View style={{ width: 50, height: 50 }} ></View>
              </View>
            </View>
          </Camera>
        </View>
      ) : (<View style={{ flex: 1 }}>
            <Image source={{ width: width, height: height, uri: this.state.currentImg }} />
          </View>); // Display the Static Image Taken
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
    borderWidth: 5,
    borderColor: 'white',
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between'
  }
});
