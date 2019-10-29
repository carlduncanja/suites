import React, { Component } from 'react';
import {Text, View, StyleSheet } from 'react-native';
import CalendarDay from './CalendarDay';
import moment from 'moment';

export default class Days extends Component {
    constructor(props){
        super(props);
        this.state={
        
        }
        this.firstDayOfMonth = this.firstDayOfMonth.bind(this);
    }
    
    firstDayOfMonth(){
        //Sun-0, Mon-1, Tue-2, Wed-3, Thu-4, Fir-5, Sat-6
        let date = this.props.currentDate;
        let firstDay = moment(date).startOf("month").format("d");
        return firstDay
    }

    lastDayOfMonth(){
        let lastDay = moment(this.props.currentDate).endOf("month").format("d");
        return lastDay
    }
    

    render() {
       
        let blanks = [];
        this.firstDayOfMonth() === '0' ? start = 7 : start = this.firstDayOfMonth()
        for (let i = 0; i < start-1; i++) {
            blanks.push(
                <View style={styles.blanks} key={`blank${i}`} day=''/>
            );
        }

        
        let trailblanks = [];
        for (let i = this.lastDayOfMonth(); i < 7; i++) {
            trailblanks.push(
                <View style={styles.blanks} key={`trailblank${i}`} day=''/>
            );
        }
        
        let daysInMonth = [];
        this.props.currentDays.map((day,index)=>{
            daysInMonth.push(
                <CalendarDay 
                    onPressDay={this.props.onPressDay} 
                    key={`day-${index}`} 
                    day={day.day}
                    selected = {this.props.selected}
                />
            )            
        })

        
        let totalSlots = [...blanks,...daysInMonth, ...trailblanks];
        let rows =[];
        let cells=[];

        totalSlots.forEach((row, i) => {
            if (i % 7 !== 0) {
              cells.push(row);
            } else {
              rows.push(cells);
              cells = [];
              cells.push(row);
            }
            if (i === totalSlots.length - 1) {
              rows.push(cells);
            }
        });

        let daysinmonth = rows.map((d,i)=>{
            return (
                <View key={`row${i}`} style={{flexDirection:'row'}}>{d}</View>
            )
        })

        return (
            <View style={styles.container}>
              {daysinmonth}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        // flex:1,
        borderLeftWidth:1,
        borderBottomWidth:1,
        borderColor:'#EDF2F7',
    },
    blanks:{
        flex:1,
        height:80,
        width: 80,
        backgroundColor:'#FFFFFF',
        borderTopWidth:1,
        borderRightWidth:1,
        borderColor:'#EDF2F7',
        paddingTop:8,
        // paddingLeft:8,
    }
})
