import React,{Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default class Action extends Component{
    render(){
        return(
            <TouchableOpacity style={styles.container}>
                <View style={styles.iconContainer}>{this.props.action.actionIcon}</View>
                <Text style={styles.text}>{this.props.action.actionName}</Text>
            </TouchableOpacity>
        )
    }
}

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