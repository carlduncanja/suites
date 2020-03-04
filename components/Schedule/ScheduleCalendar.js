import React, { useContext } from 'react';
import moment from 'moment';

import {View, StyleSheet, ScrollView, Text, Easing, Animated, Dimensions, TouchableOpacity} from 'react-native';
import RowCalendar from './../Calendar/RowCalendar';
import Calendar from './../Calendar/Calendar';
import { ScheduleContext } from '../../contexts/ScheduleContext';
import { scheduleActions } from '../../reducers/scheduleReducer';


export default ScheduleCalendar = (props) => {

    const [state, dispatch] = useContext(ScheduleContext);

     onPressDay = (e, selected) => {
        selectedObject = {"selected":selected,"status":true};

        this.onPressDayToAppointment(selectedObject.selected, true)

        dispatch({
            type: scheduleActions,
            newState: {
                selected: selectedObject,
                daySelected: true
            }
        })
    };

  

    onPressDayToAppointment = (selected, status) => {
        if (status){
            if (!state.displayFullCalendar){
                state.datePositions.map((date)=>{ 
                    if (moment(date.day).format("MM D") === selected.format("MM D")){
                        //console.log("Selected: ", date)
                        state._scrollView.scrollTo({x:date.event,y:0,animated:true})
                    }
                })
            }
            state.appointmentDates.map((date)=>{
                if (date.date.format("MM D") === selected.format("MM D")) {
                    state._scrollAppointment.scrollTo({x:0,y:date.event,animated:true})
                }
            })
        }
    }

  

    return (

        <View style={{flex:1,marginLeft: props.screenDimensions.width > props.screenDimensions.height ? '2%':0, alignSelf:"center"}}>

        {!state.displayFullCalendar &&
            <RowCalendar
            />
        //     :
        //     props.screenDimensions.width > props.screenDimensions.height ?
        //         <ExtendedCalendar
        //             {...props}
        //             {...this.state}
        //             prevCurrentDate={this.getPrevMonth(currentYear, currentMonth, currentDay)}
        //             nextCurrentDate = {this.getNextMonth(currentYear, currentMonth, currentDay)}
        //             calendarLayout = {this.calendarLayout}
        //             onPressDay = {this.onPressDay}

        //             currentDays = {this.getCurrentDays(state.currentDate.format("MM"),state.currentDate.format("YYYY"))}
        //             prevMonthDays = { 
        //                 parseInt(state.currentDate.format("M")) === 1 ?
        //                     this.getCurrentDays(state.currentDate.format("MM"), (parseInt(state.currentDate.format("YYYY")) -1).toString())
        //                     :
        //                     this.getCurrentDays((parseInt(state.currentDate.format("MM")) - 1).toString(), state.currentDate.format("YYYY"))
        //             }
        //             nextMonthDays = {
        //                 parseInt(state.currentDate.format("M")) === 12 ?
        //                 this.getCurrentDays('01', (parseInt(state.currentDate.format("YYYY")) +1).toString())
        //                 :
        //                 this.getCurrentDays((parseInt(state.currentDate.format("MM")) + 1).toString(), state.currentDate.format("YYYY"))
        //             }
        //         />
        //         :
        //         <Calendar 
        //             currentDays = {props.getCurrentDays(state.currentDate.format("MM"),state.currentDate.format("YYYY"))}
        //             onPressDay = {this.onPressDay}
        //             getStartDays = {props.getStartDays()}
        //             getEndDays = {props.getEndDays()}
        //             screenDimensions = {props.screenDimensions}
        //             currentDate = {state.currentDate}
        //             selected = {props.selected}
        //             // daySelected = {this.state.daySelected}
        //         />
        }

</View>

    )
}