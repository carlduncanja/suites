import React, { useContext } from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { FamilyHistory, General, Lifestyle, Other } from '../../OverlayPages/MedicalHistory';
import { PageContext } from '../../../../contexts/PageContext';
const MedicalHistory = ({
    medicalInfo,
    selectedTab,
    fetchCase = () => {},
    patient
}) => {
    const { medicalHistory = [], familyHistory = [], lifestyles = [] } = medicalInfo;
    const {pageState} = useContext(PageContext);
    console.log('god');
    console.log(patient)
    return (
        selectedTab === 'Family History' ?
            <FamilyHistory tabDetails={familyHistory} isEditMode={pageState.isEditMode} patient={patient}/> :
            selectedTab === 'Details' ?
                <General tabDetails={medicalHistory} isEditMode={pageState.isEditMode} fetchCase={fetchCase} patient={patient} /> :
                selectedTab === 'Lifestyle' ?
                    <Lifestyle tabDetails={lifestyles} /> :
                    <Other tabDetails={[]} />
    );
};

export default MedicalHistory;
