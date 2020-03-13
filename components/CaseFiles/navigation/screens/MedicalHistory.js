import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { FamilyHistory,General,Lifestyle,Other } from '../../OverlayPages/MedicalHistory'

const MedicalHistory = () => {
    const suitesState = useContext(SuitesContext).state
    const name = suitesState.overlayMenu.selectedMenuItemTabs[suitesState.overlayMenu.selectedMenuItemCurrentTab]
    return (
        name === 'Family History' ?
            <FamilyHistory/>
            :
            name === 'General' ?
                <General/>
                :
                name === 'Lifestyle' ?
                    <Lifestyle/>
                    :
                    <Other/>        
    );
}
 
export default MedicalHistory;

