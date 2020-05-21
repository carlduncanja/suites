import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Assignment from "./Assignment";


const StaffStep = ({tabs, selectedTabIndex}) => {
    // const [fields, setFields] = useState({
    //     firstName: "",
    //     middleName: "",
    // })
    const [fields, setFields] = useState({
        physicians : [],
        nurses : []
    })

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName] : value
        })
    }
    const data = tabs.map( (tab,index) => {
        return {
            name : tab,
            index,
            view : <Assignment
                index = {index}
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

