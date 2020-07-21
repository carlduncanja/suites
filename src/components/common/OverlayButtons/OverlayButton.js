import React, {Component, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {SuitesContext} from '../../../contexts/SuitesContext';
import {appActions} from '../../../redux/reducers/suitesAppReducer';

const Button = ({onPress, color, title, backgroundColor}) => {
 
    return (
        <TouchableOpacity
            style={[styles.button, {backgroundColor: backgroundColor}]}
            onPress={onPress}>
            <Text style={{color: color, fontSize: 14}}>
                {title}
            </Text>
        </TouchableOpacity>
    )
};

export default Button

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 6,
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
