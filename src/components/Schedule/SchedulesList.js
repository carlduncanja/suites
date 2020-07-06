import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {SectionList, StyleSheet, Text, View} from "react-native";

import moment from "moment";
import ScheduleItem from "./ScheduleItem";
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'
import {connect} from "react-redux";
import {setAppointments} from "../../redux/actions/appointmentActions"
import {getAppointments} from "../../api/network";
import {getDaysForMonth} from "../../utils";
import {formatDate} from "../../utils/formatter";


/**
 *
 * @param days: array of date string ("YYYY-MM-DD")
 * @param appointments: and array of appointment
 * @param onAppointmentPress
 * @param setAppointments
 * @returns {*}
 * @constructor
 */

function SchedulesList({appointments, selectedDay, month, onAppointmentPress, setAppointments}) {

    const daysList = getDaysForMonth(month);
    const sectionListRef = useRef();
    const [isRefreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const dayIndex = getSectionIndexForSelectedDay();
        scrollToIndex(dayIndex, true);
    }, [selectedDay, month]);

    const getSectionIndexForSelectedDay = () => {
        const selectedDayString = moment(selectedDay).format("YYYY-MM-DD");
        return daysList.indexOf(selectedDayString);
    };

    const getSectionListData = (days, appointments = []) => {
        let appointmentList = [...appointments].reverse();

        // find the appointments for the day and group them.
        return days.map((sectionDay => {
            const title = formatDate(sectionDay,"dddd - MMM D");

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
        return formatDate(new Date(day),"MM") === formatDate(month,"MM") ? 1 : 0.6
    };

    const scrollToIndex = (index, animated) => {
        if (!sectionListRef) return;
        sectionListRef.current.scrollToLocation({
            animated: animated,
            sectionIndex: index,
            itemIndex: 0,
        })
    };

    const onRefresh = () => {
        // fetch the schedule
        setRefreshing(true);
        getAppointments()
            .then(data => {
                setAppointments(data);

                const dayIndex = getSectionIndexForSelectedDay();
                setTimeout(() => scrollToIndex(dayIndex, true), 250);

            })
            .catch(error => {
                // TODO display toast or error to telling the user that something went wrong trying to fetch the data.
                console.log("Failed to get Appointments", error);
            })
            .finally(() => {
                setRefreshing(false)
            })
    };

    return (
        <View style={styles.container}>
            <SectionList
                ref={sectionListRef}
                onRefresh={onRefresh}
                refreshing={isRefreshing}
                keyExtractor={item => {
                    return item.id + new Date().toString() + Math.random()
                }}
                //onLayout={() => scrollToIndex(getSectionIndexForSelectedDay(), false)}
                // getItemLayout={(data, index) => ({length: 100, offset:  index * 24 + data.length * 20, index})}
                getItemLayout={sectionListGetItemLayout({
                    getItemHeight: (rowData, sectionIndex, rowIndex) => 24,
                    getSeparatorHeight: () => 24,
                    getSectionHeaderHeight: () => 60,
                    getSectionFooterHeight: () => 0,
                    listHeaderHeight: 0
                })}
                onScrollToIndexFailed={() => {

                }}
                sections={getSectionListData(daysList, appointments)}
                stickySectionHeadersEnabled={true}
                ItemSeparatorComponent={() => <View style={styles.separatorStyle}/>}
                renderSectionHeader={({section: {title}}) => (
                    <View style={[styles.dateLabelContainer,{opacity: isInMonth(title)}]}>
                        <Text style={styles.dateLabel}>
                            {title}
                        </Text>
                    </View>
                )}
                renderItem={({item}) => {
                    return <ScheduleItem
                        key={item.id}
                        startTime={item.startTime}
                        endTime={item.endTime}
                        title={ `${item.title} - ${item.subject}` }
                        onScheduleClick={() => onAppointmentPress(item)}
                        color={item.type && item.type.color || 'gray'}
                        isInMonthOpacity = {isInMonth(item.startTime)}
                    />
                }}
            />
        </View>
    );
}

SchedulesList.propTypes = {
    days: PropTypes.array,
    appointments: PropTypes.array,
    onAppointmentPress: PropTypes.func,
    selectedIndex: PropTypes.number,
    setAppointments: PropTypes.func
};

SchedulesList.defaultProps = {};

const mapStateToProps = (state) => {
    return {
        appointments: state.appointments
    }
};

const mapDispatchToProps = {
    setAppointments
};

export default connect(mapStateToProps, mapDispatchToProps)(SchedulesList);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: 'rgba(247, 250, 252, 1)',
        backgroundColor:"#FFFFFF",
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
        // backgroundColor: 'rgba(247, 250, 252, 1)',
        backgroundColor:'#FFFFFF',
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
