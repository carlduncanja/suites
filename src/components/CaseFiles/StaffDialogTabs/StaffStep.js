import React,{ useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Assignment from "./Assignment";


const StaffStep = ({tabs, selectedTabIndex, fields, onFieldChange, completedTabs}) => {

    const [selectedObj, setSelectedObj] = useState({}) 
    const currentTab = tabs[selectedTabIndex]

    useEffect(()=>{
        if(Object.keys(selectedObj).length !== 0){
            console.log("CompletetdTabs: ", completedTabs, selectedObj)
            onFieldChange('staff')([
                ...fields['staff'],
                selectedObj
            ])
        }   
        // if(completedTabs.length!==0){
           
        // }
    },[selectedObj])
    // const onStaffFieldChange = (fieldName) => (value) => {
    //     fieldName === 'physicians' ?
    //         onFieldChange('staff')({
    //             ...fields['staff'],
    //             [fieldName] : [...fields['staff'].physicians,value]
    //         })
    //     :
    //         onFieldChange('staff')({
    //             ...fields['staff'],
    //             [fieldName] : [...fields['staff'].nurses,value]
    //         })
    // }

    
    const onChangeSelect = (value) => (selectedType) => {
        const { _id = "" } = value
        const staffFields = fields['staff']
        // const match = staffFields.filter( item => item.index === index)
        const updatedObj = { selectedType, _id};
        console.log("Value:", updatedObj)
        if(_id !== ""){
            setSelectedObj(updatedObj)
        }
        
        // const updated = [
        //     ...risks.slice(0, findIndex),
        //     updatedObj,
        //     ...risks.slice(findIndex + 1),
        // ]; 
        // setRisks(updatedRisks)
        // if(match.length === 0){
        //     (value !== "" || null) && onFieldChange(updatedObj)
        // }
        // if(!fields.includes({selectedType, _id, index})){
        //     (value !== "" || null) && onFieldChange({selectedType, _id, index})
        // }
    }
    const onChange = (obj) => {
        onFieldChange('staff')([
            ...fields['staff'],
            obj
        ])
        console.log("Staff: ", [
            ...fields['staff'],
            obj
        ])
    }
    

    const data = tabs.map( (tab,index) => {
    
        return {
            name : tab,
            index,
            view : <Assignment
                index = {index}
                onFieldChange = {onChange} 
                fields = {fields['staff']}
                // selectedObj = {selectedObj}
                onChangeSelect = {onChangeSelect}
            />
        }
    })

    const { view = <View/> } = data.filter( item => item.index === selectedTabIndex)[0]
    
    return (
        <View style={{flex:1}}>
            <Assignment
                // index = {index}
                // onFieldChange = {onChange} 
                // fields = {fields['staff']}
                // selectedObj = {selectedObj}
                onChangeSelect = {onChangeSelect}
            />
            {/* {view} */}
        </View>
    )
}

export default StaffStep

