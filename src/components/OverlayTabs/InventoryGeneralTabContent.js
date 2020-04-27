import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from "react-native";
import moment from "moment";
import LevelIndicator from "../common/LevelIndicator/LevelIndicator";
import {currencyFormatter, formatDate} from "../../utils/formatter";


const UiData = {
    description: "In endoscopy, Fibre-optic endoscopes are pliable, highly maneuverable instruments that allow access to channels in the body.",
    sku: "FE0921",
    lastReceived: new Date(2019, 11, 12),
    supplier: "Medical Supplies Ltd.",
    categories: [],
    unit: [],
    unitPrice: 4000.45,
    stock: 120,
    levels: {
        max: 700,
        min: 0,
        critical: 100,
        ideal: 350,
    }
};

function InventoryGeneralTabContent({inventoryDetails}) {

    const {
        description = "",
        sku = "",
        lastReceived = null,
        supplier = "",
        categories = [],
        unit = "pack",
        unitPrice = 0,
        stock = 0,
        levels = {
            max: 300,
            min: 0,
            critical: 100,
            ideal: 200,
        }
    } = UiData;


    return <View style={styles.container}>


        {/*Description*/}
        <View style={styles.row}>
            <View style={[styles.item, {flex: 2}]}>
                <Text style={styles.textLabel}>Description</Text>
                <Text style={[styles.textDefault]}>{description}</Text>
            </View>
            <View style={{flex: 1}}/>
        </View>

        <View style={styles.row}>
            <View style={styles.item}>
                <Text style={styles.textLabel}>SKU</Text>
                <Text style={styles.textDefault}>{sku}</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.textLabel}>Last Received</Text>
                <Text style={styles.textDefault}>{formatDate(lastReceived,"MMM DD, YYYY")} </Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.textLabel}>Supplier</Text>
                <Text style={styles.textDefault}>{supplier}</Text>
            </View>
        </View>

        <View style={styles.row}>
            <View style={styles.item}>
                <Text style={styles.textLabel}>Category</Text>
                <Text style={styles.textDefault}> -- </Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.textLabel}>Unit</Text>
                <Text style={styles.textDefault}> {unit} </Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.textLabel}>Unit Price</Text>
                <Text style={styles.textDefault}>${currencyFormatter(unitPrice)} </Text>
            </View>
        </View>

        <View style={styles.row}>
            <View style={styles.item}>
                <Text style={styles.textLabel}>Supplier</Text>
                <Text style={styles.textDefault}> {stock} </Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.textLabel}>Capacity</Text>
                <LevelIndicator
                    level={stock}
                    {...levels}
                />
            </View>

            <View style={styles.item}/>
        </View>
    </View>;
}

InventoryGeneralTabContent.propTypes = {};
InventoryGeneralTabContent.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 24,
        // paddingTop: 32
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32
    },
    item: {
        flex: 1,
        flexDirection: 'column'
    },
    textLabel: {
        color: "#718096",
        marginBottom: 12,
        fontSize: 16,
        fontWeight: 'normal',
    },
    textDefault: {
        color: "#323843",
        fontSize: 16,
        fontWeight: 'normal',
    },
});

export default InventoryGeneralTabContent;
