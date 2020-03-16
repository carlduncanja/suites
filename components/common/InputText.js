import React, { Component, useContext } from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import { SuitesContext } from '../../contexts/SuitesContext';

const InputText = (props) => {
    const [state] = useContext(SuitesContext)
    return ( 
        <TextInput
            // onChangeText = {this.props.changeText}
            placeholder={state.searchPlaceholder}
            placeholderTextColor = "#A0AEC0"
            // value = {this.props.inputText}
        />
    );
}
 
export default InputText;