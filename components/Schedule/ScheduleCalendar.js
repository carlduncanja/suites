import React, {useState} from 'react';
import moment from 'moment';

import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import RowCalendar from './../Calendar/RowCalendar';


const ScheduleCalendar = ({month, appointmentDays, selectedDate, screenDimensions, onDaySelected}) => {

    const [isExpanded, setExpanded] = useState(false);

    const onPressDay = (selected) => {
        console.log("day selected");
        onDaySelected(selected)
    };

    const onPressDayToAppointment = (selected, status) => {
        if (status) {
            if (!state.displayFullCalendar) {
                state.datePositions.map((date) => {
                    if (moment(date.day).format("MM D") === selected.format("MM D")) {
                        state._scrollView.scrollTo({x: date.event, y: 0, animated: true})
                    }
                })
            }
            state.appointmentDates.map((date) => {
                if (date.date.format("MM D") === selected.format("MM D")) {
                    state._scrollAppointment.scrollTo({x: 0, y: date.event, animated: true})
                }
            })
        }
    };

    const onExpandButtonPress = () => {
        setExpanded(!isExpanded);
    };


    return (
        <View style={{
            flex: 1,
            marginLeft: screenDimensions.width > screenDimensions.height ? '2%' : 0,
            alignSelf: 'center',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            //     backgroundColor: 'red',
        }}>
            <View style={styles.calendarContainer}>
                {

                    !isExpanded
                        // Row calender view
                        ? <RowCalendar
                            month={month}
                            selectedDay={selectedDate}
                            appointmentDays={appointmentDays}
                            onDayPress={onPressDay}
                        />

                        // Full calendar view
                        : <View/>

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


            <TouchableOpacity
                style={[styles.button]}
                onPress={onExpandButtonPress}
            >
                <Text>Expand</Text>
            </TouchableOpacity>


        </View>
    )
};

export default ScheduleCalendar


const styles = StyleSheet.create({
    calendarContainer: {
        marginBottom: 10,
        marginTop: 24
    },
    button: {
        justifyContent: 'flex-start',
        alignSelf: 'center',
        backgroundColor: "#FFFFFF",
        color: "#4E5664",
        borderWidth: 1,
        borderColor: "#CCD6E0",
        borderRadius: 4,
        marginTop: 24,
        padding: 4,
        paddingLeft: 12,
        paddingRight: 12
    }
});
