import React, { Component, useContext } from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import { SuitesContext } from '../../contexts/SuitesContext';

const InputText = (props) =>{
    return(
        <TextInput
            onChangeText = {(text)=>{props.changeText(text)}}
            placeholder={props.placeholder}
            placeholderTextColor = {props.placeholderTextColor}
            value = {props.inputText}
        />
    )
}

export default InputText
