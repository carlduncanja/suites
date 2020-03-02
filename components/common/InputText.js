import React, { Component } from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

export default InputText = () => {
        return (
            <TextInput
                onChangeText = {this.props.changeText}
                placeholder={this.props.placeholder}
                placeholderTextColor = {this.props.placeholderTextColor}
                value = {this.props.inputText}
            />
        )
}
