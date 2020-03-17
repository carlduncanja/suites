import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class FrameItem extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.itemContent}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        borderColor:'#CCD6E0',
        borderWidth:1,
        backgroundColor:"#FFFFFF",
        borderRadius:4,
        alignItems:'flex-start',
        justifyContent:'center',
        padding:5
    },
    text:{
        fontSize:16, 
        color:'#1D2129',
        //fontFamily:'Metropolis'
    }
})