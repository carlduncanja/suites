import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet} from "react-native";
import ProcedureTab from "./ProcedureTab";


const ProcedureStep = ({onProcedureUpdate, procedures, selectedTabIndex, errors, onErrorUpdate}) => {

    const onProcedureFieldChange = (objIndex) => (value) => {
        const updatedProcedure = [...procedures];
        updatedProcedure[objIndex] = value;
        onProcedureUpdate(updatedProcedure)
    }

    const handleOnErrorUpdate = (objIndex) => (value) => {
        const updatedErrors = [...errors];
        updatedErrors[objIndex] = value;
        onErrorUpdate(updatedErrors)
    }

    const currentProcedure = procedures[selectedTabIndex];

    console.log("procedure step", selectedTabIndex, procedures)

    return (
        <View style={{flex: 1}}>
            <ProcedureTab
                onProcedureInfoChange={onProcedureFieldChange(selectedTabIndex)}
                procedureInfo={currentProcedure}
                errors={errors[selectedTabIndex] || {}}
                onErrorUpdate={handleOnErrorUpdate(selectedTabIndex)}
            />
        </View>
    )
}

export default ProcedureStep

