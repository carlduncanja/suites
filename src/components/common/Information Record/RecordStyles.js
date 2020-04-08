import React from 'react';
import Record from './Record';

export function PersonalRecord({recordTitle, recordValue, valueFontSize, titleFontSize, titleColor, valueColor}){
    return(
        <Record 
            valueFontSize = {valueFontSize}
            titleFontSize = {titleFontSize}
            titleColor = {titleColor}
            valueColor= {valueColor} 
            recordTitle={recordTitle}
            recordValue={recordValue}
        />
    )
}

export function MissingValueRecord({recordTitle, valueFontSize, titleFontSize, titleColor, valueColor}){
    return(
        <Record 
            valueFontSize = {valueFontSize}
            titleFontSize = {titleFontSize}
            titleColor = {titleColor}
            valueColor= {valueColor} 
            recordTitle={recordTitle}
            recordValue = "--"
        />
    )
}

export function ContactRecord({recordTitle, recordValue, valueFontSize, titleFontSize, titleColor}){
    return(
        <Record 
            valueFontSize = {valueFontSize}
            titleFontSize = {titleFontSize}
            titleColor = {titleColor}
            valueColor="#3182CE" 
            recordTitle={recordTitle}
            recordValue={recordValue}
        />
    )
}