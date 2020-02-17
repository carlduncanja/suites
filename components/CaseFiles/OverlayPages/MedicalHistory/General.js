import React from 'react';
import { View } from 'react-native';
import { Allergies, PreExistingConditions, Immunisations, Medications, Procedures, MedicalHistoryImplantedDevices } from '../../OverlayCardFrames';

const General = () => {
    return ( 
        <View>
            <Allergies/>
            <PreExistingConditions/>
            <Immunisations/>
            <Medications/>
            <Procedures/>
            <MedicalHistoryImplantedDevices/>
        </View>
    );
}
 
export default General;