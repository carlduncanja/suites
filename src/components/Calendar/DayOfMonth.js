import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import DayIdentifier from '../common/DayIdentifier';
import moment from 'moment';

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
const DayOfMonth = ({day, isSelected, appointmentColors, onDayPress, isInSelectMonth}) => {

    const defaultColor = '#718096';
    const selectedColor = '#323843';

    const opacity = isInSelectMonth || isSelected ? 1 : 0.25;
    const color = isSelected ? selectedColor : defaultColor;
    const marginTop = 13;


    const appointmentsList = (appointments) => appointments
        .slice(0, 10)
        .map((item, index) =>
            <View key={index}
                  style={{
                      width: 7,
                      height: 7,
                      borderRadius: 7,
                      margin: 2,
                      backgroundColor: item,
                      opacity
                  }}
            />);

    return (
        <TouchableOpacity style={[styles.container,]} onPress={onDayPress}>
            <View style={[styles.dayWrapper, {}]}>
                {isSelected && <DayIdentifier color="#3FC7F4"/>}
                <Text style={[styles.day, {color: color,opacity, marginTop: marginTop}]}>
                    {moment(day).format("D")}
                </Text>
                {
                    <View style={styles.appointmentsList}>
                        {
                            appointmentsList(appointmentColors)
                        }
                    </View>
                }
            </View>
        </TouchableOpacity>
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
        width: 84,
        height: 90,
        padding: 5,
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF',
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
