import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

export default class Divider extends Component {
    render() {
        return (
            <TouchableOpacity 
                style={[styles.divider,{backgroundColor:this.props.backgroundColor}]}
                onLongPress = {this.props.longPressAction}
                onPress = {this.props.pressAction}
            />
        )
    }
}

const styles = StyleSheet.create({
    divider:{
        //backgroundColor:'#CBD5E0',
        borderRadius:8,
        width: 70,
        height: 6,
    }
})