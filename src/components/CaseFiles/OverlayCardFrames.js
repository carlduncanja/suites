import React,{useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import FrameCard from '../common/Frames/FrameCards/FrameCard';
import FrameImageCard from '../common/Frames/FrameCards/FrameImageCard';
import FrameTableCard from '../common/Frames/FrameCards/FrameTableCard';
import FrameMixedTableCard from '../common/Frames/FrameCards/FrameMixedTableCard';
import { SuitesContext } from '../../contexts/SuitesContext';
import FrameLifestyleCard from '../common/Frames/FrameCards/FrameLifestyleCard';

export function SignsAndSymptoms({cardInformation}) {
    const [state] = useContext(SuitesContext)
    // console.log("Card Information:", cardInformation) 
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#3182CE"
                titleBackgroundColor = "#EBF8FF"
                frameBorderColor = "#90CDF4"
                frameTitle = "Signs and Symptoms"
                cardInformation = {cardInformation}
                frameIconName = "signsAndSymptoms"
            />
        </View>
    )
    
}

export function Examinations({cardInformation}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#319795"
                titleBackgroundColor = "#E6FFFA"
                frameBorderColor = "#4FD1C5"
                frameTitle = "Examinations"
                cardInformation = {cardInformation}
                frameIconName = "examinations"
            />
        </View>
        
    )
}

export function DiagnosticEvaluations({cardInformation}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameImageCard
                frameColor = "#5A67D8"
                titleBackgroundColor = "#EBF4FF"
                frameBorderColor = "#A3BFFA"
                frameTitle = "Diagnostic Evaluations"
                cardInformation = {cardInformation}
                frameIconName = "diagnosticEvaluations"
            />
        </View>
    )
}

export function LaboratoryInvestigations({cardInformation}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#319795"
                titleBackgroundColor = "#E6FFFA"
                frameBorderColor = "#4FD1C5"
                frameTitle = "Laboratory Investigations"
                cardInformation = {cardInformation}
                frameIconName = "laboratoryInvestigations"
            />
        </View>
        
    )
}

export function ProvisionalDiagnosis({cardInformation}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#DD6B20"
                titleBackgroundColor = "#FFFAF0"
                frameBorderColor = "#FBD38D"
                frameTitle = "Provisional Diagnosis"
                cardInformation = {cardInformation}
                frameIconName = "provisionalDiagnosis"
            />
        </View>
        
    )
}

export function FinalDiagnosis({cardInformation}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#38A169"
                titleBackgroundColor = "#F0FFF4"
                frameBorderColor = "#9AE6B4"
                frameTitle = "Final Diagnosis"
                cardInformation = {cardInformation}
                frameIconName = "finalDiagnosis"
            />
        </View>
        
    )
}

export function MedicationPrescribed({cardInformation}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
             <FrameCard
                frameColor = "#E53E3E"
                titleBackgroundColor = "#FFF5F5"
                frameBorderColor = "#FEB2B2"
                frameTitle = "Medication Prescribed"
                cardInformation = {cardInformation}
                frameIconName = "medicationPrescribed"
            />
        </View>
       
    )
}

export function ImplantedDevices({cardInformation}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#3182CE"
                titleBackgroundColor = "#EBF8FF"
                frameBorderColor = "#90CDF4"
                frameTitle = "Implanted Devices"
                cardInformation = {cardInformation}
                frameIconName = "implantedDevices"
            />
        </View>
        
    )
}

export function Physicians({cardInformation}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#3182CE"
                titleBackgroundColor = "#EBF8FF"
                frameBorderColor = "#90CDF4"
                frameTitle = "Physicians"
                cardInformation = {cardInformation}
                frameIconName = "medicalStaff"
                iconFillColor = "#4299E1"
            />
        </View>
        
    )
}

export function Nurses({cardInformation}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
             <FrameCard
                frameColor = "#E53E3E"
                titleBackgroundColor = "#FFF5F5"
                frameBorderColor = "#FEB2B2"
                frameTitle = "Nurses"
                cardInformation = {cardInformation}
                frameIconName = "medicalStaff"
                iconFillColor = "#F56565"
            />
        </View>
       
    )
}

export function Allergies({cardInformation}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#805AD5"
                titleBackgroundColor = "#FAF5FF"
                frameBorderColor = "#D6BCFA"
                frameTitle = "Allergies"
                cardInformation = {cardInformation}
                frameIconName = "allergies"
            />
        </View>
        
    )
}

export function PreExistingConditions({cardInformation}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#DD6B20"
                titleBackgroundColor = "#FFFAF0"
                frameBorderColor = "#FBD38D"
                frameTitle = "Pre-Existing Conditions"
                cardInformation = {cardInformation}
                frameIconName = "preExistingConditions"
            />
        </View> 
    )
}

export function Immunisations({cardInformation}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#3182CE"
                titleBackgroundColor = "#EBF4FF"
                frameBorderColor = "#A3BFFA"
                frameTitle = "Immunisations"
                cardInformation = {cardInformation}
                frameIconName = "immunisations"
            />
        </View> 
    )
}

export function Medications({cardInformation}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#E53E3E"
                titleBackgroundColor = "#FFF5F5"
                frameBorderColor = "#FEB2B2"
                frameTitle = "Medications"
                cardInformation = {cardInformation}
                frameIconName = "medications"
            />
        </View> 
    )
}

export function Procedures({cardInformation}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#38A169"
                titleBackgroundColor = "#F0FFF4"
                frameBorderColor = "#9AE6B4"
                frameTitle = "Procedures"
                cardInformation = {cardInformation}
                frameIconName = "overlayProcedures"
            />
        </View> 
    )
}

export function MedicalHistoryImplantedDevices({cardInformation}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#3182CE"
                titleBackgroundColor = "#EBF8FF"
                frameBorderColor = "#90CDF4"
                frameTitle = "Implanted Devices"
                cardInformation = {cardInformation}
                frameIconName = "implantedDevices"
            />
        </View> 
    )
}

export function FamilyPreExistingConditions({cardInformation}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameTableCard
                frameColor = "#DD6B20"
                titleBackgroundColor = "#FFFAF0"
                frameBorderColor = "#FBD38D"
                frameTitle = "Pre-Existing Conditions"
                cardInformation = {cardInformation}
                frameIconName = "familyPreExistingConditions"
            />
        </View> 
    )
}

export function OtherNotableConditions({cardInformation}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#DD6B20"
                titleBackgroundColor = "#FFFAF0"
                frameBorderColor = "#FBD38D"
                frameTitle = "Other Notable Conditions"
                cardInformation = {cardInformation}
                frameIconName = "otherNotableConditions"
            />
        </View>
    )
}

export function DrugUse({cardInformation}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameLifestyleCard
                frameColor = "#805AD5"
                titleBackgroundColor = "#FAF5FF"
                frameBorderColor = "#D6BCFA"
                frameTitle = "Drug Use"
                cardInformation = {cardInformation}
                frameIconName = "drugUse"
            />
        </View>
    )
}

export function AlcoholUse({cardInformation}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameLifestyleCard
                frameColor = "#E53E3E"
                titleBackgroundColor = "#FFF5F5"
                frameBorderColor = "#FEB2B2"
                frameTitle = "Alcohol Use"
                cardInformation = {cardInformation}
                frameIconName = "alcoholUse"
            />
        </View>
    )
}
export function TobaccoUse({cardInformation}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameLifestyleCard
                frameColor = "#4E5664"
                titleBackgroundColor = "#EEF2F6"
                frameBorderColor = "#A0AEC0"
                frameTitle = "Tobacco Use"
                cardInformation = {cardInformation}
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