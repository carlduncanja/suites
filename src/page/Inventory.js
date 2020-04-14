import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from "react-native";
import Page from "../components/common/Page/Page";


const listHeaders = [
    {
        name: "Item Name",
        alignment: "flex-start"
    },
    {
        name: "In Stock",
        alignment: "flex-start"
    },
    {
        name: "Levels",
        alignment: "flex-start"
    },
    {
        name: "Locations",
        alignment: "flex-start"
    },
    {
        name: "Actions",
        alignment: "center"
    }
];


function Inventory(props) {
    const pageTitle = "Inventory";

    // ##### States

    const [searchValue, setSearchValue] = useState("");
    const [isFetchingData, setFetchingData] = useState(false);


    // ##### Handler functions

    const onSearchChange = () => {
    };
    const onRefresh = () => {
    };
    const onSelectAll = () => {
    };


    // ##### Helper functions

    return (
        <View style={styles.container}>
            <Page
                placeholderText={"Search by heading or entry below."}
                routeName={pageTitle}
                listData={[]}
                inputText={searchValue}
                itemsSelected={[]}
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
        // flexDirection: 'column'
    }
});

export default Inventory;
