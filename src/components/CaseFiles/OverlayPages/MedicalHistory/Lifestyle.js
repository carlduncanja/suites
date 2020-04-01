import React from 'react';
import { View, Picker } from "react-native";
import { DrugUse, AlcoholUse, TobaccoUse } from '../../OverlayCardFrames'
import { ScrollView } from 'react-native-gesture-handler';

const Lifestyle = ({tabDetails}) => {
    const drugItems = tabDetails.filter( item => item.categories === 'drug')
    const alcoholItems = tabDetails.filter(item => item.categories === 'alcohol')
    const tobaccoItems = tabDetails.filter(item => item.categories === 'tobacco')
    return ( 
        <ScrollView>
            {drugItems.map((drug)=>{
                return <DrugUse cardInformation = {drug}/>
            })}
            {alcoholItems.map((alcohol)=>{
                return <AlcoholUse cardInformation = {alcohol}/>
            })}
            {tobaccoItems.map((tobaccoItem)=>{
                return <TobaccoUse cardInformation = {tobaccoItem}/>
            })}
        </ScrollView>
    );
}
 
export default Lifestyle;
