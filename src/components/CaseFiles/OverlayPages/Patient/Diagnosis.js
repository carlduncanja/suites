import React, { useContext } from 'react';
import { ScrollView, Text, StyleSheet, View } from "react-native";

import FrameCard from '../../../common/Frames/FrameCards/FrameCard';
import FrameImageCard from '../../../common/Frames/FrameCards/FrameImageCard';

import SignsIcon from '../../../../../assets/svg/signsAndSymptomsIcon';
import ExaminationsIcon from '../../../../../assets/svg/examinations';
import DiagnosticIcon from '../../../../../assets/svg/diagnostic';
import LabIcon from '../../../../../assets/svg/lab';
import ProvisionalIcon from '../../../../../assets/svg/provisionalDiagnosis';
import FinalDiagnosisIcon from '../../../../../assets/svg/finalDiagnosis';
import MedicationIcon from '../../../../../assets/svg/medications';
import DevicesIcon from '../../../../../assets/svg/implantedDevices';
 

const Diagnosis = ({tabDetails}) => { 

    const getData = (diagnosisType) => {
        console.log("Type: ", diagnosisType)

        const { notes = [] } = tabDetails.filter(item => { 
            const { type = {} } = item; 
            const {name = "" } =  type 
            return (name === diagnosisType && item) 
        })[0] || {}

        return notes
    }
   
    return ( 
        <ScrollView>

            <View style={styles.frameContainer}>
                <FrameCard
                    frameColor = "#3182CE"
                    titleBackgroundColor = "#EBF8FF"
                    frameBorderColor = "#90CDF4"
                    frameTitle = "Signs and Symptoms"
                    cardInformation = {getData("Signs and Symptoms")}
                    icon = {SignsIcon}
                />
            </View>

            <View style={styles.frameContainer}>
                <FrameCard
                    frameColor = "#319795"
                    titleBackgroundColor = "#E6FFFA"
                    frameBorderColor = "#4FD1C5"
                    frameTitle = "Examinations"
                    cardInformation = {getData('Examinations')}
                    icon = {ExaminationsIcon}
                />
            </View>
            
            <View style={styles.frameContainer}>
                <FrameImageCard
                    frameColor = "#5A67D8"
                    titleBackgroundColor = "#EBF4FF"
                    frameBorderColor = "#A3BFFA"
                    frameTitle = "Diagnostic Evaluations"
                    cardInformation = {getData('Diagnostic Evaluations')}
                    icon = {DiagnosticIcon}
                    // frameIconName = "diagnosticEvaluations"
                />
            </View>
            
            <View style={styles.frameContainer}>
                <FrameCard
                    frameColor = "#319795"
                    titleBackgroundColor = "#E6FFFA"
                    frameBorderColor = "#4FD1C5"
                    frameTitle = "Laboratory Investigations"
                    cardInformation = {getData('Laboratory Investigations')}
                    icon = {LabIcon}
                />
            </View>
            
            <View style={styles.frameContainer}>
                <FrameCard
                    frameColor = "#DD6B20"
                    titleBackgroundColor = "#FFFAF0"
                    frameBorderColor = "#FBD38D"
                    frameTitle = "Provisional Diagnosis"
                    cardInformation = {getData("Provisional Diagnosis")}
                    icon = {ProvisionalIcon}
                />
            </View>
            
            <View style={styles.frameContainer}>
                <FrameCard
                    frameColor = "#38A169"
                    titleBackgroundColor = "#F0FFF4"
                    frameBorderColor = "#9AE6B4"
                    frameTitle = "Final Diagnosis"
                    cardInformation = {getData("Final Diagnosis")}
                    icon = {FinalDiagnosisIcon}
                />
            </View>
            
            <View style={styles.frameContainer}>
                <FrameCard
                    frameColor = "#E53E3E"
                    titleBackgroundColor = "#FFF5F5"
                    frameBorderColor = "#FEB2B2"
                    frameTitle = "Medication Prescribed"
                    cardInformation={getData("Medication Prescribed")} 
                    icon = {MedicationIcon}
                />
            </View>

            <View style={styles.frameContainer}>
                <FrameCard
                    frameColor = "#3182CE"
                    titleBackgroundColor = "#EBF8FF"
                    frameBorderColor = "#90CDF4"
                    frameTitle = "Implanted Devices"
                    cardInformation={getData("Implanted Devices")} 
                    icon = {DevicesIcon}
                />
            </View>
         
        </ScrollView>
    );
}
 
export default Diagnosis;

const styles = StyleSheet.create({
    frameContainer:{
        marginBottom:20
    }
})

