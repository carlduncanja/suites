import React, { useContext, useState } from 'react';
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
 

const Diagnosis = ({tabDetails, fields, isEditMode}) => { 

    const [diagnosis, setDiagnosis] = useState([...tabDetails])

    const getData = (diagnosisType) => {
        const { notes = [] } = diagnosis.filter(item => { 
            const { type = {} } = item; 
            const {name = "" } =  type 
            return (name === diagnosisType && item) 
        })[0] || {}

        return notes
    }

    const handleEdit = (editType) => (action) => (editIndex) => {
        const dataForType = getData(editType)
        const objIndex = diagnosis.findIndex(obj => {
            const {type = {} } = obj
            const {name = ""} = type
            return name === editType
        });

        if (action === 'remove'){
            const updatedData = dataForType.filter((data, index)=> index !== editIndex)
            updatedObj = {...diagnosis[objIndex], notes: updatedData};
        }else{
            updatedObj = {...diagnosis[objIndex], notes:[...diagnosis[objIndex].notes, ""]}
        }

        const updatedDiagnosis = [
            ...diagnosis.slice(0, objIndex),
            updatedObj,
            ...diagnosis.slice(objIndex + 1),
        ]; 
        setDiagnosis(updatedDiagnosis)
       
    }

    const handleAddNew = (addNewType) => (value) => (index) =>{ 
        // const objIndex = diagnosis.findIndex(obj => {
        //     const {type = {} } = obj
        //     const {name = ""} = type
        //     return name === addNewType
        // });
        // updatedObj = {...diagnosis[objIndex], notes:[...diagnosis[objIndex].notes, value]};
        // const updatedDiagnosis = [
        //     ...diagnosis.slice(0, objIndex),
        //     updatedObj,
        //     ...diagnosis.slice(objIndex + 1),
        // ]; 
        // setDiagnosis(updatedDiagnosis)
        console.log("Type and value: ", addNewType, value)
        
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
                    isEditMode = {isEditMode}
                    handleEdit = {handleEdit('Signs and Symptoms')}
                    handleAddNew = {handleAddNew('Signs and Symptoms')}
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
                    isEditMode = {isEditMode}
                    handleEdit = {handleEdit('Examinations')}
                    handleAddNew = {handleAddNew('Examinations')}
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
                    isEditMode = {isEditMode}
                    handleEdit = {handleEdit('Diagnostic Evaluations')}
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
                    isEditMode = {isEditMode}
                    handleEdit = {handleEdit('Laboratory Investigations')}
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
                    isEditMode = {isEditMode}
                    handleEdit = {handleEdit('Provisional Diagnosis')}
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
                    isEditMode = {isEditMode}
                    handleEdit = {handleEdit('Final Diagnosis')}
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
                    isEditMode = {isEditMode}
                    handleEdit = {handleEdit('Medication Prescribed')}
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
                    isEditMode = {isEditMode}
                    handleEdit = {handleEdit('Implanted Devices')}
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

