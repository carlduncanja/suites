import React, { Component } from 'react';
import {Text, View, StyleSheet } from 'react-native';
import CalendarDay from './CalendarDay';
import ActionCalendar from './ActionCalendar';
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
                <View 
                    style={[styles.blanks, 
                        {width: this.props.screenDimensions.width > this.props.screenDimensions.height ? 98: 93 }
                    ]} 
                    key={`blank${i}`} 
                    day=''
                />
            );
        }

        
        let trailblanks = [];
        for (let i = this.lastDayOfMonth(); i < 7; i++) {
            trailblanks.push(
                <View 
                    style={[styles.blanks, 
                        {width: this.props.screenDimensions.width > this.props.screenDimensions.height ? 98: 93 }
                    ]} 
                    key={`trailblank${i}`} 
                    day=''
                />
            );
        }
        
        let daysInMonth = [];
            
        this.props.currentDays.map((day,index)=>{
            daysInMonth.push(
                <CalendarDay 
                    currentDate = {this.props.currentDate}
                    screenDimensions = {this.props.screenDimensions}
                    highlightDay = {moment(this.props.currentDate).format("D")}
                    onPressDay={this.props.onPressDay} 
                    unique={`day-${index}`} 
                    day={day.day}
                    selected = {this.props.selected}
                    tomorrowView = {this.props.tomorrowView}
                    nextView = {this.props.nextView}
                    lastView = {this.props.lastView}
                />
            )            
        })

        
        let totalSlots = [...blanks,...daysInMonth, ...trailblanks];
        let rows =[];
        let cells=[];

        totalSlots.forEach((slot, i) => {
            if (i % 7 !== 0) {
              cells.push(slot);
            } else {
              rows.push(cells);
              cells = [];
              cells.push(slot);
            }
            if (i === totalSlots.length - 1) {
              rows.push(cells);
            }
        });

        const sliceEnd = this.props.statusLastRow === false ? rows.length-1 : rows.length;

        let daysinmonth = rows.slice(0,sliceEnd).map((row,index)=>{
            return (
                <View key={`row${index}`} style={{flexDirection:'row'}}>{row}</View>
            )
        })

        let lastRow = rows.slice(rows.length-1,rows.length).map((row,index)=>{
            return (
                <View key={`row${index}`} style={{flexDirection:'row', opacity:0.1}}>{row}</View>
            )
        })

        return (
            <View style={styles.container}>
              {daysinmonth} 
              <ActionCalendar 
                lastRow = {lastRow}
                showLastCalendarRow = {this.props.showLastCalendarRow}
                statusLastRow = {this.props.statusLastRow}
            />
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        //flex:1,
        borderLeftWidth:0.5,
        borderBottomWidth:0.5,
        borderColor:'#EDF2F7',
    },
    blanks:{
        //flex:1,
        height:98,
        //width: 80,
        backgroundColor:'#FFFFFF',
        borderTopWidth:0.5,
        borderRightWidth:0.5,
        borderColor:'#EDF2F7',
    }
})
