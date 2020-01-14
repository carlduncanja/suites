import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

export default class Divider extends Component {
    render() {
        return (
            <TouchableOpacity 
                style={{paddingBottom:12, paddingTop:12}}
                onLongPress = {this.props.longPressAction}
                onPress = {this.props.pressAction}
                >
                <View style={[styles.divider,{backgroundColor:this.props.backgroundColor}]}/>
            </TouchableOpacity>
            
        )
    }
}

const styles = StyleSheet.create({
    divider:{
        borderRadius:8,
        width: 70,
        height: 6,
    }
})