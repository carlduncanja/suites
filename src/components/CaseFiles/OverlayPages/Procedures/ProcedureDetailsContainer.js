import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Modal, TouchableHighlight, Alert} from "react-native";
import FrameProcedureCard from '../../../common/Frames/FrameCards/FrameProcedureCard';
import {useModal} from 'react-native-modalfy';
import ProceduresPickList from '../../ProceduresPickList'
import ProcedureIcon from '../../../../../assets/svg/frameProcedures';
import {PageContext} from "../../../../contexts/PageContext";
import {removeCaseProcedureAppointment, updateCaseProcedureAppointmentCall} from "../../../../api/network";
import ConfirmationComponent from "../../../ConfirmationComponent";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {reload} from "expo/build/Updates/Updates";


const ProcedureDetailsContainer = ({tabDetails, caseId, proceduresBillableItems}) => {

    const modal = useModal();
    const {pageState, setPageState, fetchCase} = useContext(PageContext);
    const {isEditMode} = pageState;
 
    useEffect(() => {
        setProcedureAppointment(tabDetails);
    }, [tabDetails])

    const [procedureAppointments, setProcedureAppointment] = useState(tabDetails);

    const setPageLoading = (isLoading) => {
        setPageState({
            ...pageState,
            isLoading,
            isEditMode: false
        })
    }
    

    // ############# Event Handlers

    const onOpenPickList = (details) => {
        
        const filterProcedures = proceduresBillableItems.filter( item => item?.procedureId._id === details._id);
        
        modal.openModal('OverlayInfoModal', {
            overlayContent: <ProceduresPickList
                details={details}
                pickListData = {filterProcedures[0]}
                tabs={["Consumables", "Equipment"]}
            />,
        })
    }

    const removeProcedureAppointment = (procedureId) => {
        let updated = [...procedureAppointments]
        updated = updated.filter(item => item._id !== procedureId)
        setProcedureAppointment(updated)
    }

    const handleRemoveProcedure = (procedure) => () => {
        if (!isEditMode) return;

        // removeProcedureCall(caseId, procedure._id)
        // return

        // bring up confirmation screen.
        modal.openModal("ConfirmationModal", {
            content: (
                <ConfirmationComponent
                    error={false}//boolean to show whether an error icon or success icon
                    isEditUpdate={true}
                    onCancel={() => {
                        modal.closeAllModals()
                    }}
                    onAction={() => {
                        modal.closeAllModals()
                        removeProcedureCall(caseId, procedure._id)
                    }}
                    message="Do you wish to remove this appointment?"//general message you can send to be displayed
                    action="Yes"
                />
            ),
            onClose: () => {
                console.log("Modal closed");
            },
        });
    }

    const removeProcedureCall = (caseId, procedureId) => {
        // REMOVE PROCEDURE CALL
        setPageLoading(true);
        removeCaseProcedureAppointment(caseId, procedureId)
            .then(_ => {
                removeProcedureAppointment(procedureId);
            })
            .catch(error => {
                console.log("Failed to remove case appointment", error);
            })
            .finally(_ => {
                fetchCase(caseId)
                setPageLoading(false);
            })
    }

    // ############# Data declaration

    return (
        <KeyboardAwareScrollView
            style={{flex: 1, backgroundColor: 'none'}}
            contentInset={{bottom: 300}}
            extraScrollHeight={200}
        >
                {
                    procedureAppointments.map((item) => {
                        
                        return (
                            <View key={item._id} style={styles.procedureContainer}>
                                <FrameProcedureCard
                                    caseId={caseId}
                                    procedureData={item}
                                    icon={ProcedureIcon}
                                    isEdit={isEditMode}
                                    onOpenPickList={onOpenPickList}
                                    onRemoveProcedure={handleRemoveProcedure(item)}
                                />
                            </View>
                        )
                    })
                }
        </KeyboardAwareScrollView>

    );
}

export default ProcedureDetailsContainer;

const styles = StyleSheet.create({
    procedureContainer: {
        marginBottom: 25,
        flex: 1
    },
    shadowContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
    },
    pickListContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
    }
})
