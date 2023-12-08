import React, { useContext, useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";

import NumberChangeField from "../../../common/Input Fields/NumberChangeField";

import Search from "../../../common/Search";
import Item from "../../../common/Table/Item";
import Table from "../../../common/Table/Table";

import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import { PageContext } from "../../../../contexts/PageContext";
import { checkboxItemPress } from "../../../../helpers/caseFilesHelpers";
import LineDivider from "../../../common/LineDivider";
import ContentDataItem from "../../../common/List/ContentDataItem";
import DataItem from "../../../common/List/DataItem";
import {
  createTemplateResourceMap,
  createUpdatedResourceMap,
  createDefaultAdditionalResourcesMap,
  getTemplateResources,
  getUpdatedProcedureResourceList,
  getAdditionalResourceMap,
} from "../../../../utils/chargesheet";

const ConsumablesWrapper = styled.View`
  flex: 1;
`;
const ConsumablesContainer = styled.View`
  height: 100%;
  width: 100%;
`;

const TableContainer = styled.View`
  margin-top: ${({ theme }) => theme.space["--space-12"]};
`;
const ProcedureText = styled.Text`
  font: ${({ theme }) => theme.font["--text-xl-medium"]};
  color: ${({ theme }) => theme.colors["--color-black"]};
  margin-left: 30;
`;

const DividerContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.space["--space-20"]};
  margin-top: ${({ theme }) => theme.space["--space-20"]};
`;

function Consumables({
  caseProcedures = [],
  headers,
  onConsumablesUpdate,
  onSelectConsumables,
  selectedConsumables = [],
  templateInventoryList,
}) {
  const theme = useTheme();
  const { pageState } = useContext(PageContext);
  const { isEditMode } = pageState;

  const templateConsumables = getTemplateResources(templateInventoryList);
  const templateConsumablesMap = createTemplateResourceMap(templateConsumables);

  const updatedConsumables = getUpdatedProcedureResourceList(caseProcedures);
  const updatedConsumablesMap = createUpdatedResourceMap(updatedConsumables);

  const defaultAddConsumablesMap = createDefaultAdditionalResourcesMap(
    templateConsumablesMap,
    updatedConsumablesMap
  );

  const [searchText, setSearchText] = useState("");
  const [additionalConsumables, setAdditionalConsumables] = useState({});

  useEffect(() => {
    if (!Object.keys(additionalConsumables).length && caseProcedures.length) {
      setAdditionalConsumables(defaultAddConsumablesMap);
    } else {
      addNewConsumableToAdditionalConsumables();
    }
  }, [caseProcedures]);

  const addNewConsumableToAdditionalConsumables = () => {
    const additonalResourceQtyMap = getAdditionalResourceMap(
      templateConsumablesMap,
      updatedConsumablesMap
    );
    const toAdd = {};
    for (id in additonalResourceQtyMap) {
      if (!additionalConsumables[id]) {
        toAdd[id] = updatedConsumablesMap[id];
      }
    }
    if (Object.keys(toAdd).length) {
      setAdditionalConsumables((current) => ({
        ...current,
        ...toAdd,
      }));
    }
  };

  const onSearchInputChange = (input) => {
    setSearchText(input);
  };

  const toggleCheckbox = (item, parentId) => () => {
    const { inventory: variantId } = item;

    let variantsToUpdate = [...selectedConsumables];
    const parentIds = variantsToUpdate.map(
      (variantObjects) => variantObjects._parentId
    );
    const selectedVariantGroupIndex = parentIds.indexOf(parentId);

    if (selectedVariantGroupIndex >= 0) {
      let variants = variantsToUpdate[selectedVariantGroupIndex].variants;
      variants = checkboxItemPress(variantId, variants);
      variantsToUpdate[selectedVariantGroupIndex].variants = variants;

      onSelectConsumables([...variantsToUpdate]);
    } else {
      onSelectConsumables([
        ...variantsToUpdate,
        {
          _parentId: parentId,
          variants: [variantId],
        },
      ]);
    }
  };

  const onChangeConsumableQty =
    (consumable, index, sectionIndex) => (action) => {
      const originalInventory = caseProcedures[sectionIndex].inventories;
      const updatedConsumable = {
        ...consumable,
        amount:
          action === "add" ? consumable.amount + 1 : consumable.amount - 1,
      };

      setAdditionalConsumables((current) => ({
        ...current,
        [consumable.inventory]:
          action === "add"
            ? current[consumable.inventory] + 1
            : current[consumable.inventory] - 1,
      }));

      const updatedInventory = originalInventory.map((item) => {
        return item._id === updatedConsumable._id ? updatedConsumable : item;
      });
      onConsumablesUpdate(sectionIndex, updatedInventory);
    };

  const childViewItem = (item, itemIndex, sectionIndex, baseQty) => {
    const {
      amount: totalQtyFromUpdatedProcedure = 0,
      name = "",
      type = "",
      inventory: id,
    } = item;
    const additionalQty = isEditMode
      ? additionalConsumables[id] ?? 0
      : totalQtyFromUpdatedProcedure - baseQty;

    const totalQty = isEditMode
      ? baseQty + additionalQty
      : totalQtyFromUpdatedProcedure;

    return (
      <>
        <DataItem
          text={name}
          flex={isEditMode ? 2.8 : 2.2}
          fontStyle={"--text-sm-medium"}
          color="--color-blue-600"
        />

        <DataItem
          text={type}
          flex={isEditMode ? 3 : 3.1}
          align="center"
          fontStyle={"--text-base-regular"}
          color="--color-gray-700"
        />

        <DataItem
          text={baseQty}
          flex={1}
          align="center"
          fontStyle={"--text-base-regular"}
          color="--color-gray-700"
        />

        {isEditMode === true ? (
          <ContentDataItem
            flex={3}
            align="center"
            content={
              <NumberChangeField
                onChangePress={onChangeConsumableQty(
                  item,
                  itemIndex,
                  sectionIndex
                )}
                value={additionalQty?.toString()}
                borderColor="--color-green-500"
                backgroundColor="--color-green-100"
              />
            }
          />
        ) : (
          <DataItem
            flex={1}
            text={additionalQty}
            align="center"
            fontStyle={"--text-base-regular"}
            color="--color-gray-700"
          />
        )}

        <DataItem
          flex={1}
          text={totalQty}
          align="center"
          fontStyle={"--text-base-regular"}
          color="--color-gray-700"
        />
      </>
    );
  };

  const renderChildItemView = (
    item,
    parentId,
    itemIndex,
    sectionIndex,
    templateConsumablesMap
  ) => {
    let { _id, inventory } = item;
    let selectedGroup = selectedConsumables?.find(
      (obj) => obj._parentId === parentId
    );
    const variants = selectedGroup?.variants || [];
    const baseQty = templateConsumablesMap[inventory] ?? 0;

    return (
      <Item
        itemView={childViewItem(item, itemIndex, sectionIndex, baseQty)}
        hasCheckBox={true}
        isChecked={variants.includes(inventory)}
        onCheckBoxPress={toggleCheckbox(item, parentId)}
        onItemPress={() => {}}
      />
    );
  };

  const renderTable = (item, sectionIndex) => {
    const { inventories, caseProcedureId } = item;
    return (
      <View style={styles.tableBorder}>
        <FlatList
          data={inventories}
          renderItem={({ item, index }) => {
            return renderChildItemView(
              item,
              caseProcedureId,
              index,
              sectionIndex,
              templateConsumablesMap
            );
          }}
          keyExtractor={(item, index) => "" + index}
          ItemSeparatorComponent={() => (
            <View
              style={{
                flex: 1,
                margin: 5,
                marginLeft: 10,
                borderColor: "#E3E8EF",
                borderWidth: 0.5,
              }}
            />
          )}
        />
      </View>
    );
  };

  return (
    <ConsumablesWrapper>
      <View style={styles.ProcedureContainer}>
        <View>
          <ProcedureText>{caseProcedures[0]?.procedure?.name}</ProcedureText>
        </View>
        <DividerContainer>
          <LineDivider />
        </DividerContainer>
      </View>

      <ConsumablesContainer>
        <Search
          placeholderText=" Search by item Name, or Type "
          inputText={searchText}
          changeText={onSearchInputChange}
          backgroundColor={theme.colors["--color-neutral-gray-50"]}
        />

        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <TableContainer theme={theme}>
            <Table
              isCheckbox={true}
              data={caseProcedures}
              listItemFormat={renderTable}
              headers={headers}
              toggleHeaderCheckbox={() => {}}
              itemSelected={selectedConsumables}
            />
          </TableContainer>
        </ScrollView>
      </ConsumablesContainer>
    </ConsumablesWrapper>
  );
}

export default Consumables;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    marginBottom: 10,
  },
  dataContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  item: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: "#4A5568",
  },
  headersContainer: {
    marginLeft: 10,
    flexDirection: "row",
  },
  headerItem: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 12,
    color: "#718096",
  },
  editItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  editTextBox: {
    backgroundColor: "#F8FAFB",
    borderColor: "#CCD6E0",
    borderWidth: 1,
    borderRadius: 4,
    padding: 6,
    paddingTop: 2,
    paddingBottom: 2,
    marginLeft: 10,
    marginRight: 10,
  },
  tableBorder: {
    borderColor: "#E3E8EF",
    borderWidth: 2,
    borderRadius: 8,
  },
  ProcedureContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
});
