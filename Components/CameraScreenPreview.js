import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, StatusBar } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Button } from 'react-native-elements';

class CameraScreenPreview extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { width, height } = Dimensions.get('window');
    return (
      <View style={styles.main}>
        <StatusBar hidden />
        <Image style={styles.previewImage} source={{ width: width, height: height, uri: this.props.currentImg }} />
        <View style={styles.cancelButtonContainer}>
          <Ripple rippleColor="#FFFFFF" rippleContainerBorderRadius={25} rippleOpacity={0.5} onPress={()=>setTimeout(this.props.cancel, 500)}>
            <Image style={styles.cancelButton} source={require('../assets/cancel.png')} />
          </Ripple>
        </View>
        <View style={styles.findButtonContainer}>
          <Ripple>
            <Button
              title='Find Artwork'
              backgroundColor="#008B7D"
              iconRight={{ name: 'search' }}
              raised
            />
          </Ripple>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'space-between',
  },
  previewImage: {
    position: 'absolute',
  },
  cancelButtonContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingTop: 20
  },
  cancelButton: {
    height: 50,
    width: 50,
  },
  findButtonContainer: {
    marginBottom: 40,
  }
});


export default CameraScreenPreview;
