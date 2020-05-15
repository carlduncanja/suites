import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Assignment from "./Assignment";


const StaffStep = ({tabs, selectedTabIndex, onFieldChange, fields}) => {
    // const [fields, setFields] = useState({
    //     firstName: "",
    //     middleName: "",
    // })
    const data = tabs.map( (tab,index) => {
        return {
            name : tab,
            index,
            view : <Assignment
                onFieldChange = {onFieldChange}
                fields = {fields}
            />
        }
    })

    const { view = <View/> } = data.filter( item => item.index === selectedTabIndex)[0]
    
    return (
        <View style={{flex:1}}>
            {view}
        </View>
    )
}

export default StaffStep

