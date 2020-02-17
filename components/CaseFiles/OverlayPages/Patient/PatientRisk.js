import React,{useContext} from 'react';
import { View, Text, StyleSheet } from "react-native";
import {Low, Moderate, High, VeryHigh} from '../../RiskFrames/RiskLevels'
import { SuitesContext } from '../../../../contexts/SuitesContext';

const PateintRisk = () => {
    const suitesState = useContext(SuitesContext).state
    const level = suitesState.overlayTabInfo
    return ( 
        <View>
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
        </View>
    );
}
 
export default PateintRisk;