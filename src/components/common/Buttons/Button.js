import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

const Button = ({backgroundColor, buttonPress, color, title}) => {
    return (
        <TouchableOpacity onPress={buttonPress}>
            <View style={[styles.button, {backgroundColor: backgroundColor}]}>
                <Text style={{color: color}}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        //backgroundColor:'#F7FAFC',
        //borderRadius:4,
        //borderWidth:1,
        // borderColor:'#CBD5E0',
        alignItems: 'center',
        justifyContent: 'center',
        //padding:10,
        alignSelf: 'center',
        //padding:5,
        //width:91,
        //height:24,

    },
    buttonText: {
        //color: '#4A5568',
    },
})
