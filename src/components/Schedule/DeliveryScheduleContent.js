import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import moment from 'moment';
import {useTheme} from 'emotion-theming';
import styled, {css} from '@emotion/native';
import SvgIcon from '../../../assets/SvgIcon';
import { formatDate, currencyFormatter } from '../../utils/formatter';

const DeliveryCardContainer = styled.View`
    flex: 1;
`;

const CardTitleContainer = styled.View`
    flex-direction: column;
    padding-bottom: ${({theme}) => theme.space['--space-20']};
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.colors['--color-gray-200']};
`;

const TotalStatusContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: ${({theme}) => theme.space['--space-8']};
`;

const StatusPill = styled.View`
    background-color: ${({theme}) => theme.colors['--color-gray-200']};
    padding: ${({theme}) => `${theme.space['--space-4']} ${theme.space['--space-8']}`};
    align-items: center;
    justify-content: center;
    border-radius: 12px;
`;

const DropoffTimeContainer = styled.View`
    padding: ${({theme}) => `${theme.space['--space-14']} 0`};
    flex-direction: row;
    justify-content: space-evenly;
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.colors['--color-gray-200']};
    margin-bottom: ${({theme}) => theme.space['--space-48']};
`;

const TimeContainer = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
`;

const StackedRecord = styled.View`
    flex-direction: column;
`;

const AppointmentInformation = styled.View`
    background-color: ${({theme}) => theme.colors['--color-gray-100']};
    border-color: ${({theme}) => theme.colors['--color-gray-300']};
    border-width: 1px;
    border-radius: 8px;
    padding: ${({theme}) => `${theme.space['--space-16']} ${theme.space['--space-12']}`};
`;

const ReviewButtonContainer = styled.View`
    background-color: ${({theme}) => theme.colors['--color-blue-500']};
    position: absolute;
    bottom: 20;
    right:0;
    border-radius: 8px;
`;

const CardText = styled.Text(({theme, font = '--text-base-regular', color = '--color-gray-300'}) => ({
    ...theme.font[font],
    color: theme.colors[color],
    paddingTop: 1,
}));


/**
 * Visual component for rendering details of a delivery appointments.
 * @param scheduleItem
 * @returns {*}
 * @constructor
 */
function DeliveryScheduleContent({appointmentDetails, purchaseOrder, pickupPerson, notes}) {
    const {
        id = '',
        title = '',
        location = 'Warehouse 1',
        startTime = new Date(),
        endTime = new Date(),
        item = {},
    } = appointmentDetails;

    const {
        id: purchaseOrderId,
        cost
    } = purchaseOrder;

    const { delivery = {} } = item;
    const {
        total = 0,
        requestedBy = {},
        deliveryDate = "",
        createdAt = "",
    } = delivery;

    const {
        first_name="",
        last_name=""
    } = requestedBy
    // console.log("Pichup :", pickupPerson);
    // console.log("Appointment Details: ", appointmentDetails);

    const theme = useTheme();

    /**
     * @param scheduleDate - date object
     */
    const getTime = scheduleDate => {
        const date = moment(scheduleDate);
        return date.format('h:mm a');
    };

    // const formatDate = scheduleDate => {
    //     const date = moment(scheduleDate);
    //     return date.format('D/M/YYYY');
    // };

    const getProgressStatus = (deliveryTime) => {
        const now = moment();
        const delivery = moment(deliveryTime);
        const start = moment(startTime);
        const end = moment(endTime);

        if (now.isBefore(delivery)) {
            return 'Not Yet Delivered';
        }

        // if (now.isBefore(end)) {
        //     return 'In Progress';
        // }

        return 'Ended';
    };

    const lineItem = (title, subject, isBold) => (<View>
        <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text
                style={
                    [
                        styles.detailText,
                        {
                            color: '#3182CE',
                            marginRight: 16,
                            fontWeight: isBold ? 'bold' : 'normal'
                        }
                    ]
                }
            > {title} </Text>

            <Text style={[styles.detailText, {color: '#718096'}]}>{subject}</Text>
        </View>
    </View>);

    return (

        <DeliveryCardContainer>

            <CardTitleContainer>
                <TotalStatusContainer theme={theme}>
                    <CardText theme={theme} color="--company" font="--text-base-medium">${currencyFormatter(total)}</CardText>
                    <StatusPill theme={theme}>
                        <CardText theme={theme} color="--color-gray-500" font="--text-xs-medium">{getProgressStatus(deliveryDate)}</CardText>
                    </StatusPill>
                </TotalStatusContainer>

                <TotalStatusContainer style={css`padding-bottom: 0;`}>
                    <CardText font="--text-xl-medium" color="--accent-button">{title}</CardText>
                    <CardText font="--text-xl-medium" color="--company">Delivery</CardText>
                </TotalStatusContainer>
            </CardTitleContainer>

            <DropoffTimeContainer theme={theme}>

                <StackedRecord>
                    <CardText theme={theme} color="--color-gray-600" font="--text-sm-regular" style={css`padding-bottom: 10px;`}>Drop-Off Point</CardText>
                    <CardText theme={theme} color="--color-gray-800" font="--text-base-regular">{location}</CardText>
                </StackedRecord>

                <TimeContainer theme={theme}>

                    <StackedRecord style={css`padding-right: ${theme.space['--space-32']};`}>
                        <CardText theme={theme} color="--color-gray-600" font="--text-sm-regular" style={css`padding-bottom: 10px;`}>Created Date</CardText>
                        <CardText theme={theme} color="--color-gray-800" font="--text-base-regular">{formatDate(startTime, 'DD/MM/YYYY')}</CardText>
                    </StackedRecord>

                    {/* <StackedRecord>
                        <CardText theme={theme} color="--color-gray-600" font="--text-sm-regular" style={css`padding-bottom: 10px;`}>Time</CardText>
                        <CardText theme={theme} color="--color-gray-800" font="--text-base-regular">{formatDate(startTime, 'h:mm a')} - {formatDate(endTime, 'h:mm a')}</CardText>
                    </StackedRecord> */}

                </TimeContainer>

            </DropoffTimeContainer>


            <AppointmentInformation>
                <TotalStatusContainer style={css`padding-bottom: 14px;`}>
                    <CardText font="--text-base-medium" color="--color-blue-600">{title}</CardText>
                    <CardText font="--text-base-medium" color="--company">Purchase Order No.</CardText>
                </TotalStatusContainer>

                <TotalStatusContainer style={css`padding-bottom: 14px;`}>
                    <CardText font="--text-base-medium" color="--color-blue-600">{first_name} {last_name}</CardText>
                    <CardText font="--text-base-medium" color="--company">Requested By</CardText>
                </TotalStatusContainer>

                <TotalStatusContainer style={css`padding-bottom: 0;`}>
                    <CardText font="--text-base-medium" color="--color-blue-600">{formatDate(deliveryDate, 'ddd MMM D, YYYY')}</CardText>
                    <CardText font="--text-base-medium" color="--company">Est. Delivery Date</CardText>
                </TotalStatusContainer>

            </AppointmentInformation>

            <ReviewButtonContainer theme={theme}>
                <Button
                    color={theme.colors['--color-white']}
                    title="Review Order"
                    backgroundColor={theme.colors['--color-blue-500']}
                    onPress={() => {}}
                />
            </ReviewButtonContainer>

        </DeliveryCardContainer>


        // <TouchableOpacity style={{flex: 1,}} activeOpacity={0.5}>
        //     <ScrollView style={styles.container}>

        //             <View style={styles.cardTitle}>

        //                 <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5}}>
        //                     <Text style={styles.idText}>
        //                         ${cost}
        //                     </Text>
        //                     <View style={styles.statusWrapper}>
        //                         <Text style={{
        //                             color: "#A0AEC0",
        //                             fontSize: 12
        //                         }}>
        //                             {getProgressStatus(startTime, endTime)}
        //                         </Text>
        //                     </View>
        //                 </View>

        //                 <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        //                     <Text style={styles.subjectText}>
        //                         {title}
        //                     </Text>
        //                     <Text style={{
        //                         fontSize: 20,
        //                         color: '#104587',
        //                         paddingBottom: 5
        //                     }}>Delivery</Text>
        //                 </View>
        //             </View>

        //             <View style={[styles.doctors]}>

        //                 <View style={styles.cardDescription}>
        //                     <View style={{flexDirection: 'column'}}>
        //                         <Text style={{fontSize: 14, paddingBottom: 10, color: '#718096'}}>Drop-Off Point</Text>
        //                         <Text style={[styles.detailText]}>{location}</Text>
        //                     </View>

        //                     <View style={{flexDirection: 'row'}}>

        //                         <View style={{flexDirection: 'column', marginRight: 15}}>
        //                             <Text style={{fontSize: 14, paddingBottom: 10, color: '#718096'}}>
        //                                 Date
        //                             </Text>
        //                             <Text style={[styles.detailText]}>
        //                                 {formatDate(startTime)}
        //                             </Text>
        //                         </View>

        //                         <View style={{flexDirection: 'column'}}>
        //                             <Text style={{fontSize: 14, paddingBottom: 10, color: '#718096'}}>
        //                                 Time
        //                             </Text>
        //                             <Text style={[styles.detailText]}>
        //                                 {getTime(startTime)} - {getTime(endTime)}
        //                             </Text>
        //                         </View>
        //                     </View>
        //                 </View>

        //                 {/* Additional Information   */}
        //                 <View style={styles.infoSection}>

        //                     <View style={styles.box}>
        //                         {lineItem(pickupPerson, "Pickup Person")}
        //                         <View style={{marginTop: 20}}/>
        //                         {lineItem(purchaseOrderId, "Purchase Order")}
        //                     </View>


        //                     <View style={styles.deliveryNotes}>
        //                         <Text>
        //                             {notes}
        //                         </Text>
        //                     </View>
        //                 </View>

        //             </View>

        //             <View style={{
        //                 position:'absolute',
        //                 right: 0,
        //                 bottom: 0,
        //                 // marginTop: 20,
        //                 // alignSelf: 'flex-end',
        //                 backgroundColor: '#4299E1',
        //                 borderRadius: 8
        //             }}>
        //                 <Button
        //                     color={'white'}
        //                     title={"Review Order"}
        //                     backgroundColor={"#4299E1"}
        //                     onPress={() => {
        //                     }}
        //                 />
        //             </View>


        //     </ScrollView>
        // </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        position: 'relative',
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
    infoSection: {
        flex: 1,
        // height: 100,
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
        borderColor: '#E2E8F0',
        borderRadius: 8,
        padding: 16,
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

DeliveryScheduleContent.propTypes = {};
DeliveryScheduleContent.defaultProps = {};

export default DeliveryScheduleContent;
