import React from 'react';
import { View } from 'react-native';
import { FamilyPreExistingConditions } from '../../OverlayCardFrames';
import { ScrollView } from 'react-native-gesture-handler';

const FamilyHistory = () => {
    return ( 
        <ScrollView>
            <FamilyPreExistingConditions/>
        </ScrollView>
    );
}
 
export default FamilyHistory;