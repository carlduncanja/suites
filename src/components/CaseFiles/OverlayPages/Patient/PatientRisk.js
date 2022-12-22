import React,{useContext, useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {Low, Moderate, High, VeryHigh} from '../../RiskFrames/RiskLevels' 
import RiskLevel from '../../RiskFrames/RiskLevel'; 
import {PageContext} from '../../../../contexts/PageContext';

const PateintRisk = ({tabDetails = [], fields, onFieldChange}) => { 
     
    const {pageState, setPageState} = useContext(PageContext);
    const {isEditMode} = pageState;
     
    
    const [risks, setRisks] = useState(tabDetails)
    console.log("what the actual hell is this garbage",tabDetails)
    const onRiskChange = (id) => (newLevel) => {

        if (isEditMode){
            const findIndex = risks.findIndex(obj => obj._id === id);
            const updatedObj = { ...risks[findIndex], level: newLevel};
            const updatedRisks = [
                ...risks.slice(0, findIndex),
                updatedObj,
                ...risks.slice(findIndex + 1),
            ]; 
            setRisks(updatedRisks)
            console.log("Id and Level: ", id, newLevel)
        }     
    }

    return ( 
        <ScrollView>
            {
                risks.length === 0 &&
                <>
                    <RiskLevel
                     isEditMode={isEditMode}
                     onRiskChange = {onRiskChange()}
                    />
                </>
            }
            {risks.map((risk,index)=>{
                const {level = 'low', notes = [], _id = ""} = risk 
                return (
                    <View key={index}>
                        {
                            level === 'low' ? 
                                <View>
                                    <RiskLevel
                                        titleBackground="#EBF8FF"
                                        borderColor="#90CDF4"
                                        levelColor="#4299E1"
                                        cardColor="#3182CE" 
                                        riskLevel={level}
                                        itemContent = {notes}
                                        isEditMode = {isEditMode}
                                        fields = {fields}
                                        onFieldChange = {onFieldChange}
                                        onRiskChange = {onRiskChange(_id)}
                                    />
                                </View>
                                :
                            level === 'moderate' ? 
                                <View>
                                    <RiskLevel
                                        titleBackground="#FFFAF0"
                                        borderColor="#FBD38D"
                                        levelColor="#ED8936"
                                        cardColor="#DD6B20"
                                        riskLevel={level}
                                        itemContent = {notes}
                                        isEditMode = {isEditMode}
                                        fields = {fields}
                                        onFieldChange = {onFieldChange}
                                        onRiskChange = {onRiskChange(_id)}
                                    />
                                </View>
                                :
                            level === 'high' ? 
                                <View>
                                    <RiskLevel
                                        titleBackground="#FFF5F5"
                                        borderColor="#FEB2B2"
                                        levelColor="#F56565"
                                        cardColor="#E53E3E"
                                        riskLevel={level}
                                        itemContent = {notes}
                                        isEditMode = {isEditMode}
                                        fields = {fields}
                                        onFieldChange = {onFieldChange}
                                        onRiskChange = {onRiskChange(_id)}
                                    />
                                </View>
                                :

                            <View>
                                <RiskLevel
                                    titleBackground="#FAF5FF"
                                    borderColor="#D6BCFA"
                                    levelColor="#9F7AEA"
                                    cardColor="#805AD5"
                                    riskLevel={level}
                                    itemContent = {notes}
                                    isEditMode = {isEditMode}
                                    fields = {fields}
                                    onFieldChange = {onFieldChange}
                                    onRiskChange = {onRiskChange(_id)}
                                />
                            </View>
                        }
                    </View>
                    
                )
            })
        }     
        </ScrollView>
    );
}
 
export default PateintRisk;