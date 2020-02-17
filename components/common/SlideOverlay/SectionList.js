import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SuitesContext } from '../../../contexts/SuitesContext';
import { PersonalRecord } from '../Information Record/RecordStyles'

const SectionList = () => {
    const suitesState = useContext(SuitesContext).state
    let sections = []

    Object.keys(suitesState.overlayTabInfo).forEach(key=>{
        sections.push(suitesState.overlayTabInfo[key])
    })

    let Section = (data) =>{
        return(
            Object.keys(data).map((key,index) => {
                return(
                    <View key={index} style={styles.record}>
                        <PersonalRecord
                            recordTitle = {transformToSentence(key)}
                            recordValue = {data[key]}
                        />
                    </View>
                )
            })
        )
    }

    let transformToSentence = (word) =>{
        let newWord = word.replace(/([A-Z])/g, " $1")
        return newWord.charAt(0).toUpperCase() + newWord.slice(1);
    }

    return ( 
        <View style={styles.containter}>
            {
                sections.map((section, index)=>{
                    return (index === sections.length-1 ?
                        Section(section)
                        :
                        <View key = {index}>
                            {Section(section)}
                            <View style={styles.separator}/>
                        </View>
  
                    )
                    
                })
            }
        </View>
    );
}
 
export default SectionList;

const styles= StyleSheet.create({
    container:{
    },
    record:{
        padding:10,
    },
    separator:{
        height:1,
        backgroundColor:'#CCD6E0',
        borderRadius:2,
        marginTop:10,
        //marginBottom:10
    }
})