import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native';
import {material, iOSColors, systemWeights} from 'react-native-typography';
import {Avatar, Button} from 'react-native-elements';
import {MapView} from 'expo';
import {Marker} from 'react-native-maps';

import BestGrid from './PhotoGrid.js';

const profileIcons = {
  Karl: require("../assets/karl.jpg"),
  Kevin: require("../assets/kevin.jpeg"),
  Kitan: require("../assets/kitan.jpg"),
  default: require("../assets/defaultProfile.png")
}

class CollectionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "myCollection",
      score: 5,
      favoriteHeader:"FAVORITES",
      collectionHeader:"COLLECTION",
      numFavorites: 2,
      newUser:true,
      user: "",
      lat: 0,
      long: 0,
      markers: []
    }
  }
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((success) => {
      this.setState({lat: success.coords.latitude, long: success.coords.longitude})
    })
    //fetch latitude and longitude of museums name to display on map
    fetch('https://enigmatic-garden-90693.herokuapp.com/museums', {
      method: 'GET',
      credentials: 'same-origin'
    }).then(response => response.json()).then((responseJson) => {
      if (responseJson.success) {
        this.setState({markers: responseJson.markers});
        console.log("THIS IS AMERICA: ",this.state.markers);
      } else {
        console.log("FAILURE!");
      }
    })

    fetch('https://enigmatic-garden-90693.herokuapp.com/user', {
      method: 'GET',
      credentials: 'same-origin'
    }).then(response => {
      // console.log("RESPONSE: ", response);
      return response.json()
    }).then(responseJson => {
      if (responseJson.success) {
        this.setState({user: responseJson.user.firstName});
        this.setState({score: responseJson.user.userCollection.length});
        console.log("GOT USER", this.state.user);
      } else {
        this.setState({user: "default"});
        console.log("CAN'T GET PROFILE PIC");
      }
    })
  }

  toggleCollection() {
    this.setState({mode: "myCollection"})
  }

  toggleScan() {
    this.setState({mode: "myFavorites"})
  }

  toggleMap() {
    this.setState({mode: "myMap"})
  }
  // togglePhotoGrind(){
  //   this.setState({subMode:"myPhotogrid"})
  // }

  handleCamera = () => {
    this.props.navigation.navigate("Camera");
  }

  getModeRender = (mode) => {
    switch (mode) {
      case 'myCollection':
        return (
          this.state.score == ""? //should test for 0 after componentDidMount
          <View style={styles.createCollectionContainer}>
            <Image style={styles.iconSize} source={require('../assets/addtocollection.png')}/>
            <Text style={styles.textSize}>Create Your Collection</Text>
            <Text>Tap the add icon when you like a piece of art to
            </Text>
            <Text>save it to your collection</Text>
            <Text>Score: {this.state.score}</Text>
          </View>

          :

          /*render all photos in a grid pattern*/
          <View style={styles.gridContainer}>
            <BestGrid score={this.state.score} header={this.state.collectionHeader}/>
          </View>

        );
			case 'myFavorites':
          return (
            this.state.numFavorites == "" ?//should test for 0 after componentDidMount
            <View style={styles.createScanContainer}>
              <Image style={styles.iconSize} source={require('../assets/heart.png')}/>
              <Text style={styles.textSize}>View Your Favorites!</Text>
              <Text>Once you favorite photos from your collection,</Text>
              <Text>you'll find them here</Text>
            </View>

          :

          /*render all photos in a grid pattern*/
          <View style={styles.gridContainer}>
            <BestGrid score = {this.state.numFavorites} header={this.state.favoriteHeader} artworkArray={this.state.markers}/>
          </View>

          /* render all photos in a grid pattern */
          )
      case 'myMap':
        let markers = this.state.markers;
        return (<MapView style={{
            flex: 4
          }} initialRegion={{
            latitude: this.state.lat,
            longitude: this.state.long,
            latitudeDelta: 40,
            longitudeDelta: 20
          }}>
          {
            markers.map((marker, index) => (<Marker coordinate={{
                latitude: parseFloat(marker.lat),
                longitude: parseFloat(marker.lng)
              }} key={index} description={this.state.museum} title={marker.museum + ', ' + marker.city}></Marker>))
          }
          <Marker coordinate={{
              latitude: this.state.lat,
              longitude: this.state.long
            }} title="Current location" key="user"></Marker>
        </MapView>);
      default:
        return null;
    }
  }

  render() {
    return (<View style={styles.mainContainer}>

      <View style={styles.userContainer}>
        <View style={styles.backgroundContainer}>
          <Image style={styles.background} source={require('../assets/landingBG.jpg')}/>
        </View>
        <Image style={styles.image} source={!this.state.user
            ? null
            : profileIcons[this.state.user]
              ? profileIcons[this.state.user]
              : profileIcons["default"]}/>
        <Text style={styles.userTitle}>{this.state.user}</Text>
          <Button
            onPress={this.handleCamera}
            justifyContent="start"
            containerViewStyle={{ marginLeft: 80 }}
            borderRadius={30}
            title='Return to Camera'
            backgroundColor='#4DB6AC'
          />
      </View>

      <View style={styles.scanandcollectionContainer}>
        <TouchableOpacity onPress={this.toggleCollection.bind(this)}>
          <Text style={styles.collectionContainer}>My Collection
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.toggleScan.bind(this)}>
          <Text style={styles.scansContainer}>My Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.toggleMap.bind(this)}>
          <Text style={styles.mapsContainer}>My Map</Text>
        </TouchableOpacity>
      </View>
      {this.getModeRender(this.state.mode)}
    </View>);
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  gridContainer:{
    justifyContent:"space-around",
    backgroundColor:iOSColors.grey,
    flex:4,
    alignItems: "center",
  },
  scanandcollectionContainer:{
    justifyContent:"space-around",
    backgroundColor:iOSColors.grey,
    flex:1,
    flexDirection: "row",
    marginTop: 10
  },
  textSize: {
    ...material.titleObject,
    marginTop: 10,
    marginBottom: 10
  },
  createCollectionContainer: {
    flex: 4,
    alignItems: "center"
  },
  createGridCollectionContainer: {
    flex: 4
  },
  createScanContainer: {
    flex: 4,
    alignItems: "center"
  },
  iconSize: {
    height: 100,
    width: 100
  },
  image: {
    height: 80,
    borderRadius: 40,
    width: 80,
    marginLeft: 10
  },
  collectionContainer: {
    ...material.titleObject
  },
  scansContainer: {
    ...material.titleObject
  },
  mapsContainer: {
    ...material.titleObject
  },
  randoContainer: {
    flex: 0.5,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center"
  },
  userContainer: {
    flex: 1,
    backgroundColor: "grey",
    flexDirection: "row",
    alignItems: 'center'
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  background: {
    resizeMode: 'cover'
  },
  userTitle: {
    ...material.titleObject,
    ...systemWeights.light,
    color: iOSColors.white,
    marginLeft: 10,
    justifyContent: 'center'
  }
});

export default CollectionScreen;
