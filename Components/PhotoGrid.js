import React from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import PhotoGrid from 'react-native-image-grid';

class BestGrid extends React.Component {

  constructor() {
    super();
    this.state = {
      artworks: [],
    };
  }

  componentDidMount() {
    const artworks = Array.apply(null, Array(this.props.collection.length)).map((v, i) => {
      return { id: i, src: this.props.collection[i].imgURL, info: this.props.collection[i] }
    });
    this.setState({ artworks });
  }

  renderItem = (item, itemSize, itemPaddingHorizontal) => {
    return (
      <TouchableOpacity
        key = { item.id }
        style = {{ width: itemSize, height: itemSize, paddingHorizontal: itemPaddingHorizontal }}
        onPress = {()=>this.props.openModal(item.info)}>
        <Image
          resizeMode = "cover"
          style = {{ flex: 1, borderWidth: 1 }}
          source = {{ uri: item.src }}
        />
      </TouchableOpacity>
    )
  }

  render() {
    return(
      <PhotoGrid
        data = { this.state.artworks }
        itemsPerRow = { 3 }
        itemMargin = { 1 }
        itemPaddingHorizontal= { 1 }
        renderItem = { this.renderItem }
      />
    );
  }
}

export default BestGrid;
