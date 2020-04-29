import React,{  } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField2 from "../common/Input Fields/InputField2";
import DropdownMultipleSelectField from "../common/Input Fields/DropdownMultipleSelectField";
import DropdownInputField from "../common/Input Fields/DropdownInputField";
import InputUnitField from "../common/Input Fields/InputUnitFields";

const EquipmentDialogDetailsTab = ({ onFieldChange, fields }) =>{
    return (
        <View style={styles.sectionContainer}>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Equipment"}
                        onChangeText={onFieldChange('equipmentName')}
                        value={fields['equipmentName']}
                        onClear={() => onFieldChange('equipmentName')('')}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    {/* Change back to dropdownInputField */}
                    <DropdownMultipleSelectField 
                        label={"Category"}
                        onSelectChange={onFieldChange('category')}
                        value={fields['category']}
                        dropdownOptions = {["Electric","Manual"]}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <DropdownInputField 
                        label={"Assignment"}
                        onSelectChange={onFieldChange('assignment')}
                        value={fields['assignment']}
                        dropdownOptions = {["Location"]}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <InputUnitField 
                        label={"Usage"}
                        onChangeText={onFieldChange('usage')}
                        value={fields['usage']}
                        units = {['hrs']}
                        keyboardType = "number-pad"
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <DropdownInputField 
                        label={"Assigned"}
                        onSelectChange={onFieldChange('assigned')}
                        value={fields['assigned']}
                        dropdownOptions = {["OR 1", "OR 2"]}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <DropdownInputField 
                        label={"Status"}
                        onSelectChange={onFieldChange('status')}
                        value={fields['status']}
                        dropdownOptions = {["Available", "In Use"]}
                    />
                </View>
            </View>


        </View>
    )
}

EquipmentDialogDetailsTab.propTypes = {}
EquipmentDialogDetailsTab.defaultProps = {}

export default EquipmentDialogDetailsTab

const styles = StyleSheet.create({
    sectionContainer: {
        height: 200,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        padding: 24,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    inputWrapper: {
        width: 260,
        flexDirection: 'row',
    }
})