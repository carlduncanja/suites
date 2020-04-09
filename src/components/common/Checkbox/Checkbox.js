import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SvgIcon from '../../../../assets/SvgIcon'

export default class Checkbox extends Component{
    render(){
        return(
            <View style={styles.container}>
                {this.props.icon}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#FFFFFF",
        borderColor:"#CCD6E0",
        borderWidth:1,
        borderRadius:4,
        height:16,
        width:16,
        alignItems:'center',
        justifyContent:'center'
    }
});
