import React, {useEffect, useRef} from 'react';
import {SectionList, StyleSheet, Text, View} from "react-native";
import moment from "moment";
import ScheduleItem from "./ScheduleItem";

/**
 *
 * @param days: array of date string ("YYYY-MM-DD")
 * @param appointments: and array of appointment
 * @param onAppointmentPress
 * @param selectedIndex: a number representing the index of the date that's selected
 * @returns {*}
 * @constructor
 */
function SchedulesList({days, appointments, onAppointmentPress, selectedIndex}) {

    const sectionListRef = useRef();

    const getSectionListData = (days, appointments = []) => {
        let appointmentList = [...appointments];

        // find the appointments for the day and group them.
        return days.map((sectionDay => {
            const title = moment(sectionDay).format("dddd - MMM D");
            let appointmentForDay = [];

            const updatedList = [...appointmentList]; // temp appointment list

            for (let i = 0; i < appointmentList.length; i++) {

                let appDay = moment(appointmentList[i].startTime);
                const isSameDay = appDay.isSame(moment(sectionDay), 'day');

                if (isSameDay) {
                    appointmentForDay.push(appointmentList[i]);
                    updatedList.splice(i, 1); // remove item found to decrease the list
                }
            }
            appointmentList = updatedList; // update the appointment list with the decreased list

            return {
                title,
                data: appointmentForDay,
            }
        }));
    };

    useEffect(() => {
        if (sectionListRef) sectionListRef.current.scrollToLocation({
            animated: true,
            sectionIndex: selectedIndex,
            itemIndex: 0,
        })
    }, [selectedIndex]);

    return (
        <View style={styles.container}>
            <SectionList
                ref={sectionListRef}
                keyExtractor={item => item.id + Math.random()}
                // getItemLayout={(data, index) => ({length: 100, offset: index * 40, index})}
                onScrollToIndexFailed={() => {

                }}
                sections={getSectionListData(days, appointments)}
                stickySectionHeadersEnabled={true}
                ItemSeparatorComponent={() => <View style={styles.separatorStyle}/>}
                renderSectionHeader={({section: {title}}) => (
                    <View style={styles.dateLabelContainer}>
                        <Text style={styles.dateLabel}>
                            {title}
                        </Text>
                    </View>
                )}
                renderItem={({item}) => {
                    return <ScheduleItem
                        startTime={item.startTime}
                        endTime={item.endTime}
                        title={item.title}
                        onScheduleClick={() => onAppointmentPress(item)}
                        type={item.type}
                    />
                }}
            />

        </View>
    );
}

SchedulesList.propTypes = {};
SchedulesList.defaultProps = {};

export default SchedulesList;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(247, 250, 252, 1)',
        borderWidth: 1,
        borderColor: '#CBD5E0',
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
        backgroundColor: 'rgba(247, 250, 252, 1)',
        borderBottomColor: '#718096',
        borderBottomWidth: 1,
        paddingBottom: 5,
        marginBottom: 10,
        paddingTop: 24,
    },
    dateLabel: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#4E5664'
    },

});
