import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import { material, iOSColors, systemWeights } from 'react-native-typography';
import { Avatar, Button, ButtonGroup } from 'react-native-elements';
import { MapView } from 'expo';
import { Marker } from 'react-native-maps';
import axios from 'axios';

import BestGrid from './PhotoGrid.js';
import InformationModalScreen from './InformationModalScreen.js';

const profileIcons = {
  Karl: require("../assets/karl.jpg"),
  Kevin: require("../assets/kevin.jpeg"),
  Kitan: require("../assets/kitan.jpg"),
  default: require("../assets/defaultProfile.png"),
};

class CollectionScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      mode: "collection",
      user: "",
      userLat: 0,
      userLong: 0,
      markers: [],
      modeIndex: 0,
      informationModalOpen: false,
      currentArtwork: {},
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(success =>
      this.setState({ userLat: success.coords.latitude, userLong: success.coords.longitude }));
    axios.get('https://enigmatic-garden-90693.herokuapp.com/UserWithCollection')
    .then(({ data: { success, user } }) => {
      if (success) {
        this.setState({ user });
      }
    })
    .catch(err => console.log('Error getting User and Collection Information'))
  }

  changeMode = (modeIndex) => {
    if(modeIndex === 0) {
      this.setState({ modeIndex,  mode: 'collection' });
    } else {
      this.setState({ modeIndex, mode: 'map'});
    }
  }

  // Close Information Modal for Artwork
  closeModal = (currentArtwork) => {
    this.setState({ currentArtwork: {}, informationModalOpen: false });
  }

  // Open Information Modal for Artwork
  openModal = (currentArtwork) => {
    this.setState({ currentArtwork, informationModalOpen: true });
  }

  getModeRender = (mode) => {
    switch (mode) {
      case 'collection':
        if (!this.state.user) {
          return null;
        } else if (this.state.user.userCollection.length === 0) {
          return (
            <View style={styles.createCollectionContainer}>
              <Image style={styles.iconSize} source={require('../assets/addtocollection.png')}/>
              <Text style={styles.textSize}>Create Your Collection</Text>
              <Text style={{ alignSelf: 'center' }}>Tap the add icon when you like a piece of art to save it to your collection.</Text>
            </View>
          );
        } else {
          return (
            <View style={styles.gridContainer}>
              <BestGrid collection={this.state.user.userCollection} openModal={this.openModal}/>
            </View>
          );
        }
      case 'map':
        const markers = !this.state.user ? [] : this.state.user.userCollection;
        return (
          <MapView style={{ flex: 1 }}
            initialRegion={{ latitude: this.state.userLat, longitude: this.state.userLong, latitudeDelta: 40, longitudeDelta: 20}}
          >
            {markers.map((marker, index) =>
              (<Marker coordinate={{ latitude: parseFloat(marker.lat), longitude: parseFloat(marker.lng) }}
                key={index} title={marker.title} description={marker.museum + ', ' + marker.city} />
            ))}
            <Marker coordinate={{ latitude: this.state.userLat, longitude: this.state.userLong }} title="Current Location" key="user" pinColor="blue" />
          </MapView>
        );
      default:
        return null;
    }
  }

  render() {
    let profileImgSrc;
    if (!this.state.user.firstName) {
      profileImgSrc = null;
    } else {
      if (Object.keys(profileIcons).includes(this.state.user.firstName)) {
        profileImgSrc = profileIcons[this.state.user.firstName];
      } else {
        profileImgSrc = profileIcons["default"];
      }
    }

    return (
      <View style={styles.mainContainer}>
        <View style={styles.backgroundContainer}>
          <Image style={styles.background} source={require('../assets/landingBG.jpg')}/>
        </View>
        <View style={styles.userContainer}>
          <View styles={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
            <Image style={styles.image} source={profileImgSrc} />
            <Text style={styles.userTitle}>{this.state.user.firstName}</Text>
          </View>
          <Button
            onPress={()=>this.props.navigation.navigate("Camera", { previous: 'Collection' })}
            borderRadius={30} title='Return to Camera' backgroundColor='#4DB6AC' containerStyle={{ flex: 1 }}
          />
        </View>
        <View style={{ flex: 6, backgroundColor: 'white' }}>
          <View style={{ flex: 1 }}>
            <ButtonGroup
              onPress={this.changeMode}
              selectedIndex={this.state.modeIndex}
              buttons={['Collection', 'Map']}
              containerStyle={{ flex: 1 }}
              buttonStyle={{ backgroundColor: 'white' }}
              selectedButtonStyle={{ backgroundColor: '#bdbdbd' }}
            />
          </View>
          <View style={{ flex: 9 }}>
            {this.getModeRender(this.state.mode)}
          </View>
        </View>
        <InformationModalScreen isOpen={this.state.informationModalOpen} onClose={this.closeModal} {...this.state.currentArtwork} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
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
  userContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 20,
  },
  userTitle: {
    ...material.titleObject,
    ...systemWeights.light,
    color: iOSColors.white,
    alignSelf: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  createCollectionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginBottom: 40,
  },
  iconSize: {
    height: 100,
    width: 100
  },
  textSize: {
    ...material.titleObject,
    marginTop: 10,
    marginBottom: 10
  },
  gridContainer:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  randoContainer: {
    flex: 0.5,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center"
  },
});

export default CollectionScreen;
