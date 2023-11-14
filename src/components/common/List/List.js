import React from "react";
import { StyleSheet, FlatList } from "react-native";
import Header from "../Table/Header";

import styled from "@emotion/native";
import { useTheme } from "emotion-theming";

/**
 * @param listData array of objects
 * @param listHeaders array of objects
 * @param listItemFormat object
 * @param onRefresh
 * @param itemsSelected
 * @param refreshing
 * @param onSelectAll
 * @param isCheckbox
 * @param keyExtractor
 * @returns {*}
 */

const ListWrapper = styled.View`
    display: flex;
    flex: 1;
`;

const ListContainer = styled.View`
    display: flex;
`;

function List({
    listData = [],
    listHeaders = [],
    itemsSelected = [],
    listItemFormat = () => {},
    onRefresh = () => {},
    refreshing = false,
    onSelectAll = () => {},
    isCheckbox = false,
    keyExtractor = (item) =>
        (item?.id || "" || item?._id || "") + new Date().getTime(),
}) {
    const theme = useTheme();

    const isIndeterminate =
        itemsSelected.length > 0 && itemsSelected.length !== listData.length;

    return (
        <ListWrapper>
            <ListContainer>
                <Header
                    headers={listHeaders}
                    toggleHeaderCheckbox={onSelectAll}
                    checked={itemsSelected.length > 0}
                    isCheckbox={isCheckbox}
                    isIndeterminate={isIndeterminate}
                />

                <FlatList
                    style={{ height: "100%" }}
                    nestedScrollEnabled={true}
                    data={listData}
                    renderItem={({ item }) => listItemFormat(item)}
                    keyExtractor={keyExtractor}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    keyboardShouldPersistTaps={"always"}
                />
            </ListContainer>
        </ListWrapper>
    );
}

export default List;

const styles = StyleSheet.create({
    header: {
        marginBottom: 25,
    },
    data: {},
});
