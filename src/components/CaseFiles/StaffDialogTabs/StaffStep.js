import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet} from "react-native";
import Assignment from "./Assignment";


const StaffStep = ({tabs, selectedTabIndex, staffs, onStaffChange, completedTabs}) => {

    const staff = staffs[selectedTabIndex]

    console.log(selectedTabIndex, staff);

    return (
        <View style={{flex: 1}}>
            <Assignment
                onStaffChange={onStaffChange}
                value={staff}
                type={staff && staff.type}
            />
        </View>
    )
}

export default StaffStep

