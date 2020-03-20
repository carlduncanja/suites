import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { colors } from 'react-native-elements';

export default class DayIdentifier extends Component{
    render(){
        return(
            <View style={[styles.container, {backgroundColor: this.props.color}]} />
        )
    }
}
const styles = StyleSheet.create({
    container:{
        borderRadius: 8,
        height:4, 
        width: '90%',
    }
})