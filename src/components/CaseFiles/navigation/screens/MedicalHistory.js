import React, { useContext } from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { FamilyHistory, General, Lifestyle, Other } from '../../OverlayPages/MedicalHistory';

const MedicalHistory = ({
    medicalInfo,
    selectedTab,
    
}) => {
    const { medicalHistory = [], familyHistory = [], lifestyles = [] } = medicalInfo;

    return (
        selectedTab === 'Family History' ?
            <FamilyHistory tabDetails={familyHistory} /> :
            selectedTab === 'Details' ?
                <General tabDetails={medicalHistory} /> :
                selectedTab === 'Lifestyle' ?
                    <Lifestyle tabDetails={lifestyles} /> :
                    <Other tabDetails={[]} />
    );
};

export default MedicalHistory;
