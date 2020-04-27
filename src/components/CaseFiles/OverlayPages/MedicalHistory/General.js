import React from 'react';
import { View, ScrollView } from 'react-native';
import { Allergies, PreExistingConditions, Immunisations, Medications, Procedures, MedicalHistoryImplantedDevices } from '../../OverlayCardFrames';

import AllergiesIcon from '../../../../../assets/svg/allergies';
import ConditionsIcon from '../../../../../assets/svg/preExistingConditions';
import ImmunisationsIcon from '../../../../../assets/svg/immunisations';
import MedicationsIcon from '../../../../../assets/svg/medications';
import ProceduresIcon from '../../../../../assets/svg/frameProcedures';
import DevicesIcon from '../../../../../assets/svg/implantedDevices';


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
            <Allergies 
                cardInformation = {getData(allergies)}
                icon = {AllergiesIcon}
            />
            <PreExistingConditions 
                cardInformation = {getData(preExistConditions)} 
                icon = {ConditionsIcon}
            />
            <Immunisations 
                cardInformation = {getData(immunisations)}
                icon = {ImmunisationsIcon}
            />
            <Medications 
                cardInformation = {getData(medications)}
                icon = {MedicationsIcon}
            />
            <Procedures 
                cardInformation = {getData(procedures)}
                icon = {ProceduresIcon}
            />
            <MedicalHistoryImplantedDevices 
                cardInformation = {getData(devices)}
                icon = {DevicesIcon}
            />
        </ScrollView>
    );
}
 
export default General;