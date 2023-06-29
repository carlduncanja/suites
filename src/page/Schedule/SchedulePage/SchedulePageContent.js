// SchedulePageContent.js
import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, Dimensions, ActivityIndicator, Text} from 'react-native';
import ScheduleCalendar from './ScheduleCalendar';
import SchedulesList from "./SchedulesList";
import LoadingIndicator from '../../../components/common/LoadingIndicator';

import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import {emptyFn} from "../../../const";

function SchedulePageContent({
                                 onExpand = () => {
                                 },
                                 Expanded = false,
                                 isFetchingAppointment = false,
                                 onDaySelected = () => {
                                 },
                                 onAppointmentPress = () => {
                                 },
                                 onNewProcedurePress = () => {
                                 },
                                 appointments = [],
                                 days = [],
                                 newProcedure,
                                 month = new Date(),
                                 selectedDate = new Date(),
                                 selectedDay = new Date(),
                                 screenDimensions = {},
                                 selectedIndex = 0,
                                 onScheduleRefresh = emptyFn,
                                 isRefreshing = false
                             }) {

    const theme = useTheme();

    // this is the calendar on the schedule page
    // shows procedures on the calendar
    return (
        <View style={{flex: 1}}>
            <ScheduleCalendar
                onDaySelected={onDaySelected}
                appointments={appointments}
                month={month}
                days={days}
                selectedDate={selectedDay}
                screenDimensions={screenDimensions}
                onExpand={onExpand}
                Expanded={Expanded}
            />
            {
                isFetchingAppointment ?
                    <LoadingIndicator/> : (
                        <ScheduleListWrapper>
                            <SchedulesList
                                newProcedure ={newProcedure}
                                appointments={appointments}
                                selectedIndex={selectedIndex}
                                onAppointmentPress={onAppointmentPress}
                                onNewProcedurePress={onNewProcedurePress}
                                selectedDay={selectedDay}
                                month={month}
                                onRefresh={onScheduleRefresh}
                                isRefreshing={isRefreshing}
                            />
                        </ScheduleListWrapper>
                    )
            }
        </View>
    )
}

const ScheduleListWrapper = styled.View`
  flex: 1;
  padding: 24px 32px 32px 32px;
`

export default SchedulePageContent
