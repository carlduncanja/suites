import React,{  } from "react";
import { View, StyleSheet, Text } from "react-native";
import Consumables from '../../CaseFiles/OverlayPages/ChargeSheet/Consumables';
import { currencyFormatter } from '../../../utils/formatter';


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
        name :"On-Hand",
        alignment: "center"
    },
    {
        name :"Unit Price",
        alignment: "flex-end"
    }
];

const ConsumablesTab = () => {

    const listItem = (item) => <>
        <View style={styles.item}>
            <Text style={[styles.itemText,{color:"#3182CE"}]}>{item.item}</Text>
        </View>
        <View style={[styles.item,{alignItems:'flex-start'}]}>
            <Text style={styles.itemText}>{item.type}</Text>
        </View>
        <View style={[styles.item,{alignItems:'center'}]}>
            <Text style={styles.itemText}>{item.onHand}</Text>
        </View>
        <View style={[styles.item,{alignItems:'flex-end'}]}>
            <Text style={styles.itemText}>$ {currencyFormatter(item.unitPrice)}</Text>
        </View>

    </>

    const data = testData.map(item => {

        return {
            item :  item.itemName,
            type : item.type,
            onHand : item.onHand,
            unitPrice : item.unitPrice
        }
    });


    return (
        <Consumables
            tabDetails = {data}
            headers = {headers}
            listItemFormat = {listItem}
        />
    )
}

export default ConsumablesTab

const styles = StyleSheet.create({
    item:{
        flex:1,
    },
    itemText:{
        fontSize:16,
        color:"#4A5568",
    },
})
