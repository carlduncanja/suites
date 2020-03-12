import React, {useState, useEffect, useContext, useRef} from 'react';
import {Text, View, StyleSheet, ScrollView, ScrollViewBase, TouchableOpacity, FlatList} from 'react-native';
import Month from './Month';
import RowCalendarDays from './RowCalendarDays'
import DayIdentifier from '../common/DayIdentifier';
import moment from 'moment';
import {useStartDays, useCurrentDays, useEndDays} from '../../hooks/useScheduleService';
import {ScheduleContext} from '../../contexts/ScheduleContext';
import {scheduleActions} from '../../reducers/scheduleReducer';
import RowCalendarDay from "./RowCalenderDay";

/**
 *
 * @param month date object
 * @param selectedDay
 * @param days array of date string "YYYY-MM-DD"
 * @param appointmentDays []
 * @param onDayPress function that takes a date ("YYYY-MM-DD") string as a param.
 * @returns {*}
 * @constructor
 */
const RowCalendar = ({month, selectedDay, days, appointmentDays, onDayPress}) => {

    const flatListRef = useRef();

    const generateCalendarData = (days) => {
        return days.map((item, index) => {
            const isSameMonth = moment(item).isSame(moment(month), 'month');
            const formatDate = moment(selectedDay).format("YYYY-MM-DD");
            return {
                key: index,
                day: moment(item),
                isSelected: formatDate === item,
                hasAppointment: appointmentDays.includes(moment(item).toDate().toString()),
                onDayPress: () => {
                    onDayPress(item);
                    scrollToIndex(index);
                },
                isInSelectMonth: isSameMonth,
            }
        })
    };

    const scrollToIndex = (index) => {
        if(flatListRef) flatListRef.current.scrollToIndex({
            index,
            animated: true,
            viewOffset: 36,
        })
    };

    return (
        <View
            style={styles.container}
        >
            <FlatList
                ref={flatListRef}
                contentContainerStyle={styles.container}
                data={generateCalendarData(days)}
                horizontal={true}
                keyExtractor={(item, index) => index }
                renderItem={({item, index}) =>
                    <View
                        key={index}
                        style={styles.day}
                    >
                        <RowCalendarDay
                            key={index}
                            {...item}
                        />
                    </View>
                }
            />
        </View>
    )
};

export default RowCalendar

const styles = StyleSheet.create({
    container: {
        height: 110,
    },
    day: {}
});
