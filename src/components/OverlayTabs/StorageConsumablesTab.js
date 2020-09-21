import React, {} from "react";
import {View, StyleSheet, Text} from "react-native";
import Consumables from '../CaseFiles/OverlayPages/ChargeSheet/Consumables';
import {currencyFormatter} from '../../utils/formatter';
import Table from "../common/Table/Table";
import Footer from "../common/Page/Footer";


const testData = [
    {
        item: 'Agents',
        type: 'Anaesthesia',
        onHand: 150,
        unitPrice: 4120.76
    },
    {
        item: 'Atracurium',
        type: 'Anaesthesia',
        onHand: 25,
        unitPrice: 8924.09
    }
];

const headers = [
    {
        name: "Item Name",
        alignment: "flex-start"
    },
    {
        name: "Type",
        alignment: "center"
    },
    {
        name: "On-Hand",
        alignment: "center"
    },
    {
        name: "Unit Price",
        alignment: "flex-end"
    }
];


const StorageConsumablesTab = ({consumables = testData}) => {

    const listItem = (item) => <>
        <View style={styles.item}>
            <Text style={[styles.itemText, {color: "#3182CE"}]}>{item.item}</Text>
        </View>
        <View style={[styles.item, {alignItems: 'flex-start'}]}>
            <Text style={styles.itemText}>{item.type}</Text>
        </View>
        <View style={[styles.item, {alignItems: 'center'}]}>
            <Text style={styles.itemText}>{item.onHand}</Text>
        </View>
        <View style={[styles.item, {alignItems: 'flex-end'}]}>
            <Text style={styles.itemText}>$ {currencyFormatter(item.unitPrice)}</Text>
        </View>
    </>;
 
    const toggleActionButton = () =>{

    }
    
    return (
        <>
            <Table
                data = {consumables}
                listItemFormat = {listItem}
                headers = {headers}
                isCheckbox = {true}
            />

            <Footer
                toggleActionButton = {toggleActionButton}
            />
        </>
        
    )
}

export default StorageConsumablesTab

const styles = StyleSheet.create({
    item: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        color: "#4A5568",
    },
});
