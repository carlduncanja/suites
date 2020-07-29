import React, { Component, useState } from "react";
import { Modal, Text, StyleSheet } from "react-native";
import ClearIcon from "../../assets/svg/clearIcon";

import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { View } from "react-native-animatable";

function ConfirmationComponent({
  onCancel,
  message = "Are you sure you want to?",
  action = "Save",
}) {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={{ fontSize: 20 }}>Confirm Action</Text>

        <TouchableOpacity onPress={onCancel()}>
          <ClearIcon />
        </TouchableOpacity>
      </View>

      <Text style={styles.messageTxt}>{message}</Text>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => {
            onCancel();
          }}
        >
          <Text style={{ color: "#A0AEC0", fontSize: 30 }}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#3182CE",
            color: "white",
            width: 130,
            height: 70,
            padding: 15,

            alignItems: "center",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#fff",
          }}
        >
          <Text style={{ color: "white", fontSize: 30 }}>{action}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    width: 600,
    paddingBottom: 67,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  messageTxt: {
    fontSize: 20,
    alignSelf: "center",
    marginTop: 100,
  },
  cancelButton: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#E3E8EF",
    marginRight: 300,
    marginLeft: 20,
    width: 130,
    borderColor: "#fff",
    height: 70,
  },
  headingContainer: {
    flexDirection: "row",
    fontSize: 20,
    justifyContent: "space-between",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E3E8EF",
  },
  buttonView: {
    flexDirection: "row",
    marginTop: 100,
  },
});

export default ConfirmationComponent;
