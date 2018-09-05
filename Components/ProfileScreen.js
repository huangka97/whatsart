import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, StatusBar, Platform } from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import Ripple from 'react-native-material-ripple';
import { material, iOSColors, systemWeights, materialColors } from 'react-native-typography';

const profileIcons = {
  Karl: require("../assets/karl.jpg"),
  Kevin: require("../assets/kevin.jpeg"),
  Kitan: require("../assets/kitan.jpg"),
  default: require("../assets/defaultProfile.png")
}

class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props);
    this.state={
      user: '',
      name: '',
      score: '',
      newEmail: '',
      newEmailRepeat: '',
      newPassword: '',
      newPasswordRepeat: '',
    }
  }

  componentDidMount() {
    fetch('https://enigmatic-garden-90693.herokuapp.com/user', {
      method: 'GET',
      credentials: 'same-origin'
    })
    .then(response => {console.log("RESPONSE: ", response); return response.json()})
    .then(responseJson => {
      if (responseJson.success)
      {
        this.setState({user: responseJson.user.firstName});
        console.log("GOT USER", this.state.user);
      }
      else
      {
        this.setState({user: "default"});
        console.log("CAN'T GET PROFILE PIC");
      }
    })
  }


  logout = () => {
    fetch('https://enigmatic-garden-90693.herokuapp.com/logout', {
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
        <View style={styles.backgroundContainer}>
          <Image style={styles.background} source={require('../assets/landingBG.jpg')} />
        </View>

        <View style={styles.profileTextContainer}>
          <Image style={styles.image} source={!this.state.user ? null : profileIcons[this.state.user] ? profileIcons[this.state.user] : profileIcons["default"]}/>
          <Text style={styles.userTitle}>{this.state.user}</Text>
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
          <Ripple rippleColor="#FFFFFF" rippleContainerBorderRadius={25} rippleOpacity={0.5} onPress={()=>setTimeout(this.logout, 500)}>
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
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  background: {
    resizeMode: 'cover'
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
