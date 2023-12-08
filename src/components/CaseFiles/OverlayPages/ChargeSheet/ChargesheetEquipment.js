import React, { useContext, useState, useEffect } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import NumberChangeField from "../../../common/Input Fields/NumberChangeField";
import Search from "../../../common/Search";
import Item from "../../../common/Table/Item";
import Table from "../../../common/Table/Table";

import LineDivider from "../../../common/LineDivider";
import ContentDataItem from "../../../common/List/ContentDataItem";
import DataItem from "../../../common/List/DataItem";

import { PageContext } from "../../../../contexts/PageContext";

import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import { checkboxItemPress } from "../../../../helpers/caseFilesHelpers";
import {
  createDefaultAdditionalResourcesMap,
  createTemplateResourceMap,
  createUpdatedResourceMap,
  getTemplateResources,
  getUpdatedProcedureResourceList,
} from "../../../../utils/chargesheet";

const EquipmentsWrapper = styled.View`
  flex: 1;
`;
const EquipmentsContainer = styled.View`
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

function ChargesheetEquipment({
  caseProcedures = [],
  headers,
  onEquipmentsUpdate,
  onSelectEquipmenntsVariants,
  onSelectEquipments,
  selectedEquipments = [],
  templateEquipmentList,
  variantsEquipments = [],
}) {
  const theme = useTheme();
  const { pageState } = useContext(PageContext);
  const { isEditMode } = pageState;

  const templateEquipment = getTemplateResources(
    templateEquipmentList,
    "equipment"
  );
  const templateEquipmentMap = createTemplateResourceMap(templateEquipment);

  const updatedEquipment = getUpdatedProcedureResourceList(
    caseProcedures,
    "equipments"
  );
  const updatedEquipmentMap = createUpdatedResourceMap(
    updatedEquipment,
    "equipment"
  );

  const defaultAddEquipmentMap = createDefaultAdditionalResourcesMap(
    templateEquipmentMap,
    updatedEquipmentMap
  );

  const [additionalEquipment, setAdditionalEquipment] = useState(
    defaultAddEquipmentMap
  );

  useEffect(() => {
    if (!Object.keys(additionalEquipment).length && caseProcedures.length) {
      setAdditionalEquipment(defaultAddEquipmentMap);
    }
  }, [caseProcedures]);

  const [searchText, setSearchText] = useState("");

  const onSearchInputChange = (input) => {
    setSearchText(input);
  };

  const toggleCheckbox = (item, parentId) => () => {
    const { equipment: variantId } = item;

    let variantsToUpdate = [...variantsEquipments];
    const parentIds = variantsToUpdate.map(
      (variantObjects) => variantObjects._parentId
    );
    const selectedVariantGroupIndex = parentIds.indexOf(parentId);

    if (selectedVariantGroupIndex >= 0) {
      let equipmentVariants =
        variantsToUpdate[selectedVariantGroupIndex].variants;
      equipmentVariants = checkboxItemPress(variantId, equipmentVariants);
      variantsToUpdate[selectedVariantGroupIndex].variants = equipmentVariants;

      onSelectEquipmenntsVariants([...variantsToUpdate]);
    } else {
      onSelectEquipmenntsVariants([
        ...variantsToUpdate,
        {
          _parentId: parentId,
          variants: [variantId],
        },
      ]);
    }
  };

  const toggleHeaderCheckbox = () => {
    let updatedChecboxList = [];
    let updatedVariants = [];
    const indeterminate =
      selectedEquipments.length >= 0 &&
      selectedEquipments.length !== caseProcedures.length;

    if (indeterminate) {
      caseProcedures.map((procedure) => {
        let { equipments = [] } = procedure;
        updatedChecboxList.push(procedure?.caseProcedureId);

        let variantCheckboxList = [
          ...equipments.map((item) => item?.equipment),
        ];

        updatedVariants.push({
          _parentId: procedure?.caseProcedureId,
          variants: variantCheckboxList,
        });
      });
      onSelectEquipmenntsVariants(updatedVariants);
      onSelectEquipments(updatedChecboxList);
    } else {
      onSelectEquipmenntsVariants([]);
      onSelectEquipments([]);
    }
  };

  const onQuantityChangePress =
    (equipmentItem, index, sectionIndex) => (action) => {
      const originalEquipmentList = caseProcedures[sectionIndex].equipments;

      const updatedEquipment = {
        ...equipmentItem,
        amount:
          action === "add"
            ? equipmentItem.amount + 1
            : equipmentItem.amount - 1,
      };

      setAdditionalEquipment((current) => ({
        ...current,
        [equipmentItem.equipment]:
          action === "add"
            ? current[equipmentItem.equipment] + 1
            : current[equipmentItem.equipment] - 1,
      }));

      const updatedEquipmentList = originalEquipmentList.map((item) => {
        return item.equipment === updatedEquipment.equipment
          ? { ...updatedEquipment }
          : { ...item };
      });

      onEquipmentsUpdate(sectionIndex, updatedEquipmentList);
    };

  const childViewItem = (item, itemIndex, sectionIndex, baseQty) => {
    const {
      amount: totalQtyFromUpdatedProcedure,
      name = "",
      type = "n/a",
      equipment: id,
    } = item;

    const additionalQty = isEditMode
      ? additionalEquipment[id] ?? 0
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
          flex={isEditMode ? 4 : 4.1}
          align="center"
          fontStyle={"--text-base-regular"}
          color="--color-gray-700"
        />

        <DataItem
          text={baseQty}
          flex={isEditMode ? 0.2 : 2}
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
                onChangePress={onQuantityChangePress(
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
            flex={1.5}
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

  const renderChildItemView = (item, parentId, itemIndex, sectionIndex) => {
    let { _id, equipment } = item;
    let selectedGroup = variantsEquipments?.find(
      (obj) => obj._parentId === parentId
    );
    const variants = selectedGroup?.variants || [];
    const baseQty = templateEquipmentMap[equipment];

    return (
      <Item
        itemView={childViewItem(item, itemIndex, sectionIndex, baseQty)}
        hasCheckBox={true}
        isChecked={variants.includes(equipment)}
        onCheckBoxPress={toggleCheckbox(item, parentId)}
        onItemPress={() => {}}
      />
    );
  };

  const renderCollapsible = (item, sectionIndex) => {
    const { procedure, equipments, caseProcedureId } = item;

    return (
      <View style={styles.tableBorder}>
        <FlatList
          data={equipments}
          renderItem={({ item, index }) => {
            return renderChildItemView(
              item,
              caseProcedureId,
              index,
              sectionIndex
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
    <EquipmentsWrapper>
      <View style={styles.ProcedureContainer}>
        <View>
          <ProcedureText>{caseProcedures[0]?.procedure?.name}</ProcedureText>
        </View>
        <DividerContainer>
          <LineDivider />
        </DividerContainer>
      </View>
      <EquipmentsContainer>
        <Search
          placeholderText="Search by Item Name, or Type"
          inputText={searchText}
          changeText={onSearchInputChange}
          backgroundColor={theme.colors["--color-neutral-gray-100"]}
        />

        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <TableContainer theme={theme}>
            <Table
              isCheckbox={true}
              data={caseProcedures}
              listItemFormat={renderCollapsible}
              headers={headers}
              toggleHeaderCheckbox={toggleHeaderCheckbox}
              itemSelected={selectedEquipments}
            />
          </TableContainer>
        </ScrollView>
      </EquipmentsContainer>
    </EquipmentsWrapper>
  );
}

export default ChargesheetEquipment;

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
