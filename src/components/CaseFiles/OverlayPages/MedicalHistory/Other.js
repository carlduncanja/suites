import React from 'react';
import { View, ScrollView, StyleSheet } from "react-native";
import { OtherNotableConditions } from '../../OverlayCardFrames'
import FrameCard from '../../../common/Frames/FrameCards/FrameCard';
import FamilyIcon from '../../../../../assets/svg/familyConditions';

const Other = ({tabDetails}) => {
    return ( 
        <ScrollView>

            <View style={styles.frameContainer}>
                <FrameCard
                    frameColor = "#DD6B20"
                    titleBackgroundColor = "#FFFAF0"
                    frameBorderColor = "#FBD38D"
                    frameTitle = "Other Notable Conditions"
                    cardInformation = {tabDetails}
                    icon = {FamilyIcon}
                />
            </View>
            
        </ScrollView>
    );
}
 
export default Other;

const styles = StyleSheet.create({
    frameContainer:{
        marginBottom:20
    }
})
