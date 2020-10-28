import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import DayIdentifier from '../common/DayIdentifier';
import RowDayContainer from './RowDayContainer';
import moment from 'moment';
import { formatDate } from '../../utils/formatter';
import {parse} from 'qs'; 

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

const RowCalendarDayWrapper = styled.TouchableOpacity`
    width: 90px;
    height: 98px;
    margin : 0;
    padding-top:3px;
    padding-bottom:3px;
    padding-right:3px;
    padding-left:3px;
    align-items:center;

`;

const RowCalendarDayContainer = styled.View`
    width: ${({isSelected}) => (isSelected ? '90px' : '90px')};
    height: 100%;
    align-items: center;
    padding:3px;
    background-color: ${({theme}) => theme.colors['--default-shade-white']};
    border-color: ${({theme}) => theme.colors['--color-gray-300']};
    border-right-width: 0.5px;
    border-bottom-width: 0.5px;
    border-top-width: 0.5px;
    box-shadow: ${({isSelected}) => (isSelected ? '0px 2px 4px rgba(0, 0, 0, 0.06)' : null)};
    z-index: 3;
`;

const AppointmentIndicator = styled.View`
    height: 2px;
    width: 26px;
    background-color: ${({theme}) => theme.colors['--color-gray-400']};
    border-radius: 2px;
`;

/**
 *
 * @param day : A date object
 * @param isSelected
 * @param hasAppointment
 * @param onDayPress
 * @param isInSelectMonth
 * @returns {*}
 * @constructor
 */

function RowCalendarDay({day, isSelected, hasAppointment, onDayPress, isInSelectMonth}) {
    const theme = useTheme();
    const defaultColor = '#718096';
    const selectedColor = '#323843';

    const opacity = isInSelectMonth || isSelected ? 1 : 0.25;
    const color = isSelected ? selectedColor : defaultColor;
    const marginTop = 13;
    const fontWeight = isSelected ? 'bold' : 'normal';

    return (
        <RowCalendarDayWrapper onPress={onDayPress}>
            <RowCalendarDayContainer theme={theme} isSelected={isSelected}>

                { isSelected && <DayIdentifier/> }
                
                <RowDayContainer
                    day = {day}
                    isSelected = {isSelected}
                    isInSelectMonth = {isInSelectMonth}
                />

                {/* <Text style={[styles.day, {color: color, opacity,marginTop: marginTop}]}>
                        {formatDate(day,"D")}
                    </Text> */}
                {/* <Text style={{color: defaultColor, opacity,fontWeight: fontWeight}}>
                        {formatDate(day,"ddd").toUpperCase()}
                    </Text> */}

                {
                        hasAppointment && <AppointmentIndicator theme={theme}/>
                        // <View
                        //     style={{
                        //         height: 2,
                        //         alignSelf: 'center',
                        //         width: 24,
                        //         backgroundColor: '#CBD5E0',
                        //         borderRadius: 2,
                        //         opacity
                        //     }}
                        // />
                    }
                {/* </View> */}
            </RowCalendarDayContainer>
        </RowCalendarDayWrapper>
    );
};

export default RowCalendarDay;

const styles = StyleSheet.create({
    container: {
        // padding: 6,
        width: 96,
        height: 110,
    },
    day: {
        fontSize: 28,
        alignSelf: 'center',
        marginTop: 17,
        color: '#718096',
    },
    dayWrapper: {
        width: 96,
        height: 98,
        alignItems: 'center',
        padding:3,
        // paddingBottom: 24,
        //paddingTop: 3,
        backgroundColor: '#FFFFFF',
        borderColor: '#E3E8EF',
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
    },
    daySelected: {
        width:92,
        alignSelf:'center',
        shadowColor: "#000",
        backgroundColor: "#FFFFFF",
        shadowOffset: {
            width: 0.5,
            height: 2.5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 3,
        zIndex:3,
    }
});
