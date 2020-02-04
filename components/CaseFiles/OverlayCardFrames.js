import React,{Component} from 'react';
import {View,Text} from 'react-native';
import FrameCard from '../common/Frames/FrameCard'

export function SignsAndSymptoms({cardInformation}) {
    return(
        <FrameCard
            frameColor = "#3182CE"
            titleBackgroundColor = "#EBF8FF"
            frameBorderColor = "#90CDF4"
            frameTitle = "Signs and Symptoms"
            cardInformation = {cardInformation}
            frameIconName = "signsAndSymptoms"
        />
    )
    
}

export function Examinations({cardInformation}){
    return(
        <FrameCard
            frameColor = "#319795"
            titleBackgroundColor = "#E6FFFA"
            frameBorderColor = "#4FD1C5"
            frameTitle = "Examinations"
            cardInformation = {cardInformation}
            frameIconName = "examinations"
        />
    )
}
