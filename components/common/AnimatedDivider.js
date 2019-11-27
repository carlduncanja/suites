import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

export default class AnimatedDivider extends Component{
    render(){
        return(
            <TouchableOpacity 
                onPress = {this.props.showLastCalendarRow}
                style={[styles.divider, {marginTop: this.props.statusLastRow === true ? 12 : 17}]}/>
        )
    }
}

const styles = StyleSheet.create({
    divider:{
        width: 70,
        height: 6,
        borderRadius: 8,
        backgroundColor: '#CBD5E0',
        marginTop: 10
    }
    
})