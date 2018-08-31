import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import { Camera, Permissions } from 'expo';
import Ripple from 'react-native-material-ripple';
//import config from "../config.json"

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
      showCollection:"cameraScreen"
    };
  }

  // Wait for User to Give Permissions
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

  onCollection(){
    this.setState({
      showCollection:"collectionScreen"
    })
  }

//CAMERA FUNCTIONALITY
  snap = async () => {
    if (this.camera) {
      this.camera.takePictureAsync({base64: true})
      .then(async ({ uri, base64 })=> {
        this.setState({ currentImg: uri });
        console.log("THIS IS URI FAM BAM:", uri);
        this.checkforLogos(base64)
        .then((searchResult) => console.log(searchResult.responses))
        .then((uri)=>fetch('http://10.2.103.5:3000/newart',{
          method:"POST",
          credentials:"same-origin",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            uri:this.state.currentImg
          })
        }))
        .catch((err)=>console.log("TOUGH FAM",err));
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
      return ( // Return the Normal Camera Display
        !this.state.currentImg ?
        <View style={styles.main}>
          <StatusBar hidden />
          <Camera style={styles.main} type={this.state.type} ref={ref => {this.camera = ref;}}>
            <View style={styles.cameraViewContainer}>
              <View style={styles.topBarContainer}>
                <Ripple rippleColor="#FFFFFF" rippleContainerBorderRadius={15}>
                  <Image style={styles.iconSize} source={require('../assets/guest.png')} />
                </Ripple>
              </View>
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
      : <CameraScreenPreview currentImg={this.state.currentImg} cancel={this.handleCancel}/>)


     // Preview the Static Image Taken

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
