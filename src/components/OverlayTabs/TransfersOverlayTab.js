import React from 'react';
import {View, StyleSheet, Text} from "react-native";
import PropTypes from 'prop-types';
import Table from "../common/Table/Table";
import {formatDate} from "../../utils/formatter";

const uiData = [
    // transfer data;
    {
        from: "OR1: Cabinet 1",
        to: "OR1: Cabinet 2",
        product: "Normal Saline",
        date: new Date(),
        quantity: 25,
        status: "COMPLETED"
    },
    {
        from: "OR1: Cabinet 1",
        to: "OR1: Cabinet 2",
        product: "Normal Saline",
        date: new Date(),
        quantity: 35,
        status: "COMPLETED"
    },

];


const PendingTransferHeadings = [
    {
        name: 'Transfer',
        alignment: 'flex-start'
    },
    {
        name: 'Product',
        alignment: 'center'
    },
    {
        name: 'Date',
        alignment: 'center'
    },
    {
        name: 'Quantity',
        alignment: 'flex-end'
    }
];

const CompletedTransferHeadings = [
    {
        name: 'Transfer',
        alignment: 'flex-start'
    },
    {
        name: 'Date',
        alignment: 'center'
    },
    {
        name: 'Product',
        alignment: 'center'
    }
];


function TransfersOverlayTab({transferItems = uiData}) {


    const completedTransferListItem = ({from, to, product, quantity}) => {
        return (<>
            <View style={styles.item}>
                <View style={[styles.highlighted]}>{from}</View>
                <View style={[styles.highlighted]}>{to}</View>
            </View>

            <View style={styles.item}>
                <Text style={styles.itemText}>
                    {formatDate(Date)}
                </Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.itemText}>
                    {product}({quantity})
                </Text>
            </View>
        </>)
    };


    return (
        <View style={styles.container}>
            {/*<Table*/}
            {/*    data={dataToDisplay}*/}
            {/*    listItemFormat={listItemFormat}*/}
            {/*    headers={headers}*/}
            {/*    isCheckbox={false}*/}
            {/*/>*/}

            {/*PENDING*/}
            <View style={styles.sectionContainer}>
                <Text>Pending</Text>

            </View>

            {/*COMPLETED*/}
            <View style={styles.sectionContainer}>
                <Text>Completed</Text>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        flex: 1,
        flexDirection: 'row',
    },
    itemText: {
        fontSize: 14,
        color: "#4E5664",
    },
    sectionHeading: {
        color: '#323843',
        fontWeight: '500',
        fontSize: 20,
    },
    sectionContainer: {
        marginBottom: 40
    }

});

TransfersOverlayTab.propTypes = {};
TransfersOverlayTab.defaultProps = {};

export default TransfersOverlayTab;
