import React from 'react';
import { View, ScrollView } from "react-native";
import { OtherNotableConditions } from '../../OverlayCardFrames'

const Other = ({tabDetails}) => {
    return ( 
        <ScrollView>
            <OtherNotableConditions cardInformation = {tabDetails}/>
        </ScrollView>
    );
}
 
export default Other;
