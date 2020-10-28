import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Text } from 'react-native';
import ScheduleCalendar from './ScheduleCalendar';
import SchedulesList from "./SchedulesList";
import LoadingIndicator from '../common/LoadingIndicator';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function SchedulePageContent({
    onExpand = () => { },
    Expanded = false,
    isFetchingAppointment = false,
    onDaySelected = () => { },
    onAppointmentPress = () => { },
    appointments = [],
    days = [],
    month = new Date(),
    selectedDate = new Date(),
    selectedDay = new Date(),
    screenDimensions = {},
    selectedIndex = 0,
}) {

    const theme = useTheme();

    const ContentWrapper = styled.View`
        flex:1;
        height: 100%;
        width:100%;
        background-color: purple;
    `;
    const ContentContainer = styled.View`
        display:flex;
        height: 100%;
        width: 100%;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        background-color:pink;
    `


    return (
        // <ContentWrapper>
        // <ContentContainer>
        <View style={{ flex: 1 }}>
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
                    <LoadingIndicator /> : (
                        <SchedulesList
                            appointments={appointments}
                            selectedIndex={selectedIndex}
                            onAppointmentPress={onAppointmentPress}
                            selectedDay={selectedDay}
                            month={month}
                        />
                    )}
        </View>
        // </ContentContainer>
        // </ContentWrapper>
    )
}

export default SchedulePageContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },

    scheduleContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    scheduleTop: {
        paddingLeft: 32,
        paddingRight: 32,
        marginTop: 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    scheduleCalendar: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    scheduleContent: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'flex-start',
        width: '100%',
        padding: 32,
        paddingTop: 24,
        backgroundColor: 'red',
    },
    searchContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 5,
    },

    // Shadow
    shadowContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
    },

    topContainer: {
        marginLeft: '4%',
        marginRight: '4%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20,
        marginTop: 18
    },
    partition: {
        backgroundColor: '#CBD5E0',
        borderRadius: 8,
        height: 6,
        width: 70,
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 24,

    },
    drawer: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        paddingLeft: 49,
        paddingTop: 32,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },
    mask: {
        backgroundColor: '#E5E5E5',
    },
    buttonContainer: {
        height: 24,
        width: 91,
        borderColor: '#CCD6E0',
        borderRadius: 4,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FFFFFF"
    }
});
