import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Month from './Month';
import Days from './Days';
import moment from 'moment';
import DaysOfMonth from "./DaysOfMonth";

/**
 *
 * @param screenDimensions
 * @param appointments: array of appointments objects
 * @param selectedDay: date object
 * @param month: date object
 * @param onDayPress: a function that ta
 * @returns {*}
 */
export default ({screenDimensions, appointments, selectedDay, month, onDayPress}) => {
    return (
        <View style={styles.container}>
            <View style={styles.labelsContainer}>
                {weekdays.map((day, index) => {
                    return (
                        <View key={index}
                              style={
                                  [
                                      styles.labelContainer,
                                      {width: screenDimensions.width > screenDimensions.height ? 98 : 93}
                                  ]
                              }>
                            <Text key={index} style={styles.label}>{day.toUpperCase()}</Text>
                        </View>
                    )
                })}
            </View>

            <View style={styles.daysContainer}>
                <DaysOfMonth
                    selectedDay={selectedDay}
                    month={month}
                    appointments={appointments}
                    onDayPress={onDayPress}
                />
            </View>
        </View>
    )

}

const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

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
