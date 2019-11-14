import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Calendar from './Calendar';
import moment from 'moment';

export default class ExtendedCalendar extends Component{

    getDays(arr){
        let days = []
        arr.map((obj, index)=>{
            days.push(obj.day)
        })
        return days
    }

    columnDays(daysArray){
        let column = []
        daysArray.map((day, index)=>{
            column.push(
                <View style={styles.container}>
                    <Text style={styles.day}>{day}</Text>
                </View>
            )
        })

        return column
        
    }

    render(){
        const prevSundays = this.props.prevMonthDays.filter(day => day.dayOfWeek === 'Sun');
        const nextMondays = this.props.nextMonthDays.filter(day => day.dayOfWeek === 'Mon');
        const nextTuesdays = this.props.nextMonthDays.filter(day => day.dayOfWeek === 'Tue');
        return(
            <View style={{flex:1, flexDirection: 'row'}}>
                <View style={styles.previous}>
                    <Text style={styles.label}>SUN</Text>
                    <View style={styles.prevMonthContainer}>
                        {this.columnDays(this.getDays(prevSundays))}
                    </View> 
                </View>
                
                <View >
                    <Calendar {...this.props}/> 
                </View>
                

                <View style={styles.previous}>
                    <Text style={styles.label}>MON</Text>
                    <View style={styles.prevMonthContainer}>
                        {this.columnDays(this.getDays(nextMondays))}
                    </View> 
                </View>
                
                <View style={styles.previous}>
                    <Text style={styles.label}>TUE</Text>
                    <View style={styles.prevMonthContainer}>
                        {this.columnDays(this.getDays(nextTuesdays))}
                    </View> 
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    previous:{
        flexDirection:'column',
        opacity: 0.1
    },
    prevMonthContainer:{
        flexDirection:'column',
    },
    label:{
        width:90, 
        textAlign:'center',
        marginBottom: 16, 
        color:'#CBD5E0',
        fontSize:14,
    },
    container:{
        height:98,
        width: 90,
        backgroundColor:'#FFFFFF',
        borderTopWidth:0.5,
        borderRightWidth:0.5,
        borderColor:'#EDF2F7',
    },
    day:{
        fontSize:24,
        paddingTop:8,     
        paddingLeft:10,
        color:'#718096',    
    },
})