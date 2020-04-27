import React from 'react';
import { View, Picker, ScrollView } from "react-native";
import { DrugUse, AlcoholUse, TobaccoUse } from '../../OverlayCardFrames'

import TobaccoIcon from '../../../../../assets/svg/tobacco';
import DrugIcon from '../../../../../assets/svg/drug';
import AlcoholIcon from '../../../../../assets/svg/alcohol';


const Lifestyle = ({tabDetails}) => {
    const drugItems = tabDetails.filter( item => item.categories === 'drug')
    const alcoholItems = tabDetails.filter(item => item.categories === 'alcohol')
    const tobaccoItems = tabDetails.filter(item => item.categories === 'tobacco')
    return ( 
        <ScrollView>
            {drugItems.map((drug)=>{
                return <DrugUse cardInformation = {drug} icon = {DrugIcon}/>
            })}
            {alcoholItems.map((alcohol)=>{
                return <AlcoholUse cardInformation = {alcohol} icon = {AlcoholIcon}/>
            })}
            {tobaccoItems.map((tobaccoItem)=>{
                return <TobaccoUse cardInformation = {tobaccoItem} icon = {TobaccoIcon}/>
            })}
        </ScrollView>
    );
}
 
export default Lifestyle;
