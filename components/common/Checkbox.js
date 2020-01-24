import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SvgIcon from '../../assets/SvgIcon'

export default class Checkbox extends Component{
    render(){
        return(
            <TouchableOpacity>
                <SvgIcon iconName="checkbox" fillColor="#F8FAFB" strokeColor="#E3E8EF"/>
            </TouchableOpacity>
        )
    }
}