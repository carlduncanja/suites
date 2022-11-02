import React, { useContext } from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Details } from '../../OverlayPages/MedicalStaff'
import { View, Text } from 'react-native';

const MedicalStaff = ({ staff, selectedTab, isEditMode, }) => {
    
    const handleEdit =()=>{
        console.log("handle edit")
    }
    return (
        selectedTab === 'Details' ?
            <Details tabDetails={staff} isEditMode={isEditMode} handleEdit={handleEdit} />
            :
            <Details tabDetails={staff} isEditMode={isEditMode} />
    );
}

export default MedicalStaff;

