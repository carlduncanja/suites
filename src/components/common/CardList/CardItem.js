import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PersonalRecord } from "../Information Record/RecordStyles";

/**
 * @param itemObject object
 * @returns {*} 
 * @constructor
 */

const CardItem = ({itemObject}) => {
    return (
        <PersonalRecord
            valueFontSize = {16}
            titleFontSize = {14}
            titleColor = {"#718096"}
            valueColor= {"#1D2129"} 
            recordTitle = {itemObject.name}
            recordValue = {itemObject.detail}
        />
    )
}

export default CardItem