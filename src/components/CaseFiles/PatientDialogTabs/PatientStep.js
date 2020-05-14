import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PatientDetailsTab from "./PatientDetailsTab";
import PatientContactTab from "./PatientContactTab";
import PatientAddressTab from "./PatientAddressTab";
import PatientInsuranceTab from "./PatientInsuranceTab";

const PatientStep = ({selectedTabIndex, onFieldChange, fields}) => {

    const getTab = () => {
        switch (selectedTabIndex) {
            case 0:
                return <PatientDetailsTab
                    onFieldChange = {onFieldChange}
                    fields = {fields}
                />
            case 1:
                return <PatientContactTab
                    onFieldChange = {onFieldChange}
                    fields = {fields}
                />    
            case 2:
                return <PatientAddressTab
                    onFieldChange = {onFieldChange}
                    fields = {fields}
                />
            case 3:
                return <PatientInsuranceTab
                    onFieldChange = {onFieldChange}
                    fields = {fields}
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

