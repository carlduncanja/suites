import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View, Button} from "react-native";
import moment from "moment";
import SvgIcon from "../../../assets/SvgIcon";

/**
 * Visual component for rendering details of a delivery appointments.
 * @param scheduleItem
 * @returns {*}
 * @constructor
 */
function RestockScheduleContent({appointmentDetails, amountRequested, amountInStock, capacity, inventoryItem, storageLocation}) {
    const {
        id = "",
        title = "",
        location = "",
        startTime = new Date(),
        endTime = new Date()
    } = appointmentDetails;

    const {
        name: itemName,
    } = inventoryItem;

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

    const lineItem = (title, subject) => <View style={[styles.doctorContainer]}>
        <View style={{flex: 1, justifyContent: 'space-between', marginBottom: 20, flexDirection: 'row'}}>
            <Text style={styles.detailText}> {title} </Text>
            <Text style={styles.detailText}>{subject}</Text>
        </View>
    </View>;


    return (
        <TouchableOpacity style={{flex: 1}} activeOpacity={1}>
            <ScrollView style={styles.container}>
                <View>
                    <View style={styles.cardTitle}>

                        <View style={{flexDirection: 'row', justifyContent: 'flex-start', paddingBottom: 5}}>
                            <Text style={styles.idText}>
                                {storageLocation}
                            </Text>
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                            <Text style={styles.subjectText}>
                                {itemName}
                            </Text>
                        </View>
                    </View>

                    <View style={{flexDirection: 'column'}}>
                        <View style={styles.cardDescription}>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={{fontSize: 14, paddingBottom: 10, color: '#718096'}}>Requested</Text>
                                <Text style={[styles.detailText]}>{amountRequested}</Text>
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
                                        Schedule Restock
                                    </Text>
                                    <Text style={[styles.detailText]}>
                                        {getTime(startTime)} - {getTime(endTime)}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Additional Information */}
                        <View style={styles.infoSection}>
                            {lineItem(capacity, "Unit Capacity")}
                            {lineItem(amountInStock, "Available In-Stock")}
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
    infoSection: {
        flexDirection: 'column',
        marginTop: 20,
    },
    deliveryNotes: {
        marginTop: 20,
        borderColor: '#718096',
        borderRadius: 8,
        borderWidth: 1,
        padding: 16,
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
    footer: {
        flexDirection: 'column',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 10,
    }
});

RestockScheduleContent.propTypes = {};
RestockScheduleContent.defaultProps = {};

export default RestockScheduleContent;
