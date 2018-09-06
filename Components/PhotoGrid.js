import React from 'react';
import PhotoGrid from 'react-native-image-grid';
import axios from 'axios';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';

class BestGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      artworkSource:[]
    }
  }
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    // Build an array of 60 photos
    this.setState({
      artworkSource:this.props.artworkArray
    })
    console.log("HELLO: ",this.state.artworkSource)
    if(this.state.artworkSource.length > 0){
    let items = Array.apply(null, Array(this.props.score)).map((v, i) => {
      return { id: i, src: this.state.artworkSource[i].imgURL }
    });
    this.setState({ items });
    }

  }

  render() {
    return(
      <View><Text>{this.props.header}</Text>

      <PhotoGrid
        data = { this.state.items }
        itemsPerRow = { 3 }
        itemMargin = { 1 }
        itemPaddingHorizontal={1}
        renderHeader = { this.renderHeader }
        renderItem = { this.renderItem }
      />
      </View>
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
