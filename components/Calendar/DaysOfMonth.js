import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from "react-native";
import {getDaysForMonth} from "../../utils";
import moment from "moment";
import DayOfMonth from "./DayOfMonth";

/**
 *
 * @param month
 * @param appointments
 * @param selectedDay
 * @param onDayPress
 * @returns {*}
 * @constructor
 */
function DaysOfMonth({month, appointments = [], selectedDay, onDayPress}) {


    /**
     * takes an arrays of days and groups them by their week.
     * @param days: arrays of day string ("YYYY-MM-DD")
     * @returns {{ dayNum: [] }} a map of days number to and array of day string Map<int, array<string>>
     */
    const createWeekDaysMap = (days) => {
        // This function assumes the days are sorted and the first day for the week is month.

        const weekDays = {};

        days.forEach(day => {
            const momentDay = moment(day);

            const weekNum = momentDay.isoWeek();

            if (!weekDays[weekNum]) weekDays[weekNum] = [];

            weekDays[weekNum].push(day);
        });
        return weekDays;
    };

    const groupAppointmentsByDays = (appointments) => {
        const appointmentDays = {};
        appointments.forEach(item => {
            const defaultColor = "gray";
            const color = item.scheduleType && item.scheduleType.color;

            const date = moment(item.startTime).format("YYYY-MM-DD");
            if (!appointmentDays[date]) appointmentDays[date] = [];
            appointmentDays[date].push(color || defaultColor)
        });

        return appointmentDays
    };


    /**
     *
     * @param weekdays: array of date strings ("YYYY-MM-DD")
     * @param selectedDay: date object
     * @param month: date object
     * @param groupAppointments
     * @returns {*[]}
     */
    const renderWeek = (weekdays = [], selectedDay, month, groupAppointments) => {

        return weekdays.map((day, index) => {
            const appointmentsColors = groupAppointments[day] || [];
            const isSelectedDay = day === moment(selectedDay).format("YYYY-MM-DD");
            const isInSelectedMonth = moment(day).isSame(moment(month), 'month');

            return <DayOfMonth key={index}
                day={day}
                isSelected={isSelectedDay}
                appointmentColors={appointmentsColors}
                isInSelectMonth={isInSelectedMonth}
                onDayPress={_ => onDayPress(day)}
            />
        })
    };

    const days = getDaysForMonth(month);
    const weekDays = createWeekDaysMap(days);

    const groupAppointments = groupAppointmentsByDays(appointments);

    return (
        <View style={styles.container}>

            {
                Object.keys(weekDays).map((week, index) => {
                    return <View key={index} style={styles.week}>
                        {renderWeek(weekDays[week], selectedDay, month, groupAppointments)}
                    </View>
                })
            }

        </View>
    );
}

DaysOfMonth.propTypes = {};
DaysOfMonth.defaultProps = {};


const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        flexDirection: 'column',
    },
    week: {
        alignSelf: 'center',
        flexDirection: 'row'
    }
});

export default DaysOfMonth;
