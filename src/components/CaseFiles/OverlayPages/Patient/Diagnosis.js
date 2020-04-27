import React, { useContext } from 'react';
import { ScrollView, Text, StyleSheet } from "react-native";
import {SignsAndSymptoms, Examinations, LaboratoryInvestigations, ProvisionalDiagnosis, FinalDiagnosis, MedicationPrescribed, ImplantedDevices, DiagnosticEvaluations} from '../../OverlayCardFrames'
import SignsIcon from '../../../../../assets/svg/signsAndSymptomsIcon';
import ExaminationsIcon from '../../../../../assets/svg/examinations';
import DiagnosticIcon from '../../../../../assets/svg/diagnostic';
import LabIcon from '../../../../../assets/svg/lab';
import ProvisionalIcon from '../../../../../assets/svg/provisionalDiagnosis';
import FinalDiagnosisIcon from '../../../../../assets/svg/finalDiagnosis';
import MedicationIcon from '../../../../../assets/svg/medications';
import DevicesIcon from '../../../../../assets/svg/implantedDevices';


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
            <SignsAndSymptoms 
                cardInformation = {getData(signsDetails)}
                icon = {SignsIcon}
            />
            <Examinations 
                cardInformation = {getData(examinations)}
                icon = {ExaminationsIcon}
            />
            <DiagnosticEvaluations 
                cardInformation = {getData(diagnostic)}
                icon = {DiagnosticIcon}
            />
            <LaboratoryInvestigations 
                cardInformation = {getData(lab)}
                icon = {LabIcon}
            />
            <ProvisionalDiagnosis 
                cardInformation = {getData(provisional)}
                icon = {ProvisionalIcon}
            />
            <FinalDiagnosis 
                cardInformation = {getData(final)}
                icon = {FinalDiagnosisIcon}
            />
            <MedicationPrescribed 
                cardInformation={getData(medication)} 
                icon = {MedicationIcon}
            />
            <ImplantedDevices 
                cardInformation={getData(devices)} 
                icon = {DevicesIcon}
            />
        </ScrollView>
    );
}
 
export default Diagnosis;

