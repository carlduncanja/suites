import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { FamilyPreExistingConditions } from '../../OverlayCardFrames';
import FrameTableCard from '../../../common/Frames/FrameCards/FrameTableCard'

import FamilyIcon from '../../../../../assets/svg/familyConditions';


const FamilyHistory = ({tabDetails}) => {

    const familyHistory = tabDetails.map( item => {
        const { relative = "", condition = "" } = item
        return { relative, condition}
    })
    
    return ( 
        <ScrollView>

            <View style={styles.frameContainer}>
                <FrameTableCard
                    frameColor = "#DD6B20"
                    titleBackgroundColor = "#FFFAF0"
                    frameBorderColor = "#FBD38D"
                    frameTitle = "Pre-Existing Conditions"
                    cardInformation = {familyHistory}
                    icon = {FamilyIcon}
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