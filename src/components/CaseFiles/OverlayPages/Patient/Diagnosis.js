import React, { useContext } from 'react';
import { ScrollView, Text, StyleSheet } from "react-native";
import {SignsAndSymptoms, Examinations, LaboratoryInvestigations, ProvisionalDiagnosis, FinalDiagnosis, MedicationPrescribed, ImplantedDevices, DiagnosticEvaluations} from '../../OverlayCardFrames'

const Diagnosis = ({tabDetails}) => { 
    const getData = (infoArray) =>{
        const newArray = []
        infoArray.map((item)=>{newArray.push(item.diagnosisData)})
        return newArray
    }

    const signsDetails = tabDetails.filter((item)=>item.type === 'signsAndSymptoms')
    const examinations = tabDetails.filter(item => item.type === 'examinations')
    const diagnostic = tabDetails.filter(item => item.type === 'diagnosticEvaluations')
    const lab = tabDetails.filter(item => item.type === 'laboratoryInvestigations')
    const provisional = tabDetails.filter(item => item.type === 'provisionalDiagnosis')
    const final = tabDetails.filter(item => item.type === 'finalDiagnsois')
    const medication = tabDetails.filter(item => item.type === 'medicationPrescribed')
    const devices = tabDetails.filter(item => item.type === 'implantedDevices') 

   
    return ( 
        <ScrollView>
            <SignsAndSymptoms cardInformation = {getData(signsDetails)}/>
            <Examinations cardInformation = {getData(examinations)}/>
            <DiagnosticEvaluations cardInformation = {getData(diagnostic)}/>
            <LaboratoryInvestigations cardInformation = {getData(lab)}/>
            <ProvisionalDiagnosis cardInformation = {getData(provisional)}/>
            <FinalDiagnosis cardInformation = {getData(final)}/>
            <MedicationPrescribed cardInformation={getData(medication)} />
            <ImplantedDevices cardInformation={getData(devices)} />
        </ScrollView>
    );
}
 
export default Diagnosis;

