import React from 'react';
import PhotoGrid from 'react-native-image-grid';

import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';

class BestGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    // Build an array of 60 photos
    let items = Array.apply(null, Array(this.props.score)).map((v, i) => {
      return { id: i, src: 'http://placehold.it/200x200?text='+(i+1) }
    });
    this.setState({ items });
  }

  render() {
    return(
      <PhotoGrid
        data = { this.state.items }
        itemsPerRow = { 3 }
        itemMargin = { 1 }
        itemPaddingHorizontal={1}
        renderHeader = { this.renderHeader }
        renderItem = { this.renderItem }
      />
    );
  }

  renderItem(item, itemSize, itemPaddingHorizontal) {
    return(
      <TouchableOpacity
        key = { item.id }
        style = {{ width: itemSize, height: itemSize, paddingHorizontal: itemPaddingHorizontal }}
        onPress = { () => {
          // Do Something
        }}>
        <Image
          resizeMode = "cover"
          style = {{ flex: 1 }}
          source = {{ uri: item.src }}
        />
      </TouchableOpacity>
    )
  }

}

export default BestGrid;
