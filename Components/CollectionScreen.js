import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import { material, iOSColors, systemWeights } from 'react-native-typography';
import { Avatar } from 'react-native-elements';

class CollectionScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props);
    this.state = {
      mode: "myScans",
    }
  }

  toggleCollectionView = () => {
    this.setState({ mode: "myCollection" });
  }

  toggleScanView = () => {
    this.setState({ mode: "myScans" });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.randoContainer}></View>
        <View style={styles.userContainer}>
          <Avatar
            large
            rounded
            source={require('../assets/karl.jpg')}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
          <Text style={styles.userTitle}>Karl</Text>
        </View>

        <View style={styles.scanandcollectionContainer}>
          <TouchableOpacity onPress={this.toggleCollectionView}>
          <Text style={styles.collectionContainer}>My Collection </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.toggleScanView}>
          <Text style={styles.scansContainer}>My Scans</Text>
          </TouchableOpacity>
        </View>
        {this.state.mode =="myCollection"?
          <View style={styles.createCollectionContainer}>
            <Image style={styles.iconSize} source={require('../assets/addtocollection.png')} />
            <Text style={styles.textSize}>Create Your Collection</Text>
            <Text>Tap the add icon when you like a piece of art to </Text>
            <Text>save it to your collection</Text>
          </View>
        :
          <View style={styles.createScanContainer}>
            <Image style={styles.iconSize} source={require('../assets/photo_camera.png')}/>
            <Text style={styles.textSize}>Start Snapping!</Text>
            <Text>Once you get started you'll find all of your</Text>
            <Text>previous photos here.</Text>
          </View>
        }
      </View>
    )
  }
}

const styles=StyleSheet.create({
  mainContainer: {
    flex:1
  },
  scanandcollectionContainer:{
    justifyContent:"space-around",
    backgroundColor:iOSColors.grey,
    flex:1,
    flexDirection: "row",
    marginTop:10
  },
  textSize:{
    ...material.titleObject,
    marginTop:10,
    marginBottom:10
  },
  createCollectionContainer:{
    flex:4,
    alignItems:"center"
  },
  createScanContainer:{
    flex:4,
    alignItems:"center"
  },
  iconSize: {
    height: 100,
    width: 100,
  },
  image:{
    height:80,
    borderRadius:40,
    width: 80,
    marginLeft: 10
  },
  collectionContainer:{
    ...material.titleObject
  },
  scansContainer:{
    ...material.titleObject
  },
  randoContainer:{
    flex:0.5,
    backgroundColor:"grey",
    alignItems:"center",
    justifyContent:"center"
  },
  userContainer:{
    flex:1,
    backgroundColor:"grey",
    flexDirection:"row",
    alignItems:'center'
  },
  userTitle:{
    ...material.titleObject,
    ...systemWeights.light,
    color:iOSColors.white,
    marginLeft:10,
    justifyContent:'center',
  }
});

export default CollectionScreen;
