import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FrameImageItem from '../FrameItems/FrameImageItem';

export default class FrameContentImage extends Component {
  render() {
    return (
      <View>
            {this.props.cardInformation.map((image,index)=>
                <View key={index}>
                    <FrameImageItem image={image}/>
                </View>
            )}
      </View>
    );
  }
}
