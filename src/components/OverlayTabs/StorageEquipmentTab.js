import React,{  } from "react";
import { View, Text, StyleSheet } from "react-native";
import Equipment from '../CaseFiles/OverlayPages/ChargeSheet/Equipment';
import { currencyFormatter } from '../../utils/formatter';
 
const testData = [
    {
        itemName : 'Bag',
        type : 'Anaesthesia',
        onHand : 100,
        unitPrice : 4120.76
    },
    {
        itemName : 'Atracurium',
        type : 'Anaesthesia',
        onHand : 50,
        unitPrice : 8924.09
    }

]
const StorageEquipmentTab = () => {

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
    ]

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
        <Equipment
            tabDetails = {data}
            headers = {headers}
            listItemFormat = {listItem}
        />
    )
}

export default StorageEquipmentTab

const styles = StyleSheet.create({
    item:{
        flex:1,
    },
    itemText:{
        fontSize:16,
        color:"#4A5568",
    },
})