import React, { Component } from 'react';
import {Text, View, StyleSheet } from 'react-native';
import DayOfMonth from './DayOfMonth';
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
        //console.log("First day: ", moment(date).startOf("month").format("D ddd"))
        return firstDay
    }

    lastDayOfMonth(){
        let lastDay = moment(this.props.currentDate).endOf("month").format("d");
        return lastDay
    }

    render() {
        const appointments = require('../../assets/db.json').appointments;

        const filterLevels = (date, day) => {
            //console.log("Date: ", day)
            let result = appointments.filter(
                appointment => parseInt(moment(appointment.startTime).format("D")) === date && moment(appointment.startTime).format("MM") === day.format("MM") && moment(appointment.startTime).format("YYYY") === day.format("YYYY"));
            return result;
        }

        const getLevel = (level) => {
            level === 1 ? color = '#E53E3E':
                level === 2 ? color = "#ECC94B":
                    level === 3 ? color = "#4299E1": color ="#48BB78"
            return color
        }

        const levels = (levelArray) =>{
            let levelView = [];
            levelArray.map((level, index)=>{
                levelView.push(
                    <View
                        key ={index}
                        style={{height: 8, width:8, borderRadius: 8/2, marginRight:4, marginBottom: 2, backgroundColor: getLevel(parseInt(level))}}
                    />
                )
            })
            return levelView
        }

        let blanks = [];
        this.props.getStartDays.map((day,index)=>{
            const dayLevels=[]
            filterLevels(parseInt(moment(day).format("D")) + 1, moment(day)).map((app)=> dayLevels.push(app.level));
            blanks.push(
                <DayOfMonth
                    currentDate = {this.props.currentDate}
                    screenDimensions = {this.props.screenDimensions}
                    onPressDay={this.props.onPressDay}
                    filterDay = {moment(day)}
                    day={moment(day)}
                    selected = {this.props.selected}
                    dayLevels = {levels(dayLevels)}
                    key={`blank-${index}`}
                />
            )
        })


        let trailblanks = [];
        this.props.getEndDays.map((day,index)=>{
            const dayLevels=[]
            filterLevels(parseInt(moment(day).format("D")) + 1, moment(day)).map((app)=> dayLevels.push(app.level));
            trailblanks.push(
                <DayOfMonth
                    currentDate = {this.props.currentDate}
                    screenDimensions = {this.props.screenDimensions}
                    onPressDay={this.props.onPressDay}
                    filterDay = {moment(day)}
                    day={moment(day)}
                    selected = {this.props.selected}
                    dayLevels = {levels(dayLevels)}
                    key={`trail-${index}`}
                />
            )
        })


        let daysInMonth = [];
        this.props.currentDays.map((day,index)=>{
            const filterDay = moment(`${this.props.currentDate.format("YYYY")}-${this.props.currentDate.format("MM")}-${day.format("DD")}`)
            const dayLevels=[]
            filterLevels(parseInt(moment(filterDay).format("D")) + 1, this.props.currentDate).map((app)=> dayLevels.push(app.level));

            daysInMonth.push(
                <DayOfMonth
                    currentDate = {this.props.currentDate}
                    screenDimensions = {this.props.screenDimensions}
                    onPressDay={this.props.onPressDay}
                    filterDay = {filterDay}
                    day={day}
                    selected = {this.props.selected}
                    dayLevels = {levels(dayLevels)}
                    key={index}
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

        let daysinmonth = rows.map((row,index)=>{
            return (
                <View key={`row${index}`} style={{flexDirection:'row'}}>{row}</View>
            )
        })
        this.firstDayOfMonth()
        return (
            <View style={styles.container}>
              {daysinmonth}
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
