import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, Dimensions, ActivityIndicator, Text} from 'react-native';
import ScheduleCalendar from './ScheduleCalendar';
import SchedulesList from "./SchedulesList";
import LoadingIndicator from '../common/LoadingIndicator';

import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import {emptyFn} from "../../const";

function SchedulePageContent({
                                 onExpand = () => {
                                 },
                                 Expanded = false,
                                 isFetchingAppointment = false,
                                 onDaySelected = () => {
                                 },
                                 onAppointmentPress = () => {
                                 },
                                 appointments = [],
                                 days = [],
                                 month = new Date(),
                                 selectedDate = new Date(),
                                 selectedDay = new Date(),
                                 screenDimensions = {},
                                 selectedIndex = 0,
                                 onScheduleRefresh = emptyFn,
                                 isRefreshing = false
                             }) {

    const theme = useTheme();

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
                        <SchedulesList
                            appointments={appointments}
                            selectedIndex={selectedIndex}
                            onAppointmentPress={onAppointmentPress}
                            selectedDay={selectedDay}
                            month={month}
                            onRefresh={onScheduleRefresh}
                            isRefreshing={isRefreshing}
                        />
                    )
            }
        </View>
    )
}

export default SchedulePageContent
