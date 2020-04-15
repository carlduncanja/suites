import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from "react-native";
import Page from "../components/common/Page/Page";
import IconButton from "../components/common/Buttons/IconButton";
import ActionIcon from "../../assets/svg/ActionIcon";
import ListItem from "../components/common/List/ListItem";
import LevelIndicator from "../components/common/LevelIndicator/LevelIndicator";


const listHeaders = [
    {
        name: "Item Name",
        alignment: "flex-start"
    },
    {
        name: "In Stock",
        alignment: "center"
    },
    {
        name: "Levels",
        alignment: "center"
    },
    {
        name: "Locations",
        alignment: "center"
    },
    {
        name: "Actions",
        alignment: "center"
    }
];

const testData = [
    {
        id: "1",
        name: "Agents",
        stock: 238,
        levels: {
            max: 400,
            min: 0,
            critical: 100,
            ideal: 300,
        },
        locations: 4,
    },
    {
        id: "2",
        name: "Suture Kit",
        stock: 22,
        levels: {
            max: 200,
            min: 0,
            critical: 50,
            ideal: 100,
        },
        locations: 1
    },
    {
        id: "3",
        name: "Gauze",
        stock: 632,
        levels: {
            max: 700,
            min: 0,
            critical: 100,
            ideal: 350,
        },
        locations: 2
    },
    {
        id: "4",
        name: "Atracurium",
        stock: 642,
        levels: {
            max: 700,
            min: 0,
            critical: 100,
            ideal: 350,
        },
        locations: 7
    },
    {
        id: "5",
        name: "Atropine",
        stock: 72,
        levels: {
            max: 250,
            min: 0,
            critical: 100,
            ideal: 350,
        },
        locations: 3
    },
    {
        id: "6",
        name: "Bupivacaine 0.25 %",
        stock: 68,
        levels: {
            max: 250,
            min: 0,
            critical: 100,
            ideal: 200
        },
        locations: 1
    },
];

function Inventory(props) {

    const {
        inventory = testData
    } = props;

    const pageTitle = "Inventory";

    // ##### States

    const [searchValue, setSearchValue] = useState("");
    const [isFetchingData, setFetchingData] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);


    // ##### Handler functions

    const onSearchChange = () => {
    };

    const onItemPress = () => {

    };

    const onRefresh = () => {
    };

    const onSelectAll = () => {
        const indeterminate = selectedIds.length >= 0 && selectedIds.length !== testData.length;
        // console.log("Indeterminate: ", indeterminate)
        if (indeterminate) {
            const selectedAllIds = [...inventory.map(caseItem => caseItem.id)];
            setSelectedIds(selectedAllIds)
        } else {
            setSelectedIds([])
        }
    };

    const onCheckBoxPress = (item) => () => {
        const {id} = item;
        let updatedCases = [...selectedIds];

        if (updatedCases.includes(id)) {
            updatedCases = updatedCases.filter(id => id !== item.id)
        } else {
            updatedCases.push(item.id);
        }

        setSelectedIds(updatedCases);
    };


    // ##### Helper functions

    const inventoryItem = ({name, stock, locations, levels}, onActionPress) => <>
        <View style={[styles.item, {justifyContent: 'flex-start'}]}>
            <Text style={{color: "#3182CE", fontSize: 16}}>
                {name}
            </Text>
        </View>
        <View style={[
            styles.item, {justifyContent: "center"}
        ]}>
            <Text style={[styles.itemText]}>
                {stock}
            </Text>
        </View>
        <View style={[styles.item, {justifyContent: "center"}]}>
            {/*   LEVELS    */}
            <LevelIndicator
                max={levels.max}
                min={0}
                level={stock}
                ideal={levels.ideal}
                critical={levels.critical}
            />
        </View>
        <View style={[
            styles.item, {justifyContent: "center"}
        ]}>
            <View style={styles.locationBox}>
                <Text style={[styles.itemText]}>
                    {locations}
                </Text>
            </View>
        </View>
        <View style={[styles.item, {justifyContent: "center"}]}>
            <IconButton
                Icon={<ActionIcon/>}
                onPress={onActionPress}
            />
        </View>
    </>;


    const renderItem = (item) => {

        const formattedItem = {
            name: item.name,
            stock: item.stock,
            locations: item.locations,
            levels: item.levels
        };

        const onActionClick = () => {
        };

        const itemView = inventoryItem(
            formattedItem,
            onActionClick
        );

        return <ListItem
            isChecked={selectedIds.includes(item.id)}
            onCheckBoxPress={onCheckBoxPress(item)}
            onItemPress={onItemPress(item)}
            itemView={itemView}
        />
    };

    return (
        <View style={styles.container}>
            <Page
                placeholderText={"Search by heading or entry below."}
                routeName={pageTitle}
                listData={inventory}
                listItemFormat={renderItem}
                inputText={searchValue}
                itemsSelected={selectedIds}
                listHeaders={listHeaders}
                changeText={onSearchChange}
                onRefresh={onRefresh}
                isFetchingData={isFetchingData}
                onSelectAll={onSelectAll}
            />
        </View>
    );
}

Inventory.propTypes = {};
Inventory.defaultProps = {};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    item: {
        flex: 1,
        flexDirection: 'row',
    },
    locationBox: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 24,
        borderRadius: 4,
        shadowColor: "#000",
        backgroundColor: "#FFFFFF",
        shadowOffset: {
            width: .5,
            height: .5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        zIndex:3,
    }
});

export default Inventory;
