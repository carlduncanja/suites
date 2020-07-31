import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import DayIdentifier from '../common/DayIdentifier';
import { formatDate } from '../../utils/formatter';

import { useTheme } from 'emotion-theming';
import styled, { css } from '@emotion/native';

/**
 *
 * @param day : A date object
 * @param isSelected: boolean
 * @param hasAppointment: boolean
 * @param onDayPress: a function that takes a date ("YYYY-MM-DD") string as a parameter
 * @param isInSelectMonth; boolean representing if the day is in selected month
 * @param appointmentColors and array of colors.
 * @returns {*}
 * @constructor
 */
function DayOfMonth({day, isSelected, appointmentColors, onDayPress, isInSelectMonth}) {

    const theme = useTheme();
    const defaultColor = '#718096';
    const selectedColor = '#323843';

    const opacity = isInSelectMonth || isSelected ? 1 : 0.25;
    const color = isSelected ? selectedColor : defaultColor;
    const marginTop = 13;


    const appointmentsList = (appointments) => appointments
        .slice(0, 10)
        .map((item, index) =>
            <Appointment 
                  style={{
                      backgroundColor: item,
                      opacity
                  }}
            />);

    
    const DayOfMonthWrapper = styled.TouchableOpacity`
        margin : 0;
        width: 90,
        height: 98,
        align-self: center;
        border-color: ${theme.colors['--color-gray-300']};
        border-right-width: 0.5px;
        border-left-width: 0.5px;
        border-bottom-width: 0.5px;
        border-top-width: 0.5px;
        
    `;
    const DayOfMonthContainer = styled.View`
        align-self: center;
        align-items: flex-start;
        background-color:yellow;  
    `;

    const TextContainer = styled.View`
        width: 100%;
        padding-top:12px;
        padding-left: 17.5px;
    `;
    const AppointmentsContainer = styled.View`
        margin-top: ${theme.space['--space-4']};
        flex-direction: row;
        align-items: flex-start;
        flex-wrap: wrap;
        align-self: flex-start;
    `;
    const Appointment = styled.View`
        width: 8px;
        height: 8px;
        borderRadius: 8px;
        margin-right: 2px;
    `;
    const Day = styled.Text(
        isSelected ? {
            ...theme.font['--text-3xl-bold'],
            color : theme.colors['--color-gray-800']
        }
        :
        {
            ...theme.font['--text-3xl-medium'],
            color : isInSelectMonth ? theme.colors['--color-gray-600'] : theme.colors['--color-gray-400']
        }
    )


    return (

        <DayOfMonthWrapper onPress={onDayPress}>
            <DayOfMonthContainer style={[styles.dayWrapper, {}]}>
                {isSelected && <DayIdentifier/>}
                <TextContainer>
                    <Day>{formatDate(day,"D")}</Day>
                    {
                    <AppointmentsContainer>
                        {
                            appointmentsList(appointmentColors)
                        }
                    </AppointmentsContainer>
                }

                </TextContainer>
               
                
            </DayOfMonthContainer>
        </DayOfMonthWrapper>
    )
};

export default DayOfMonth

const styles = StyleSheet.create({
    container: {
        alignSelf:'flex-start'
    },
    day: {
        fontSize: 28,
        alignSelf: 'flex-start',
        color: '#718096',
    },
    dayWrapper: {
        width: 90,
        height: 98,
        padding: 5,
        alignItems: 'flex-start',
        
        borderColor: '#EDF2F7',
        borderRightWidth: 0.5,
        borderLeftWidth: 0.5,
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
    },
    appointmentsList: {
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        alignSelf: 'flex-start',

    }
});
