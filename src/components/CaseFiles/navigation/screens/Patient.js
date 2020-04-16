import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Details, Diagnosis, Insurance, PatientRisk} from '../../OverlayPages/Patient'

const Patient = ({ item, selectedTab }) => {
    const [state] = useContext(SuitesContext)
    const insuranceDetails = item.caseFileDetails.patient.insurance
    const diagnosisDetails = item.caseFileDetails.diagnosis
    const patientRisks = item.caseFileDetails.patientRisks
    const name = selectedTab
  
    
    return (
        name === 'Details' ?
            <Details tabDetails = {item}/>
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

