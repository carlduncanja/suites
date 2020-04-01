import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Details, Diagnosis, Insurance, PatientRisk} from '../../OverlayPages/Patient'

const Patient = () => {
    const [state] = useContext(SuitesContext)
    const selected = state.selectedListItem.selectedListObject
    const patientDetails = selected.patient
    const insuranceDetails = patientDetails.insurance
    const diagnosisDetails = selected.diagnosis
    const patientRisks = selected.patientRisks
    const name = state.overlayMenu.selectedMenuItemCurrentTab

    return (
        name === 'Details' ?
            <Details tabDetails = {patientDetails}/>
            :
            name === 'Insurance' ?
                <Insurance tabDetails = {insuranceDetails}/>
                :
                name === 'Diagnosis' ?
                    <Diagnosis tabDetails = {diagnosisDetails}/>
                    :
                    <PatientRisk tabDetails = {patientRisks}/>        
    );
}
 
export default Patient;

