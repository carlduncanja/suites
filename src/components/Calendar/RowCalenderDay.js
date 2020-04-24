import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import DayIdentifier from '../common/DayIdentifier';
import moment from 'moment';
import { formatDate } from '../../utils/formatter';
import {parse} from 'qs';

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
const RowCalendarDay = ({day, isSelected, hasAppointment, onDayPress, isInSelectMonth}) => {

    const defaultColor = '#718096';
    const selectedColor = '#323843';

    const opacity = isInSelectMonth || isSelected ? 1 : 0.25;
    const color = isSelected ? selectedColor : defaultColor;
    const marginTop = 13;
    const fontWeight = isSelected ? 'bold' : 'normal';

    return (
        <TouchableOpacity style={[ styles.container,]} onPress={onDayPress}>
            <View style={[styles.dayWrapper, {}, isSelected ? styles.daySelected : {}]}>
                {
                    isSelected &&
                    <DayIdentifier color="#3FC7F4"/>
                }
                <Text style={[styles.day, {color: color, opacity,marginTop: marginTop}]}>
                    {formatDate(day,"D")}
                </Text>
                <Text style={{color: defaultColor, opacity,fontWeight: fontWeight}}>
                    {formatDate(day,"ddd").toUpperCase()}
                </Text>

                {
                    hasAppointment &&
                    <View
                        style={{
                            height: 2,
                            alignSelf: 'center',
                            width: 24,
                            backgroundColor: '#CBD5E0',
                            borderRadius: 2,
                            marginTop: 13,
                            opacity
                        }}
                    />
                }
            </View>
        </TouchableOpacity>
    )
};

export default RowCalendarDay

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
