import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class Button extends Component {
    render() {
        return (
            <TouchableOpacity 
                style={styles.button} 
                onPress={this.props.buttonPress}
            >
                <Text style={styles.buttonText}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles=StyleSheet.create({
    button:{
        backgroundColor:'#F7FAFC',
        borderRadius:4,
        borderWidth:1,
        borderColor:'#CBD5E0',
        alignItems:'center',
        justifyContent:'center',
        //padding:10,
        width:91,
        height:24,

    },
    buttonText:{
        color: '#4A5568',
    },
})
