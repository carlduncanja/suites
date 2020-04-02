import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Details, Diagnosis, Insurance, PatientRisk} from '../../OverlayPages/Patient'

const Patient = () => {
    const [state] = useContext(SuitesContext)
    const selected = state.selectedListItem.selectedListObject
    const insuranceDetails = selected.caseFileDetails.patient.insurance
    const diagnosisDetails = selected.caseFileDetails.diagnosis
    const patientRisks = selected.caseFileDetails.patientRisks
    const name = state.overlayMenu.selectedMenuItemCurrentTab

    return (
        name === 'Details' ?
            <Details tabDetails = {selected}/>
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

