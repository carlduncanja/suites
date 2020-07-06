import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import Table from '../common/Table/Table';
import Item from '../common/Table/Item';
import {currencyFormatter} from "../../utils/formatter";


const testData = [
    {
        name: 'Bag',
        type: 'Anaesthesia',
        quantity: 1,
        unitPrice: 4120.76
    },
    {
        name: 'Atracurium',
        type: 'Anaesthesia',
        quantity: 5,
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
        alignment: "flex-start"
    },
    {
        name: "Unit Price",
        alignment: "flex-end"
    }
];

const EquipmentsTab = ({
                           equipments = testData,
                           selectedItems = [],
                           onCheckboxPress = () => {
                           },
                           onSelectAll = () => {
                           },
                       }) => {

    const listItem = (item) => <>
        <View style={styles.item}>
            <Text style={[styles.itemText, {color: "#3182CE"}]}>{item.name}</Text>
        </View>
        <View style={[styles.item, {alignItems: 'flex-start'}]}>
            <Text style={styles.itemText}>{item.type}</Text>
        </View>
        <View style={[styles.item, {alignItems: 'flex-end'}]}>
            <Text style={styles.itemText}>$ {currencyFormatter(item.unitPrice)}</Text>
        </View>
    </>;

    const renderListFn = (item) => {
        return <Item
            hasCheckBox={true}
            isChecked={selectedItems.includes(item)}
            onCheckBoxPress={onCheckboxPress}
            onItemPress={() => {
            }}
            itemView={listItem(item)}
        />
    };

    return (
        <ScrollView>
            <Table
                isCheckbox={true}
                data={equipments}
                listItemFormat={renderListFn}
                headers={headers}
                toggleHeaderCheckbox={onSelectAll}
                itemSelected={selectedItems}
            />
        </ScrollView>
    );
};

export default EquipmentsTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        marginBottom: 10
    },
    dataContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    item: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        color: "#4A5568",
    },
    headersContainer: {
        //flex:1,
        marginLeft: 10,
        flexDirection: 'row',
        //width:'100%'
    },
    headerItem: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 12,
        color: '#718096'
    }
});
