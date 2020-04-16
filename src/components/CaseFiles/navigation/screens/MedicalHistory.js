import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { FamilyHistory,General,Lifestyle,Other } from '../../OverlayPages/MedicalHistory' 

const MedicalHistory = ({ item, selectedTab }) => {
    const [state] = useContext(SuitesContext)
    const name = selectedTab
    const selected = item.caseFileDetails.medical
    const general = selected.medicalHistory
    const family = selected.familyHistory
    const lifestyle = selected.lifeStyleHistory
    
    return (
        name === 'Family History' ?
            <FamilyHistory tabDetails = {family}/>
            :
            name === 'General' ?
                <General tabDetails={general} />
                :
                name === 'Lifestyle' ?
                    <Lifestyle tabDetails={lifestyle} />
                    :
                    <Other tabDetails = {[]}/>        
    );
}
 
export default MedicalHistory;

