import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Month from './Month';
import Days from './Days';
import moment from 'moment';
import DaysOfMonth from "./DaysOfMonth";

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import WeekdaysComponent from './WeekdaysComponent';

/**
 *
 * @param screenDimensions
 * @param appointments: array of appointments objects
 * @param selectedDay: date object
 * @param month: date object
 * @param onDayPress: a function that ta
 * @returns {*}
 * 
 */
function Calendar ({screenDimensions, appointments, selectedDay, month, onDayPress}) {
    const theme = useTheme(); 

    const CalendarWrapper = styled.View`
        margin : 0;
    `;
    const CalendarContainer = styled.View`
        align-self: flex-start;
        flex-direction: column;
    `
    return (
        <CalendarWrapper>
            <CalendarContainer>
                <WeekdaysComponent screenDimensions = {screenDimensions}/>

                {/* <View style={styles.daysContainer}> */}
                    <DaysOfMonth
                        selectedDay={selectedDay}
                        month={month}
                        appointments={appointments}
                        onDayPress={onDayPress}
                    />
                {/* </View> */}
            </CalendarContainer>
        </CalendarWrapper>
    )

}

export default Calendar

const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        flexDirection: 'column',
        // marginLeft: 12,
        // marginRight: 12,
    },
    daysContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        // backgroundColor: 'blue'
    },
    labelsContainer: {
        flexDirection: 'row',
        marginBottom: 16
    },
    labelContainer: {
        //flex:1,
        //width:80,
        alignItems: 'center',
    },
    label: {
        color: '#CBD5E0',
        fontSize: 14,
    }
})
