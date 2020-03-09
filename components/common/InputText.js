import React, { Component, useContext } from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import { SuitesContext } from '../../contexts/SuitesContext';

const InputText = (props) => {
    const placeholder = useContext(SuitesContext).state.searchPlaceholder
    return ( 
        <TextInput
            // onChangeText = {this.props.changeText}
            placeholder={placeholder}
            placeholderTextColor = "#A0AEC0"
            // value = {this.props.inputText}
        />
    );
}
 
export default InputText;