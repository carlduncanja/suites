import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
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
        return(
            <ScrollView 
                style={{flexDirection: 'row', paddingLeft:100}} 
                horizontal={true} 
                contentOffset={{x:700,y:0}}
                onScroll={this.props.calendarLayout}
                scrollEventThrottle = {10}
                >
              
                {/* Previous Month */}
                <View style={{opacity: this.props.calendarLayoutMeasure <= 350 ? 1: 0.1}} >
                    <Calendar 
                        currentDate = {this.props.prevCurrentDate}
                        screenDimensions = {this.props.screenDimensions}
                        currentDays = {this.props.prevMonthDays}
                        onPressDay = {this.props.onPressDay}
                        selected = {this.props.selected}
                        daySelected = {this.props.daySelected}
                    />
                </View>

                {/* Current Month */}
                <View style={{left:-23, opacity: this.props.calendarLayoutMeasure <= 350 || this.props.calendarLayoutMeasure > 1100 ? 0.1: 1}} >
                    <Calendar {...this.props}/> 
                </View>
                
                {/* Next Month */}
                <View style={{left:-50, opacity: this.props.calendarLayoutMeasure >= 1100 ? 1: 0.1, paddingRight:120}}>
                    <Calendar 
                        currentDate = {this.props.nextCurrentDate}
                        screenDimensions = {this.props.screenDimensions}
                        currentDays = {this.props.nextMonthDays}
                        onPressDay = {this.props.onPressDay}
                        selected = {this.props.selected}
                        daySelected = {this.props.daySelected}
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    previous:{
        //flexDirection:'column',
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
        marginTop:19,     
        paddingLeft:18,
        color:'#718096',    
    },
})