import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FrameImageItem from '../FrameItems/FrameImageItem';

export default class FrameContentImage extends Component {
  render() {
    return (
      <View style={styles.container}>
            {this.props.cardInformation.map((image,index)=>
                <View key={index}>
                    <FrameImageItem image={image}/>
                </View>
            )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    borderWidth:1,
    borderColor:'#CCD6E0',
    borderTopWidth:0,
    borderBottomWidth:0,
    borderBottomLeftRadius:8,
    borderBottomRightRadius:8
  }
})