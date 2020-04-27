import React from 'react';
import {View, StyleSheet, Text} from "react-native";
import PropTypes from 'prop-types';
import Table from "../common/Table/Table";
import {formatDate} from "../../utils/formatter";
import ArrowRightIcon from "../../../assets/svg/arrowRightIcon";

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
        alignment: 'flex-start',
        styles: {
            flex: 1
        }
    },
    {
        name: 'Product',
        alignment: 'center',
        styles: {
            flex: 1
        }
    },
    {
        name: 'Date',
        alignment: 'center',
        styles: {
            flex: 1
        }
    },
    {
        name: 'Quantity',
        alignment: 'center',
        styles: {
            flex: 1
        }
    }
];

const CompletedTransferHeadings = [
    {
        name: 'Transfer',
        alignment: 'flex-start',
        styles: {
            flex: 2
        }
    },
    {
        name: 'Date',
        alignment: 'flex-start',
        styles: {
            flex: 1
        }
    },
    {
        name: 'Product',
        alignment: 'flex-start',
        styles: {
            flex: 1
        }
    }
];


function TransfersOverlayTab({transferItems = uiData}) {


    const completedTransferListItem = ({from, to, product, quantity, date}) => {
        return (<View
            style={{flexDirection: 'row', alignItems: 'flex-start', marginBottom: 32}}>
            <View style={[styles.item, {flex: 2, justifyContent: 'space-between', paddingRight: 20}]}>
                <View style={[styles.highlighted]}><Text style={[styles.itemText, styles.linkText]}>{from}</Text></View>
                <ArrowRightIcon/>
                <View style={[styles.highlighted]}><Text style={[styles.itemText, styles.linkText]}>{to}</Text></View>
            </View>

            <View style={[styles.item, {justifyContent: 'flex-start'}]}>
                <Text style={styles.itemText}>
                    {formatDate(date, "MM/DD/YYYY")}
                </Text>
            </View>

            <View style={[styles.item, {justifyContent: 'flex-start'}]}>
                <Text style={styles.itemText}>
                    {product}({quantity})
                </Text>
            </View>
        </View>)
    };

    const pendingTransferListItem = ({from, to, product, quantity, date}) => {
        return (<View
            style={{flexDirection: 'row', alignItems: 'flex-start', marginBottom: 32}}>
            <View style={[styles.item, {justifyContent: 'space-between', paddingRight: 20}]}>
                <View style={[styles.highlighted]}><Text style={[styles.itemText, styles.linkText]}>{from}</Text></View>
            </View>

            <View style={[styles.item, {justifyContent: 'center'}]}>
                <Text style={styles.itemText}>
                    {product}
                </Text>
            </View>

            <View style={[styles.item, {justifyContent: 'center'}]}>
                <Text style={styles.itemText}>
                    {formatDate(date, "MM/DD/YYYY")}
                </Text>
            </View>

            <View style={[styles.item, {justifyContent: 'center'}]}>
                <Text style={styles.itemText}>
                    {quantity}
                </Text>
            </View>
        </View>)
    };

    const renderCompleteItem = (item) => {
        return completedTransferListItem(item)
    };

    const renderPendingItem = (item) => {
        return pendingTransferListItem(item)
    };


    return (
        <View style={styles.container}>
            {/*PENDING*/}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionHeading}>Pending</Text>

                <Table
                    data={transferItems}
                    listItemFormat={renderPendingItem}
                    headers={PendingTransferHeadings}
                    isCheckbox={false}
                />

            </View>

            {/*COMPLETED*/}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionHeading}>Completed</Text>

                <Table
                    data={transferItems}
                    listItemFormat={renderCompleteItem}
                    headers={CompletedTransferHeadings}
                    isCheckbox={false}
                />

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 32
    },
    item: {
        flex: 1,
        flexDirection: 'row',
    },
    itemText: {
        fontSize: 16,
        color: "#4E5664",
    },
    linkText: {
        color: "#3182CE",
    },
    sectionHeading: {
        color: '#323843',
        fontWeight: '500',
        fontSize: 20,
        marginBottom: 24,
    },
    sectionContainer: {
        marginBottom: 40
    }

});

TransfersOverlayTab.propTypes = {};
TransfersOverlayTab.defaultProps = {};

export default TransfersOverlayTab;
