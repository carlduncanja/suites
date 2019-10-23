import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class Button extends Component {
    render() {
        return (
            <TouchableOpacity 
                style={styles.button} 
                onPress={this.props.searchPress}
            >
                <Text style={styles.buttonText}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles=StyleSheet.create({
    button:{
        backgroundColor:'#E2E8F0',
        borderRadius:4,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
    },
    buttonText:{
        color: '#104587',
    },
})
