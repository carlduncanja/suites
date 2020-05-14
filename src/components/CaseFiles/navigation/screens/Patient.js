import React,{useContext} from 'react';
import { View } from "react-native";
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Details, Diagnosis, Insurance, PatientRisk} from '../../OverlayPages/Patient'

const Patient = ({ patient, selectedTab }) => {
    const { insurance = {} , medicalInfo = {} } = patient
    const { diagnosis = [], risks = [] } = medicalInfo

    return ( 
        selectedTab === 'Details' ?
            <Details tabDetails = {patient}/>
            :
            selectedTab === 'Insurance' ?
                <Insurance tabDetails = {insurance}/>
                :
                selectedTab === 'Diagnosis' ?
                    <Diagnosis tabDetails = {diagnosis}/>
                    :
                    <PatientRisk tabDetails = {risks}/>        
    );
}
 
export default Patient;

