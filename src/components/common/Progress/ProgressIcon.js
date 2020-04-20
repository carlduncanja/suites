import React,{Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import SvgIcon from '../../../../assets/SvgIcon';

const ProgressIcon = ({icon}) => { 
    return (
        <View style={styles.container}>
            {icon}
        </View>
    );
}

export default ProgressIcon;

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#FFFFFF",
        borderRadius:30,
        width:60,
        height:60,
        alignItems:'center',
        justifyContent:"center",
        borderColor:'#B0C8D3',
        borderWidth:3,
        padding:10,
    }
})
