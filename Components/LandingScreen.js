import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

class LandingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>WhatsArt</Text>
        <Image
          source={require('../assets/landingBG.jpg')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LandingScreen;
