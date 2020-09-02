import React, {Component, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import FrameTitle from '../FrameTitle'
import FrameProcedureContent from '../FrameContents/FrameProcedureContent';
import styled from "@emotion/native/";
import IconButton from "../../Buttons/IconButton";
import WasteIcon from "../../../../../assets/svg/wasteIcon";
import {updateCaseProcedureAppointmentCall} from "../../../../api/network";
import ConfirmationComponent from "../../../ConfirmationComponent";
import {useModal} from "react-native-modalfy";
import moment from "moment";
import LoadingComponent from "../../../LoadingComponent";
import {useTheme} from "emotion-theming";

const ProcedureCardWrapper = styled.View`
   flex: 1
`

const ProcedureCardContainer = styled.View`
   flex: 1
`
const ProcedureCardHeader = styled.View`
  height: 41px;
  width: 100%;
`

const ProcedureCardContent = styled.View`
  // background-color: ${({theme}) => {
    theme.colors['--color-default-white']
}};
`


const getAppointmentFields = ({location, startTime, endTime}) => {
    return {
        location,
        startTime,
        duration: getAppointmentDurations({startTime, endTime})
    }
}

const getAppointmentDurations = ({startTime, endTime}) => moment.duration(moment(endTime).diff(moment(startTime))).asHours()


const FrameProcedureCard = ({
                                caseId = "",
                                procedureData = {},
                                icon,
                                onOpenPickList,
                                onRemoveProcedure,
                                isEdit = false,
                            }) => {
    const modal = useModal();
    const theme = useTheme();

    const {title = "__", subject = "__"} = procedureData?.appointment || {}
    const {appointment, procedure, recovery} = procedureData
    const recoveryAppointment = recovery?.appointment || false

    const [hasRecovery, setRecovery] = useState(!!recoveryAppointment);


    // STATES
    const [appointmentFields, setAppointmentFields] = useState(getAppointmentFields(appointment));
    const [recoveryAppointmentFields, setRecoveryAppointmentFields] = useState(getAppointmentFields(recoveryAppointment));
    const [isUpdated, setUpdated] = useState(false);
    const [updating, setUpdating] = useState(false);


    // EVENT HANDLERS

    const onAppointmentFieldsUpdate = (data) => {
        setUpdated(true);
        setAppointmentFields(data)
    }

    const onRecoveryAppointmentFieldsUpdate = (data) => {
        setUpdated(true);
        setRecoveryAppointmentFields(data)
    }


    const handleSaveProcedure = () => {
        const data = {
            duration: appointmentFields.duration,
            location: appointmentFields.location?._id,
            startTime: appointmentFields.startTime,
            recovery: (!hasRecovery ? null : {
                duration: recoveryAppointment.duration,
                location: appointmentFields.location?._id,
                startTime: appointmentFields.startTime
            })
        }

        saveProcedureCall(caseId, procedureData?._id, data);
    }

    // HELPER FUNCTIONS

    const saveProcedureCall = (caseId, procedureId, data) => {
        setUpdating(true);
        updateCaseProcedureAppointmentCall(caseId, procedureId, data)
            .then(_ => {
                console.log('successfully updated procedure appointment: ', procedureId);
                setUpdated(false);
                modal.openModal("ConfirmationModal", {
                    content: (
                        <ConfirmationComponent
                            error={false}
                            isEditUpdate={false}
                            isError={false}
                            onCancel={() => {
                                modal.closeAllModals()
                            }}
                            onAction={() => {
                                modal.closeAllModals()
                            }}
                        />
                    ),
                    onClose: () => {
                        console.log("Modal closed");
                    },
                });
            })
            .catch(error => {
                console.log('Failed to updated case procedure appointment', error.data);
                if (error.response) {
                    console.log(error.response.data);
                    const responseData = error.response?.data || []

                    const errors = responseData.map(item => {
                        return " - " + item.msg
                    }).join('\n')
                    Alert.alert('Failed to create procedure', `${errors}`)
                }
            })
            .finally(_ => {
                setUpdating(false);
            })
    }


    return (
        <ProcedureCardWrapper>
            <ProcedureCardContainer>
                <ProcedureCardHeader>
                    <FrameTitle
                        color={theme.colors['--color-teal-600']}
                        borderColor={theme.colors['--color-teal-300']}
                        backgroundColor={theme.colors['--color-teal-100']}
                        icon={icon}
                        frameTitle={`${title} - ${subject}`}
                        ActionComponent={
                            <IconButton
                                Icon={<WasteIcon strokeColor={!isEdit ? "#B3BDC6" : "#C53030"}/>}
                                onPress={onRemoveProcedure}
                                disabled={isEdit}
                            />
                        }
                    />
                </ProcedureCardHeader>

                <ProcedureCardContent>
                    <FrameProcedureContent
                        isEdit={isEdit}
                        isUpdating={updating}
                        isUpdated={isUpdated}
                        procedure={procedure}
                        appointmentFields={appointmentFields}
                        recoveryAppointment={recoveryAppointmentFields}
                        onOpenPickList={onOpenPickList}
                        onAppointmentFieldsUpdate={onAppointmentFieldsUpdate}
                        onRecoveryFieldUpdate={onRecoveryAppointmentFieldsUpdate}
                        onSavePress={handleSaveProcedure}
                        hasRecovery={hasRecovery}
                        updateRecovery={(value) => setRecovery(value)}
                    />
                </ProcedureCardContent>

            </ProcedureCardContainer>

            {
                updating &&
                <LoadingComponent backgroundColor={theme.colors['--color-transparent']}/>
            }

        </ProcedureCardWrapper>
    );
}

export default FrameProcedureCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8FAFB',
    },
    title: {
        width: '100%'
    },
    content: {
        width: '100%'
    }
})
