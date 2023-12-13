import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { currencyFormatter } from "../../../utils/formatter";
import {
  createTemplateResourceMap,
  getTemplateResources,
} from "../../../utils/chargesheet";

const BillingCaseProcedure = ({
  physicians = [],
  equipments = [],
  inventories = [],
  overTimeData = [],
  templateResourceLists,
}) => {
  const {
    baseHours = 0,
    overtime = 0,
    procedureHours = 0,
    anaesCost = 0,
  } = overTimeData;
  const {
    inventories: templateInventoryList,
    equipments: templateEquipmentList,
  } = templateResourceLists;

  const templateConsumables = getTemplateResources(templateInventoryList);
  const templateConsumablesMap = createTemplateResourceMap(templateConsumables);

  const templateEquipment = getTemplateResources(
    templateEquipmentList,
    "equipment"
  );
  const templateEquipmentMap = createTemplateResourceMap(templateEquipment);

  const totalPrice = (quantity, price) => {
    return quantity * price;
  };

  const tableItem = (charge, cost) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemValue}>{charge}</Text>
        <Text
          style={[styles.itemValue, { fontSize: 16, alignSelf: "flex-end" }]}
        >{`$ ${currencyFormatter(cost)}`}</Text>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.procedureItemContainer}>
        <View style={{ marginBottom: 6 }}>
          <Text style={styles.procedureItemTitle}>PHYSICIANS</Text>
        </View>

        {physicians.map((physician, index) => {
          const { name = "", cost = "" } = physician;
          return <View key={index}>{tableItem(name, cost)}</View>;
        })}
      </View>

      <View style={styles.procedureItemContainer}>
        <View style={{ marginBottom: 6 }}>
          <Text style={styles.procedureItemTitle}>ADDITIONAL EQUIPMENT</Text>
        </View>

        {equipments.map((equipment, index) => {
          const { name, amount: total, cost } = equipment;
          const baseQty = templateEquipmentMap[equipment.equipment] ?? 0;
          const additionalQty = total - baseQty;
          return (
            <View key={index}>
              {additionalQty > 0 ? (
                tableItem(name, totalPrice(additionalQty, cost))
              ) : (
                <></>
              )}
            </View>
          );
        })}
      </View>
      <View style={styles.procedureItemContainer}>
        <View style={{ marginBottom: 6 }}>
          <Text style={styles.procedureItemTitle}>ADDITIONAL CONSUMABLES</Text>
        </View>

        {inventories.map((inventory, index) => {
          const { name, amount: total, cost } = inventory;
          const baseQty = templateConsumablesMap[inventory.inventory] ?? 0;
          const additionalQty = total - baseQty;
          return (
            <View key={index}>
              {additionalQty > 0 ? (
                tableItem(name, totalPrice(additionalQty, cost))
              ) : (
                <></>
              )}
            </View>
          );
        })}
      </View>

      <View style={styles.procedureItemContainer}>
        <View style={{ marginBottom: 6 }}>
          <Text style={styles.procedureItemTitle}>ADDITIONAL COSTS</Text>
        </View>
        <View>{tableItem(`Overtime Cost [$${anaesCost}/Hour]`, overtime)}</View>
        <Text
          style={[styles.itemValue, styles.itemContainer]}
        >{`Base Duration - ${baseHours} hour(s)`}</Text>
        <Text
          style={[styles.itemValue, styles.itemContainer]}
        >{`Actual Duration - ${procedureHours.toFixed(2)} hour(s)`}</Text>
      </View>
    </View>
  );
};

export default BillingCaseProcedure;

const styles = StyleSheet.create({
  procedureItemContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomColor: "#E3E8EF",
    borderBottomWidth: 1,
  },
  procedureItemTitle: {
    color: "#4299E1",
    fontSize: 12,
    fontWeight: "500",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  itemValue: {
    fontSize: 14,
    color: "#4E5664",
  },
});
