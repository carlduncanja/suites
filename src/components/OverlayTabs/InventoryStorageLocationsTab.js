import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from "react-native";
import Table from "../common/Table/Table";
import moment from "moment";
import LevelIndicator from "../common/LevelIndicator/LevelIndicator";
import Item from "../common/Table/Item";
import DataItem from '../common/List/DataItem';
import ContentDataItem from '../common/List/ContentDataItem';


const storageHeader = [
    {
        name: 'Location',
        alignment: 'flex-start',
        flex: 1.5
    },
    {
        name: 'In-Stock',
        alignment: 'center',
        flex: 1
    },
    {
        name: 'Capacity',
        alignment: 'center',
        flex: 1
    }
];

function InventoryStorageLocationsTab({
        storageLocations = [],
        selectedItems = [],
        onCheckBoxPress = () => {
        }
    }) {

    console.log("Locations: ", storageLocations)

    // ####### HELPER FUNCTIONS

    const storageItem = ({locationName, stock, levels}) => {
        let updatedLevels = {
            ...levels,
            min : 0
        };
        return <>

            <DataItem text = {locationName} flex = {1.5} color = {"--color-blue-600"} fontStyle = {"--text-base-medium"}/>
            <DataItem text = {stock} color = {"--color-gray-700"} fontStyle = {"--text-base-medium"} align={"center"}/>
            <ContentDataItem 
                align = {'center'}
                content = {
                    <LevelIndicator
                        {...updatedLevels}
                        level={stock}
                    />
                }
            />
                
            {/* <View style={[styles.item, {flex: 3,justifyContent: "flex-start"}]}>
                <Text style={[styles.itemText, styles.linkText]}>
                    {locationName}
                </Text>
            </View> */}
           {/* <View style={[styles.item, {justifyContent: "center"}]}>
                <Text style={styles.itemText}>
                    {stock}
                </Text>
            </View> */}
            
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
        <>
            <Table
                data={storageLocations}
                listItemFormat={renderStorageLocation}
                headers={storageHeader}
                isCheckbox={true}
                itemSelected={selectedItems}
            />
        </>
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

InventoryStorageLocationsTab.propTypes = {};
InventoryStorageLocationsTab.defaultProps = {};

export default InventoryStorageLocationsTab;
