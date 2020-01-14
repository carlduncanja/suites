import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Month from './Month';
import Days from './Days';
import moment from 'moment';

export default class Calendar extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.labelsContainer}>
                    {weekdays.map((day,index)=>{
                        return (
                            <View key={index} style={[styles.labelContainer, {width: this.props.screenDimensions.width > this.props.screenDimensions.height ? 98: 93 }]}>
                                <Text key={index} style={styles.label}>{day.toUpperCase()}</Text>
                            </View>
                        )
                    })}
                </View>

                <View style={styles.currentContainer}>
                    <Days
                        screenDimensions = {this.props.screenDimensions}
                        currentDate={this.props.currentDate}
                        getStartDays = {this.props.getStartDays}
                        currentDays = {this.props.currentDays}
                        getEndDays = {this.props.getEndDays}
                        onPressDay = {this.props.onPressDay}
                        selected={this.props.selected}
                        daySelected={this.props.daySelected}
                    />
                </View>
            </View>
        )
    }
}

const weekdays=["mon","tue","wed","thu","fri","sat","sun"];

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        marginLeft:12,
        marginRight:12,
    },
    daysContainer:{
        flex:1,
        flexDirection:'column',
        marginLeft:12,
        marginRight:12,
        backgroundColor:'red'
    },
    labelsContainer:{
        flexDirection:'row',
        marginBottom: 16
    },
    labelContainer:{
        //flex:1,
        //width:80,
        alignItems:'center',
    },
    label:{
        color:'#CBD5E0',
        fontSize:14,
    }
})
