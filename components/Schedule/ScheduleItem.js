import React, {Component} from 'react'
import {Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import moment from "moment";


export const SCHEDULE_TYPES = {
    "EQUIPMENT": 1,
    "RESTOCK": 2,
    "SURGERY": 3,
    "DELIVERY": 4,
};


/**
 *
 *
 * @param type: any
 * @param title: string
 * @param startTime dateObject
 * @param endTime dateObject
 * @param onScheduleClick function that returns and event
 * @returns {*}
 * @constructor
 */
const ScheduleItem = ({color, title, startTime, endTime, onScheduleClick}) => {

    const getTime = (appointmentTime) => {
        return moment(appointmentTime).format("h : mm a")
    };

    return (
        <View style={styles.card}>
            <View
                style={{
                    alignSelf: 'center',
                    backgroundColor: color || 'gray',
                    height: 11,
                    width: 11,
                    borderRadius: 10 / 2,
                }}
            />
            <TouchableOpacity
                style={styles.infoContainer}
                onPress={onScheduleClick}
            >
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text
                    style={styles.time}>
                    {getTime(startTime)} - {getTime(endTime)}
                </Text>
            </TouchableOpacity>
        </View>
    )
};

export default ScheduleItem

const styles = StyleSheet.create({
    card: {
        // flex: 1,
        height: 24,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingLeft: 8,
    },
    title: {
        fontSize: 16,
    },
    time: {
        fontSize: 12,
        color: 'gray'
    }
});
