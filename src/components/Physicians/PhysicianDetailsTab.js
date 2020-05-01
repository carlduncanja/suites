import React,{  } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField2 from "../common/Input Fields/InputField2";
import DropdownInputField from "../common/Input Fields/DropdownInputField";
import InputUnitField from "../common/Input Fields/InputUnitFields";
import OptionSearchableField from "../common/Input Fields/OptionSearchableField";
import OptionsField from "../common/Input Fields/OptionsField";
import MultipleSelectionsField from "../common/Input Fields/MultipleSelectionsField";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';



const PhysiciansDetailsTab = ({ onFieldChange, fields }) =>{
   
    const templateText = {
        true: "Yes",
        false: "No"
    }
   
    return (
        <View style={styles.sectionContainer}>
            
            <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    <InputField2 
                        label={"First Name"}
                        onChangeText={onFieldChange('firstName')}
                        value={fields['firstName']}
                        onClear={() => onFieldChange('firstName')('')}
                    />
                </View>
                <View style={[styles.inputWrapper]}>
                <InputField2 
                        label={"Middle Name"}
                        onChangeText={onFieldChange('middleName')}
                        value={fields['middleName']}
                        onClear={() => onFieldChange('middleName')('')}
                    />
                    {/* <OptionsField
                        label={"Template ?"}
                        text={templateText[fields['isTemplate']]}
                        oneOptionsSelected={onFieldChange('isTemplate')}
                        menuOption={<MenuOptions>
                            <MenuOption value={true} text='Yes'/>
                            <MenuOption value={false} text='No'/>
                        </MenuOptions>}
                    /> */}
                </View>

            </View>
            <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    <InputField2 
                        label={"Surname"}
                        onChangeText={onFieldChange('surname')}
                        value={fields['surname']}
                        onClear={() => onFieldChange('surname')('')}
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
                        label={"TRN"}
                        onChangeText={(value) => {
                            if (/^\d{9}/g.test(value) || !value) {
                                onFieldChange('trn')(value)
                            }}
                        }
                        value={fields['trn']}
                        onClear={() => onFieldChange('trn')('')}
                        keyboardType = "number-pad"
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <InputField2 
                        label={"Date of Birth"}
                        onChangeText={(value) => {
                            if (/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}/g.test(value) || !value) {
                                onFieldChange('dob')(value)
                            }}}
                        value={fields['dob']}
                        onClear={() => onFieldChange('dob')('')}
                        placeholder="DD/MM/YYYY"
                        keyboardType = "number-pad"
                    />
                </View>

            </View>

            <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    <OptionsField
                        label={"Gender"}
                        text={fields['gender']}
                        oneOptionsSelected={onFieldChange('gender')}
                        menuOption={<MenuOptions>
                            <MenuOption value={'male'} text='Male'/>
                            <MenuOption value={'female'} text='Female'/>
                        </MenuOptions>}
                    />
                </View>

            </View>

        </View>
    )
}

PhysiciansDetailsTab.propTypes = {}
PhysiciansDetailsTab.defaultProps = {}

export default PhysiciansDetailsTab

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