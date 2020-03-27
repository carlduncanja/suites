import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import moment from "moment";

/**
 *
 * @param scheduleItem
 * @param screenDimensions
 * @returns {*}
 * @constructor
 */
function ScheduleContent({scheduleItem: scheduleDetails = {}, screenDimensions}) {

    const {
        id = "",
        responseEntity = "",
        title = "",
        subTitle = "",
        location = "",
        surgeons = {},
        doctors = {},
        progressStatus = "",
        startTime = new Date(),
        endTime = new Date()
    } = scheduleDetails;

    const [isFetchingDetails, setFetchingDetails] = useState();

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

    const caseProcedureAppointmentView = (caseProcedure) => {
        return <View>

        </View>
    };

    const restockingAppointmentView = (restocking) => {
    };

    const equipmentAppointmentView = () => {
    };

    const deliveryAppointmentView = () => {
    };


    // const doctorItemContainer = (title, name, position, index) => {
    //     return (
    //         <View style={[styles.doctorContainer,]} key={index}>
    //             {position === 'doctor' && title !== 'Lead Surgeon' ?
    //                 <View style={{marginRight: 10}}>
    //                     <SvgIcon iconName="doctorArrow" strokeColor="#718096"/>
    //                 </View>
    //                 :
    //                 null
    //             }
    //             <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row'}}>
    //                 {position === 'doctor' && title === 'Lead Surgeon' ?
    //                     <Text style={[styles.detailText, {
    //                         color: '#3182CE',
    //                         marginRight: 16,
    //                         fontWeight: 'bold'
    //                     }]}>{name}</Text>
    //                     :
    //                     <Text style={[styles.detailText, {color: '#3182CE', marginRight: 16}]}>{name}</Text>
    //                 }
    //
    //                 <Text style={[styles.detailText, {color: '#718096'}]}>{title}</Text>
    //             </View>
    //
    //         </View>
    //     )
    // };

    //const personnel = [...scheduleDetails.surgeons, ...scheduleDetails.doctors];

    return (
        // !scheduleDetails
        // ? <View/>
        // :
        <TouchableOpacity style={{flex: 1}} activeOpacity={1}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{
                    // justifyContent: screenDimensions.width > screenDimensions.height ? 'space-between' : 'flex-start'
                }}
            >

                <View>
                    <View style={styles.cardTitle}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5}}>
                            <Text style={{
                                fontSize: 16,
                                color: '#104587',
                                marginBottom: 10,
                            }}>#{scheduleDetails.id}</Text>
                            <View style={{
                                backgroundColor: '#EEF2F6',
                                paddingTop: 4,
                                paddingBottom: 4,
                                paddingLeft: 8,
                                paddingRight: 8,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 12
                            }}>
                                <Text style={{
                                    color: "#A0AEC0",
                                    fontSize: 12
                                }}>{getProgressStatus(startTime, endTime)}</Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{
                                fontSize: 20,
                                color: '#0CB0E7',
                                paddingBottom: 5
                            }}>{scheduleDetails.responseEntity}</Text>
                            <Text style={{
                                fontSize: 20,
                                color: '#104587',
                                paddingBottom: 5
                            }}>{scheduleDetails.title}</Text>
                        </View>
                    </View>

                    <View style={[styles.doctors]}>

                        <View style={styles.cardDescription}>

                            <View style={{flexDirection: 'column'}}>
                                <Text style={{fontSize: 14, paddingBottom: 10, color: '#718096'}}>Theatre</Text>
                                <Text style={[styles.detailText]}>{scheduleDetails.location}</Text>
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


                        {/* Additional Information */}

                        {/*<View style={styles.cardDoctors}>*/}
                        {/*    <View style={[styles.box, {justifyContent: 'space-between'}]}>*/}
                        {/*        {personnel.map((surgeon, index) => {*/}
                        {/*            return (*/}
                        {/*                doctorItemContainer(surgeon.title, surgeon.name, 'doctor', index)*/}
                        {/*            )*/}
                        {/*        })}*/}
                        {/*    </View>*/}
                        {/*    <View style={styles.box}>*/}
                        {/*        {scheduleDetails.nurses.map((nurse, index) => {*/}
                        {/*            return (*/}
                        {/*                doctorItemContainer(nurse.title, nurse.name, 'nurse', index)*/}
                        {/*            )*/}
                        {/*        })}*/}
                        {/*    </View>*/}
                        {/*</View>*/}




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

ScheduleContent.propTypes = {};
ScheduleContent.defaultProps = {};

export default ScheduleContent;
