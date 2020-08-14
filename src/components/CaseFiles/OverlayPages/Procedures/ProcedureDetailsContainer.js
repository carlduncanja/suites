import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Modal, TouchableHighlight} from "react-native";
import FrameProcedureCard from '../../../common/Frames/FrameCards/FrameProcedureCard';
import {SuitesContext} from '../../../../contexts/SuitesContext';
import PickListCard from '../../PickList/PickListCard';
import {useModal, withModal} from 'react-native-modalfy';
import ProceduresPickList from '../../ProceduresPickList'
import ProcedureIcon from '../../../../../assets/svg/frameProcedures';
import {PageContext} from "../../../../contexts/PageContext";
import {removeCaseProcedureAppointment} from "../../../../api/network";
import ConfirmationComponent from "../../../ConfirmationComponent";


const ProcedureDetailsContainer = ({tabDetails, caseId}) => {

    const modal = useModal();
    const {pageState, setPageState, fetchCase} = useContext(PageContext);
    const {isEditMode, isLoading} = pageState;


    const setPageLoading = (isLoading) => {
        setPageState({
            ...pageState,
            isLoading,
            isEditMode: false
        })
    }

    // ############# Event Handlers

    const onOpenPickList = (details) => {
        modal.openModal('OverlayInfoModal', {
            overlayContent: <ProceduresPickList
                details={details}
                tabs={["Consumables", "Equipment"]}
            />,
        })
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
                console.log("case procedure appointment removed");
            })
            .catch(error => {
                console.error("Failed to remove case appointment", error);
            })
            .finally(_ => {
                fetchCase(caseId)
            })
    }


    // ############# Data declaration


    return (
        <ScrollView style={{flex: 1, paddingTop: 5}}>
            {
                tabDetails.map((item, index) => {
                    return (
                        <View key={index} style={styles.procedureContainer}>
                            <FrameProcedureCard
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
        </ScrollView>

    );
}

export default ProcedureDetailsContainer;

const styles = StyleSheet.create({
    procedureContainer: {
        marginBottom: 25
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
