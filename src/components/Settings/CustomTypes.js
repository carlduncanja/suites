import React, { useState } from "react";
import ListItem from "../common/List/ListItem";
import DataItem from "../common/List/DataItem";
import ShoppingTag from "../../../assets/svg/ShoppingTag";
import LabBottle from "../../../assets/svg/LabBottle";
const CUSTOM_TYPES = [
  {
    title: "Case Files",
    page: "CaseFilesPage",
  },
  {
    title: "Procedure/Appointment Configuration",
    page: "AppointmentsPage",
  },
  {
    title: "Storage",
    page: "CategoryPage",
    categoryType: "storage",
    categoryTitle: "Storage",
    frameTitle: "Categories",
    frameColor: "#718096",
    titleBackgroundColor: "#EEF2F6",
    frameBorderColor: "#CCD6E0",
    frameIcon: ShoppingTag,
  },
  {
    title: "Inventory",
    page: "CategoryPage",
    categoryType: "inventory",
    categoryTitle: "Inventory",
    frameTitle: "Categories",
    frameColor: "#718096",
    titleBackgroundColor: "#EEF2F6",
    frameBorderColor: "#CCD6E0",
    frameIcon: ShoppingTag,
  },
  {
    title: "Schedule",
    page: "SchedulePage",
  },
  {
    title: "Medical Staff",
    page: "CategoryPage",
    categoryType: "staff",
    categoryTitle: "Staff",
    frameTitle: "Physicians",
    frameColor: "#805AD5",
    titleBackgroundColor: "#FAF5FF",
    frameBorderColor: "#D6BCFA",
    frameIcon: LabBottle,
  },
  {
    title: "Equipment",
    page: "CategoryPage",
    categoryType: "equipment",
    categoryTitle: "Equipment",
    frameTitle: "Categories",
    frameColor: "#718096",
    titleBackgroundColor: "#EEF2F6",
    frameBorderColor: "#CCD6E0",
    frameIcon: ShoppingTag,
  },
];

const CustomTypes = ({ navigation }) => {
  const customType = (title) => (
    <DataItem
      color="--color-gray-700"
      fontStyle="--text-sm-medium"
      flex={1}
      text={title}
    />
  );

  const onItemPress = (item) => {
    navigation.navigate(item.page, { item });
  };

  const renderCustomType = (item, index) => (
    <ListItem
      key={index}
      hasCheckBox={false}
      onItemPress={() => onItemPress(item)}
      itemView={customType(item.title)}
    />
  );

  return (
    <>{CUSTOM_TYPES.map((type, index) => renderCustomType(type, index))}</>
  );
};

export default CustomTypes;
