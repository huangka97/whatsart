import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, Platform, ScrollView, Dimensions } from 'react-native';
import { SocialIcon, Divider, Button } from 'react-native-elements';
import { Video } from 'expo';
import { Ionicons, Entypo } from "@expo/vector-icons";
import Ripple from 'react-native-material-ripple';
import { material, iOSColors,systemWeights,materialColors } from 'react-native-typography';



class InformationScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      name:"",
      artist:"",
      imageUrl:"",
      city:"",
      year:"",
      museum:"",
      medium:"",
      dimensions:"",
      dateViewed:"",
      screenHeight:0,
    }
  }
componentDidMount(){
    console.log("KEVIN NGUYENNN: ", this.props.artNameArray)

    fetch('https://enigmatic-garden-90693.herokuapp.com/artwork', {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        artworkName:this.props.artNameArray
      })
    })
    .then((resp) => resp.json())
    .then((response) => {
      console.log(response)
      if (response.success) {

        this.setState({
          name:response.artworkInfo.title,
          artist:response.artworkInfo.artist,
          imageUrl:response.artworkInfo.imgURL,
          city:response.artworkInfo.city,
          year:response.artworkInfo.year,
          museum:response.artworkInfo.museum,
          medium:response.artworkInfo.medium,
          summary:response.artworkInfo.summary,
          dimensions:response.artworkInfo.dimensions,
          dateViewed:response.artworkInfo.dateViewed,

        })
      }
      else {
        console.log('implement later');
      }
    })
    .catch((err)=>console.log("ERROR:", err));
  }

  rando=()=>{
    console.log("ENTERED")
    this.setState({
      name:"",
      artist:"",
      imageUrl:"",
      city:"",
      year:"",
      museum:"",
      medium:"",
      dimensions:"",
      dateViewed:"",
      screenHeight:0,
    })
    setTimeout(this.props.showInfo,500);
  }



  render() {
    const height =Dimensions.get('window').height;
    const width =Dimensions.get('window').width;



    return (

      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.backgroundImage} blurRadius={20} source={{width: width, height: height, uri: this.state.imageUrl}}/>
        </View>
        <View style={styles.filterContainer}>
          <View style={styles.titleContainer}>
          <Ripple rippleColor="#FFFFFF" rippleContainerBorderRadius={25} rippleOpacity={0.5} onPress={this.rando}>
          <Entypo name="chevron-thin-left" size={30} color="white"/>
          </Ripple>
          </View>
          <View style={styles.innerImageContainer}>
            <Image style={styles.image} source={{uri: this.state.imageUrl}}/>
          </View>
          <View style={styles.innerInformation}>
            <Text style={{color:iOSColors.white,fontSize:30,...systemWeights.light}}>
              {this.state.name}
            </Text>
            <Text style={{color:iOSColors.white, fontSize:18, ...systemWeights.bold,textDecorationLine: 'underline',textDecorationColor: 'white',textDecorationStyle: "solid"}}>
              {this.state.artist}
            </Text>
            <Text style={{color:iOSColors.white,fontSize:15,...systemWeights.semibold}}>
              {this.state.city} | {this.state.year} | {this.state.museum} | {this.state.medium} | {this.state.dimensions}
            </Text>
            <View>
            <ScrollView>
            <Text style={{color:iOSColors.white,fontSize:15,...systemWeights.light}}>
            {this.state.summary}
            </Text>
          </ScrollView>

            </View>
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
    width: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
  },
  backgroundImage:{
    position:"absolute",
  },
  innerImageContainer:{
    flex:2.2,
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
    marginLeft:30,
    marginRight:30
  },
  filterContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  summaryContainer:{
    flex:1
  },
  titleContainer: {
    flex: 0.3,
    flexDirection:'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop:30
  },
  title: {
    fontSize: 60,
    fontFamily: Platform.OS === 'ios' ? 'Marker Felt' : 'sans-serif',
    color: 'white',
  },
});

export default InformationScreen;
