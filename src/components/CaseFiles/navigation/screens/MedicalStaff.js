import React, { useContext } from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Details } from '../../OverlayPages/MedicalStaff'
import { View, Text } from 'react-native';
import ConfirmationCheckBoxComponent from '../../../../components/ConfirmationCheckBoxComponent';

const MedicalStaff = ({ staff, selectedTab, isEditMode,modal }) => {
    console.log("the staff",staff)
    const handleEdit =()=>{
        console.log("handle edit")
    } 

    const handleDelete =( data )=>{
        console.log("the real data",data)
        openDeletionConfirm({ids: ""});
        
    }  
    
    const openDeletionConfirm = data => {
        modal.openModal(
            'ConfirmationModal',
            { 
                content: <ConfirmationCheckBoxComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={() => modal.closeModals('ConfirmationModal')}
                    onAction={() => {
                        modal.closeModals('ConfirmationModal');
                        removePhysicianCall(data);
                    }}
                    // onAction = { () => confirmAction()}
                    message="Do you want to delete these item(s)?"
                />,
                onClose: () => {
                    modal.closeModals('ConfirmationModal');
                }
            }
        );
    };

    
    return (
        selectedTab === 'Details' ?
            <Details tabDetails={staff} isEditMode={isEditMode} handleEdit={handleEdit} onDelete={handleDelete} />
            :
            <Details tabDetails={staff} isEditMode={isEditMode} />
    );
}

export default MedicalStaff;

