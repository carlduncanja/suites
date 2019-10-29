import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class CalendarDay extends Component {
    render() {
        return (
            <View style={styles.container}>
                {this.props.day === this.props.selected.selected ?
                    <TouchableOpacity onPress={e => this.props.onPressDay(e,this.props.day)}>
                        <View style={styles.pressed}/>
                        <Text style={[styles.day,{fontWeight:'bold',paddingTop:0}]}>{this.props.day}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={e => this.props.onPressDay(e,this.props.day)}>
                        <Text style={styles.day}>{this.props.day}</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:80,
        width: 80,
        backgroundColor:'#FFFFFF',
        borderTopWidth:1,
        borderRightWidth:1,
        borderColor:'#EDF2F7',
    },
    day:{
        fontSize:18,
        paddingLeft:8,  
        paddingTop:8,     
    },
    pressed:{
        height: 4,
        backgroundColor: '#3FC7F4',
        borderRadius: 8,
        width:'90%',
        alignSelf:'center',
        marginTop:3,
    }
})
