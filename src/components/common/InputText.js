import React, { Component } from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const InputText = (props) =>{
    return(
        <TextInput
            onChangeText = {props.onChangeText}
            placeholder={props.placeholder}
            placeholderTextColor = {props.placeholderTextColor}
            value = {props.inputText}
        />
    )
};

export default InputText
