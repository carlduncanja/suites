import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { SectionList, StyleSheet, Text, View } from "react-native";

import moment from "moment";
import ScheduleItem from "./ScheduleItem";
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'
import { connect } from "react-redux";
import { setAppointments } from "../../redux/actions/appointmentActions"
import { getAppointments } from "../../api/network";
import {getDaysForMonth, getDaysInRange} from "../../utils";
import { formatDate } from "../../utils/formatter";

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import SectionListHeader from './SectionListHeader';
import {emptyFn} from "../../const";

const ListWrapper = styled.View`
    margin : 0;
    flex-direction: column;
    align-self: flex-start;
    padding: 32px;
    paddingTop: 24px;
    backgroundColor:red;
`;

const ListContainer = styled.View({
    flexDirection: 'column',
    backgroundColor: "green",
    borderWidth: 1,
    borderColor: '#E9E9E9',
    borderRadius: 16,
    paddingRight: 24,
    paddingLeft: 24,
});

const TextView = styled.View({

});

const Separator = styled.View`
    border-bottom-color: #CBD5E0;
    margin-top: 12px;
    margin-bottom: 12px;
    border-bottom-width: 1px;
`;

/**
 * Component that handles displaying the appointment scheduled over a specified month/date range.
 * @param days: array of date string ("YYYY-MM-DD")
 * @param appointments: and array of appointment
 * @param onAppointmentPress {Function} - Callback event fired when a appointment is touched.
 * @param month {Date} - Current month being focused on the schedule
 * @param selectedDay {Date} - current day in schedule to be highlighted.
 * @param onRefresh {function} - Callback function fire when the schedule is refreshing.
 * @param isRefreshing {boolean} - Flag used to signify when schedule list is refreshing.
 * @param startDate? {Date} - Starting date range use for list
 * @param endDate? {Date} - End range for schedule
 * @returns {*}
 * @constructor
 */
function SchedulesList({ appointments, selectedDay, month, onAppointmentPress, onRefresh = emptyFn, isRefreshing = false , startDate, endDate}) {

    const daysList = (startDate && endDate) ? getDaysInRange(startDate, endDate) : getDaysForMonth(month);
    const sectionListRef = useRef();
    const theme = useTheme();

    useEffect(() => {
        const dayIndex = getSectionIndexForSelectedDay();
        scrollToIndex(dayIndex, true);
    }, [selectedDay, month, startDate, endDate]);

    const getSectionIndexForSelectedDay = () => {
        const selectedDayString = moment(selectedDay).format("YYYY-MM-DD");
        return daysList.indexOf(selectedDayString);
    };

    const getSectionListData = (days, appointments = []) => {
        let appointmentList = [...appointments].reverse();

        // find the appointments for the day and group them.
        return days.map((sectionDay => {
            const title = formatDate(sectionDay, "dddd - MMM D");

            let appointmentForDay = [];
            let index = appointmentList.length - 1;


            while (index >= 0) {

                let appDay = moment(appointmentList[index].startTime);
                const isSameDay = appDay.isSame(moment(sectionDay), 'day');
                if (isSameDay) {
                    const day = appointmentList.splice(index, 1); // remove item found to decrease the list
                    appointmentForDay.push(day.pop());
                }

                --index
            }

            return {
                title,
                data: appointmentForDay,
            }
        }));
    };

    const isInMonth = (day) => {
        return formatDate(new Date(day), "MM") === formatDate(month, "MM") ? 1 : 0.6
    };

    const scrollToIndex = (index, animated) => {
        if (!sectionListRef) return;
        sectionListRef.current?.scrollToLocation({
            animated: animated,
            sectionIndex: index,
            itemIndex: 0,
        })
    };

    const handleRefresh = () => {
        // call refresh
        onRefresh( () => { // callback fn
            const dayIndex = getSectionIndexForSelectedDay();
            setTimeout(() => scrollToIndex(dayIndex, true), 250);
        })
    };

    return (
        <View style={styles.scheduleContent}>
            <View style={styles.container}>
                <SectionList
                    ref={sectionListRef}
                    onRefresh={onRefresh}
                    refreshing={isRefreshing}
                    keyExtractor={item => {
                        return item.id + new Date().toString() + Math.random()
                    }}
                    getItemLayout={sectionListGetItemLayout({
                        getItemHeight: (rowData, sectionIndex, rowIndex) => 24,
                        getSeparatorHeight: () => 24,
                        getSectionHeaderHeight: () => 60,
                        getSectionFooterHeight: () => 0,
                        listHeaderHeight: 0
                    })}
                    sections={getSectionListData(daysList, appointments)}
                    stickySectionHeadersEnabled={true}
                    ItemSeparatorComponent={() => <Separator />}
                    renderSectionHeader={({ section: { title } }) => (
                        <SectionListHeader title={title} />
                    )}
                    renderItem={({ item }) => {
                        return <ScheduleItem
                            key={item.id}
                            startTime={item.startTime}
                            endTime={item.endTime}
                            title={`${item.title} - ${item.subject}`}
                            onScheduleClick={() => onAppointmentPress(item)}
                            color={item.type && item.type.color || 'gray'}
                            isInMonthOpacity={isInMonth(item.startTime)}
                        />
                    }}
                />
            </View>
        </View>
    );
}

SchedulesList.propTypes = {
    days: PropTypes.array,
    appointments: PropTypes.array,
    onAppointmentPress: PropTypes.func,
    selectedIndex: PropTypes.number,
};

SchedulesList.defaultProps = {};


export default SchedulesList;


const styles = StyleSheet.create({
    scheduleContent: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'flex-start',
        width: '100%',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: '#E9E9E9',
        borderRadius: 16,
        paddingRight: 24,
        paddingLeft: 24,
    },
    separatorStyle: {
        borderBottomColor: '#CBD5E0',
        marginTop: 12,
        marginBottom: 12,
        borderBottomWidth: 1,
    },
    dateContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    dateLabelContainer: {
        backgroundColor: '#FFFFFF',
        borderBottomColor: '#718096',
        borderBottomWidth: 1,
        paddingBottom: 5,
        marginBottom: 10,
        paddingTop: 24,
        height: 50,
    },
    dateLabel: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#4E5664'
    },

});
