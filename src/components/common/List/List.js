import React from "react";
import { FlatList } from "react-native";
import Header from "../Table/Header";

import styled from "@emotion/native";

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
  grandparentState,
  listData = [],
  listHeaders = [],
  listItemFormat = () => {},
  onRefresh = () => {},
  refreshing = false,
  onSelectAll = () => {},
  isCheckbox = false,
  keyExtractor = (item) =>
    (item?.id || "" || item?._id || "") + new Date().getTime(),
}) {
  const isIndeterminate = grandparentState === "indeterminate";
  const isChecked = grandparentState === "checked";

  return (
    <ListWrapper>
      <ListContainer>
        <Header
          headers={listHeaders}
          toggleHeaderCheckbox={onSelectAll}
          checked={isChecked}
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
