import React,{useContext} from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {Low, Moderate, High, VeryHigh} from '../../RiskFrames/RiskLevels'
import { SuitesContext } from '../../../../contexts/SuitesContext';

const PateintRisk = () => {
    const suitesState = useContext(SuitesContext).state
    const level = suitesState.slideOverlay.slideOverlayTabInfo
    return ( 
        <ScrollView>
            {
                level.riskLevel === 1 ?
                    <Low level={level}/>
                    :
                    level.riskLevel === 2 ?
                        <Moderate level={level}/>
                        :
                        level.riskLevel === 3 ?
                            <High level={level}/>
                            :
                                <VeryHigh level={level}/>
            }
        </ScrollView>
    );
}
 
export default PateintRisk;