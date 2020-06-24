import React, {useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import PatientDetailsTab from "./PatientDetailsTab";
import PatientContactTab from "./PatientContactTab";
import PatientAddressTab from "./PatientAddressTab";
import PatientInsuranceTab from "./PatientInsuranceTab";


const PatientStep = ({selectedTabIndex, patient, errors, onPatientUpdate, onErrorUpdate}) => {
 
    // const {
    //     firstName = "",
    //     middleName = "",
    //     surname = "",
    //     trn = "",
    //     contactInfo = {},
    //     addressInfo = [],
    //     insurance = {},
    //     dob = ""
    // } = fields


    // const [patientFields, setFields] = useState({
    //     firstName,
    //     middleName,
    //     surname,
    //     trn,
    //     contactInfo,
    //     addressInfo,
    //     insurance,
    //     dob
    // })

    const onFieldChange = (fieldName) => (value) => {
        const updateFields = {...patient}
        onPatientUpdate({
            ...updateFields,
            [fieldName]: value
        })

        const updatedErrors = {...errors}
        delete updatedErrors[fieldName];
        console.log("errors: ", errors);
        onErrorUpdate(updatedErrors);
    }

    const onAddressInfoChange = (fieldName) => (value) => {
        const updateFields = {...patient}
        if (!updateFields.addressInfo) updateFields.addressInfo = {};

        onPatientUpdate({
            ...updateFields,
            addressInfo: {
                ...updateFields.addressInfo,
                [fieldName]: value
            }
        })

        const updatedErrors = {...errors}
        delete updatedErrors[fieldName];
        console.log("errors: ", errors);
        onErrorUpdate(updatedErrors);
    }


    const getTab = () => {
        switch (selectedTabIndex) {
            case 0:
                return <PatientDetailsTab
                    onFieldChange={onFieldChange}
                    fields={patient}
                    errors={errors}
                />
            case 1:
                return <PatientContactTab
                    onFieldChange={onFieldChange}
                    fields={patient}
                    errors={errors}
                />
            case 2:
                return <PatientAddressTab
                    onAddressInfoChange={onAddressInfoChange}
                    fields={patient}
                    errors={errors}
                />
            case 3:
                return <PatientInsuranceTab
                    onFieldChange={onFieldChange}
                    fields={patient}
                    errors={errors}
                />
            default:
                break;
        }
    }
    return (
        <View style={{flex: 1}}>
            {getTab()}
        </View>
    )
}

export default PatientStep

