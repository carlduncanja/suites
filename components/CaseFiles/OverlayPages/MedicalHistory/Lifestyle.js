import React from 'react';
import { View, Picker } from "react-native";
import { DrugUse, AlcoholUse, TobaccoUse } from '../../OverlayCardFrames'

const Lifestyle = () => {
    return ( 
        <View>
            <DrugUse/>
            <AlcoholUse/>
            <TobaccoUse/>
        </View>
    );
}
 
export default Lifestyle;
