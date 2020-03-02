import React, { useState, useContext } from 'react';
import {View, StyleSheet, ScrollView, Text, Easing, Animated, Dimensions, TouchableOpacity} from 'react-native';
import SearchBar from './../common/SearchBar';
import TransparentScreen from '../common/TransparentScreen';
import { scheduleActions } from '../../reducers/scheduleReducer';
import { ScheduleContext } from '../../contexts/ScheduleContext';
import { useCloseTransparent } from '../../hooks/useScheduleService';
import moment from 'moment';

export default ScheduleSearch = (props) => {
    [selectedAppEvents, setSelectedAppEvents] = useState([]);
    [selectedDayEvents, setSelectedDayEvents] = useState([]);

    const [state, dispatch] = useContext(ScheduleContext);

    onSearchSelect = (selectedTitle) => {
        dispatch({
            type: scheduleActions.SEARCHSELECT,
            newState: {
                selectedSearchValue: selectedTitle,
                searchValue: selectedTitle
            }
        })
        setSelectedAppEvents([]);
        setSelectedDayEvents([]);
        getSearchAppointment(selectedTitle)
    }

    getSearchAppointment = (select) =>  {
        let appointments = require('./../../assets/db.json').appointments
        let sAppEvents = []
        let selectedDayEvents = []
        for (i = 0; i < appointments.length; i++){
            if (appointments[i].title === select && moment(appointments[i].startTime).format("M") === state.currentDate.format("M")){
                filterDayEvent = state.datePositions.filter(date => moment(date.day).format("YYYY MM D") === moment(appointments[i].startTime).format("YYYY MM D"))
                filterAppEvent = props.appointmentDates.filter(date => moment(date.date).format("YYYY MM D") === moment(appointments[i].startTime).format("YYYY MM D"))
                sAppEvents.push(filterAppEvent[0].event)
                selectedDayEvents.push({"day":moment(appointments[i].startTime), "event":filterDayEvent[0].event})            
            }
        }
        let newAppArray = [...new Set(sAppEvents)]
        let newDayArray = []
        selectedDayEvents.map((obj)=>{
            if (newDayArray.length === 0) {
                newDayArray.push(obj)
            }else {
                if((newDayArray.filter(newObj => newObj.event === obj.event)).length === 0){
                    newDayArray.push(obj)
                }
            }
        })
        setSelectedAppEvents(newAppArray);
        setSelectedDayEvents(newDayArray);
        if (!newDayArray.length === 0 || !newAppArray.length === 0) {
            this.setAppointmentSearch(newDayArray[0].event, newAppArray[0], newDayArray[0].day )
        }
            
 
    }

    setAppointmentSearch = (filterDay, filterApp, selected) => {
        props.setSearchAppointmentStatus(false);

        dispatch({
            type: scheduleActions.SETAPPOINTMENTSEARCH,
            newState: {
                searchResultSelect: selected,
                searchAppointment: [],
                selected: { selected: selected, status: true }
            }
        })

        if (filterApp === null || filterDay === null){
            state._scrollView.scrollTo({x:0,y:0,animated:true})
            state._scrollAppointment.scrollTo({x:0,y:0, animated:true})
        }else{
            state._scrollView.scrollTo({x:filterDay,y:0,animated:true})
            state._scrollAppointment.scrollTo({x:0,y:filterApp, animated:true})
        }
        
    }


    

    const searchChangeText = (textInput) => {
        const appointmentTitles = []
        require('./../../assets/db.json').appointments.map((appointment)=>{
            !appointmentTitles.includes(appointment.title) || !appointmentTitles.includes(moment(appointment.startTime).format("MMMM DD, YYYY").toString())&&
                appointment.title.includes(textInput) || appointment.title.toLowerCase().includes(textInput.toLowerCase()) || appointment.title.toUpperCase().includes(textInput.toUpperCase())?
                    appointmentTitles.push(appointment.title)
                :
                    !moment(appointment.startTime).format("MMMM DD, YYYY").toString().includes(textInput)&&
                        appointmentTitles.push(moment(appointment.startTime).format("MMMM DD, YYYY").toString())
        })
        dispatch({
            type: scheduleActions.CHANGETEXT,
            newState: {
                searchValue: textInput,
                searchAppointment: appointmentTitles,
            }
        })
    };


    return (
        <TransparentScreen closeTransparent={ () => {useCloseTransparent(dispatch, scheduleActions, state.selectedSearchValue)}}>
            <View style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
            <SearchBar
                placeholderTextColor='#718096'
                placeholder={"Search by scheduled items"}
                changeText={searchChangeText}
                inputText = {state.selectedSearchValue === "" ? state.searchValue : state.selectedSearchValue}
                inputText={state.searchValue}
                dispatch={dispatch}
                scheduleActions={scheduleActions}
                searchAppointment={state.searchAppointment}
                selectedSearchValue={state.selectedSearchValue}
                selectedAppEvents={selectedAppEvents}
                selectedDayEvents={selectedDayEvents}
            />
            <View style={{ backgroundColor: '#FFFFFF' }}>
                {state.searchAppointment.map((appointmentTitle, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={{ paddingTop: 5, paddingBottom: 10, paddingLeft: 25 }}
                            onPress={() => this.onSearchSelect(appointmentTitle)}
                        >
                            <Text style={{ color: '#3182CE', fontSize: 16 }}>{appointmentTitle}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
        </TransparentScreen>
       
    )
}