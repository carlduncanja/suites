import React, { useState } from 'react';
import ScheduleSearch from './ScheduleSearch';
import {View, StyleSheet, ScrollView, Text, Easing, Animated, Dimensions, TouchableOpacity} from 'react-native';
import Button from './../common/Button';
import TransparentScreen from './../common/TransparentScreen';
import moment from 'moment';
import Month from './../Calendar/Month';

export default ScheduleTopBar = (props) => {
    [transparent, setTransparent] = useState(true);
    [searchAppointmentStatus, setSearchAppointmentStatus] = useState(true);
    [selectedSearchValue, setSelectedSearchValue] = useState('');
    [searchResultSelect, setSearchResultSelect] = useState('');
    [searchOpen, setSearchOpen] = useState(false);
    [displayTodayAppointment] = useState(true);
    [goToToday, setGoToToday] = useState(false);
    [scheduleOffset, setScheduleOffset] = useState(0); 
    [calendarLayoutMeasure] = useState(700);
    [appointmentDates, setAppointmentDates] = useState([]);
    [_scrollView] = useState(null);
    [_scrollAppointment] = useState(null);
    


    searchPress = () => {
        transparent ? newTrans = false: newTrans = true
        setTransparent(newTrans)

        setSearchAppointmentStatus(true);
        setSearchOpen(true);
        
    };

     undoSearchPress = () => {
        setSearchAppointmentStatus(false);
        setSelectedSearchValue("");
         // searchAppointmentStatus: false, 
            // searchAppointment: [], 
            // searchResultSelect: "" 
    } 



    onGoToTodayClick = () => {
        setGoToToday(true);

        if (_scrollView) {
            if (props.displayFullCalendar === false) {
                if (moment().format("YYYY-MM-D") === props.currentDate.format("YYYY-MM-D")) {
                    _scrollView.scrollTo({ x: props.calendarOffsetset, y: 0, animated: true })
                    _scrollAppointment.scrollTo({ x: 0, y: scheduleOffset, animated: true })
                    props.setSelected({ selected: moment(), status: true })
                }

            } else {
                props.setDisplayFullCalendar(false);
                _scrollAppointment.scrollTo({ x: 0, y: scheduleOffset, animated: true })
            }
        }
    };

    getMonth = (type) => {
        now = new Date(props.currentDate)
        now.setDate(1)

        if (type === "prev") {
            return this.setMonth(1, 1, 11, now)
        } else {
            return this.setMonth(12, -1, 0, now)
        }
    }

    setMonth = (format, offset, setMonthValue, now) => {
        if (parseInt(props.currentDate.format("M")) === format) {
            now.setFullYear(now.getFullYear() - offset)
            now.setMonth(setMonthValue)
        } else {
            now.setMonth(now.getMonth() - offset)
        }
        return moment(now)
    }

    decreaseMonthChange = () => {
        setPrevMonth = this.getMonth("prev")
        props.setCurrentDate(setPrevMonth);
        props.setDatePositions([]);
        setAppointmentDates([]);
        props.setCalendarOffset(0);
        setScheduleOffset(0);

        
    };


    increaseMonthChange = () => {
        props.setDatePositions([]);
        setAppointmentDates([]);

        setNextMonth = this.getMonth("next")
        props.setCurrentDate(setNextMonth);
        props.setCalendarOffset(0);
        setScheduleOffset(0);
console.log(setNextMonth)
    };



    return (
        <View style={[styles.topContainer, {paddingTop: props.screenDimensions.width > props.screenDimensions.height ? 0: '1%'}]}>
        <View style={styles.buttonContainer}>
            {searchAppointmentStatus === true && selectedSearchValue!== "" && searchResultSelect !== "" ?
                <Button
                    title="Undo Search"
                    buttonPress={this.undoSearchPress}
                    backgroundColor = "#F7FAFC"
                    color = "#4A5568"
                />
                :
                <Button
                    title="Search"
                    buttonPress={this.searchPress}
                    backgroundColor="#F7FAFC"
                    color="#4A5568"
                />
            }
            
        </View>
        <View style={{alignItems:'center' }}>
            <Month
                calendarLayoutMeasure = {calendarLayoutMeasure}
                currentDate={props.currentDate}

                prevMonthDate={this.getMonth('prev')}
                nextMonthDate = {this.getMonth('next')}

                decreaseMonthChange = {this.decreaseMonthChange}
                increaseMonthChange = {this.increaseMonthChange}
            />
        </View> 
        <View style={styles.buttonContainer}>
            <Button
                title= {displayTodayAppointment === true ? "Go Back" : "Go to Today"}
                buttonPress={this.onGoToTodayClick}

            />
        </View> 
         {searchOpen === true &&
                <ScheduleSearch 
                    setSearchOpen={setSearchOpen}
                    setTransparent={setTransparent}
                    setSearchResultSelect={setSearchResultSelect}
                    selectedSearchValue={selectedSearchValue}
                    setSelectedSearchValue={setSelectedSearchValue}
                    currentDate={props.currentDate}
                    datePositons={datePositons}
                    appointmentDates={appointmentDates}
                />
            }  
    </View>

  
                        )
}


const styles=StyleSheet.create({
    topContainer:{
        marginLeft:'4%',
        marginRight:'4%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingBottom:20,
        marginTop: 18
    }
})
