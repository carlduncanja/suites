import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from "react-native";
import Page from "../components/common/Page/Page";


const listHeaders = [
    {
        name: "Room Name",
        alignment: "flex-start"
    },
    {
        name: "In Stock",
        alignment: "flex-start"
    },
    {
        name: "Capacity",
        alignment: "flex-start"
    }
];


function Storage(props) {
    const pageTitle = "Storage";

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

Storage.propTypes = {};
Storage.defaultProps = {};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'column'
    }
});

export default Storage;
