import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PatientDetailsTab from "./PatientDetailsTab";
import PatientContactTab from "./PatientContactTab";
import PatientAddressTab from "./PatientAddressTab";
import PatientInsuranceTab from "./PatientInsuranceTab";


const PatientStep = ({selectedTabIndex, onFieldChange, fields}) => {

    const { patient = {} } = fields
    const { 
        firstName = "",
        middleName = "",
        surname = "",
        trn = "", 
        contactInfo = {},
        addressInfo = [],
        insurance = {},
        dob = ""
    } = patient

    const [patientFields, setFields] = useState({
        firstName, 
        middleName,
        surname,
        trn, 
        contactInfo,
        addressInfo,
        insurance,
        dob
    })

    const onPatientFieldChange = (fieldName) => (value) => {
        // console.log("Value:", value)
        const updatedFields = {...patientFields, [fieldName]: value}
        setFields(updatedFields)
        onFieldChange('patient')(updatedFields)
    }

    const getTab = () => {
        switch (selectedTabIndex) {
            case 0: 
                return <PatientDetailsTab
                    onFieldChange = {onPatientFieldChange}
                    fields = {patientFields}
                />
            case 1:
                return <PatientContactTab
                    onFieldChange = {onPatientFieldChange}
                    fields = {patientFields}
                />    
            case 2:
                return <PatientAddressTab
                    onFieldChange = {onPatientFieldChange}
                    fields = {patientFields}
                />
            case 3:
                return <PatientInsuranceTab
                    onFieldChange = {onPatientFieldChange}
                    fields = {patientFields}
                />
            default:
                break;
        }
    }
    return (
        <View style={{flex:1}}>
            {getTab()}
        </View>
    )
}

export default PatientStep

