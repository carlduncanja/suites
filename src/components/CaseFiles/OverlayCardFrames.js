import React,{useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import FrameCard from '../common/Frames/FrameCards/FrameCard';
import FrameImageCard from '../common/Frames/FrameCards/FrameImageCard';
import FrameTableCard from '../common/Frames/FrameCards/FrameTableCard';
import FrameMixedTableCard from '../common/Frames/FrameCards/FrameMixedTableCard';
import { SuitesContext } from '../../contexts/SuitesContext';
import FrameLifestyleCard from '../common/Frames/FrameCards/FrameLifestyleCard';

export function SignsAndSymptoms({cardInformation,icon}) {
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#3182CE"
                titleBackgroundColor = "#EBF8FF"
                frameBorderColor = "#90CDF4"
                frameTitle = "Signs and Symptoms"
                cardInformation = {cardInformation}
                icon = {icon}
                // frameIconName = "signsAndSymptoms"
            />
        </View>
    )
    
}

export function Examinations({cardInformation,icon}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#319795"
                titleBackgroundColor = "#E6FFFA"
                frameBorderColor = "#4FD1C5"
                frameTitle = "Examinations"
                cardInformation = {cardInformation}
                icon = {icon}
                // frameIconName = "examinations"
            />
        </View>
        
    )
}

export function DiagnosticEvaluations({cardInformation,icon}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameImageCard
                frameColor = "#5A67D8"
                titleBackgroundColor = "#EBF4FF"
                frameBorderColor = "#A3BFFA"
                frameTitle = "Diagnostic Evaluations"
                cardInformation = {cardInformation}
                icon = {icon}
                // frameIconName = "diagnosticEvaluations"
            />
        </View>
    )
}

export function LaboratoryInvestigations({cardInformation,icon}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#319795"
                titleBackgroundColor = "#E6FFFA"
                frameBorderColor = "#4FD1C5"
                frameTitle = "Laboratory Investigations"
                cardInformation = {cardInformation}
                icon = {icon}
                // frameIconName = "laboratoryInvestigations"
            />
        </View>
        
    )
}

export function ProvisionalDiagnosis({cardInformation,icon}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#DD6B20"
                titleBackgroundColor = "#FFFAF0"
                frameBorderColor = "#FBD38D"
                frameTitle = "Provisional Diagnosis"
                cardInformation = {cardInformation}
                icon = {icon}
                // frameIconName = "provisionalDiagnosis"
            />
        </View>
        
    )
}

export function FinalDiagnosis({cardInformation,icon}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#38A169"
                titleBackgroundColor = "#F0FFF4"
                frameBorderColor = "#9AE6B4"
                frameTitle = "Final Diagnosis"
                cardInformation = {cardInformation}
                // frameIconName = "finalDiagnosis"
                icon = {icon}
            />
        </View>
        
    )
}

export function MedicationPrescribed({cardInformation,icon}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
             <FrameCard
                frameColor = "#E53E3E"
                titleBackgroundColor = "#FFF5F5"
                frameBorderColor = "#FEB2B2"
                frameTitle = "Medication Prescribed"
                cardInformation = {cardInformation}
                icon = {icon}
                // frameIconName = "medicationPrescribed"
            />
        </View>
       
    )
}

export function ImplantedDevices({cardInformation,icon}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#3182CE"
                titleBackgroundColor = "#EBF8FF"
                frameBorderColor = "#90CDF4"
                frameTitle = "Implanted Devices"
                cardInformation = {cardInformation}
                icon = {icon}
                // frameIconName = "implantedDevices"
            />
        </View>
        
    )
}


export function Physicians({cardInformation,icon}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#3182CE"
                titleBackgroundColor = "#EBF8FF"
                frameBorderColor = "#90CDF4"
                frameTitle = "Physicians"
                cardInformation = {cardInformation}
                icon = {icon}
                // frameIconName = "medicalStaff"
                // iconFillColor = "#4299E1"
            />
        </View>
        
    )
}

export function Nurses({cardInformation,icon}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
             <FrameCard
                frameColor = "#E53E3E"
                titleBackgroundColor = "#FFF5F5"
                frameBorderColor = "#FEB2B2"
                frameTitle = "Nurses"
                cardInformation = {cardInformation}
                icon = {icon}
                // frameIconName = "medicalStaff"
                // iconFillColor = "#F56565"
            />
        </View>
       
    )
}

export function Allergies({cardInformation,icon}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#805AD5"
                titleBackgroundColor = "#FAF5FF"
                frameBorderColor = "#D6BCFA"
                frameTitle = "Allergies"
                cardInformation = {cardInformation}
                icon = {icon}
                // frameIconName = "allergies"
            />
        </View>
        
    )
}

export function PreExistingConditions({cardInformation,icon}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#DD6B20"
                titleBackgroundColor = "#FFFAF0"
                frameBorderColor = "#FBD38D"
                frameTitle = "Pre-Existing Conditions"
                cardInformation = {cardInformation}
                icon = {icon}
                // frameIconName = "preExistingConditions"
            />
        </View> 
    )
}

export function Immunisations({cardInformation,icon}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#3182CE"
                titleBackgroundColor = "#EBF4FF"
                frameBorderColor = "#A3BFFA"
                frameTitle = "Immunisations"
                cardInformation = {cardInformation}
                icon = {icon}
                // frameIconName = "immunisations"
            />
        </View> 
    )
}

export function Medications({cardInformation, icon}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#E53E3E"
                titleBackgroundColor = "#FFF5F5"
                frameBorderColor = "#FEB2B2"
                frameTitle = "Medications"
                cardInformation = {cardInformation}
                icon = {icon}
                // frameIconName = "medications"
            />
        </View> 
    )
}

export function Procedures({cardInformation,icon}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#38A169"
                titleBackgroundColor = "#F0FFF4"
                frameBorderColor = "#9AE6B4"
                frameTitle = "Procedures"
                cardInformation = {cardInformation}
                icon = {icon}
                // frameIconName = "overlayProcedures"
            />
        </View> 
    )
}

export function MedicalHistoryImplantedDevices({cardInformation,icon}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#3182CE"
                titleBackgroundColor = "#EBF8FF"
                frameBorderColor = "#90CDF4"
                frameTitle = "Implanted Devices"
                cardInformation = {cardInformation}
                icon = {icon}
                // frameIconName = "implantedDevices"
            />
        </View> 
    )
}

export function FamilyPreExistingConditions({cardInformation,icon}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameTableCard
                frameColor = "#DD6B20"
                titleBackgroundColor = "#FFFAF0"
                frameBorderColor = "#FBD38D"
                frameTitle = "Pre-Existing Conditions"
                cardInformation = {cardInformation}
                icon = {icon}
                // frameIconName = "familyPreExistingConditions"
            />
        </View> 
    )
}

export function OtherNotableConditions({cardInformation,icon}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#DD6B20"
                titleBackgroundColor = "#FFFAF0"
                frameBorderColor = "#FBD38D"
                frameTitle = "Other Notable Conditions"
                cardInformation = {cardInformation}
                icon = {icon}
                // frameIconName = "otherNotableConditions"
            />
        </View>
    )
}

export function DrugUse({cardInformation,icon}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameLifestyleCard
                frameColor = "#805AD5"
                titleBackgroundColor = "#FAF5FF"
                frameBorderColor = "#D6BCFA"
                frameTitle = "Drug Use"
                cardInformation = {cardInformation}
                icon = {icon}
                // frameIconName = "drugUse"
            />
        </View>
    )
}

export function AlcoholUse({cardInformation,icon}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameLifestyleCard
                frameColor = "#E53E3E"
                titleBackgroundColor = "#FFF5F5"
                frameBorderColor = "#FEB2B2"
                frameTitle = "Alcohol Use"
                cardInformation = {cardInformation}
                icon = {icon}
                // frameIconName = "alcoholUse"
            />
        </View>
    )
}
export function TobaccoUse({cardInformation,icon}){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameLifestyleCard
                frameColor = "#4E5664"
                titleBackgroundColor = "#EEF2F6"
                frameBorderColor = "#A0AEC0"
                frameTitle = "Tobacco Use"
                cardInformation = {cardInformation}
                icon = {icon}
                // frameIconName = "tobaccoUse"
            />
        </View>
    )
}



const styles = StyleSheet.create({
    frameContainer:{
        marginBottom:20
    }
})