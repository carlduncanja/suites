import React from 'react';
import moment from 'moment';

import {View, StyleSheet, ScrollView, Text, Easing, Animated, Dimensions, TouchableOpacity} from 'react-native';
import RowCalendar from './../Calendar/RowCalendar';



export default ScheduleCalendar = (props) => {
     onPressDay = (e, selected) => {
        selectedObject = {"selected":selected,"status":true};
        this.onPressDayToAppointment(selectedObject.selected, true)
        this.setState({selected:selectedObject, daySelected:true});
    };

    getCurrentDays = (inputMonth, inputYear) => {
        let results=[];
        let daysInMonth = moment([inputYear, inputMonth -1]).daysInMonth();
        for (let i =1; i<= daysInMonth; i++){
            i < 10 ?  day=`0${i}` :  day = i;
            let str = `${inputYear}-${inputMonth}-${day}`;
            results.push(moment(str))
        }
        return results
    };

    onPressDayToAppointment = (selected, status) => {
        if (status === true){
            if (this.state.displayFullCalendar === false){
                this.state.datePositions.map((date)=>{ 
                    if (moment(date.day).format("MM D") === selected.format("MM D")){
                        //console.log("Selected: ", date)
                        this.state._scrollView.scrollTo({x:date.event,y:0,animated:true})
                    }
                })
            }
            this.state.appointmentDates.map((date)=>{
                if (date.date.format("MM D") === selected.format("MM D")) {
                    this.state._scrollAppointment.scrollTo({x:0,y:date.event,animated:true})
                }
            })
        }
    }

    getStartDays = () => {
        //0-Sun 1-Mon 2-Tues 3-Wed 4-Thur 5-Fri 6-Sat
        //Previous  Month
        d = new Date(props.currentDate)
        d.setDate(1)
        d.setHours(-1)
        const momentDay = moment(d)
        
        let day = parseInt(momentDay.format("DD"))
        let days = [momentDay.format("YYYY-MM-DD")]
        const startDayNum = moment(props.currentDate).startOf("month").format("d")
        const dayIndex = parseInt(startDayNum) === 0 ? 7 : parseInt(startDayNum)
       
        if (dayIndex === 1) {
            days = []
        }
        else{
            for (i = 1; i < dayIndex-1; i++){
                days.push(moment(`${momentDay.format("YYYY-MM")}-${day-1}`).format("YYYY-MM-DD"))
                day--
            }
        }   
        return days.reverse()
        
    }

    getEndDays = () => {
        //get first 5 days of next onth
        //Next Month
        const now = new Date(props.currentDate)
        now.setDate(1)
        now.setMonth(now.getMonth()+1)
        const momentDay = moment(now)

        let day = parseInt(moment(now).format("DD"))
        let days = [momentDay.format("YYYY-MM-DD")]
        const endDayNum = moment(props.currentDate).endOf("month").format("d")

        if (parseInt(endDayNum) === 0){
            days = []
        }else{
            for (i = endDayNum ; i < 6 ; i++){
                const dayNum = (day+1 < 10) ? `0${day+1}` : day+1
                days.push(moment(`${momentDay.format("YYYY-MM")}-${dayNum}`).format("YYYY-MM-DD"))
                day++
            }
        }
        return days
    }

    return (

        <View style={{flex:1,marginLeft: props.screenDimensions.width > props.screenDimensions.height ? '2%':0, alignSelf:"center"}}>

        {props.displayFullCalendar === false &&
        // <Text>Hi</Text>
            <RowCalendar
                currentDate = {props.currentDate}
                selected = {props.selected}
                onPressDay = {this.onPressDay}
                startDays = {this.getStartDays()}
                endDays = {this.getEndDays()}
                currentDays = {this.getCurrentDays(props.currentDate.format("MM"),props.currentDate.format("YYYY"))}
                // setScrollView = { (scrollViewComponent) => {
                //     this.setState({
                //         _scrollView: scrollViewComponent
                //     })
                // }}
                getCalendarOffset = {props.setCalendarOffset}
                getAppointmentScroll = {props.setDatePositions}
                calendarOffset = {props.calendarOffset}
                datePositions = {props.datePositions}
            />
            // :
            // this.props.screenDimensions.width > this.props.screenDimensions.height ?
            //     <ExtendedCalendar
            //         {...this.props}
            //         {...this.state}
            //         prevCurrentDate={this.getPrevMonth(currentYear, currentMonth, currentDay)}
            //         nextCurrentDate = {this.getNextMonth(currentYear, currentMonth, currentDay)}
            //         calendarLayout = {this.calendarLayout}
            //         onPressDay = {this.onPressDay}

            //         currentDays = {this.getCurrentDays(props.currentDate.format("MM"),props.currentDate.format("YYYY"))}
            //         prevMonthDays = { 
            //             parseInt(props.currentDate.format("M")) === 1 ?
            //                 this.getCurrentDays(props.currentDate.format("MM"), (parseInt(props.currentDate.format("YYYY")) -1).toString())
            //                 :
            //                 this.getCurrentDays((parseInt(props.currentDate.format("MM")) - 1).toString(), props.currentDate.format("YYYY"))
            //         }
            //         nextMonthDays = {
            //             parseInt(props.currentDate.format("M")) === 12 ?
            //             this.getCurrentDays('01', (parseInt(props.currentDate.format("YYYY")) +1).toString())
            //             :
            //             this.getCurrentDays((parseInt(props.currentDate.format("MM")) + 1).toString(), props.currentDate.format("YYYY"))
            //         }
            //     />
            //     :
            //     <Calendar 
            //         currentDays = {this.getCurrentDays(props.currentDate.format("MM"),props.currentDate.format("YYYY"))}
            //         onPressDay = {this.onPressDay}
            //         getStartDays = {this.getStartDays()}
            //         getEndDays = {this.getEndDays()}
            //         screenDimensions = {this.props.screenDimensions}
            //         currentDate = {props.currentDate}
            //         selected = {this.state.selected}
            //         daySelected = {this.state.daySelected}
            //     />
        }

</View>

    )
}