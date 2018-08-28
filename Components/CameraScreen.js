import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Camera, Permissions } from 'expo';
import Ripple from 'react-native-material-ripple';
import models from '../models/models';
const ArtWork = models.User;
 // vision from '@google-cloud/vision';
// import vision from '@google-cloud/vision';
import config from "../config";
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
  //API CALL TO GOOGLE Cloud

  async checkforLogos(base64){
    return await
    fetch(config.googleCloud.api+config.googleCloud.apiKey,{
      method:'POST',
      body:JSON.stringify({
        "requests":[
          {
            "image":{
              "content":base64
            },
            "features":[
              {
                 "type":"LOGO_DETECTION",
                 maxResults:1,

              },
              {
                "type":"WEB_DETECTION",
                maxResults:1,
              }
            ]
          }
        ]
      })
    }).then((response)=>{
      console.log("SUCCESS");
      return response.json();

    }).catch((err)=>{
      console.log("You done goofed fam",err);
    })

  }
//CAMERA FUNCTIONALITY
  snap = async () => {
    if (this.camera) {
      this.camera.takePictureAsync({base64: true})
      .then(async ({ uri, base64 })=> {
        this.setState({ currentImg: uri });
        fetch('http://localhost:3000/newart',{
          method:"POST",
          credentials:"same-origin",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            uri:this.state.currentImg
          })
        }).then((response)=>{
          console.log("SUCCESSFULLY SAVED NEW ART")
        })

        this.checkforLogos(base64)
        .then((searchResult) => console.log(searchResult.responses))
        // .then(())
      });
    }
  };




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
          <Camera style={styles.main} type={this.state.type} ref={ref => {this.camera = ref;}}>
            <View style={styles.cameraViewContainer}>
              <View style={{ flexDirection:'row', borderWidth: 5, borderColor: 'green' }}>
                <Ripple><Image style={{ width: 50, height: 50, borderWidth: 5, borderColor: 'blue' }} source={require('../assets/guest.png')} /></Ripple>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 5, borderColor: 'red' }}>
                <Ripple><Image style={{ width: 50, height: 50 }} source={require('../assets/collections.png')} /></Ripple>
                <Ripple onPress={this.snap}>
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
