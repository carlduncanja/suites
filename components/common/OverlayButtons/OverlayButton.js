import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class Button extends Component {
    render() {
        return (
            <TouchableOpacity 
                style={[styles.button,{backgroundColor:this.props.backgroundColor}]} 
                onPress={this.props.buttonPress}
            >
                <Text style={{color:this.props.color, fontSize:14}}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles=StyleSheet.create({
    button:{
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        padding:5,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,    
        elevation: 5,
    },

})