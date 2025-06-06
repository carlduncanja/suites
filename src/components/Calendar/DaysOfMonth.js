import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from "react-native";
import {getDaysForMonth} from "../../utils";
import moment from "moment";
import { formatDate } from "../../utils/formatter";
import DayOfMonth from "./DayOfMonth";

import { useTheme } from 'emotion-theming';
import styled, { css } from '@emotion/native';

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
            const color = item.type && item.type.color;

            const date = formatDate(item.startTime,"YYYY-MM-DD");
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

            const isSelectedDay = day === formatDate(selectedDay,"YYYY-MM-DD");
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

    const DaysOfMonthWrapper = styled.View`
        margin: 0;
    `;
    const DaysOfMonthContainer = styled.View`
        width: 100%;
    `
    const WeekView = styled.View`
        align-self: center;
        flex-direction : row;
    `
 
    return (
        <DaysOfMonthWrapper>
            <DaysOfMonthContainer>
                {
                    Object.keys(weekDays).map((week, index) => {
                        return <WeekView key={index}>
                            {renderWeek(weekDays[week], selectedDay, month, groupAppointments)}
                        </WeekView>
                    })
                }
            </DaysOfMonthContainer>
        </DaysOfMonthWrapper>
        
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
