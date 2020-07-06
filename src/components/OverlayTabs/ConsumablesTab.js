import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Consumables from '../CaseFiles/OverlayPages/ChargeSheet/Consumables';

import { withModal } from "react-native-modalfy";

const testData = [
    {
        itemName : 'Agents',
        type : 'Anaesthesia',
        quantity : 1,
        unitPrice : 4120.76
    },
    {
        itemName : 'Atracurium',
        type : 'Anaesthesia',
        quantity : 5,
        unitPrice : 8924.09
    }

]
const ConsumablesTab = ({data = testData, headers, listItem}) => {

    return (
        <>
            <Consumables
                tabDetails = {data}
                headers = {headers}
                listItemFormat = {listItem} 
            />
        </>

    )
}

export default ConsumablesTab

