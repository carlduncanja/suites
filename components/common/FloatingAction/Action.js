import React,{Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import SvgIcon from '../../../assets/SvgIcon'

const Action = (props) => {
    return ( 
        <TouchableOpacity style={styles.container}>
            <SvgIcon iconName={props.action.action} strokeColor="#2F855A"/>
            <Text style={styles.text}>{props.action.actionName}</Text>
        </TouchableOpacity>
    );
}
 
export default Action;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row'
    },
    iconContainer:{

    },
    text:{
        marginLeft:15,
        fontSize:16
    }
})