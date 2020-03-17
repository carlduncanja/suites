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
 * @returns {*}
 * @constructor
 */
function DaysOfMonth({month, appointments, selectedDay}) {


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


    const renderWeek = (weekdays = [], selectedDay, month) => {

        console.log("week", weekdays);

        return weekdays.map((day, index) => {

            const appointmentsForDay = []; // todo filter appointments
            const isSelectedDay = day === moment(selectedDay).format("YYYY-MM-DD");
            const isInSelectedMonth = moment(selectedDay).isSame(moment(day), 'month');

            return <DayOfMonth
                key={index}
                day={day}
                isSelected={isSelectedDay}
                appointmentColors={appointmentsForDay}
                isInSelectMonth={isInSelectedMonth}
                onDayPress={() => {
                }}
            />
        })
    };

    const days = getDaysForMonth(month);
    const weekDays = createWeekDaysMap(days);

    console.log("weeks days", weekDays);

    return (
        <View style={styles.container}>

            {
                Object.keys(weekDays).map((week, index) => {
                    return <View key={index} style={styles.week}>
                        {renderWeek(weekDays[week], selectedDay, month)}
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
