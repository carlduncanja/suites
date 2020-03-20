import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import moment from "moment";

/**
 *
 * @param selectedMonth
 * @param onMonthUpdated  :  function that takes a date as a
 * @returns {*}
 * @constructor
 */
const MonthSelector = ({selectedMonth, onMonthUpdated}) => {

    const handleOnMonthIncrement = () => {
        const newMonth = moment(selectedMonth).add(1, "month");
        onMonthUpdated(newMonth);
    };


    const handelOnMonthDecrement = () => {
        const newMonth = moment(selectedMonth).subtract(1, "month");
        onMonthUpdated(newMonth);
    };

    const MONTH = moment(selectedMonth).format("MMMM YYYY");

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{marginRight: 44, padding: 10}} onPress={handelOnMonthDecrement}>
                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M10.5 0.5L5.5 8L10.5 15.5" stroke="#2D3748" stroke-miterlimit="10" stroke-linecap="round"
                          stroke-linejoin="round"/>
                </Svg>
            </TouchableOpacity>

            <View style={styles.month}>
                <Text style={styles.label}> {MONTH} </Text>
            </View>


            <TouchableOpacity style={{marginLeft: 44, padding: 10}} onPress={handleOnMonthIncrement}>
                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M5.5 0.5L10.5 8L5.5 15.5" stroke="#2D3748" stroke-miterlimit="10" stroke-linecap="round"
                          stroke-linejoin="round"/>
                </Svg>
            </TouchableOpacity>
        </View>

    )
};

export default MonthSelector

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 24,
        color: '#104587',
    }
});
