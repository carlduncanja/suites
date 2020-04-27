import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from "react-native";
import Table from "../common/Table/Table";
import moment from "moment";
import LevelIndicator from "../common/LevelIndicator/LevelIndicator";
import Item from "../common/Table/Item";

const UiData = [
    {
        id: "1",
        locationName: "OR1: Cabinet 1",
        restockDate: new Date(),
        stock: 150,
        levels: {
            ideal: 150,
            max: 300,
            low: 100,
            min: 0,
            critical: 100
        }
    },
    {
        id: "2",
        locationName: "OR1: Cabinet 2",
        restockDate: new Date(),
        stock: 50,
        levels: {
            ideal: 150,
            max: 300,
            low: 100,
            min: 0,
            critical: 100
        }
    }
];

const storageHeader = [
    {
        name: 'Location',
        alignment: 'flex-start',
        styles: {
            flex: 1
        }
    },
    {
        name: 'Re-Stock',
        alignment: 'center',
        styles: {
            flex: 1
        }
    },
    {
        name: 'InStock',
        alignment: 'center',
        styles: {
            flex: 1
        }
    },
    {
        name: 'Levels',
        alignment: 'center',
        styles: {
            flex: 1
        }
    }
];

function StorageLocationsTab({
                                 storageLocations = UiData,
                                 selectedItems = [],
                                 onCheckBoxPress = () => {
                                 }
                             }) {

    const storageItem = ({locationName, restockDate, stock, levels}) => {
        return <>
            <View style={[styles.item, {justifyContent: "flex-start"}]}>
                <Text style={[styles.itemText, styles.linkText]}>
                    {locationName}
                </Text>
            </View>
            <View style={[styles.item, {justifyContent: "center"}]}>
                <Text style={styles.itemText}>
                    {moment(restockDate).toNow(true)}
                </Text>
            </View>
            <View style={[styles.item, {justifyContent: "center"}]}>
                <Text style={styles.itemText}>
                    {stock}
                </Text>
            </View>
            <View style={[styles.item, {justifyContent: "center"}]}>
                <LevelIndicator
                    {...levels}
                    level={stock}
                />
            </View>
        </>
    };

    const renderStorageLocation = (item) => {

        return <Item
            hasCheckBox={true}
            isChecked={selectedItems.includes(item.id)}
            itemView={storageItem(item)}
            onCheckBoxPress={onCheckBoxPress}
        />
    };


    return (
        <View style={styles.container}>
            <Table
                data={storageLocations}
                listItemFormat={renderStorageLocation}
                headers={storageHeader}
                isCheckbox={true}
                itemSelected={selectedItems}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 32
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 22
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

StorageLocationsTab.propTypes = {};
StorageLocationsTab.defaultProps = {};

export default StorageLocationsTab;
