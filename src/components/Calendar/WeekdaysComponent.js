import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function WeekdaysComponent({screenDimensions}){
    const theme = useTheme();
    const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

    const WeekdaysWrapper = styled.View`
        margin-bottom: ${theme.space['--space-16']};
    `
    const WeekdaysContainer = styled.View`
        flex-direction: row;
    `
    const DayContainer = styled.View`
        align-items: center;
        width : ${screenDimensions.width > screenDimensions.height ? '98px' : '90px'};
    `
    const Day = styled.Text({
        ...theme.font['--text-xs-bold'],
        color : theme.colors['--color-gray-500']
    })
    
    return (
        <WeekdaysWrapper>
            <WeekdaysContainer>
                {weekdays.map((day, index) => {
                    return (
                        <DayContainer key={index} >
                            <Day key={index}>{day.toUpperCase()}</Day>
                        </DayContainer>
                    )
                })}
            </WeekdaysContainer>
        </WeekdaysWrapper>

    )
    
}

export default WeekdaysComponent

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
