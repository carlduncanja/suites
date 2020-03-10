import React, {useState, useEffect, useContext} from 'react';
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
 * @param appointmentDays []
 * @returns {*}
 * @constructor
 */
const RowCalendar = ({month, selectedDay, appointmentDays, onDayPress}) => {
    // const [calendarData, setCalendarData] = useState([]);

    const selectedMonth = moment(month).startOf('month');
    // const prevMonth = moment(month).startOf('month').subtract(1, "month");
    // const nextMonth = moment(month).startOf('month').add(1, "month");


    const generateCalendarData = () => {
        let pevMonthEndDays = useStartDays(month);
        let nextMonthStartDays = useEndDays(month);
        let currentMonthDays = useCurrentDays(selectedMonth.month() + 1, selectedMonth.year());

        let dayArray = pevMonthEndDays.concat(currentMonthDays.concat(nextMonthStartDays));


        return dayArray.map(item => {
            const isSameMonth = moment(item).isSame(moment(month), 'month');
            const formatDate = moment(selectedDay).format("YYYY-MM-DD");

            return {
                day: moment(item),
                isSelected: formatDate === item,
                hasAppointment: appointmentDays.includes(moment(item).toDate().toString()),
                onDayPress: onDayPress,
                isInSelectMonth: isSameMonth,
            }
        })
    };

    return (
        <View
            style={styles.container}
        >
            <FlatList
                contentContainerStyle={styles.container}
                data={generateCalendarData()}
                horizontal={true}
                keyExtractor={(item, index) => index}
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
        height: 88,
    },
    day: {
        alignItems: 'center',
        width: 96,
        height: 88,
        padding: 6,
        borderColor: '#EDF2F7',
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
    }
});
