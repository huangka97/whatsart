import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import { Camera, Permissions, ImageManipulator } from 'expo';
import Ripple from 'react-native-material-ripple';
import config from "../config.json"

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
      showInformationScreen:false,
      webEntitiesArray:[]
    };
  }


  // Wait for User to Give Permissions
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  stringSplit=(string)=>{
    var newString=string.split(",")[0]
    return newString;
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
                  maxResults:3
                }
              ]
            }
          ]
        })
      }).then((response)=>{
        // console.log("SUCCESS");
        // console.log("THIS IS THE RESPONSE JSON: ", response.json())
        return response.json();

      }).catch((err)=>{
        console.log("You done goofed fam",err);
      })

    }



//CAMERA FUNCTIONALITY
  snap = async () => {
    if (this.camera) {
      this.camera.takePictureAsync()
      .then(async ({ uri  })=> {
        this.setState({ currentImg: uri });
        const imgResult = await ImageManipulator.manipulate(this.state.currentImg, [{ resize: { width: 480 } }], { compress: 0, base64: true })
        this.checkforLogos(imgResult.base64)
        // .then((searchResult)=>console.log(searchResult.responses[0].webDetection.webEntities))
        .then((searchResult) => this.setState({webEntitiesArray:searchResult.responses[0].webDetection.webEntities.map((obj) => obj.description)}),
          ()=>console.log("THIS IS THE WEB DETECTION:",this.state.webEntitiesArray))
        .catch((err)=>console.log("TOUGH FAM",err));
      });
    }
  };

  // To cancel the image and retake another picture
  handleCancel = () => {
    console.log('cancel')
    this.setState({ currentImg: null });
  }
  
  toggleInformation=()=>{
    console.log("TOGGLED");
    this.setState({showInformationScreen:!this.state.showInformationScreen});
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
        !this.state.currentImg && !this.state.showInformationScreen ?
        <View style={styles.main}>
          <StatusBar hidden />
          <Camera style={styles.main} type={this.state.type} ref={ref => {this.camera = ref;}}>
            <View style={styles.cameraViewContainer}>
              <View style={styles.topBarContainer}>
                <Ripple rippleColor="#FFFFFF" rippleContainerBorderRadius={15} onPress={()=>this.props.navigation.navigate('UserProfile')}>
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
      : !this.state.showInformationScreen? <CameraScreenPreview showInfo={this.toggleInformation} currentImg={this.state.currentImg} cancel={this.handleCancel}/>
      :<InformationScreen showInfo={this.toggleInformation} artNameArray={this.state.webEntitiesArray}/>
    )


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
