import React, { useState, useEffect, useContext } from 'react';
import {Text, View, StyleSheet, ScrollView, ScrollViewBase, TouchableOpacity} from 'react-native';
import Month from './Month';
import RowCalendarDays from './RowCalendarDays'
import DayIdentifier from '../common/DayIdentifier';
import moment from 'moment';
import { useStartDays, useCurrentDays, useEndDays } from '../../hooks/useScheduleService';
import { ScheduleContext } from '../../contexts/ScheduleContext';
import { scheduleActions } from '../../reducers/scheduleReducer';

export default RowCalendar = (props) => {
    const [state, dispatch] = useContext(ScheduleContext);

    const startDays = useStartDays(state.currentDate);
    const currentDays = useCurrentDays(state.currentDate.format("MM"),state.currentDate.format("YYYY"))
    const endDays = useEndDays(state.currentDate);

    [daysArray, setDaysArray] = useState(startDays.concat(currentDays.concat(endDays)));
    [scrollMeasure, setScrollMeasure] = useState(0);
    [scrollAppointmentDay, setScrollAppointmentDay] = useState(null);

    // let rowDays = [];
    // componentDidMount() {
    //     this.onScrollViewCreated(this.refs.scrollview);
    // }

    //pass the ref for the scroll view to the parent.
    useEffect(() => {
    })

    goToAppointment = () => {
        state.goToToday  ?
            this.onGoToAppointment()
        :
            dispatch({
                type: scheduleActions.SCROLLAPPOINTMENT,
                newState: true
            })     
            
        onGoToAppointment();
    }

    onGoToAppointment = () => {
        if (state._scrollView) {
            state.appointmentDates.map((date)=>{
                if (date.date.format("MM D") === scrollAppointmentDay.format("MM D")) {
                    if (state.goToToday === true && scrollAppointment === false){
                        state._scrollView.scrollTo({x:0,y:0,animated:true}) 
                        dispatch({
                            type: scheduleActions.GOTOTODAY,
                            newState: false
                        })
                    }
                    else{
                        state._scrollView.scrollTo({x:0, y:date.event, animated:true})
                    }   
                }
            })
        }
        // return true
    }

    // getAppointments = (obj) => {
    //     setAppointmentDates([...appointmentDates,obj]);
    // }


    getScrollMeasure = (event) => {
        setScrollMeasure({scrollMeasure: event.nativeEvent.contentOffset.x})
        let dateArray = state.datePositions.sort((a,b)=>a.event - b.event);
        for (var i = 0; i < dateArray.length; i++){
            if (dateArray[i].event >= event.nativeEvent.contentOffset.x) {
                setScrollAppointmentDay( moment(dateArray[i].day));
                return true
            }
        }
    }


    onScrollViewCreated = (_scrollview) => {
       if (props.setScrollView) setScrollView(_scrollview)
    };


    generateRowDays = () => {

        return daysArray.map((day,index)=>{
            return (
                <View 
                    onLayout={(event)=>{
                        moment(day).format("YYYY-MM-D") === props.selected.selected.format("YYYY-MM-D") &&
                            dispatch({
                                type: scheduleActions.CALENDAROFFSET,
                                newState: event.nativeEvent.layout.x
                            })
                       
                        dispatch({
                            type: scheduleActions.DATEPOSITONS,
                            newState: {"day":day,"event":event.nativeEvent.layout.x}
                        })
                         
                    }}
                    key={index} 
                    style={styles.day}
                >
                    {state.selected.selected.format("YYYY MM D") === moment(day).format("YYYY MM D") &&
                        <DayIdentifier color="#3FC7F4"/>
                    }
                    <View style={{paddingRight:40, paddingLeft:40}}>
                        <RowCalendarDays
                            // onPressDay={props.onPressDay}
                            key={index}
                            day={moment(day)} 
                            weekday={moment(day).format("ddd")}
                            selected = {state.selected}
                            filterStatus = {this.getLevels(day)}
                        />              
                    </View>
                     
                </View>
                    
            )
        });

    }

    getLevels = day =>{
        const appointments = require('../../assets/db.json').appointments;
        let result = appointments.filter(appointment => moment(appointment.startTime).format("YYYY/MM/DD") === moment(day).format("YYYY/MM/DD"))
        let status = result.length === 0 ? false : true
        return status
    }

        
        return(
            <ScrollView
                style = {[styles.container]}
                horizontal={true}
                // ref="scrollview"
                //contentOffset={this.props.selected.status === false ? {x:this.props.calendarOffset, y:0} : {x:this.getFilterDay(),y:0}} 
                contentOffset={{x: state.calendarOffset, y:0}}
                contentContainerStyle={{paddingRight:'50%'}}
                onScroll={(event)=>{getScrollMeasure(event); goToAppointment();}}
                scrollEventThrottle={6}
                bounces={false}
                
            >
                {this.generateRowDays()}
            </ScrollView>
           
        )
}

const styles = StyleSheet.create({
    container:{
        //paddingRight:'6.2%',
        flexDirection:'column',
        marginTop:5,
        flexDirection:'row',
        borderLeftWidth:0.5,
        borderColor:'#EDF2F7',
    },
    day:{
        alignItems:'center',
        paddingBottom:20,
        paddingTop:3,
        borderColor:'#EDF2F7',
        borderRightWidth:0.5,
        borderBottomWidth:0.5,
        borderTopWidth:0.5,

    }
   
})