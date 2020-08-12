import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import DialogTabs from "../common/Dialog/DialogTabs";
import InputField2 from "../common/Input Fields/InputField2";

import { formatDate } from "../../utils/formatter";
import { useModal } from "react-native-modalfy";

import { createEquipmentType, getEquipmentTypes } from "../../api/network";
import { connect } from "react-redux";
import { addEquipmentType } from "../../redux/actions/equipmentTypesActions";
import _ from "lodash";

/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @param addWorkItem
 * @returns {*}
 * @constructor
 */

const CreateEquipmentTypeDialogContainer = ({
  onCancel,
  onCreated,
  equipmentTypes,
  addEquipmentType,
}) => {
  const modal = useModal();
  const dialogTabs = ["Details"];
  const selectedIndex = 0;

  const [positiveText, setPositiveText] = useState("DONE");
  const [equipmentTypeArray, setequipmentTypeArray] = useState([
    equipmentTypes,
  ]);

  const [fields, setFields] = useState({
    name: "",
    unitPrice: "",
  });

  const [errorFields, setErrorFields] = useState({
    name: false,
    unitPrice: false,
  });

  const onFieldChange = (fieldName) => (value) => {
    setFields({
      ...fields,
      [fieldName]: value,
    });
  };

  const [unitPriceText, setUnitPriceText] = useState(fields["unitPrice"]);

  const handleCloseDialog = () => {
    onCancel();
    modal.closeAllModals();
  };

  const onPositiveButtonPress = () => {
    console.log("clicked done!");
    modal.closeAllModals();
    let isNameError = errorFields["name"];
    let isPriceError = errorFields["unitPrice"];

    fields["name"] === "" || null
      ? (isNameError = true)
      : (isNameError = false);
    fields["unitPrice"] === "" || null
      ? (isPriceError = true)
      : (isPriceError = false);

    setErrorFields({
      ...errorFields,
      name: isNameError,
      unitPrice: isPriceError,
    });

    if (isNameError === false && isPriceError === false) {
      console.log("Success: ", fields);
      createEquipmentTypeCall();
    }
  };

  const handleUnitPrice = (price) => {
    if (/^-?[0-9][0-9.]+$/g.test(price) || /^\d+$/g.test(price) || !price) {
      onFieldChange("unitPrice")(price);
    }
    setUnitPriceText(price);
  };

  const getDialogContent = () => {
    return (
      <View style={styles.sectionContainer}>
        <View style={styles.row}>
          <View style={styles.inputWrapper}>
            <InputField2
              label={"Group Name"}
              onChangeText={onFieldChange("name")}
              value={fields["name"]}
              onClear={() => onFieldChange("name")("")}
              hasError={errorFields["name"]}
              errorMessage="Name must be filled."
            />
          </View>

          <View style={styles.inputWrapper}>
            <InputField2
              label={"Unit Price"}
              onChangeText={(value) => {
                handleUnitPrice(value);
              }}
              value={unitPriceText}
              keyboardType={"number-pad"}
              onClear={() => handleUnitPrice("")}
              hasError={errorFields["unitPrice"]}
              errorMessage="Price must be provided."
            />
          </View>
        </View>
      </View>
    );
  };

  const createEquipmentTypeCall = () => {
    createEquipmentType(fields)
      .then((data) => {
        //addEquipment(data);
        addEquipmentType(data);

        Alert.alert("Success", "New Equipment Added");
        console.log("new data that's added in equipment :", data);

        setTimeout(() => {
          onCreated(data);
        }, 200);
      })
      .catch((error) => {
        // todo handle error
        Alert.alert("Failed","Failed to create a new item.")
        console.log("failed to create equipment type", error);
      })
      .finally((_) => {
        modal.closeAllModals();
      });
  };

  return (
    <OverlayDialog
      title={"Add Equipment Group"}
      onPositiveButtonPress={onPositiveButtonPress}
      onClose={handleCloseDialog}
      positiveText={positiveText}
    >
      <View style={styles.container}>
        <DialogTabs tabs={dialogTabs} tab={selectedIndex} />
        <TouchableOpacity activeOpacity={1}>
          {getDialogContent()}
        </TouchableOpacity>
      </View>
    </OverlayDialog>
  );
};

CreateEquipmentTypeDialogContainer.propTypes = {};
CreateEquipmentTypeDialogContainer.defaultProps = {};

const mapDispatchToProp = {
  addEquipmentType,
};

export default connect(
  null,
  mapDispatchToProp
)(CreateEquipmentTypeDialogContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 636,
    flexDirection: "column",
    backgroundColor: "white",
  },
  sectionContainer: {
    height: 160,
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    padding: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  inputField: {
    // flex: 1,
    width: 64,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E3E8EF",
    borderRadius: 4,
    height: 32,
  },
  inputWrapper: {
    // flex: 1,
    width: 260,
    flexDirection: "row",
    // backgroundColor: 'blue'
  },
});
