import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Month from './Month';
import Days from './Days';
import moment from 'moment';

export default class Calendar extends Component {

    render() {
        //console.log("Current Date: ", this.props.currentDate)
        const appointments = require('../../assets/db.json').appointments;

        const filterLevels = (date) => {
            let result = appointments.filter(
                appointment => parseInt(moment(appointment.startTime).format("D")) === date && moment(appointment.startTime).format("MM") === this.props.currentDate.format("MM") );
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
            levelArray.map((level)=>{
                levelView.push(<View style={{height: 8, width:8, borderRadius: 8/2, marginRight:4, marginBottom: 2, backgroundColor: getLevel(parseInt(level))}}/>)
            })
            return levelView
        }


        const tomorrowLevels = [];
        const nextLevels = [];
        const lastLevels = [];

        filterLevels(parseInt(moment(this.props.currentDate).format("D")) + 1).map((app)=> tomorrowLevels.push(app.level));
        filterLevels(parseInt(moment(this.props.currentDate).format("D")) + 2).map((app)=> nextLevels.push(app.level));
        filterLevels(parseInt(moment(this.props.currentDate).format("D")) + 3).map((app)=> lastLevels.push(app.level))
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
                        showLastCalendarRow = {this.props.showLastCalendarRow}
                        statusLastRow = {this.props.statusLastRow}
                        tomorrowView = {levels(tomorrowLevels)}
                        nextView = {levels(nextLevels)}
                        lastView = {levels(lastLevels)}
                        currentDate={this.props.currentDate}
                        currentDays = {this.props.currentDays}
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
