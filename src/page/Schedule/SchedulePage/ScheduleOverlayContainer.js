import React, {useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {getAppointmentById, getAppointments} from '../../../api/network';
import ProcedureScheduleContent from './ProcedureScheduleContent';
import DefaultScheduleContent from './DefaultScheduleContent';
import {colors} from '../../../styles';
import DeliveryScheduleContent from './DeliveryScheduleContent';
import RestockScheduleContent from './RestockScheduleContent';

/**
 * Component fetches and prepare the required data for displaying the appointment
 *
 * @param scheduleItem
 * @returns {*}
 * @constructor
 */
function ScheduleOverlayContainer({appointment = {}}) {
    const [appointmentDetails, setAppointmentDetails] = useState(undefined);
    const [isFetchingDetails, setFetchingDetails] = useState(false);

    // On Mount
    useEffect(() => {
        // fetch appointment
        // console.log("fetching data for: ", appointment._id);

        setTimeout(() => getAppointment(appointment._id), 200);
    }, []);

    const getAppointment = id => {
        setFetchingDetails(true);
        getAppointmentById(id)
            .then(data => {
                console.log('data: ', data);
                setAppointmentDetails(data);
            })
            .catch(error => {
                console.log('failed to get appointment', error);
            })
            .finally(_ => {
                setFetchingDetails(false);
            });
    };

    const renderAppointmentDetails = appointment => {
        const scheduleTypes = {
            SURGERY: 'Procedure',
            DELIVERY: 'Delivery',
            RESTOCK: 'Restock',
            EQUIPMENT: 'Equipment',
            SUPPLIER: 'Supplier',
        };

        const {type = {}} = appointment;
        appointment = {
            ...appointment,
            location: appointment?.location?.name || '--'
        };

        switch (type.name) {
            case scheduleTypes.SURGERY: {
                // todo prepare procedure data.
                const caseFile = appointment.item.case;

                const physicians = caseFile.staff && caseFile.staff.physicians.map(item => ({
                    _id: item._id,
                    firstName: item.firstName,
                    surname: item.surname,
                    position: '',
                    isLead: caseFile.staff.leadPhysician === item._id
                }));

                const nurses = caseFile.staff.nurses.map(item => ({
                    _id: item._Id,
                    firstName: item.first_name,
                    lastName: item.last_name
                }));

                // console.log("procedure", physicians);
                // console.log("caseFile", appointment);

                return <ProcedureScheduleContent
                    appointmentDetails={appointment}
                    physicians={physicians}
                    leadPhysicianId={caseFile.staff.leadPhysician}
                    nurses={nurses}
                />;
            }
            case scheduleTypes.DELIVERY: {
                return <DeliveryScheduleContent
                    appointmentDetails={appointmentDetails}
                    pickupPerson="Olivia Grant"
                    notes="Jamaica Hospital Suppliers has reported a delay in delivery over the past week, due to some staff being laid off."
                    purchaseOrder={
                        {id: 'PO-0000023', cost: '120,000.00'}
                    }
                />;
            }
            case scheduleTypes.RESTOCK: {
                const itemName = appointment.title.replace('Restock ', '');
                // TODO prepare data when models are finalized.

                return <RestockScheduleContent
                    appointmentDetails={appointment}
                    amountInStock={200}
                    capacity={600}
                    amountRequested={200}
                    inventoryItem={{name: itemName}}
                    storageLocation="OR1: Cabinet 3"
                />;
            }
            case scheduleTypes.EQUIPMENT:
            default: {
                // TODO make no appointment found view
                return <DefaultScheduleContent
                    scheduleDetails={appointment}
                />;
            }
        }
    };

    return (
        <View style={styles.container}>
            {
                appointmentDetails ? renderAppointmentDetails(appointmentDetails) : null
            }

            {
                isFetchingDetails ? (
                    <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
                        <ActivityIndicator style={{alignSelf: 'center'}} size="large" color={colors.primary}/>
                    </View>
                ) : null
            }
        </View>
    );
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
});

ScheduleOverlayContainer.propTypes = {};
ScheduleOverlayContainer.defaultProps = {};

export default ScheduleOverlayContainer;
