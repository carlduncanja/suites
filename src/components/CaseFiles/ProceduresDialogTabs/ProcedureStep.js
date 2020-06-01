import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet} from "react-native";
import ProcedureTab2 from "./ProcedureTab2";


const ProcedureStep = ({onProcedureUpdate, procedures, selectedTabIndex}) => {

    const onProcedureFieldChange = (objIndex) => (value) => {
        const updatedProcedure = [...procedures];
        updatedProcedure[objIndex] = value;
        onProcedureUpdate(updatedProcedure)
    }

    const currentProcedure = procedures[selectedTabIndex];

    console.log("procedure step", selectedTabIndex, procedures)

    return (
        <View style={{flex: 1}}>
            <ProcedureTab2
                onProcedureInfoChange={onProcedureFieldChange(selectedTabIndex)}
                procedureInfo={currentProcedure}
            />
        </View>
    )
}

export default ProcedureStep

