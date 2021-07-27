import React, {Component} from 'react'
import {Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import moment from "moment";
import {formatDate} from '../../../utils/formatter';

import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
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

function ScheduleItem({color, title, subtitle = "", startTime, endTime, onScheduleClick, isInMonthOpacity}) {
    const theme = useTheme();
    const getTime = (appointmentTime) => {
        return formatDate(appointmentTime, "h : mm a")
    };

    return (
        <ScheduleItemWrapper>
            <ScheduleItemContainer onPress={onScheduleClick} style={[{opacity: isInMonthOpacity}]}>

                <AppointmentColorIdentifier
                    theme={theme}
                    color={color}
                    style={{
                        elevation: 5,
                        opacity: isInMonthOpacity,
                    }}
                />

                <ScheduleInfoContainer >
                    <ScheduleItemTitle
                        title={title}
                        subtitle={subtitle}
                        startTime={getTime(startTime)}
                        endTime={getTime(endTime)}
                    />

                    {
                        subtitle && <SubTextWrapper theme={theme}>{subtitle}</SubTextWrapper>
                    }

                </ScheduleInfoContainer>

            </ScheduleItemContainer>


        </ScheduleItemWrapper>
    )
};

export default ScheduleItem

const ScheduleItemWrapper = styled.View`
  margin: 0;
  //height: 32px;
  padding-left: 5px;
`;

const ScheduleInfoContainer = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  //background: pink;
  justify-content: center;
`

const ScheduleInfoWrapper = styled.View`
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SubTextWrapper = styled.Text(({theme}) => ({
    ...theme.font['--text-xs-medium'],
    color: theme.colors['--color-gray-600'],
    paddingLeft: 8,
    paddingTop: 8
}))

const ScheduleItemContainer = styled.TouchableOpacity`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const AppointmentColorIdentifier = styled.View`
  align-self: center;
  background-color: ${({theme, color}) => color || theme.colors['--theme-gray-200']};
  height: 12px;
  width: 12px;
  border-radius: 12px;
  box-shadow: ${({color}) => `0px 1px 4px ${color}`}
`
