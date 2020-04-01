import React from 'react';
import { View, ScrollView } from 'react-native';
import { Allergies, PreExistingConditions, Immunisations, Medications, Procedures, MedicalHistoryImplantedDevices } from '../../OverlayCardFrames';

const General = ({tabDetails}) => {
    const getData = (data) => {
        let newArray = []
        data.map((item)=>{
            newArray.push(item.description)
        })
        return newArray
    }
    const allergies = tabDetails.filter(item => item.types === "allergies")
    const preExistConditions = tabDetails.filter(item => item.types === "preExistingConditions")
    const immunisations = tabDetails.filter(item => item.types === "immunisations")
    const medications = tabDetails.filter(item => item.types === "medications")
    const procedures = tabDetails.filter(item => item.types === "procedures")
    const devices = tabDetails.filter(item => item.types === "medicalHistoryImplantedDevices")

    return ( 
        <ScrollView>
            <Allergies cardInformation = {getData(allergies)}/>
            <PreExistingConditions cardInformation = {getData(preExistConditions)} />
            <Immunisations cardInformation = {getData(immunisations)}/>
            <Medications cardInformation = {getData(medications)}/>
            <Procedures cardInformation = {getData(procedures)}/>
            <MedicalHistoryImplantedDevices cardInformation = {getData(devices)}/>
        </ScrollView>
    );
}
 
export default General;