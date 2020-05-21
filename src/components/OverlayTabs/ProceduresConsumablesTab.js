import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Consumables from '../CaseFiles/OverlayPages/ChargeSheet/Consumables';
import Button from "../common/Buttons/Button";

import { currencyFormatter } from '../../utils/formatter'
import NumberChangeField from "../common/Input Fields/NumberChangeField";

const ProceduresConsumablesTab = ({consumablesData, isEditMode}) => {

    const [consumables, setConsumbales] = useState(consumablesData)

    const onDecreasePress = () => {

    }
    const onIncreasePress = () => {

    }

    const headers = [
        {
            name :"Item Name",
            alignment: "flex-start"
        },
        {
            name :"Type",
            alignment: "center"
        },
        {
            name :"Quantity",
            alignment: "center"
        },
        {
            name :"Unit Price",
            alignment: "flex-end"
        }
    ]

    const listItem = (item) => <>
        <View style={styles.item}>
            <Text style={[styles.itemText,{color:"#3182CE"}]}>{item.item}</Text>
        </View>
        <View style={[styles.item,{alignItems:'flex-start'}]}>
            <Text style={styles.itemText}>{item.type}</Text>
        </View>
        { isEditMode ?
            <View style={[styles.item,{alignItems:'center'}]}>
                <NumberChangeField 
                    number={item.quantity} 
                    onDecreasePress = {onDecreasePress(item)}
                    onIncreasePress = {onIncreasePress(item)}
                />
            </View>
            :
            <View style={[styles.item,{alignItems:'center'}]}>
                <Text style={styles.itemText}>{item.quantity}</Text>
            </View>
        
        }
       
        <View style={[styles.item,{alignItems:'flex-end'}]}>
            <Text style={styles.itemText}>$ {currencyFormatter(item.unitPrice)}</Text>
        </View>
             
    </>

    const data = consumablesData.map(item => {

        return {
            item :  item.inventory.name,
            type : "Anaesthesia",
            quantity : item.amount,
            unitPrice : item.inventory.unitPrice
        }
    });

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

export default ProceduresConsumablesTab

const styles = StyleSheet.create({
    item:{
        flex:1,
    },
    itemText:{
        fontSize:16,
        color:"#4A5568",
    },
    
})