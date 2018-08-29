import React from 'react';
import { TouchableOpacity,StyleSheet, Text, View, Image, StatusBar, Platform } from 'react-native';

import {material, iOSColors,systemWeights} from 'react-native-typography';
class CollectionScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      mode:"myScans",
      showCollection:false,
      newUser:true
    }
  }
  static navigationOptions = {
    header: null
  };
  toggleCollection(){
    this.setState({
      mode:"myCollection"
    })
  }
  toggleScan(){
    this.setState({
      mode:"myScans"
    })
  }
  render() {
    return (
      <View style={styles.main}>
      <View style={styles.randoContainer}>

      </View>
      <View style={styles.userContainer}>
        <Image style={styles.image} source={require('../assets/karl.jpg')}/>
        <Text style={styles.userTitle}>Karl</Text>
      </View>

      <View style={styles.scanandcollectionContainer}>
        <TouchableOpacity onPress={this.toggleCollection.bind(this)}>
        <Text style={styles.collectionContainer}>My Collection </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.toggleScan.bind(this)}>
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

  main:{
    flex:1
  },
  userContainer:{
    flex:1,
    backgroundColor:"grey",
    flexDirection:"row",
    alignItems:'center'
    // justifyContent:"space-around"
  },
  userTitle:{
    ...material.titleObject,
    ...systemWeights.light,
    color:iOSColors.white,
    marginLeft:10,
    justifyContent:'center',
  }
})
export default CollectionScreen;
