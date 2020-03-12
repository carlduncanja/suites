import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { FamilyHistory,General,Lifestyle,Other } from '../../OverlayPages/MedicalHistory'

const MedicalHistory = () => {
    const suitesState = useContext(SuitesContext).state
    return (
        suitesState.overlayMenu.selectedMenuItemCurrentTab === 'Family History' ?
            <FamilyHistory/>
            :
            suitesState.overlayMenu.selectedMenuItemCurrentTab === 'General' ?
                <General/>
                :
                suitesState.overlayMenu.selectedMenuItemCurrentTab === 'Lifestyle' ?
                    <Lifestyle/>
                    :
                    <Other/>        
    );
}
 
export default MedicalHistory;

