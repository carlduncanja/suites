import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { FamilyHistory,General,Lifestyle,Other } from '../../OverlayPages/MedicalHistory'

const MedicalHistory = () => {
    const [state] = useContext(SuitesContext)
    const name = state.overlayMenu.selectedMenuItemTabs[state.overlayMenu.selectedMenuItemCurrentTab]
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

