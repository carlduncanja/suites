import React, {useEffect, useRef} from 'react';
import {SectionList, StyleSheet, Text, View} from "react-native";
import moment from "moment";
import ScheduleItem from "./ScheduleItem";
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'

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

    console.log("selected index",selectedIndex);


    const getSectionListData = (days, appointments = []) => {
        let appointmentList = [...appointments];

        // find the appointments for the day and group them.
        return days.map((sectionDay => {
            const title = moment(sectionDay).format("dddd - MMM D");

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

    const scroll = () =>{
        if (sectionListRef) sectionListRef.current.scrollToLocation({
            animated: true,
            sectionIndex: selectedIndex,
            itemIndex: 0,
        })
    }
    useEffect(() => {
        scroll()
    }, [selectedIndex]);

    return (
        <View style={styles.container}>
            <SectionList
                ref={sectionListRef}
                keyExtractor={item => item.id + Math.random()}
                // onLayout={()=>setTimeout(()=>scroll(),250)}
                // initialScrollIndex={selectedIndex}
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
        height:50
    },
    dateLabel: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#4E5664'
    },

});
