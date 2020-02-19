import React from 'react';
import { View, Picker } from "react-native";
import { DrugUse, AlcoholUse, TobaccoUse } from '../../OverlayCardFrames'
import { ScrollView } from 'react-native-gesture-handler';

const Lifestyle = () => {
    return ( 
        <ScrollView>
            <DrugUse/>
            <AlcoholUse/>
            <TobaccoUse/>
        </ScrollView>
    );
}
 
export default Lifestyle;
