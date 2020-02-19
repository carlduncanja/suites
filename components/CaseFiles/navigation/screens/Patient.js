import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Details, Diagnosis, Insurance, PatientRisk} from '../../OverlayPages/Patient'

const Patient = () => {
    const suitesState = useContext(SuitesContext).state
    return (
        suitesState.overlaySelectedMenuTab === 'Details' ?
            <Details/>
            :
            suitesState.overlaySelectedMenuTab === 'Insurance' ?
                <Insurance/>
                :
                suitesState.overlaySelectedMenuTab === 'Diagnosis' ?
                    <Diagnosis/>
                    :
                    <PatientRisk/>        
    );
}
 
export default Patient;

