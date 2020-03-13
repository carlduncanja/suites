import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Details, Diagnosis, Insurance, PatientRisk} from '../../OverlayPages/Patient'

const Patient = () => {
    const suitesState = useContext(SuitesContext).state
    const name = suitesState.overlayMenu.selectedMenuItemTabs[suitesState.overlayMenu.selectedMenuItemCurrentTab]
    return (
        name === 'Details' ?
            <Details/>
            :
            name === 'Insurance' ?
                <Insurance/>
                :
                name === 'Diagnosis' ?
                    <Diagnosis/>
                    :
                    <PatientRisk/>        
    );
}
 
export default Patient;

