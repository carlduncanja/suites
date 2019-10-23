import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Month from './Month';
import Days from './Days';
import moment from 'moment';

export default class Calendar extends Component {
       
    render() {
        return (
            <View style={styles.container}>
                <View style={{alignItems:'center', paddingBottom:20}}>
                    <Month 
                        currentDate={this.props.currentDate} 
                        decreaseMonthChange = {this.props.decreaseMonthChange}
                        increaseMonthChange = {this.props.increaseMonthChange}
                    />  
                </View>
                
                <View style={styles.daysContainer}>
                    <View style={styles.labelsContainer}> 
                        {weekdays.map((day,index)=>{
                            return (
                                <View key={index} style={styles.labelContainer}>
                                    <Text key={index} style={styles.label}>{day.toUpperCase()}</Text>
                                </View>
                            )
                        })}
                    </View>
        
                    <View style={styles.currentContainer}>
                        <Days 
                            currentDate={this.props.currentDate}
                            currentDays = {this.props.currentDays}
                            onPressDay = {this.props.onPressDay}
                            selected={this.props.selected}
                            daySelected={this.props.daySelected}
                        />
                    </View> 
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
    },
    daysContainer:{
        flex:1,
        marginLeft:12,
        marginRight:12
    },
    labelsContainer:{
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    label:{
        color:'#CBD5E0',
        fontSize:14,
    }
})
