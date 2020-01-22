import React, { Component } from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

export default class InputText extends Component {
    render() {
        return (
            <TextInput
                onChangeText = {this.props.changeText}
                placeholder={this.props.placeholder}
                placeholderTextColor = {this.props.placeholderTextColor}
                value = {this.props.inputText}
            />
        )
    }
}
