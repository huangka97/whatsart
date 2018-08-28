import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, StatusBar } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Button } from 'react-native-elements'

class CameraScreenPreview extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { width, height } = Dimensions.get('window');
    return (
      <View style={styles.main}>
        <StatusBar hidden />
        <Image style={{ position: 'absolute' }} source={{ width: width, height: height, uri: this.props.currentImg }} />
        <View style={{ flexDirection: 'row', paddingLeft: 15, paddingTop: 15 }}>
          <Ripple rippleColor="#FFFFFF" rippleContainerBorderRadius={25} rippleOpacity={0.5} onPress={()=>setTimeout(this.props.cancel, 500)}>
            <Image style={{ height: 50, width: 50 }} source={require('../assets/cancel.png')} />
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
  findButtonContainer: {
    marginBottom: 30
  }
});


export default CameraScreenPreview;
