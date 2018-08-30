import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {
  Kaede,
  Hoshi,
  Jiro,
  Isao,
  Madoka,
  Akira,
  Hideo,
  Kohana,
  Makiko,
  Sae,
  Fumi,
} from 'react-native-textinput-effects';

export default class TextInputEffectsExample extends Component {
  render() {
    return (
      <View
        style={styles.container}
      >
        <View style={{ flex: 1, padding: 16, backgroundColor: '#a9ceca' }}>
          <Text style={styles.title}>Login</Text>
          <Fumi
            style={styles.input}
            label={'Username'}
            labelStyle={{ color: '#a3a3a3' }}
            inputStyle={{ color: 'black' }}
            iconClass={FontAwesomeIcon}
            iconName={'user'}
            iconColor={'#1976D2'}
            iconSize={20}
          />
          <Fumi
            style={styles.input}
            label={'Password'}
            labelStyle={{ color: '#a3a3a3' }}
            inputStyle={{ color: 'black' }}
            iconClass={FontAwesomeIcon}
            iconName={'lock'}
            iconColor={'#1976D2'}
            iconSize={20}
          />
        </View>
        <Image
          source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/400px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg'}}
          style={{ width: 500, height: 500 }}
        >

        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    height: 60,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#a3a3a3',
    borderRadius: 30,
  },
  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8,
  },
});
