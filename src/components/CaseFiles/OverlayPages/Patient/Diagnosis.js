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
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
 
 
const Diagnosis = ({tabDetails, fields, isEditMode}) => { 
    console.log("Edit mode: ", isEditMode)

    const [diagnosis, setDiagnosis] = useState([...tabDetails])
    const theme = useTheme();

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

            <FrameCard
                frameColor = {theme.colors['--color-blue-600']}
                titleBackgroundColor = {theme.colors['--color-blue-100']}
                frameBorderColor = {theme.colors['--color-blue-300']}
                frameTitle = "Signs and Symptoms"
                cardInformation = {getData("Signs and Symptoms")}
                icon = {SignsIcon}
                isEditMode = {isEditMode}
                handleEdit = {handleEdit('Signs and Symptoms')}
                handleAddNew = {handleAddNew('Signs and Symptoms')}
            />

            <FrameCard
                frameColor = {theme.colors['--color-teal-600']}
                titleBackgroundColor = {theme.colors['--color-teal-100']}
                frameBorderColor = {theme.colors['--color-teal-300']}
                frameTitle = "Examinations"
                cardInformation = {getData('Examinations')}
                icon = {ExaminationsIcon}
                isEditMode = {isEditMode}
                handleEdit = {handleEdit('Examinations')}
                handleAddNew = {handleAddNew('Examinations')}
            />
            
            <FrameImageCard
                frameColor = {theme.colors['--color-indigo-600']}
                titleBackgroundColor = {theme.colors['--color-indigo-100']}
                frameBorderColor = {theme.colors['--color-indigo-300']}
                frameTitle = "Diagnostic Evaluations"
                cardInformation = {getData('Diagnostic Evaluations')}
                icon = {DiagnosticIcon}
                isEditMode = {isEditMode}
                handleEdit = {handleEdit('Diagnostic Evaluations')}
            />
            
            <FrameCard
                frameColor = {theme.colors['--color-teal-600']}
                titleBackgroundColor = {theme.colors['--color-teal-100']}
                frameBorderColor = {theme.colors['--color-teal-300']}
                frameTitle = "Laboratory Investigations"
                cardInformation = {getData('Laboratory Investigations')}
                icon = {LabIcon}
                isEditMode = {isEditMode}
                handleEdit = {handleEdit('Laboratory Investigations')}
            />
            
            <FrameCard
                frameColor = {theme.colors['--color-orange-600']}
                titleBackgroundColor = {theme.colors['--color-orange-100']}
                frameBorderColor = {theme.colors['--color-orange-300']}
                frameTitle = "Provisional Diagnosis"
                cardInformation = {getData("Provisional Diagnosis")}
                icon = {ProvisionalIcon}
                isEditMode = {isEditMode}
                handleEdit = {handleEdit('Provisional Diagnosis')}
            />
            
            <FrameCard
                frameColor = {theme.colors['--color-green-600']}
                titleBackgroundColor = {theme.colors['--color-green-100']}
                frameBorderColor = {theme.colors['--color-green-300']}
                frameTitle = "Final Diagnosis"
                cardInformation = {getData("Final Diagnosis")}
                icon = {FinalDiagnosisIcon}
                isEditMode = {isEditMode}
                handleEdit = {handleEdit('Final Diagnosis')}
            />
        
            <FrameCard
                frameColor = {theme.colors['--color-red-600']}
                titleBackgroundColor = {theme.colors['--color-red-100']}
                frameBorderColor = {theme.colors['--color-red-300']}
                frameTitle = "Medication Prescribed"
                cardInformation={getData("Medication Prescribed")} 
                icon = {MedicationIcon}
                isEditMode = {isEditMode}
                handleEdit = {handleEdit('Medication Prescribed')}
            />

            <FrameCard
                frameColor = {theme.colors['--color-blue-600']}
                titleBackgroundColor = {theme.colors['--color-blue-100']}
                frameBorderColor = {theme.colors['--color-blue-300']}
                frameTitle = "Implanted Devices"
                cardInformation={getData("Implanted Devices")} 
                icon = {DevicesIcon}
                isEditMode = {isEditMode}
                handleEdit = {handleEdit('Implanted Devices')}
            />
         
        </ScrollView>
    );
}
 
export default Diagnosis;


