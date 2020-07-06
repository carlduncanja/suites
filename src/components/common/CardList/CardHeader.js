import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { PersonalRecord } from '../Information Record/RecordStyles';

/**
 * @param headerObject object
 * @returns {*}  
 * @constructor
 */

const CardHeader = ({headerObject}) => {
    return (
        <PersonalRecord
            valueFontSize = {16}
            titleFontSize = {12}
            titleColor = {"#718096"}
            valueColor= {"#1D2129"} 
            recordTitle = {headerObject.title}
            recordValue = {headerObject.description}
        />
    )
}

export default CardHeader
