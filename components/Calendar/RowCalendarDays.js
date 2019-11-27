import React, { Component } from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import DayIdentifier from '../common/DayIdentifier';

export default class RowCalendarDays extends Component {
    render() {
        return (
            <View style={styles.container}>
                {parseInt(this.props.highlightDay) === parseInt(this.props.day) ?
                    <DayIdentifier color="#A0AEC0"/>
                        :
                        parseInt(this.props.highlightDay) + 1 === parseInt(this.props.day) ?
                            <DayIdentifier color = "#3FC7F4"/>
                            :
                            null
                }
                <TouchableOpacity onPress={e => this.props.onPressDay(e,this.props.day)} >
                    {parseInt(this.props.highlightDay) === parseInt(this.props.day) || parseInt(this.props.highlightDay) + 1 === parseInt(this.props.day) ?
                        <Text style={[styles.day, {color:'#2D3748'}]}>{this.props.day}</Text>
                        :
                        <Text style={styles.day}>{this.props.day}</Text>
                    }
                    <Text style={styles.weekday}>{this.props.weekday.toUpperCase()}</Text>
                </TouchableOpacity>
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
        borderTopWidth:0.5,
        borderRightWidth:0.5,
        borderBottomWidth:0.5,
        borderColor:'#EDF2F7',
        alignItems:'center',
        justifyContent:'center',
    },
    day:{
        fontSize:24,
        alignSelf:'center',
        paddingTop:8,
        color:'#718096',
    },
    weekday:{
        color:'#CBD5E0'
    }
})
