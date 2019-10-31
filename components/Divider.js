import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

export default class Divider extends Component {
    render() {
        return (
            <TouchableOpacity 
                style={styles.divider}
                onLongPress = {this.props.dividerAction}/>
        )
    }
}

const styles = StyleSheet.create({
    divider:{
        backgroundColor:'#A0AEC0',
        borderRadius:8,
        width: 70,
        height: 6,
    }
})