import React, { Component } from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Month from './Month';
import RowCalendarDays from './RowCalendarDays'
import moment from 'moment';

export default class RowCalendar extends Component {
    currentWeek(){
        let startDate = this.props.currentDate.startOf('isoWeek')
        let JSstartDay = startDate.toDate();
        let week = [startDate];

        for (let i=0; i<6; i++){
            let day = moment(new Date(JSstartDay.setDate(JSstartDay.getDate() + 1)));
            week.push(day);
        }
        //console.log('Week: ', week);
        return week
    }

    render() {
        //const week = this.currentWeek();
        //console.log("Current Day: ", moment(this.props.currentDay).format("D"));
        return (
            <View style={styles.container}>                
                <ScrollView  horizontal={true} style={{paddingBottom:10}}>
                    <View style={styles.carouselDates}>
                        {this.props.currentDays.map((day,index)=>{
                            return (
                                <RowCalendarDays
                                    onPressDay={this.props.onPressDay} 
                                    key={`day-${index}`} 
                                    day={day.day}
                                    weekday={day.dayOfWeek}
                                    selected = {this.props.selected}
                                    highlightDay = {moment(this.props.currentDay).format("D")}
                                />
                            )
                        })}
                    </View>
                </ScrollView> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        // flex:1,
        flexDirection:'column', 
        marginTop:5,
    },
    carouselDates:{
        //flex:1,
        flexDirection:'row',
        //marginLeft:5,
        //marginRight:5,
        borderLeftWidth:0.5,
        // borderBottomWidth:0.5,
        borderColor:'#EDF2F7',
    }
})
