import React,{useContext, useState} from 'react';
import { View } from "react-native";
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Details, Diagnosis, Insurance, PatientRisk, EditablePatientDetails} from '../../OverlayPages/Patient'

const Patient = ({ patient, selectedTab, isEditMode }) => {

    const { 
        firstName = "",
        middleName = "",
        surname = "",
        trn = "",
        height = 0,
        weight = 0,
        bloodType = "",
        dob = "",
        gender = "",
        ethnicity = "",
        address = [],
        contactInfo = {},
        insurance = {} ,
        medicalInfo = {}
    } = patient 

    const { diagnosis = [], risks = [] } = medicalInfo

    const [fields, setFields] = useState({
        firstName,
        middleName,
        surname,
        trn,
        height,
        weight,
        bloodType,
        dob,
        gender,
        ethnicity,
        contactInfo,
        nextVisit : new Date(),
        address,
        risks,
        diagnosis
    })

    const onFieldChange = (fieldName) => (value) => {
        console.log("Fieldname - value: ", fieldName,value)
        setFields({
            ...fields,
            [fieldName] : value
        })
    }
    return (
        selectedTab === 'Details' ?
            isEditMode ?
                <EditablePatientDetails
                    fields = {fields}
                    onFieldChange = {onFieldChange}
                />
                :
                <Details tabDetails = {patient}/>
            :
            selectedTab === 'Insurance' ?
                <Insurance tabDetails = {{...insurance, patient: `${firstName} ${surname}`}}/>
                :
                selectedTab === 'Diagnosis' ?
                    <Diagnosis
                        tabDetails = {diagnosis}
                        fields = {fields}
                        isEditMode = {isEditMode}
                    />
                    :
                    <PatientRisk
                        tabDetails = {risks}
                        isEditMode = {isEditMode}
                        fields = {fields}
                        onFieldChange = {onFieldChange}
                    />
    );
}

export default Patient;

