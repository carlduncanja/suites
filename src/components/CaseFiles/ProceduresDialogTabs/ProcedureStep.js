import React,{ useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ProcedureTab2 from "./ProcedureTab2";


const ProcedureStep = ({selectedTabIndex, onFieldChange, fields}) => {

    const [procedureFields, setProcedureFields] = useState([
        // {
        //     procedure : '',
        //     startTime : '',
        //     endTime : '',
        //     location : ''
        // },
        // {
        //     procedure : '',
        //     startTime : '',
        //     endTime : '',
        //     location : ''
        // }
    ])

    const onProcedureFieldChange = (objIndex) => (value) =>{
        const findIndex = procedureFields.findIndex((obj,index) => index === objIndex);
        const updatedObj = value;
        const updatedProcedures = [
            ...procedureFields.slice(0, findIndex),
            updatedObj,
            ...procedureFields.slice(findIndex + 1),
        ];
        // console.log("Values: ",[
        //     ...procedureFields.slice(0, findIndex),
        //     updatedObj,
        //     ...procedureFields.slice(findIndex + 1),
        // ]
        // )
        setProcedureFields(updatedProcedures)
        onFieldChange('caseProcedures')(updatedProcedures)
    }

    // useEffect(()=>{
    //     console.log("Change")
    // },[selectedTabIndex])

    const currentFields = procedureFields.filter( (item,index) => index === selectedTabIndex)

    const getTab = () => {
        switch (selectedTabIndex) {
            case 0:
                return <ProcedureTab2
                    onFieldChange = {onProcedureFieldChange(0)}
                    fields = {currentFields}
                />
            case 1:
                return <ProcedureTab2
                    onFieldChange = {onProcedureFieldChange(1)}
                    fields = {currentFields}
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

