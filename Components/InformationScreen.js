import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, Platform, ScrollView, Dimensions } from 'react-native';
import { Video } from 'expo';
import { Entypo } from "@expo/vector-icons";
import Ripple from 'react-native-material-ripple';
import { material, iOSColors, systemWeights, materialColors } from 'react-native-typography';
import axios from 'axios';

class InformationScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      artist: "",
      imgURL: "",
      city: "",
      year: "",
      museum: "",
      medium: "",
      dimensions: "",
    }
  }

componentDidMount() {
    axios.post('https://enigmatic-garden-90693.herokuapp.com/artwork', {
      artworkName: this.props.artNameArray,
    })
    .then(({ data: { artworkInfo } }) => {
      console.log(123, 'here')
      const { title, artist, imgURL, city, year, museum, medium, summary, dimensions } = artworkInfo;
      this.setState({ title, artist, imgURL, city, year, museum, medium, summary, dimensions });
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });
  }

  rando = () => {
    console.log("ENTERED");
    setTimeout(this.props.showInfo, 500);
  }

  render() {
    const { height, width } = Dimensions.get('window');

    return (
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.backgroundImage} blurRadius={20} source={{width: width, height: height, uri: this.state.imgURL}}/>
        </View>
        <View style={styles.filterContainer}>
          <View style={styles.titleContainer}>
            <Ripple rippleColor="#FFFFFF" rippleContainerBorderRadius={25} rippleOpacity={0.5} onPress={this.rando}>
              <Entypo name="chevron-thin-left" size={30} color="white"/>
            </Ripple>
          </View>
          <View style={styles.innerImageContainer}>
            <Image style={styles.image} source={{uri: this.state.imgURL}}/>
          </View>
          <View style={styles.innerInformation}>
            <Text style={{color:iOSColors.white,fontSize:30,...systemWeights.light}}>
              {this.state.title}
            </Text>
            <Text style={{color:iOSColors.white, fontSize:18, ...systemWeights.bold,textDecorationLine: 'underline',textDecorationColor: 'white', textDecorationStyle: "solid"}}>
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
    backgroundColor: "black"
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
  backgroundImage: {
    position: "absolute",
  },
  innerImageContainer:{
    flex: 2.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  info:{
    color: iOSColors.white,
  },
  innerInformation:{
    flex:3,
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
    marginTop: 30
  },
  title: {
    fontSize: 60,
    fontFamily: Platform.OS === 'ios' ? 'Marker Felt' : 'sans-serif',
    color: 'white',
  },
});

export default InformationScreen;
