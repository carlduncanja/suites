import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import moment from "moment";

/**
 * Default View for Appointments.
 * @param scheduleItem
 * @returns {*}
 * @constructor
 */
function DefaultScheduleContent({scheduleDetails = {}}) {
    const {
        id = "",
        title = "",
        subject = "",
        location = "",
        startTime = new Date(),
        endTime = new Date()
    } = scheduleDetails;

    /**
     * @param scheduleDate - date object
     */
    const getTime = (scheduleDate) => {
        let date = moment(scheduleDate);
        return date.format("h:mm a");
    };

    const formatDate = (scheduleDate) => {
        let date = moment(scheduleDate);
        return date.format("D/M/YYYY")
    };

    const getProgressStatus = (startTime, endTime) => {
        const now = moment();
        const start = moment(startTime);
        const end = moment(endTime);

        if (now.isBefore(start)) {
            return "Not Yet Started"
        } else if (now.isBefore(end)) {
            return "In Progress"
        } else {
            return "Ended"
        }
    };

    return (
        <TouchableOpacity style={{flex: 1}} activeOpacity={1}>
            <ScrollView style={styles.container}>
                <View>
                    <View style={styles.cardTitle}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5}}>
                            <Text style={styles.idText}>
                                #{id}
                            </Text>
                            <View style={styles.statusWrapper}>
                                <Text style={{
                                    color: "#A0AEC0",
                                    fontSize: 12
                                }}>
                                    {getProgressStatus(startTime, endTime)}
                                </Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.subjectText}>
                                {subject}
                            </Text>
                            <Text style={{
                                fontSize: 20,
                                color: '#104587',
                                paddingBottom: 5
                            }}>{title}</Text>
                        </View>
                    </View>

                    <View style={[styles.doctors]}>
                        <View style={styles.cardDescription}>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={{fontSize: 14, paddingBottom: 10, color: '#718096'}}>Theatre</Text>
                                <Text style={[styles.detailText]}>{location}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>

                                <View style={{flexDirection: 'column', marginRight: 15}}>
                                    <Text style={{fontSize: 14, paddingBottom: 10, color: '#718096'}}>
                                        Date
                                    </Text>
                                    <Text style={[styles.detailText]}>
                                        {formatDate(startTime)}
                                    </Text>
                                </View>

                                <View style={{flexDirection: 'column'}}>
                                    <Text style={{fontSize: 14, paddingBottom: 10, color: '#718096'}}>
                                        Time
                                    </Text>
                                    <Text style={[styles.detailText]}>
                                        {getTime(startTime)} - {getTime(endTime)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        paddingRight: '4%',
        paddingLeft: '4%',
        flexDirection: 'column',
    },
    idText: {
        fontSize: 16,
        color: '#104587',
        marginBottom: 10,
    },
    subjectText: {
        fontSize: 20,
        color: '#0CB0E7',
        paddingBottom: 5
    },
    statusWrapper: {
        backgroundColor: '#EEF2F6',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12
    },
    cardTitle: {
        flexDirection: 'column',
        //paddingTop:10,
        paddingBottom: 20,
        borderBottomColor: '#E2E8F0',
        borderBottomWidth: 1
    },
    doctors: {
        flexDirection: 'column',
    },

    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: '4%',
        paddingTop: 20,
        paddingBottom: 20,
        //marginBottom:'5%',
        //height:100,
    },

    cardDescription: {
        borderBottomColor: '#E2E8F0',
        borderBottomWidth: 1,
        paddingBottom: 15,
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardDoctors: {
        flexDirection: 'column',
        marginTop: 20,
    },
    doctorContainer: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingBottom: 20,
    },
    box: {
        borderColor: "#E2E8F0",
        borderRadius: 8,
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: '#F7FAFC'
    },
    iconContainer: {
        height: 40,
        width: 40,
        borderColor: '#CBD5E0',
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    detailsContainer: {
        flexDirection: 'column',
        marginLeft: 20,
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    detailText: {
        fontSize: 16,
        color: '#4E5664'
    },
    buttonController: {
        height: 40,
        width: 40,
        borderRadius: 40 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    footer: {
        flexDirection: 'column',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 10,

    }
});

DefaultScheduleContent.propTypes = {};
DefaultScheduleContent.defaultProps = {};

export default DefaultScheduleContent;
