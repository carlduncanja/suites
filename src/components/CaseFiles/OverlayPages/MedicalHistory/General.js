import React from 'react';
import { View, ScrollView } from 'react-native';
import { Allergies, PreExistingConditions, Immunisations, Medications, Procedures, MedicalHistoryImplantedDevices } from '../../OverlayCardFrames';

const General = () => {
    return ( 
        <ScrollView>
            <Allergies/>
            <PreExistingConditions/>
            <Immunisations/>
            <Medications/>
            <Procedures/>
            <MedicalHistoryImplantedDevices/>
        </ScrollView>
    );
}
 
export default General;