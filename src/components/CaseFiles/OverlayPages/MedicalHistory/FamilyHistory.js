import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { FamilyPreExistingConditions } from '../../OverlayCardFrames';
import FrameTableCard from '../../../common/Frames/FrameCards/FrameTableCard'
import { createFamilyHistory, editFamilyHistory, updatePatient } from '../../../../api/network';
import FamilyIcon from '../../../../../assets/svg/familyConditions';


const FamilyHistory = ({tabDetails, isEditMode, fetchCase = () => {}, patient}) => {
    const familyHistory = tabDetails.map( item => {
        const { relative = "", condition = "" } = item
        //console.log("Items Test", item)
        return { relative, condition}
    })

    const handleAdd = async (value, type) => {
        const patientId = patient._id;

        await createFamilyHistory(patientId, {value, type}).then(response => {
            updatePatient(patientId, {medicalInfo: {
                familyHistory: [...tabDetails, response]
            }}).then(result => {
                fetchCase()
            })
        })
    }


    
    const successModal = () => {
        modal.openModal(
            'ConfirmationModal', {
            content: <ConfirmationComponent
                isError={false}
                isEditUpdate={false}
                onAction={() => {
                    modal.closeModals('ConfirmationModal');
                }}
                onCancel={() => {
                    modal.closeModals('ConfirmationModal');
                }}
            />,
            onClose: () => {
                modal.closeModal('ConfirmationModal')
            }
        }
        );
    }

    const handleEdit = async(id, relative, condition) => {
        await editFamilyHistory(id, {relative, condition}).then(res => {
            //successModal();
            fetchCase();
        })
    }

    const onChangeValue = () => {

    }
    
    const tabIds = tabDetails.map(item => {
        const { _id = "" } = item
        return _id
    })

    return ( 
        <ScrollView>

            <View style={styles.frameContainer}>
                <FrameTableCard

                    idArray={tabIds}
                    isEditMode={isEditMode}
                    frameColor = "#DD6B20"
                    onEdit = {handleEdit}
                    titleBackgroundColor = "#FFFAF0"
                    frameBorderColor = "#FBD38D"
                    frameTitle = "Pre-Existing Conditions"
                    cardInformation = {familyHistory}
                    icon = {FamilyIcon}
                    normalInput={true}
                    onAction={(name, condition) => {
                        handleAdd(name, condition)
                    }}

                />
            </View> 

        </ScrollView>
    );
}
 
export default FamilyHistory;

const styles = StyleSheet.create({
    frameContainer:{
        marginBottom: 20
    }
})