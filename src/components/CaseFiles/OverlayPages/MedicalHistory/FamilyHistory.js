import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { FamilyPreExistingConditions } from '../../OverlayCardFrames';
import FrameTableCard from '../../../common/Frames/FrameCards/FrameTableCard'
import { createFamilyHistory, editFamilyHistory, updatePatient, deleteFamilyHistory } from '../../../../api/network';
import FamilyIcon from '../../../../../assets/svg/familyConditions';
import { useModal } from 'react-native-modalfy';
import ConfirmationComponent from '../../../ConfirmationComponent';
const FamilyHistory = ({tabDetails, isEditMode, fetchCase = () => {}, patient, setPageState, pageState}) => {
    const [editable, setEditable] = useState(true)
    const modal = useModal();

    const [familyHistory, setFamilyHistory] = useState(
        tabDetails.map( item => {
            const { relative = "", condition = "", } = item
            //console.log("Items Test", item)
            return { relative, condition}
        })
    );

    const [tabIds, setTabIds] = useState(
        tabDetails.map(item => {
            const { _id = "" } = item
            return _id
        })
    )

    useEffect(() => {
        setFamilyHistory(
            tabDetails.map( item => {
                const { relative = "", condition = "", } = item
                return { relative, condition}
            })
        )
    }, [tabDetails])

    useEffect(()=>{
        isEditMode? null:
        setEditable(true)
    })
    const handeFilter= async (index)=>{
        const filtered = tabDetails[index]._id
        return filtered
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
    const handleDelete = async (index) => {
        console.log("delete")
        const patientId = patient._id;
        const id = await handeFilter(index)
        console.log("ID: ", patientId," + " ,id)
        const container = [];
        tabDetails.filter(item => {
            if (item._id !== id) {
                container.push(item._id)
            }
        });
        
        await deleteFamilyHistory(patientId, {id}).then(response=>{
            updatePatient(patientId, 
                {"medicalInfo.familyHistory": container
            }).then(_ => {
                successModal();
                fetchCase();
            })
        }) 
        setEditable(false)
        
        
    }

    const handleAdd = async (value, type) => {
        const patientId = patient._id;

        await createFamilyHistory(patientId, {value, type}).then(response => {
            updatePatient(patientId, {"medicalInfo.familyHistory": [...tabDetails, response]
            }).then(result => {
                successModal();
                fetchCase()
            })
        })
    }

    const [historyUpdated, setHistoryUpdated] = useState(false);

    const handleEdit = async(rowIndex, innerIndex, value) => {
        const fieldsClone = [...familyHistory]
        let tempVar = fieldsClone[rowIndex]
        const rowNames = ['relative', 'condition']
        tempVar[rowNames[innerIndex]] = value
        
        setHistoryUpdated(true);
        setFamilyHistory(fieldsClone);
    }

    const onChangeValue = () => {

    }
    
    const onEdit =  () => {
        // const container = [];
        // familyHistory.map((item, index) => {
        //     item._id = tabIds[index]
        //     container.push(item)
        // });
        // TODO cleanup this function. looping over api calls is a bad idea

        tabIds.map(async (id, index) => {
            await editFamilyHistory(id, familyHistory[index])
        })

        successModal();
        fetchCase()
        setHistoryUpdated(false)
    }

    useEffect(() => {
        historyUpdated ? onEdit(): null;
    }, [isEditMode])
    
    return ( 
        <ScrollView>

            <View style={styles.frameContainer}>
                <FrameTableCard

                    idArray={tabIds}
                    isEditMode={isEditMode}
                    frameColor = "#DD6B20"
                    handleEdit={handleEdit}
                    titleBackgroundColor = "#FFFAF0"
                    frameBorderColor = "#FBD38D"
                    frameTitle = "Pre-Existing Conditions"
                    cardInformation = {familyHistory}
                    icon = {FamilyIcon}
                    normalInput={true}
                    onAction={(name, condition) => {
                        handleAdd(name, condition)
                    }}
                    editable={editable}
                    onDelete={(index)=>{
                        handleDelete(index)
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