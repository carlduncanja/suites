import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ProcedureTab from "./ProcedureTab";


const ProcedureStep = ({selectedTabIndex, onFieldChange, fields}) => {

    const getTab = () => {
        switch (selectedTabIndex) {
            case 0:
                return <ProcedureTab
                    onFieldChange = {onFieldChange}
                    fields = {fields}
                />
            case 1:
                return <ProcedureTab
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

export default ProcedureStep

