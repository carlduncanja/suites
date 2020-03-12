import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Details, Diagnosis, Insurance, PatientRisk} from '../../OverlayPages/Patient'

const Patient = () => {
    const suitesState = useContext(SuitesContext).state
    return (
        suitesState.overlayMenu.selectedMenuItemCurrentTab === 'Details' ?
            <Details/>
            :
            suitesState.overlayMenu.selectedMenuItemCurrentTab === 'Insurance' ?
                <Insurance/>
                :
                suitesState.overlayMenu.selectedMenuItemCurrentTab === 'Diagnosis' ?
                    <Diagnosis/>
                    :
                    <PatientRisk/>        
    );
}
 
export default Patient;

