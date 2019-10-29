import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

export default class Divider extends Component {
    render() {
        return (
            <View style={styles.divider}/>
        )
    }
}

const styles = StyleSheet.create({
    divider:{
        backgroundColor:'#A0AEC0',
        borderRadius:8,
        width: 55,
        height: 6,
    }
})