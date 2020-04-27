import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from "react-native";
import moment from "moment";
import LevelIndicator from "../common/LevelIndicator/LevelIndicator";
import {currencyFormatter, formatDate} from "../../utils/formatter";


const UiData = {
    description: "",
    id: "SP-129031",
    name: "Medical Suppliers Ltd",
    status: "Active",
    phone: "876 920 1277",
    fax: "876 920 1278",
    email: "support@meds.com",
    representative: {
        name: "Jason Biggs",
        phone: "876 317 2142",
        email: "jason.biggs@meds.com",
    }
};

function InventoryGeneralTabContent({inventoryDetails = UiData}) {

    const {
        description = "",
        id = "",
        name = "",
        status = "",
        phone = "",
        fax = "",
        email = "",
        representative = {
            name: "",
            phone: "",
            email: ""
        }
    } = inventoryDetails;


    return <View style={styles.container}>
        {/*Description*/}
        <View style={styles.row}>
            <View style={[styles.item, {flex: 2}]}>
                <Text style={styles.textLabel}>Description</Text>
                <Text style={[styles.textDefault, {
                    color: description ? "#323843" : "#A0AEC0"
                }]}>
                    {description ? description : "No description available"}
                </Text>
            </View>
            <View style={{flex: 1}}/>
        </View>

        <View style={styles.row}>
            <View style={styles.item}>
                <Text style={styles.textLabel}>Supplier ID</Text>
                <Text style={styles.textDefault}>{id}</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.textLabel}>Supplier Name</Text>
                <Text style={styles.textDefault}>{name} </Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.textLabel}>Status</Text>
                <Text style={styles.textDefault}>{status}</Text>
            </View>
        </View>

        <View style={styles.row}>
            <View style={styles.item}>
                <Text style={styles.textLabel}>Telephone</Text>
                <Text style={[styles.textDefault, styles.textLink]}> {phone} </Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.textLabel}>Fax</Text>
                <Text style={[styles.textDefault, styles.textLink]}> {fax} </Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.textLabel}>Email</Text>
                <Text style={[styles.textDefault, styles.textLink]}>{email}</Text>
            </View>
        </View>

        <View style={styles.divider}/>

        <View style={styles.row}>
            <View style={styles.item}>
                <Text style={styles.textLabel}>Representative</Text>
                <Text style={styles.textDefault}> {representative.name} </Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.textLabel}>Rep. Telephone</Text>
                <Text style={[styles.textDefault, styles.textLink]}> {representative.phone} </Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.textLabel}>Rep. Email</Text>
                <Text style={[styles.textDefault, styles.textLink]}> {representative.email} </Text>
            </View>

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
        // marginBottom: 32
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
    divider: {
        // flex: 1,
        width: '100%',
        height: 2,
        borderBottomWidth: 1,
        borderBottomColor: "#CCD6E0",
        marginBottom: 30
    },
    textDefault: {
        color: "#323843",
        fontSize: 16,
        fontWeight: 'normal',
    },
    textLink: {
        color: "#3182CE"
    }
});

export default InventoryGeneralTabContent;
