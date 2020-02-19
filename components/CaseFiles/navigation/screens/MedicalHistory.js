import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { FamilyHistory,General,Lifestyle,Other } from '../../OverlayPages/MedicalHistory'

const MedicalHistory = () => {
    const suitesState = useContext(SuitesContext).state
    return (
        suitesState.overlaySelectedMenuTab === 'Family History' ?
            <FamilyHistory/>
            :
            suitesState.overlaySelectedMenuTab === 'General' ?
                <General/>
                :
                suitesState.overlaySelectedMenuTab === 'Lifestyle' ?
                    <Lifestyle/>
                    :
                    <Other/>        
    );
}
 
export default MedicalHistory;

