import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from "react-native";
import moment from "moment";

const UiData = {
    description: "",
    id: "ST0921",
    name: "ICU Theatre 3",
    status: "In Use",
    statusColor: "#ED8936",

    physician: "Dr. H. Mansingh",
    availableOn: new Date(2020, 12, 13, 23,0),
};

function TheatresDetailsTab(props) {

    const {
        description = "No description available",
        id = "--",
        name = "--",
        status = "Available",
        statusColor = "black",

        physician = "--",
        availableOn = "--",
    } = UiData;

    return (
        <View style={styles.container}>
            <View style={[styles.row]}>
                <View style={[styles.item]}>
                    <Text style={styles.textLabel}>Description</Text>
                    <Text style={styles.textDefault}>{description}</Text>
                </View>
                <View style={{flex: 1}}/>
            </View>

            <View style={styles.row}>
                <View style={[styles.item]}>
                    <Text style={styles.textLabel}>ID</Text>
                    <Text style={styles.textDefault}>{id}</Text>
                </View>

                <View style={[styles.item]}>
                    <Text style={styles.textLabel}>Theatre Name</Text>
                    <Text style={styles.textDefault}>{name}</Text>
                </View>

                <View style={[styles.item]}>
                    <Text style={styles.textLabel}>Status</Text>
                    <Text style={[styles.textDefault, {color: statusColor}]}>{status}</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={[styles.item]}>
                    <Text style={styles.textLabel}>Physician</Text>
                    <Text style={[styles.textDefault, styles.textLink]}>{physician}</Text>
                </View>

                <View style={[styles.item]}>
                    <Text style={styles.textLabel}>Available On</Text>
                    <Text style={styles.textDefault}>{ moment(availableOn).format("DD/MM/YYYY @ hh:mm a") }</Text>
                </View>

                <View style={styles.item}/>
            </View>
        </View>
    );
}

TheatresDetailsTab.propTypes = {};
TheatresDetailsTab.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingTop: 32
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
    textLink: {
        color: "#3182CE"
    }
});

export default TheatresDetailsTab;
