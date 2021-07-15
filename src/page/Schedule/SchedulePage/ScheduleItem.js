import React, {Component} from 'react'
import {Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import moment from "moment";
import { formatDate } from '../../../utils/formatter';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import ScheduleItemTitle from './ScheduleItemTitle';


export const SCHEDULE_TYPES = {
    "EQUIPMENT": 1,
    "RESTOCK": 2,
    "SURGERY": 3,
    "DELIVERY": 4,
};


/**
 *
 *
 * @param type: any
 * @param title: string
 * @param startTime dateObject
 * @param endTime dateObject
 * @param onScheduleClick function that returns and event
 * @param isInMonthOpacity: number
 * @returns {*}
 * @constructor
 */

function ScheduleItem({color, title, startTime, endTime, onScheduleClick, isInMonthOpacity}){
    const theme = useTheme();
    const getTime = (appointmentTime) => {
        return formatDate(appointmentTime,"h : mm a")
    };

    const ScheduleItemWrapper = styled.View`
        margin : 0;
        height: 24px;
        padding-left: 5px;
    `;
    const ScheduleItemContainer = styled.View`
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: flex-start;
        align-items:center;
    `;

    const AppointmentColorIdentifier = styled.View`
        align-self: center;
        background-color: ${color || theme.colors['--theme-gray-200']};
        height: 12px;
        width: 12px;
        border-radius: 12px;
        box-shadow : 0px 1px 4px ${color};
    `

    return (
        <ScheduleItemWrapper>
            <ScheduleItemContainer style={[{opacity:isInMonthOpacity}]}>

            <AppointmentColorIdentifier
                style={{
                    elevation: 5,
                    opacity : isInMonthOpacity,
                }}
            />

            <ScheduleItemTitle
                onScheduleClick = {onScheduleClick}
                title = {title}
                startTime = {getTime(startTime)}
                endTime = {getTime(endTime)}
            />

            </ScheduleItemContainer>
        </ScheduleItemWrapper>
    )
};

export default ScheduleItem

const styles = StyleSheet.create({
    card: {
        // flex: 1,
        paddingLeft: 2,
        height: 24,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingLeft: 8,
    },
    title: {
        fontSize: 16,
    },
    time: {
        fontSize: 12,
        color: 'gray'
    }
});
