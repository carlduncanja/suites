import React, { Component } from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

export default class RowCalendarDays extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={e => this.props.onPressDay(e,this.props.day)}>
                    <Text style={styles.day}>{this.props.day}</Text>
                    <Text style={styles.weekday}>{this.props.weekday.toUpperCase()}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        //flex:1,
        height:80,
        width: 80,
        backgroundColor:'#FFFFFF',
        borderTopWidth:1,
        borderRightWidth:1,
        borderColor:'#EDF2F7',
        alignItems:'center',
        justifyContent:'center',
    },
    day:{
        fontSize:24,
        paddingLeft:8,  
        paddingTop:8,     
        color:'#718096',
    },
    weekday:{
        color:'#CBD5E0'
    }
})
