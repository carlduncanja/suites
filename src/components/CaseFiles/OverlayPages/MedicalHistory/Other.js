import React from 'react';
import { View, ScrollView } from "react-native";
import { OtherNotableConditions } from '../../OverlayCardFrames'

import FamilyIcon from '../../../../../assets/svg/familyConditions';

const Other = ({tabDetails}) => {
    return ( 
        <ScrollView>
            <OtherNotableConditions 
                cardInformation = {tabDetails}
                icon = {FamilyIcon}
            />
        </ScrollView>
    );
}
 
export default Other;
