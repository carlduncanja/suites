import React,{  } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField2 from "../common/Input Fields/InputField2";
import InputUnitField from "../common/Input Fields/InputUnitFields";
import OptionsField from "../common/Input Fields/OptionsField";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import MultipleSelectionsField from "../common/Input Fields/MultipleSelectionsField";
import OptionSearchableField from "../common/Input Fields/OptionSearchableField";

const EquipmentDialogDetailsTab = ({ onFieldChange, fields, storage, equipmentTypes }) =>{

    const testCategory = [
        {
            _id : '8hwHGuygf92',
            name : 'Surgical'
        },
        {
            _id : '8hopTEoud10',
            name : 'Electric'
        }
    ]

    return (
        <View style={styles.sectionContainer}>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Equipment"}
                        onChangeText={onFieldChange('name')}
                        value={fields['name']}
                        onClear={() => onFieldChange('name')('')}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <MultipleSelectionsField
                        label={"Category"}
                        onOptionsSelected={onFieldChange('category')}
                        options = {testCategory}
                        keysToFilter = {['name']}
                    />
                </View>
            </View>

            <View style={styles.row}>
                
                <View style={{width:260}}>
                    <OptionsField
                        label={"Assignment"}
                        text={fields['assigmentType']}
                        oneOptionsSelected={onFieldChange('assigmentType')}
                        menuOption={
                        <MenuOptions>
                            <MenuOption value={'Location'} text='Location'/>
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
                    <OptionSearchableField
                        label={"Assigned"}
                        onOptionsSelected={onFieldChange('assignment')}
                        options = {storage}
                        keysToFilter = {['name']}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <OptionsField
                        label={"Status"}
                        text={fields['status']}
                        oneOptionsSelected={onFieldChange('status')}
                        menuOption={
                        <MenuOptions>
                            <MenuOption value={'Available'} text='Available'/>
                            <MenuOption value={'In Use'} text='In Use'/>
                        </MenuOptions>
                        }
                    />
                </View>
                
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <OptionSearchableField
                        label={"Type"}
                        onOptionsSelected={onFieldChange('type')}
                        options = {equipmentTypes}
                        keysToFilter = {['name']}
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
        height: 230,
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