import React,{useContext} from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {Low, Moderate, High, VeryHigh} from '../../RiskFrames/RiskLevels' 
import { SuitesContext } from '../../../../contexts/SuitesContext';

const PateintRisk = ({tabDetails}) => {
    const [state] = useContext(SuitesContext)
    
    return ( 
        <ScrollView>
            {tabDetails.map((detail)=>{
                return (
                    detail.riskLevel === 'low' ?
                        <Low level={detail}/>
                    :
                    detail.riskLevel === 'moderate' ?
                        <Moderate level={detail}/>
                        :
                        detail.riskLevel === 'high' ?
                            <High level={detail}/>
                            :
                                <VeryHigh level={detail}/>
                )
            })
        }     
        </ScrollView>
    );
}
 
export default PateintRisk;