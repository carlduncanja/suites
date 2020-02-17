import React, { useContext } from 'react';
import { ScrollView, Text, StyleSheet } from "react-native";
import {SignsAndSymptoms, Examinations, LaboratoryInvestigations, ProvisionalDiagnosis, FinalDiagnosis, MedicationPrescribed, ImplantedDevices, DiagnosticEvaluations} from '../../OverlayCardFrames'

const Diagnosis = () => {
    return ( 
        <ScrollView>
            <SignsAndSymptoms/>
            <Examinations/>
            <DiagnosticEvaluations/>
            <LaboratoryInvestigations/>
            <ProvisionalDiagnosis/>
            <FinalDiagnosis/>
            <MedicationPrescribed/>
            <ImplantedDevices/>
        </ScrollView>
    );
}
 
export default Diagnosis;

