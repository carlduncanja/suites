import React, {useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator, Text, TouchableOpacity, View} from "react-native";
import {getAppointmentById, getAppointments} from "../../api/network";
import ProcedureScheduleContent from "./ProcdureScheduleContent";
import DefaultScheduleContent from "../Schedule/DefaultScheduleContent";
import {colors} from "../../styles"
import DeliveryScheduleContent from "./DeliveryScheduleContent";
import RestockScheduleContent from "./RestockScheduleContent";


const surgeryAppointment = {
    "_id": "5e7c4a2e215cafd77c20b83f",
    "scheduleItemID": "5e745cd7c3f41bbb5fe05d67",
    "scheduleType": {
        "_id": "5e74252587c52c172df7dda2",
        "name": "Surgery",
        "color": "red"
    },
    "title": "Adenosine Stress Test For Heart Disease",
    "subject": "Dr. H. Mansingh",
    "startTime": "2020-03-20T06:00:00.000Z",
    "endTime": "2020-03-20T07:00:00.000Z",
    "scheduleItem": {
        "equipments": [
            {
                "_id": "5e74f3b9e657a54f55db8031",
                "equipmentID": "ST/0011",
                "name": "Stethoscope 2",
                "availableOn": "2019-11-10T05:00:00.000Z",
                "description": "In endoscopy, Fibre-optic endoscopes are pliable, highly maneuverable instruments that allow access to channels in the body.",
                "assignedTo": "5e74576d1d266ba865edef03",
                "usage": 12,
                "categories": [
                    "5e743173e06173d14f9d793a",
                    "5e743173e06173d14f9d7939"
                ],
                "supplier": "5e7430cd1a7c737511eef7e4",
                "status": "5e742efa82607fc30fa16fa0",
                "type": "5e742e0dd71d39bd8a589b86",
                "assignmentType": "5e742d76abcfd493bf99033a"
            }
        ],
        "supportedRooms": [],
        "_id": "5e745cd7c3f41bbb5fe05d67",
        "name": "Adenosine Stress Test For Heart Disease",
        "physician": [
            {
                "_id": "5e74576d1d266ba865edef03",
                "firstName": "Harry",
                "middleName": "",
                "surname": "Mansingh",
                "gender": "Male",
                "DOB": "1976-11-10T05:00:00.000Z",
                "phones": [{"$oid": "5e74571f8203b4d892af477d"}, {"$oid": "5e74571f8203b4d892af477e"}, {"$oid": "5e74571f8203b4d892af477f"}],
                "emails": [{"$oid": "5e74570b67c5d7825aece08f"}, {"$oid": "5e74570b67c5d7825aece090"}],
                "addresses": [{"$oid": "5e7456eadf3ed82845f99d1c"}],
                "emergencyContacts": [{"$oid": "5e7456573c8f3c3b4ec8b0ef"}, {"$oid": "5e7456573c8f3c3b4ec8b0f0"}],
                "trn": {"$numberInt": "125618921"},
                "type": {"$oid": "5e745610d712d16e690c3aac"},
                "status": {"$oid": "5e7455a087c3005e2e68d885"}
            }
        ],
        leadPhysicianId: "5e74576d1d266ba865edef03",
        "duration": 3,
        "description": "",
        "needsRecovery": true,
        "custom": true
    }
};

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

        setTimeout(() => getAppointment(appointment._id), 200)

    }, []);

    const getAppointment = (id) => {
        setFetchingDetails(true);
        getAppointmentById(id)
            .then(data => {
                console.log("data: ", data);
                setAppointmentDetails(data);
            })
            .catch(error => {
                console.log("failed to get appointment", error);
            })
            .finally(_ => {
                setFetchingDetails(false)
            });
    }

    const renderAppointmentDetails = (appointment) => {
        const scheduleTypes = {
            SURGERY: 'Procedure',
            DELIVERY: 'Delivery',
            RESTOCK: 'Restock',
            EQUIPMENT: 'Equipment',
            SUPPLIER: "Supplier",
        };

        const {type = {}} = appointment;
        appointment = {
            ...appointment,
            location: appointment?.location?.name || "--"
        }

        switch (type.name) {
            case scheduleTypes.SURGERY: {

                // todo prepare procedure data.
                const caseFile = appointment.item.case;
          
                const physicians = caseFile.staff && caseFile.staff.physicians.map( item => ({
                    _id: item._id,
                    firstName: item.firstName,
                    surname: item.surname,
                    position: "",
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
                />
            }
            case scheduleTypes.DELIVERY: {
                return <DeliveryScheduleContent
                    appointmentDetails={appointmentDetails}
                    pickupPerson={"Olivia Grant"}
                    notes={"Jamaica Hospital Suppliers has reported a delay in delivery over the past week, due to some staff being laid off."}
                    purchaseOrder={
                        {id: "PO-0000023", cost: "120,000.00"}
                    }
                />
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
                    storageLocation={"OR1: Cabinet 3"}
                />
            }
            case scheduleTypes.EQUIPMENT:
            default: {
                // TODO make no appointment found view
                return <DefaultScheduleContent
                    scheduleDetails={appointment}
                />
            }
        }
    };

    return (
        <View style={styles.container}>
            {
                appointmentDetails
                    ? renderAppointmentDetails(appointmentDetails)
                    : null
            }

            {
                isFetchingDetails
                    ? <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
                        <ActivityIndicator style={{alignSelf: 'center'}} size="large" color={colors.primary}/>
                    </View>
                    : null
            }
        </View>
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
});

ScheduleOverlayContainer.propTypes = {};
ScheduleOverlayContainer.defaultProps = {};

export default ScheduleOverlayContainer;
