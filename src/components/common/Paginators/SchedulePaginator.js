import React, { Component, useContext } from "react";
import Paginator from "./Paginator";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import SvgIcon from "../../../../assets/SvgIcon";

const SchedulePaginator = ({
  currentDay,
  goToNextDay,
  goToPreviousDay,
  newday,
}) => {
  const display = (newday) => {
    if (newday == "") {
      return currentDay;
    } else return newday;
  };

  return (
    <View style={styles.container}>
      <View style={styles.paginator}>
        <TouchableOpacity onPress={() => goToPreviousDay()}>
          <SvgIcon iconName="paginationPrev" strokeColor="#104587" />
        </TouchableOpacity>

        <View style={styles.numbersContainer}>
          <Text style={styles.numbers}>{display(newday)} </Text>
        </View>
        <TouchableOpacity onPress={() => goToNextDay()}>
          <SvgIcon iconName="paginationNext" strokeColor="#104587" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    position: "absolute",
    top: -70,
    left: 190,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 32,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  paginator: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  numbersContainer: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#CCD6E0",
    borderRadius: 4,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 2,
    paddingTop: 5,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
  },
  numbers: {
    fontSize: 19,
    color: "#313539",
  },
});

export default SchedulePaginator;
