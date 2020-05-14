import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Allergies, PreExistingConditions, Immunisations, Medications, Procedures, MedicalHistoryImplantedDevices } from '../../OverlayCardFrames';

import AllergiesIcon from '../../../../../assets/svg/allergies';
import ConditionsIcon from '../../../../../assets/svg/preExistingConditions';
import ImmunisationsIcon from '../../../../../assets/svg/immunisations';
import MedicationsIcon from '../../../../../assets/svg/medications';
import ProceduresIcon from '../../../../../assets/svg/frameProcedures';
import DevicesIcon from '../../../../../assets/svg/implantedDevices';

import FrameCard from '../../../common/Frames/FrameCards/FrameCard';

const General = ({tabDetails}) => {

    const getData = (medicalType) => {
        const { notes = [] } =  tabDetails.filter(item => item.type.name === medicalType)[0]
        return notes
    }

    return ( 
        <ScrollView>

            <View style={styles.frameContainer}>
                <FrameCard
                    frameColor = "#805AD5"
                    titleBackgroundColor = "#FAF5FF"
                    frameBorderColor = "#D6BCFA"
                    frameTitle = "Allergies"
                    cardInformation = {getData("Allergies")}
                    icon = {AllergiesIcon}
                />
            </View>

            <View style={styles.frameContainer}>
                <FrameCard
                    frameColor = "#DD6B20"
                    titleBackgroundColor = "#FFFAF0"
                    frameBorderColor = "#FBD38D"
                    frameTitle = "Pre-Existing Conditions"
                    cardInformation = {getData("Pre-Existing Conditions")} 
                    icon = {ConditionsIcon}
                />
            </View> 

            <View style={styles.frameContainer}>
                <FrameCard
                    frameColor = "#3182CE"
                    titleBackgroundColor = "#EBF4FF"
                    frameBorderColor = "#A3BFFA"
                    frameTitle = "Immunisations"
                    cardInformation = {getData("Immunisations")}
                    icon = {ImmunisationsIcon}
                />
            </View> 

            <View style={styles.frameContainer}>
                <FrameCard
                    frameColor = "#E53E3E"
                    titleBackgroundColor = "#FFF5F5"
                    frameBorderColor = "#FEB2B2"
                    frameTitle = "Medications"
                    cardInformation = {getData("Medications")}
                    icon = {MedicationsIcon}
                />
            </View> 
            
            <View style={styles.frameContainer}>
                <FrameCard
                    frameColor = "#38A169"
                    titleBackgroundColor = "#F0FFF4"
                    frameBorderColor = "#9AE6B4"
                    frameTitle = "Procedures"
                    cardInformation = {getData("Procedures")}
                    icon = {ProceduresIcon}
                />
            </View> 
            
            <View style={styles.frameContainer}>
                <FrameCard
                    frameColor = "#3182CE"
                    titleBackgroundColor = "#EBF8FF"
                    frameBorderColor = "#90CDF4"
                    frameTitle = "Implanted Devices"
                    cardInformation = {getData("Implanted Devices")}
                    icon = {DevicesIcon}
                />
            </View> 
            
        </ScrollView>
    );
}
 
export default General;

const styles = StyleSheet.create({
    frameContainer:{
        marginBottom:20
    }
})