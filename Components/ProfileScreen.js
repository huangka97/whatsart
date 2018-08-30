import React from 'react';
import { TouchableOpacity,StyleSheet, Text, View, Image, StatusBar, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import Ripple from 'react-native-material-ripple';
import {material, iOSColors,systemWeights,materialColors} from 'react-native-typography';
class ProfileScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={

    }
  }
  static navigationOptions = {
    header: null
  };
  logOut = () => {
    fetch('http://10.2.103.54:3000/logout',{
      method:"GET",
      credentials: "same-origin",
      headers: {
        "Content-Type":"application/json"
      }
    })
    .then((resp)=>resp.json())
    .then((response)=>{('Response':response);
    if(response.success){
      this.props.navigation.navigate("Landing")
    }else{
      console.log("YOU FAILED TO LOG OUT")
    }
  }).catch((err)=>console.log("ERROR TO LOG OUT: ",err));

  }
  render() {
    return (
      <View style={styles.main}>

        <View style={styles.profileTextContainer}>
        <Image style={styles.image} source={require('../assets/karl.jpg')}/>
        <Text style={styles.profileTitle}>Karl Huang</Text>
        </View>
        <View style={styles.scoreBoardContainer}>
          <Text style={styles.accountTitle}>Account</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.underline}>
          <Text style={styles.infoText}>Score</Text>
          </View>
          <View style={styles.underline}>
          <Text style={styles.infoText}>Language</Text>
          </View>
          <View style={styles.underline}>
          <Text style={styles.infoText}>Location</Text>
          </View>
        </View>
        <View style={styles.logoutContainer}>
          <Ripple rippleColor="#FFFFFF" rippleContainerBorderRadius={25} rippleOpacity={0.5} onPress={()=>setTimeout(this.logOut, 500)}>
          <Button title='Log Out'/>
          </Ripple>
        </View>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  main:{
    flex:1,
    backgroundColor:"white"
  },

  image:{
    height:120,
    borderRadius:60,
    width: 120
  },
  infoText:{
    ...material.regularObject,

  },
  underline:{
    borderBottomWidth:1
  },
  profileTextContainer:{
    flex:2,
    flexDirection:'column',
    marginBottom:30,
    justifyContent:"space-around",
    alignItems:"center",
    marginTop:50,

  },
  scoreBoardContainer:{
    flex:0.8,
    backgroundColor:iOSColors.customGray,
    flexDirection:"column",
    justifyContent:'center'

  },
  accountTitle:{
    ...material.titleObject,
    color:materialColors.blackSecondary,
    marginLeft:20
  },
  infoContainer:{
    flex:4,
    flexDirection:"column",
    justifyContent:"space-evenly",
    marginLeft:20,
    marginBottom:30,
    marginRight:20
  },
  logoutContainer:{
    flex:2
  },
  profileTitle:{
    ...material.titleObject,
    color:iOSColors.black,
  }

})
export default ProfileScreen;
