import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import Table from '../common/Table/Table';
import Item from '../common/Table/Item';
import {currencyFormatter, formatDate} from "../../utils/formatter";


const testData = [
    {
        procedureName: 'Coronary Bypass Graft',
        isRecovery: true,
        duration: 1,
        date: new Date()
    },
    {
        procedureName: 'Biotherapy (Biological Therapy)',
        isRecovery: false,
        duration: 5,
        date: new Date()
    }
];


const headers = [
    {
        name: "Procedure",
        alignment: "flex-start"
    },
    {
        name: "Recovery",
        alignment: "center"
    },
    {
        name: "Duration",
        alignment: "center"
    },
    {
        name: "Date",
        alignment: "center"
    },
];

const HistoryTabs = ({
                         equipments: cases = testData,
                         selectedItems = [],
                         onCheckboxPress = () => {
                         },
                         onSelectAll = () => {
                         },
                     }) => {

    const listItem = ({procedureName, isRecovery, duration, date}) => <>
        <View style={[styles.item, {alignItems: 'flex-start'}]}>
            <Text style={[styles.itemText, {color: "#3182CE"}]}>{procedureName}</Text>
        </View>
        <View style={[styles.item, {alignItems: 'center'}]}>
            <Text style={styles.itemText}>{isRecovery ? "YES" : "NO"}</Text>
        </View>
        <View style={[styles.item, {alignItems: 'center'}]}>
            <Text style={styles.itemText}>{duration}</Text>
        </View>
        <View style={[styles.item, {alignItems: 'center'}]}>
            <Text style={styles.itemText}>{formatDate(date, "MM/DD/YYYY")}</Text>
        </View>
    </>;

    const renderListFn = (item) => {
        return <Item
            hasCheckBox={false}
            isChecked={selectedItems.includes(item)}
            onItemPress={() => {}}
            itemView={listItem(item)}
        />
    };

    return (
        <ScrollView>
            <Table
                isCheckbox={false}
                data={cases}
                listItemFormat={renderListFn}
                headers={headers}
                toggleHeaderCheckbox={onSelectAll}
                itemSelected={selectedItems}
            />
        </ScrollView>
    );
};

export default HistoryTabs;

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
