import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class ListName extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.id}>{this.props.id}</Text>
                <Text style={styles.name}>{this.props.name}</Text>
            </View>
        )
    }
} 

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    id:{
        fontSize:12,
        color:'#718096'
    },
    name:{
        fontSize:16,
        color:'#00A4DA'
    }
})