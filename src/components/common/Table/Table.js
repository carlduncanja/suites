import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import React from "react";
import { FlatList } from "react-native";
import Header from "./Header";

import LineDivider from "../LineDivider";

const DividerContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.space["--space-20"]};
`;

const ListWrapper = styled.View`
  display: flex;
  flex: 1;
`;

const ListContainer = styled.View`
  display: flex;
`;

function Table({
  data = [],
  headers = [],
  isCheckbox = true,
  itemSelected = [],
  keyExtractor = (item, i) => (item.caseProcedureId ? i : Math.random()),
  listItemFormat = () => {},
  toggleHeaderCheckbox = () => {},
  isChargeSheetTable = false,
}) {
  const theme = useTheme();
  const isIndeterminate =
    itemSelected?.length > 0 && itemSelected?.length !== data?.length;

  return (
    <ListWrapper>
      <ListContainer>
        <Header
          checked={itemSelected?.length > 0}
          headers={headers}
          isChargeSheetTable={isChargeSheetTable}
          isCheckbox={isCheckbox}
          isIndeterminate={isIndeterminate}
          toggleHeaderCheckbox={toggleHeaderCheckbox}
        />

        <DividerContainer theme={theme}>
          <LineDivider />
        </DividerContainer>

        <FlatList
          listItemFormat={({ item, index }) => listItemFormat(item, index)}
          data={data}
          style={{ height: "100%" }}
          nestedScrollEnabled={true}
          renderItem={({ item, index }) => listItemFormat(item, index)}
          keyExtractor={keyExtractor}
          contentContainerStyle={{ paddingBottom: 100 }}
          keyboardShouldPersistTaps={"always"}
        />
      </ListContainer>
    </ListWrapper>
  );
}

export default Table;
