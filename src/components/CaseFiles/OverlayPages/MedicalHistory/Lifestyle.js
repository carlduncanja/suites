import React from 'react';
import { View, Picker, ScrollView, StyleSheet } from "react-native";
import { DrugUse, AlcoholUse, TobaccoUse } from '../../OverlayCardFrames'

import TobaccoIcon from '../../../../../assets/svg/tobacco';
import DrugIcon from '../../../../../assets/svg/drug';
import AlcoholIcon from '../../../../../assets/svg/alcohol';

import FrameLifestyleCard from '../../../common/Frames/FrameCards/FrameLifestyleCard'

const Lifestyle = ({tabDetails}) => {

    const getTypeData = (lifestyleType) =>{
        return tabDetails.filter( item => {
            const { type = {name:"Molly"} } = item
            const { name = "Drug Use" } = type
            return name === lifestyleType && item
        }) || []
    }

    const drugs = getTypeData("Drug Use")
    const alcohol = getTypeData("Alcohol Use")
    const tobacco = getTypeData("Tobacco Use")
    
    return ( 
        <ScrollView>
            {drugs.map((drug, index)=>{
                return (
                    <View style={styles.frameContainer} key={index}>
                        <FrameLifestyleCard
                            frameColor = "#805AD5"
                            titleBackgroundColor = "#FAF5FF"
                            frameBorderColor = "#D6BCFA"
                            frameTitle = "Drug Use"
                            cardInformation = {drug}
                            icon = {DrugIcon}
                        />
                    </View>
                )
            })}

            {alcohol.map((alcoholItem, index)=>{
                return (
                    <View style={styles.frameContainer} key={index}>
                        <FrameLifestyleCard
                            frameColor = "#E53E3E"
                            titleBackgroundColor = "#FFF5F5"
                            frameBorderColor = "#FEB2B2"
                            frameTitle = "Alcohol Use"
                            cardInformation = {alcoholItem}
                            icon = {AlcoholIcon}
                        />
                    </View>
                )
            })}
            {tobacco.map((tobaccoItem, index)=>{
                return (
                    <View style={styles.frameContainer} key={index}>
                        <FrameLifestyleCard
                            frameColor = "#4E5664"
                            titleBackgroundColor = "#EEF2F6"
                            frameBorderColor = "#A0AEC0"
                            frameTitle = "Tobacco Use"
                            cardInformation = {tobaccoItem}
                            icon = {TobaccoIcon}
                        />
                    </View>
                )
            })}
        </ScrollView>
    );
}
 
export default Lifestyle;

const styles = StyleSheet.create({
    frameContainer:{
        marginBottom:20
    }
})
