import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import moment from 'moment';
import RowCalendarDay from './RowCalenderDay';
import { formatDate } from '../../utils/formatter';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

const ROW_ITEM_WIDTH = 90;
const ROW_ITEM_HEIGHT = 96;

/**
 *
 * @param month date object
 * @param selectedDay
 * @param days array of date string "YYYY-MM-DD"
 * @param appointmentDays: and array of date string 'YYYY-MM-DD' for the the days that has appointments
 * @param onDayPress function that takes a date ("YYYY-MM-DD") string as a param.
 * @returns {*}
 * @constructor
 */

function RowCalendar({month, selectedDay, days, appointmentDays, onDayPress}) {
    const flatListRef = useRef();

    const generateCalendarData = (days) => {
        return days.map((item, index) => {
            const isSameMonth = moment(item).isSame(moment(month), 'month');
            const formattedDate = formatDate(selectedDay,'YYYY-MM-DD');
            return {
                key: index,
                day: moment(item),
                isSelected: formattedDate === item,
                hasAppointment: appointmentDays.includes(formatDate(item,'YYYY-MM-DD')),
                onDayPress: () => {
                    onDayPress(item);
                    scrollToIndex(index);
                },
                isInSelectMonth: isSameMonth,
            }
        })
    };

    const scrollToIndex = (index, animated = true) => {
        if (!flatListRef) return;

        console.log('scolling to index', index);

        flatListRef.current.scrollToIndex({
            index,
            animated,
            viewOffset: 0,
        })
    };

    //Go To Today
    useEffect(() => {
        let dateSelected =formatDate(selectedDay,'YYYY-MM-DD');

        let index = getIndexForSelectedDay(dateSelected, days);
        scrollToIndex(index);
    }, [selectedDay, month]);

    const getIndexForSelectedDay = (day, days = []) => {
        const daysIndex = days.indexOf(day);
        return daysIndex > 0 ? daysIndex : 0 // day index should not be less than 0
    };

    const initialIndex = getIndexForSelectedDay(formatDate(selectedDay,'YYYY-MM-DD'), days);

    const RowWrapper = styled.View`
        height: 110px;
        width: 100%;
    `

    const RowContainer = styled.View`
        height: 100%;
        width: 100%;
    `
    return (
        // <RowWrapper >
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                contentContainerStyle={styles.container}
                getItemLayout={(data, index) => ({length: ROW_ITEM_WIDTH, offset: ROW_ITEM_WIDTH * index - 36, index})}
                initialScrollIndex={initialIndex}
                data={generateCalendarData(days)}
                horizontal={true}
                keyExtractor={(item, index) => index + ''}
                renderItem={({item, index}) =>
                // <View
                //     key={index}
                //     style={styles.day}
                // >
                    <RowCalendarDay
                        key={index}
                        {...item}
                    />
                    // </View>
                }
            />
        </View>
        // </RowWrapper>
    )
};

export default RowCalendar

const styles = StyleSheet.create({
    container: {
        height: 110,
    },
    day: {}
});
