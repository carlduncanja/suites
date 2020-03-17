import React,{useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import FrameCard from '../common/Frames/FrameCards/FrameCard';
import FrameImageCard from '../common/Frames/FrameCards/FrameImageCard';
import FrameTableCard from '../common/Frames/FrameCards/FrameTableCard';
import FrameMixedTableCard from '../common/Frames/FrameCards/FrameMixedTableCard';
import { SuitesContext } from '../../contexts/SuitesContext';

export function SignsAndSymptoms({cardInformation}) {
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#3182CE"
                titleBackgroundColor = "#EBF8FF"
                frameBorderColor = "#90CDF4"
                frameTitle = "Signs and Symptoms"
                cardInformation = {state.slideOverlay.slideOverlayTabInfo.signsAndSymptoms}
                frameIconName = "signsAndSymptoms"
            />
        </View>
    )
    
}

export function Examinations(){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#319795"
                titleBackgroundColor = "#E6FFFA"
                frameBorderColor = "#4FD1C5"
                frameTitle = "Examinations"
                cardInformation = {state.slideOverlay.slideOverlayTabInfo.examinations}
                frameIconName = "examinations"
            />
        </View>
        
    )
}

export function DiagnosticEvaluations(){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameImageCard
                frameColor = "#5A67D8"
                titleBackgroundColor = "#EBF4FF"
                frameBorderColor = "#A3BFFA"
                frameTitle = "Diagnostic Evaluations"
                cardInformation = {state.slideOverlay.slideOverlayTabInfo.diagnosticEvaluations}
                frameIconName = "diagnosticEvaluations"
            />
        </View>
    )
}

export function LaboratoryInvestigations(){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#319795"
                titleBackgroundColor = "#E6FFFA"
                frameBorderColor = "#4FD1C5"
                frameTitle = "Laboratory Investigations"
                cardInformation = {state.slideOverlay.slideOverlayTabInfo.laboratoryInvestigations}
                frameIconName = "laboratoryInvestigations"
            />
        </View>
        
    )
}

export function ProvisionalDiagnosis(){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#DD6B20"
                titleBackgroundColor = "#FFFAF0"
                frameBorderColor = "#FBD38D"
                frameTitle = "Provisional Diagnosis"
                cardInformation = {state.slideOverlay.slideOverlayTabInfo.provisionalDiagnosis}
                frameIconName = "provisionalDiagnosis"
            />
        </View>
        
    )
}

export function FinalDiagnosis(){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#38A169"
                titleBackgroundColor = "#F0FFF4"
                frameBorderColor = "#9AE6B4"
                frameTitle = "Final Diagnosis"
                cardInformation = {state.slideOverlay.slideOverlayTabInfo.finalDiagnosis}
                frameIconName = "finalDiagnosis"
            />
        </View>
        
    )
}

export function MedicationPrescribed(){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
             <FrameCard
                frameColor = "#E53E3E"
                titleBackgroundColor = "#FFF5F5"
                frameBorderColor = "#FEB2B2"
                frameTitle = "Medication Prescribed"
                cardInformation = {state.slideOverlay.slideOverlayTabInfo.medicationPrescribed}
                frameIconName = "medicationPrescribed"
            />
        </View>
       
    )
}

export function ImplantedDevices(){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#3182CE"
                titleBackgroundColor = "#EBF8FF"
                frameBorderColor = "#90CDF4"
                frameTitle = "Implanted Devices"
                cardInformation = {state.slideOverlay.slideOverlayTabInfo.implantedDevices}
                frameIconName = "implantedDevices"
            />
        </View>
        
    )
}

export function Physicians(){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#3182CE"
                titleBackgroundColor = "#EBF8FF"
                frameBorderColor = "#90CDF4"
                frameTitle = "Physicians"
                cardInformation = {state.slideOverlay.slideOverlayTabInfo.physicians}
                frameIconName = "medicalStaff"
                iconFillColor = "#4299E1"
            />
        </View>
        
    )
}

export function Nurses(){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
             <FrameCard
                frameColor = "#E53E3E"
                titleBackgroundColor = "#FFF5F5"
                frameBorderColor = "#FEB2B2"
                frameTitle = "Nurses"
                cardInformation = {state.slideOverlay.slideOverlayTabInfo.nurses}
                frameIconName = "medicalStaff"
                iconFillColor = "#F56565"
            />
        </View>
       
    )
}

export function Allergies(){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#805AD5"
                titleBackgroundColor = "#FAF5FF"
                frameBorderColor = "#D6BCFA"
                frameTitle = "Allergies"
                cardInformation = {state.slideOverlay.slideOverlayTabInfo.allergies}
                frameIconName = "allergies"
            />
        </View>
        
    )
}

export function PreExistingConditions(){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#DD6B20"
                titleBackgroundColor = "#FFFAF0"
                frameBorderColor = "#FBD38D"
                frameTitle = "Pre-Existing Conditions"
                cardInformation = {state.slideOverlay.slideOverlayTabInfo.preExistingConditions}
                frameIconName = "preExistingConditions"
            />
        </View> 
    )
}

export function Immunisations(){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#3182CE"
                titleBackgroundColor = "#EBF4FF"
                frameBorderColor = "#A3BFFA"
                frameTitle = "Immunisations"
                cardInformation = {state.slideOverlay.slideOverlayTabInfo.immunisations}
                frameIconName = "immunisations"
            />
        </View> 
    )
}

export function Medications(){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#E53E3E"
                titleBackgroundColor = "#FFF5F5"
                frameBorderColor = "#FEB2B2"
                frameTitle = "Medications"
                cardInformation = {state.slideOverlay.slideOverlayTabInfo.medications}
                frameIconName = "medications"
            />
        </View> 
    )
}

export function Procedures(){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#38A169"
                titleBackgroundColor = "#F0FFF4"
                frameBorderColor = "#9AE6B4"
                frameTitle = "Procedures"
                cardInformation = {state.slideOverlay.slideOverlayTabInfo.procedures}
                frameIconName = "overlayProcedures"
            />
        </View> 
    )
}

export function MedicalHistoryImplantedDevices(){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#3182CE"
                titleBackgroundColor = "#EBF8FF"
                frameBorderColor = "#90CDF4"
                frameTitle = "Implanted Devices"
                cardInformation = {state.slideOverlay.slideOverlayTabInfo.implantedDevices}
                frameIconName = "implantedDevices"
            />
        </View> 
    )
}

export function FamilyPreExistingConditions(){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameTableCard
                frameColor = "#DD6B20"
                titleBackgroundColor = "#FFFAF0"
                frameBorderColor = "#FBD38D"
                frameTitle = "Pre-Existing Conditions"
                cardInformation = {state.slideOverlay.slideOverlayTabInfo.preExistingConditions}
                frameIconName = "familyPreExistingConditions"
            />
        </View> 
    )
}

export function OtherNotableConditions(){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameCard
                frameColor = "#DD6B20"
                titleBackgroundColor = "#FFFAF0"
                frameBorderColor = "#FBD38D"
                frameTitle = "Other Notable Conditions"
                cardInformation = {state.slideOverlay.slideOverlayTabInfo.otherNotableConditions}
                frameIconName = "otherNotableConditions"
            />
        </View>
    )
}

export function DrugUse(){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameMixedTableCard
                frameColor = "#805AD5"
                titleBackgroundColor = "#FAF5FF"
                frameBorderColor = "#D6BCFA"
                frameTitle = "Drug Use"
                cardInformation = {state.slideOverlay.slideOverlayTabInfo.drug}
                frameIconName = "drugUse"
            />
        </View>
    )
}

export function AlcoholUse(){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameMixedTableCard
                frameColor = "#E53E3E"
                titleBackgroundColor = "#FFF5F5"
                frameBorderColor = "#FEB2B2"
                frameTitle = "Alcohol Use"
                cardInformation = {state.slideOverlay.slideOverlayTabInfo.alcohol}
                frameIconName = "alcoholUse"
            />
        </View>
    )
}
export function TobaccoUse(){
    const [state] = useContext(SuitesContext)
    return(
        <View style={styles.frameContainer}>
            <FrameMixedTableCard
                frameColor = "#4E5664"
                titleBackgroundColor = "#EEF2F6"
                frameBorderColor = "#A0AEC0"
                frameTitle = "Tobacco Use"
                cardInformation = {state.slideOverlay.slideOverlayTabInfo.tobacco}
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