import React, {useState} from 'react';
import moment from 'moment';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import RowCalendar from '../Calendar/RowCalendar';
import DayOfMonth from "../Calendar/DayOfMonth";
import Calendar from "../Calendar/Calendar";
import { formatDate } from '../../utils/formatter';


/**
 *
 * @param month: a date object for the current month
 * @param appointments: a array of appointment for the selected month
 * @param days: a array of strings for the days that will be displayed in the calender. NB the days string is the format
 * "YYYY-MM-DD"
 * @param selectedDate: a date object for the day that's selected.
 * @param screenDimensions: a object {width,height} for the device's dimension
 * @param onDaySelected <fun> : a function that take a date string ("YYYY-MM-DD")  as parameter
 * @returns {*}
 * @constructor
 */
const ScheduleCalendar = ({month,appointments, days, selectedDate, screenDimensions, onDaySelected}) => {

    const [isExpanded, setExpanded] = useState(false);

    const onPressDay = (selected) => {
        onDaySelected(selected)
    };

    const onExpandButtonPress = () => {
        setExpanded(!isExpanded);
    };

    /***
     *
     *
     * @returns {[]} and array of day strings in the format "YYYY-MM-DD"
     */
    const getAppointmentDays = (appointments) => {
        const appointmentDays = [];
        appointments.forEach(item => appointmentDays.push((formatDate(item.startTime,"YYYY-MM-DD"))));
        return appointmentDays;
    };

    // console.log("Appointment: ", appointments)

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
                            days={days}
                            month={month}
                            selectedDay={selectedDate}
                            appointmentDays={getAppointmentDays(appointments)}
                            onDayPress={onPressDay}

                        />

                        // Full calendar view
                        : <Calendar
                            screenDimensions={screenDimensions}
                            month={month}
                            selectedDay={selectedDate}
                            appointments={appointments}
                            onDayPress={onPressDay}
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
                    //
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
                onPress={onExpandButtonPress}>
                <Text> { isExpanded ? "Collapse" : "Expand" }</Text>
            </TouchableOpacity>
        </View>
    )
};

export default ScheduleCalendar


const styles = StyleSheet.create({
    calendarContainer: {
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
        marginTop: 12,
        padding: 4,
        paddingLeft: 12,
        paddingRight: 12
    }
});
