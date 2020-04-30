import React,{  } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField2 from "../common/Input Fields/InputField2";
import DropdownMultipleSelectField from "../common/Input Fields/DropdownMultipleSelectField";
import DropdownInputField from "../common/Input Fields/DropdownInputField";
import InputUnitField from "../common/Input Fields/InputUnitFields";
import OptionsField from "../common/Input Fields/OptionsField";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import MultipleOptionsField from "../common/Input Fields/MultipleOptionsField";

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
                    <MultipleOptionsField
                        label={"Category"}
                        text={fields['category']}
                        oneOptionsSelected={onFieldChange('category')}
                        // menuOption={
                        // <MenuOptions>
                        //     <MenuOption value={'sur'} text='Surgical'/>
                        //     <MenuOption value={'ele'} text='Electric'/>
                        // </MenuOptions>}
                        options = {[
                            {
                                id : 'sur',
                                value : 'sur',
                                text : 'Surgical'
                            },
                            {
                                id : 'ele',
                                value : 'ele',
                                text : 'Electric'
                            }
                        ]}
                    />
                    
                    {/* <DropdownMultipleSelectField 
                        label={"Category"}
                        onSelectChange={onFieldChange('category')}
                        value={fields['category']}
                        dropdownOptions = {["Electric","Manual"]}
                    /> */}
                </View>
            </View>

            <View style={styles.row}>
                
                <View style={{width:260}}>
                    <OptionsField
                        label={"Assignment"}
                        text={fields['assignment']}
                        oneOptionsSelected={onFieldChange('assignment')}
                        menuOption={
                        <MenuOptions>
                            <MenuOption value={'location'} text='Location'/>
                        </MenuOptions>
                        }
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
                    <OptionsField
                        label={"Assigned"}
                        text={fields['assigned']}
                        oneOptionsSelected={onFieldChange('assigned')}
                        menuOption={
                        <MenuOptions>
                            <MenuOption value={'or1'} text='OR1'/>
                            <MenuOption value={'or2'} text='OR2'/>
                        </MenuOptions>
                        }
                    />
                    {/* <DropdownInputField 
                        label={"Assigned"}
                        onSelectChange={onFieldChange('assigned')}
                        value={fields['assigned']}
                        dropdownOptions = {["OR 1", "OR 2"]}
                    /> */}
                </View>
                <View style={styles.inputWrapper}>
                    <OptionsField
                        label={"Status"}
                        text={fields['status']}
                        oneOptionsSelected={onFieldChange('status')}
                        menuOption={
                        <MenuOptions>
                            <MenuOption value={'available'} text='Available'/>
                            <MenuOption value={'use'} text='In Use'/>
                        </MenuOptions>
                        }
                    />
                    {/* <DropdownInputField 
                        label={"Status"}
                        onSelectChange={onFieldChange('status')}
                        value={fields['status']}
                        dropdownOptions = {["Available", "In Use"]}
                    /> */}
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