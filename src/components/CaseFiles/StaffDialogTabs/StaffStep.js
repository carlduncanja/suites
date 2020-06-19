import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet} from "react-native";
import Assignment from "./Assignment";


const StaffStep = ({tabs, selectedTabIndex, staffs, onStaffChange, completedTabs, errors, onErrorsUpdate}) => {

    const staff = staffs[selectedTabIndex]
    const errorObj = errors[selectedTabIndex]

    const handleOnErrorUpdate = (value) => {
        const errors = [...errors];
        errors[selectedTabIndex] = value;
        onErrorsUpdate(errors);
    };

    const handleOnStaffUpdate = (value) => {
        // update the current staff value at the index

        const updatedStaffs = [...staffs]

        // check if value is at index
        updatedStaffs[selectedTabIndex] = value;


        onStaffChange(updatedStaffs);
    }

    console.log(selectedTabIndex, staff);

    return (
        <View style={{flex: 1}}>
            <Assignment
                onStaffChange={handleOnStaffUpdate}
                value={staff}
                type={staff && staff.type}
                errors={errorObj}
                onErrorUpdate={handleOnErrorUpdate}
            />
        </View>
    )
}

export default StaffStep

