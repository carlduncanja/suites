import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { FamilyPreExistingConditions } from '../../OverlayCardFrames';
import FrameTableCard from '../../../common/Frames/FrameCards/FrameTableCard'

import FamilyIcon from '../../../../../assets/svg/familyConditions';


const FamilyHistory = ({tabDetails, isEditMode, patient}) => {
    useEffect(()=>{
        console.log("ISEdit mode Test")
        console.log(isEditMode)
    })

    const familyHistory = tabDetails.map( item => {
        const { relative = "", condition = "" } = item
        //console.log("Items Test", item)
        return { relative, condition}
    })

    const handleAdd = (value, type) => {
        const patientId = patient._id;
        console.log('Testing');
        console.log(value);
        console.log(type);
        console.log(patientId)
    }

    
    return ( 
        <ScrollView>

            <View style={styles.frameContainer}>
                <FrameTableCard
                    isEditMode={isEditMode}
                    frameColor = "#DD6B20"
                    titleBackgroundColor = "#FFFAF0"
                    frameBorderColor = "#FBD38D"
                    frameTitle = "Pre-Existing Conditions"
                    cardInformation = {familyHistory}
                    icon = {FamilyIcon}
                    normalInput={true}
                    onAction={(name, condition) => {
                        handleAdd(name, condition)
                    }}

                />
            </View> 

        </ScrollView>
    );
}
 
export default FamilyHistory;

const styles = StyleSheet.create({
    frameContainer:{
        marginBottom: 20
    }
})