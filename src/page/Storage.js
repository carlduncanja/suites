import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from "react-native";
import Page from "../components/common/Page/Page";
import IconButton from "../components/common/Buttons/IconButton";
import ActionIcon from "../../assets/svg/ActionIcon";
import ListItem from "../components/common/List/ListItem";
import LevelIndicator from "../components/common/LevelIndicator/LevelIndicator";
import {numberFormatter} from "../utils/formatter";
import {useModal} from "react-native-modalfy";
import StorageBottomSheetContainer from "../components/Storage/StorageBottomSheetContainer";


const listHeaders = [
    {
        name: "Room Name",
        alignment: "flex-start"
    },
    {
        name: "In Stock",
        alignment: "center"
    },
    {
        name: "Capacity",
        alignment: "center"
    }
];

const testData = [
    {
        id: "1",
        name: "OR1: Cabinet 1",
        stock: 3182,
        capacity: 5000,
    },
    {
        id: "2",
        name: "OR1: Cabinet 2",
        stock: 6192,
        capacity: 10000,
    },
    {
        id: "3",
        name: "OR1: Cabinet 3",
        stock: 2014,
        capacity: 5000,
    },
    {
        id: "4",
        name: "OR1: Cabinet 4",
        stock: 541,
        capacity: 5000,
    },
    {
        id: "5",
        name: "OR1: Cabinet 5",
        stock: 4001,
        capacity: 5000,
    },
    {
        id: "6",
        name: "OR1: Cabinet 6",
        stock: 8921,
        capacity: 10000,
    },

];


function Storage(props) {
    const {
        storageLocations = testData
    } = props;

    const pageTitle = "Storage";
    const modal = useModal();


    // ##### States

    const [searchValue, setSearchValue] = useState("");
    const [isFetchingData, setFetchingData] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);


    // ##### Handler functions

    const onSearchChange = () => {
    };

    const onRefresh = () => {
    };

    const onSelectAll = () => {
        const indeterminate = selectedIds.length >= 0 && selectedIds.length !== storageLocations.length;
        // console.log("Indeterminate: ", indeterminate)
        if (indeterminate) {
            const selectedAllIds = [...storageLocations.map(item => item.id)];
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

    const onItemPress = (item) => () => {
        modal.openModal('BottomSheetModal', {
            content: <StorageBottomSheetContainer storage={item}/>
        })
    };


    // ##### Helper functions
    const storageItem = ({name, stock, levels}) => <>
        <View style={[styles.item, {justifyContent: 'space-between'}]}>
            <Text style={{color: "#3182CE", fontSize: 16}}>
                {name}
            </Text>
            <View style={{
                width: 1,
                height: 24,
                backgroundColor: "#E3E8EF",
                marginRight: 20
            }}/>
        </View>
        <View style={[
            styles.item, {justifyContent: "center"}
        ]}>
            <Text style={[styles.itemText]}>
                {numberFormatter(stock)}
            </Text>
        </View>
        <View style={[
            styles.item, {justifyContent: "center"}
        ]}>
            {/*   LEVELS    */}
            <LevelIndicator
                max={levels.max}
                min={0}
                level={stock}
                ideal={levels.ideal}
                critical={levels.critical}
            />
        </View>
    </>;


    const renderItem = (item) => {

        const formattedItem = {
            name: item.name,
            stock: item.stock,
            levels: {
                min: 0,
                max: item.capacity
            }
        };

        const itemView = storageItem(
            formattedItem,
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
                listData={storageLocations}
                inputText={searchValue}
                itemsSelected={selectedIds}
                listItemFormat={renderItem}
                listHeaders={listHeaders}
                changeText={onSearchChange}
                onRefresh={onRefresh}
                isFetchingData={isFetchingData}
                onSelectAll={onSelectAll}
            />
        </View>
    );
}

Storage.propTypes = {};
Storage.defaultProps = {};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    item: {
        flex: 1,
        flexDirection: 'row',
    },
    itemText: {
        fontSize: 14,
        color: "#4E5664",
    },
});

export default Storage;
