import React,{useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import FrameCard from '../common/Frames/FrameCards/FrameCard';
import FrameImageCard from '../common/Frames/FrameCards/FrameImageCard';
import FrameTableCard from '../common/Frames/FrameCards/FrameTableCard';
import FrameMixedTableCard from '../common/Frames/FrameCards/FrameMixedTableCard';
import { SuitesContext } from '../../contexts/SuitesContext';

export function SignsAndSymptoms({cardInformation}) {
    const suitesState = useContext(SuitesContext).state
    
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#3182CE"
                titleBackgroundColor = "#EBF8FF"
                frameBorderColor = "#90CDF4"
                frameTitle = "Signs and Symptoms"
                cardInformation = {suitesState.overlayTabInfo.signsAndSymptoms}
                frameIconName = "signsAndSymptoms"
            />
        </View>
    )
    
}

export function Examinations(){
    const suitesState = useContext(SuitesContext).state
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#319795"
                titleBackgroundColor = "#E6FFFA"
                frameBorderColor = "#4FD1C5"
                frameTitle = "Examinations"
                cardInformation = {suitesState.overlayTabInfo.examinations}
                frameIconName = "examinations"
            />
        </View>
        
    )
}

export function DiagnosticEvaluations(){
    const suitesState = useContext(SuitesContext).state
    return(
        <View style={styles.frameContainer}>
            <FrameImageCard
                frameColor = "#5A67D8"
                titleBackgroundColor = "#EBF4FF"
                frameBorderColor = "#A3BFFA"
                frameTitle = "Diagnostic Evaluations"
                cardInformation = {suitesState.overlayTabInfo.diagnosticEvaluations}
                frameIconName = "diagnosticEvaluations"
            />
        </View>
    )
}

export function LaboratoryInvestigations(){
    const suitesState = useContext(SuitesContext).state
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#319795"
                titleBackgroundColor = "#E6FFFA"
                frameBorderColor = "#4FD1C5"
                frameTitle = "Laboratory Investigations"
                cardInformation = {suitesState.overlayTabInfo.laboratoryInvestigations}
                frameIconName = "laboratoryInvestigations"
            />
        </View>
        
    )
}

export function ProvisionalDiagnosis(){
    const suitesState = useContext(SuitesContext).state
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#DD6B20"
                titleBackgroundColor = "#FFFAF0"
                frameBorderColor = "#FBD38D"
                frameTitle = "Provisional Diagnosis"
                cardInformation = {suitesState.overlayTabInfo.provisionalDiagnosis}
                frameIconName = "provisionalDiagnosis"
            />
        </View>
        
    )
}

export function FinalDiagnosis(){
    const suitesState = useContext(SuitesContext).state
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#38A169"
                titleBackgroundColor = "#F0FFF4"
                frameBorderColor = "#9AE6B4"
                frameTitle = "Final Diagnosis"
                cardInformation = {suitesState.overlayTabInfo.finalDiagnosis}
                frameIconName = "finalDiagnosis"
            />
        </View>
        
    )
}

export function MedicationPrescribed(){
    const suitesState = useContext(SuitesContext).state
    return(
        <View style={styles.frameContainer}>
             <FrameCard
                frameColor = "#E53E3E"
                titleBackgroundColor = "#FFF5F5"
                frameBorderColor = "#FEB2B2"
                frameTitle = "Medication Prescribed"
                cardInformation = {suitesState.overlayTabInfo.medicationPrescribed}
                frameIconName = "medicationPrescribed"
            />
        </View>
       
    )
}

export function ImplantedDevices(){
    const suitesState = useContext(SuitesContext).state
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#3182CE"
                titleBackgroundColor = "#EBF8FF"
                frameBorderColor = "#90CDF4"
                frameTitle = "Implanted Devices"
                cardInformation = {suitesState.overlayTabInfo.implantedDevices}
                frameIconName = "implantedDevices"
            />
        </View>
        
    )
}

export function Physicians(){
    const suitesState = useContext(SuitesContext).state
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#3182CE"
                titleBackgroundColor = "#EBF8FF"
                frameBorderColor = "#90CDF4"
                frameTitle = "Physicians"
                cardInformation = {suitesState.overlayTabInfo.physicians}
                frameIconName = "medicalStaff"
                iconFillColor = "#4299E1"
            />
        </View>
        
    )
}

export function Nurses(){
    const suitesState = useContext(SuitesContext).state
    return(
        <View style={styles.frameContainer}>
             <FrameCard
                frameColor = "#E53E3E"
                titleBackgroundColor = "#FFF5F5"
                frameBorderColor = "#FEB2B2"
                frameTitle = "Nurses"
                cardInformation = {suitesState.overlayTabInfo.nurses}
                frameIconName = "medicalStaff"
                iconFillColor = "#F56565"
            />
        </View>
       
    )
}

export function Allergies(){
    const suitesState = useContext(SuitesContext).state
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#805AD5"
                titleBackgroundColor = "#FAF5FF"
                frameBorderColor = "#D6BCFA"
                frameTitle = "Allergies"
                cardInformation = {suitesState.overlayTabInfo.allergies}
                frameIconName = "allergies"
            />
        </View>
        
    )
}

export function PreExistingConditions(){
    const suitesState = useContext(SuitesContext).state
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#DD6B20"
                titleBackgroundColor = "#FFFAF0"
                frameBorderColor = "#FBD38D"
                frameTitle = "Pre-Existing Conditions"
                cardInformation = {suitesState.overlayTabInfo.preExistingConditions}
                frameIconName = "preExistingConditions"
            />
        </View> 
    )
}

export function Immunisations(){
    const suitesState = useContext(SuitesContext).state
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#3182CE"
                titleBackgroundColor = "#EBF4FF"
                frameBorderColor = "#A3BFFA"
                frameTitle = "Immunisations"
                cardInformation = {suitesState.overlayTabInfo.immunisations}
                frameIconName = "immunisations"
            />
        </View> 
    )
}

export function Medications(){
    const suitesState = useContext(SuitesContext).state
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#E53E3E"
                titleBackgroundColor = "#FFF5F5"
                frameBorderColor = "#FEB2B2"
                frameTitle = "Medications"
                cardInformation = {suitesState.overlayTabInfo.medications}
                frameIconName = "medications"
            />
        </View> 
    )
}

export function Procedures(){
    const suitesState = useContext(SuitesContext).state
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#38A169"
                titleBackgroundColor = "#F0FFF4"
                frameBorderColor = "#9AE6B4"
                frameTitle = "Procedures"
                cardInformation = {suitesState.overlayTabInfo.procedures}
                frameIconName = "overlayProcedures"
            />
        </View> 
    )
}

export function MedicalHistoryImplantedDevices(){
    const suitesState = useContext(SuitesContext).state
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#3182CE"
                titleBackgroundColor = "#EBF8FF"
                frameBorderColor = "#90CDF4"
                frameTitle = "Implanted Devices"
                cardInformation = {suitesState.overlayTabInfo.implantedDevices}
                frameIconName = "implantedDevices"
            />
        </View> 
    )
}

export function FamilyPreExistingConditions(){
    const suitesState = useContext(SuitesContext).state
    return(
        <View style={styles.frameContainer}>
            <FrameTableCard
                frameColor = "#DD6B20"
                titleBackgroundColor = "#FFFAF0"
                frameBorderColor = "#FBD38D"
                frameTitle = "Pre-Existing Conditions"
                cardInformation = {suitesState.overlayTabInfo.preExistingConditions}
                frameIconName = "familyPreExistingConditions"
            />
        </View> 
    )
}

export function OtherNotableConditions(){
    const suitesState = useContext(SuitesContext).state
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#DD6B20"
                titleBackgroundColor = "#FFFAF0"
                frameBorderColor = "#FBD38D"
                frameTitle = "Other Notable Conditions"
                cardInformation = {suitesState.overlayTabInfo.otherNotableConditions}
                frameIconName = "otherNotableConditions"
            />
        </View>
    )
}

export function DrugUse(){
    const suitesState = useContext(SuitesContext).state
    return(
        <View style={styles.frameContainer}>
            <FrameMixedTableCard
                frameColor = "#805AD5"
                titleBackgroundColor = "#FAF5FF"
                frameBorderColor = "#D6BCFA"
                frameTitle = "Drug Use"
                cardInformation = {suitesState.overlayTabInfo.drug}
                frameIconName = "drugUse"
            />
        </View>
    )
}

export function AlcoholUse(){
    const suitesState = useContext(SuitesContext).state
    return(
        <View style={styles.frameContainer}>
            <FrameMixedTableCard
                frameColor = "#E53E3E"
                titleBackgroundColor = "#FFF5F5"
                frameBorderColor = "#FEB2B2"
                frameTitle = "Alcohol Use"
                cardInformation = {suitesState.overlayTabInfo.alcohol}
                frameIconName = "alcoholUse"
            />
        </View>
    )
}
export function TobaccoUse(){
    const suitesState = useContext(SuitesContext).state
    return(
        <View style={styles.frameContainer}>
            <FrameMixedTableCard
                frameColor = "#4E5664"
                titleBackgroundColor = "#EEF2F6"
                frameBorderColor = "#A0AEC0"
                frameTitle = "Tobacco Use"
                cardInformation = {suitesState.overlayTabInfo.tobacco}
                frameIconName = "tobaccoUse"
            />
        </View>
    )
}



const styles = StyleSheet.create({
    frameContainer:{
        marginBottom:20
    }
})