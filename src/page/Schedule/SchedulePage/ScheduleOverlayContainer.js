import React, {useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {getAppointmentById, getAppointments, getCaseFileById} from '../../../api/network';
import ProcedureScheduleContent from './ProcedureScheduleContent';
import DefaultScheduleContent from './DefaultScheduleContent';
import {colors} from '../../../styles';
import DeliveryScheduleContent from './DeliveryScheduleContent';
import RestockScheduleContent from './RestockScheduleContent';
import {emptyFn} from "../../../const";


const APPOINTMENT_TYPES = {
    SURGERY: 'Procedure',
    DELIVERY: 'Delivery',
    RESTOCK: 'Restock',
    EQUIPMENT: 'Equipment',
    SUPPLIER: 'Supplier',
};

/**
 * Component fetches and prepare the required data for displaying the appointment
 *
 * @param scheduleItem
 * @returns {*}
 * @constructor
 */
function ScheduleOverlayContainer({appointment = {}, closeOverlay = emptyFn}) {

    const [appointmentDetails, setAppointmentDetails] = useState();
    const [isFetchingDetails, setFetchingDetails] = useState(false);
    const [caseFile, setCaseFile] = useState();

    // On Mount
    useEffect(() => {
        // fetch appointment
        // console.log("fetching data for: ", appointment._id);
        setTimeout(() => getAppointment(appointment._id), 200);
    }, []);

    useEffect(() => {
        // fetch addition data for appointment


        if (appointmentDetails) {
            const {type} = appointmentDetails;

            switch (type.name) {
                case APPOINTMENT_TYPES.SURGERY: {
                    // fetch case file info
                    let caseFile = appointmentDetails.item.case;

                    console.log('fetching case');

                    setFetchingDetails(true);
                    getCaseFileById(appointmentDetails.item?.case?._id)
                        .then(response => {
                            setCaseFile(response);
                        })
                        .catch(error => {
                            console.log('Failed to fetch case by id');

                        })
                        .finally(_ => {
                            setFetchingDetails(false);
                        })
                    return;
                }
                default: {

                }
            }
        }

    }, [appointmentDetails])

    const handleCloseOverlay = () => {
        closeOverlay();
    }

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

        const {type = {}} = appointment;
        appointment = {
            ...appointment,
            location: appointment?.location?.name || '--'
        };

        switch (type.name) {
            case APPOINTMENT_TYPES.SURGERY: {

                /**
                 * If No case file was found return default view
                 */
                if (!caseFile) return <DefaultScheduleContent
                    scheduleDetails={appointment}
                />;

                // fetch case file info
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

                const patient = caseFile.patient;

                // console.log("procedure", physicians);
                console.log("caseFile", patient);


                return <ProcedureScheduleContent
                    appointmentDetails={appointment}
                    physicians={physicians}
                    patient={patient}
                    leadPhysicianId={caseFile.staff.leadPhysician}
                    nurses={nurses}
                    closeOverlay={handleCloseOverlay}
                />;
            }
            case APPOINTMENT_TYPES.DELIVERY: {
                return <DeliveryScheduleContent
                    appointmentDetails={appointmentDetails}
                    pickupPerson="Olivia Grant"
                    notes="Jamaica Hospital Suppliers has reported a delay in delivery over the past week, due to some staff being laid off."
                    purchaseOrder={
                        {id: 'PO-0000023', cost: '120,000.00'}
                    }
                />;
            }
            case APPOINTMENT_TYPES.RESTOCK: {
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
            case APPOINTMENT_TYPES.EQUIPMENT:
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
                (appointmentDetails && !isFetchingDetails) ? renderAppointmentDetails(appointmentDetails) : null
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
