import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, ScrollView, Platform, Dimensions } from 'react-native';
import { material, iOSColors, systemWeights, materialColors } from 'react-native-typography';
import Modal from 'react-native-modalbox';
import Ripple from 'react-native-material-ripple';
import { Entypo } from "@expo/vector-icons";

class InformationModalScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  closeInformationModal = () => {
    this.modal.close();
  }

  render() {
    const { height, width } = Dimensions.get('window');

    return (
      <Modal ref={ref => this.modal = ref} isOpen={this.props.isOpen} swipeArea={50}
        animationDuration={400} style={styles.mainContainer} onClosed={this.props.onClose}>
        <View style={styles.imageContainer}>
          <Image style={styles.backgroundImage} blurRadius={20} source={{width: width, height: height, uri: this.props.imgURL}}/>
        </View>
        <View style={styles.filterContainer}>
          <View style={styles.titleContainer}>
            <Ripple rippleColor="#FFFFFF" rippleContainerBorderRadius={25} rippleOpacity={0.5} onPress={this.closeInformationModal}>
              <Entypo name="chevron-thin-left" size={30} color="white"/>
            </Ripple>
          </View>
          <View style={styles.innerImageContainer}>
            <Image style={styles.image} source={{uri: this.props.imgURL}}/>
          </View>
          <View style={styles.innerInformation}>
            <Text style={{color:iOSColors.white,fontSize:30,...systemWeights.light}}>
              {this.props.title}
            </Text>
            <Text style={{color:iOSColors.white, fontSize:18, ...systemWeights.bold,textDecorationLine: 'underline',textDecorationColor: 'white', textDecorationStyle: "solid"}}>
              {this.props.artist}
            </Text>
            <Text style={{color:iOSColors.white,fontSize:15,...systemWeights.semibold}}>
              {this.props.city} | {this.props.year} | {this.props.museum} | {this.props.medium} | {this.props.dimensions}
            </Text>
            <View>
              <ScrollView>
                <Text style={{color:iOSColors.white,fontSize:15,...systemWeights.light}}>
                {this.props.summary}
                </Text>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  summaryContainer:{
    flex: 1,
  },
  titleContainer: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    fontSize: 60,
    fontFamily: Platform.OS === 'ios' ? 'Marker Felt' : 'sans-serif',
    color: 'white',
  },
});

export default InformationModalScreen;
