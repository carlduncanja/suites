import React,{  } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField2 from "../common/Input Fields/InputField2";
import DropdownInputField from "../common/Input Fields/DropdownInputField";
import InputUnitField from "../common/Input Fields/InputUnitFields";
import OptionSearchableField from "../common/Input Fields/OptionSearchableField";
import OptionsField from "../common/Input Fields/OptionsField";
import MultipleSelectionsField from "../common/Input Fields/MultipleSelectionsField";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';



const DialogDetailsTab = ({ onFieldChange, fields, physicians }) =>{
   
    const recoveryText = {
        true: "Yes",
        false: "No"
    };
    const templateText = {
        true: "Yes",
        false: "No"
    }
    const testCategory = [
        {
            _id : 'surgical',
            name : 'Surgical'
        },
        {
            _id : 'electrical',
            name : 'Electrical'
        }
    ]
    return (
        <View style={styles.sectionContainer}>
            
            <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    <InputField2 
                        label={"Reference"}
                        onChangeText={onFieldChange('reference')}
                        value={fields['reference']}
                        onClear={() => onFieldChange('reference')('')}
                    />
                </View>
                <View style={[styles.inputWrapper]}>
                    <OptionsField
                        label={"Template ?"}
                        text={templateText[fields['isTemplate']]}
                        oneOptionsSelected={onFieldChange('isTemplate')}
                        menuOption={<MenuOptions>
                            <MenuOption value={true} text='Yes'/>
                            <MenuOption value={false} text='No'/>
                        </MenuOptions>}
                    />
                </View>

            </View>

            <View
            style={{
                height:2,
                backgroundColor:'#CCD6E0',
                marginBottom:20
            }}
            />

            <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    <InputField2 
                        label={"Procedure"}
                        onChangeText={onFieldChange('name')}
                        value={fields['name']}
                        onClear={() => onFieldChange('name')('')}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <OptionSearchableField
                        label={"Physician"}
                        onOptionsSelected={onFieldChange('physician')}
                        options = {physicians}
                        keysToFilter = {['name']}
                    />
                </View>

            </View>

            <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    {/* <DropdownInputField 
                        label={"Location"}
                        onSelectChange={onFieldChange('location')}
                        value={fields['location']}
                        dropdownOptions = {["Operating Room 1","Operating Room 2", "Operating Room 3", "Operating Room 4", "Operating Room 5"]}
                    /> */}
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

            <View style={[styles.row]}>

                <View style={styles.inputWrapper}>
                    <InputUnitField 
                        label={"Duration"}
                        onChangeText={onFieldChange('duration')}
                        value={fields['duration']}
                        units = {['hrs']}
                        keyboardType = "number-pad"
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <OptionsField
                        label={"Recovery ?"}
                        text={templateText[fields['hasRecovery']]}
                        oneOptionsSelected={onFieldChange('hasRecovery')}
                        menuOption={<MenuOptions>
                            <MenuOption value={true} text='Yes'/>
                            <MenuOption value={false} text='No'/>
                        </MenuOptions>}
                    />
                </View>

            </View>

        </View>
    )
}

DialogDetailsTab.propTypes = {}
DialogDetailsTab.defaultProps = {}

export default DialogDetailsTab

const styles = StyleSheet.create({
    sectionContainer: {
        height: 260,
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