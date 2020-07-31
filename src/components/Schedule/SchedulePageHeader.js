import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, Dimensions, ActivityIndicator, Text} from 'react-native';
import Button from '../common/Buttons/Button';
import MonthSelector from "../Calendar/MonthSelector";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import ScheduleButton from './ScheduleButton';

function SchedulePageHeader({
        searchButtonPress = ()=>{},
        gotoTodayButtonPress = ()=>{},
        onMonthUpdate = ()=>{},
        selectedMonth = new Date(),
    }){

    const theme = useTheme();

    const SchedulePageHeaderWrapper = styled.View`
        background-color: green;
        width: 100%;
        padding-left: ${theme.space['--space-32']};
        padding-top: ${theme.space['--space-26']};
        padding-bottom: ${theme.space['--space-24']};
        padding-right: ${theme.space['--space-32']};
    `
    const SchedulePageHeaderContainer = styled.View`
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: yellow;
    `

    return(
        <SchedulePageHeaderWrapper>
            <SchedulePageHeaderContainer>

                <ScheduleButton
                    title = "Search"
                    onButtonPress = {searchButtonPress}
                />
                <MonthSelector
                    selectedMonth={selectedMonth}
                    onMonthUpdated={onMonthUpdate}
                />
                <ScheduleButton
                    title = "Go to Today"
                    onButtonPress = {gotoTodayButtonPress}
                />

            </SchedulePageHeaderContainer>
        </SchedulePageHeaderWrapper>
    )
}

export default SchedulePageHeader

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
