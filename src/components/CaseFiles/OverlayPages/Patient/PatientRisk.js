import React,{useContext} from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {Low, Moderate, High, VeryHigh} from '../../RiskFrames/RiskLevels' 

const PateintRisk = ({tabDetails}) => { 

    return ( 
        <ScrollView>
            {tabDetails.map((detail,index)=>{
                const {level = 'low', notes = []} = detail
                return (
                    <View key={index}>
                        {
                            level === 'low' ? <Low level={level} notes={notes}/> :
                            level === 'moderate' ? <Moderate level={level} notes={notes}/> :
                            level === 'high' ? <High level={level} notes={notes}/> :
                            <VeryHigh llevel={level} notes={notes}/>
                        }
                    </View>
                    
                )
            })
        }     
        </ScrollView>
    );
}
 
export default PateintRisk;