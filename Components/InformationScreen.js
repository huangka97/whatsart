import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, Platform,ScrollView, Dimensions } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { SocialIcon, Divider, Button } from 'react-native-elements';
import { Video } from 'expo';
import {material, iOSColors,systemWeights,materialColors} from 'react-native-typography';



class InformationScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      name:"",
      artist:"",
      imageUrl:""
    }
  }


  componentDidMount(){
    fetch('http://10.2.103.54:3000/artwork', {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        artworkName:"Mona Lisa"
      })
    })
    .then((resp) => resp.json())
    .then((response) => {
      if (response.success) {

        this.setState({
          name:response.artworkInfo.title,
          artist:response.artworkInfo.artist,
          imageUrl:response.artworkInfo.imgURL
        })
      }
      else {
        console.log('implement later');
      }
    })
    .catch((err)=>console.log("ERROR:", err));
  }

  render() {
    const { width, height } = Dimensions.get('window');
    return (
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.backgroundImage} blurRadius={20} source={{width: width, height: height, uri: this.state.imageUrl}}/>
        </View>
        <View style={styles.filterContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Information Screen</Text>
          </View>
          <View style={styles.innerImageContainer}>
            <Image style={styles.image} source={{uri: this.state.imageUrl}}/>
          </View>
          <View style={styles.innerInformation}>
            <Text style={{color:iOSColors.white,fontSize:30,...systemWeights.light}}>
              {this.state.name}
            </Text>
            <Text style={{color:iOSColors.white,fontSize:30,...systemWeights.light}}>
              {this.state.artist}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:"black"
  },
  image: {
    flex: 1,
    width: 140,
    height: 140,
    resizeMode: 'contain',

    opacity:1,
  },

  imageContainer: {
    alignItems: "center",
  },
  backgroundImage:{
    position:"absolute",

  },
  innerImageContainer:{
    flex:2,
    justifyContent:'center',
    alignItems:'center'

  },
  info:{
    color:iOSColors.white
  },
  innerInformation:{
    flex:3,
    // alignItems:'center',
    justifyContent:'flex-start',
    marginLeft:30
  },
  filterContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  titleContainer: {
    flex: 0.5,
    flexDirection:'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 60,
    fontFamily: Platform.OS === 'ios' ? 'Marker Felt' : 'sans-serif',
    color: 'white',
  },
});

export default InformationScreen;
