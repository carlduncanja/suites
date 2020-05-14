import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField2 from "../../common/Input Fields/InputField2";
import OptionsField from "../../common/Input Fields/OptionsField";
import { MenuOptions, MenuOption } from 'react-native-popup-menu';


const PatientDetailsTab = ({onFieldChange, fields}) => {

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
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Middle Name"}
                        onChangeText={onFieldChange('middleName')}
                        value={fields['middleName']}
                        onClear={() => onFieldChange('middleName')('')}
                    />
                </View>

            </View>

            <View style={[styles.row, {zIndex:-1}]}>
                
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Last Name"}
                        onChangeText={onFieldChange('surname')}
                        value={fields['surname']}
                        onClear={() => onFieldChange('surname')('')}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Title"}
                        onChangeText={onFieldChange('title')}
                        value={fields['title']}
                        onClear={() => onFieldChange('title')('')}
                    />
                </View>

            </View>

            <View style={[styles.row,{zIndex:-2}]}>
                
                <View style={styles.inputWrapper}>
                    <OptionsField
                        label={"Gender"}
                        text={fields['gender']}
                        oneOptionsSelected={onFieldChange('gender')}
                        menuOption={<MenuOptions>
                            <MenuOption value={"Female"} text='Female'/>
                            <MenuOption value={"Male"} text='Male'/>
                        </MenuOptions>}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"TRN"}
                        onChangeText={onFieldChange('trn')}
                        value={fields['trn']}
                        onClear={() => onFieldChange('trn')('')}
                    />
                </View>

            </View>

            <View style={[styles.row,{zIndex:-3}]}>
                
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Date of Birth"}
                        onChangeText={onFieldChange('dob')}
                        value={fields['dob']}
                        onClear={() => onFieldChange('dob')('')}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <OptionsField
                        label={"Minor ?"}
                        text={fields['minor']}
                        oneOptionsSelected={onFieldChange('minor')}
                        menuOption={<MenuOptions>
                            <MenuOption value={false} text='No'/>
                            <MenuOption value={true} text='Yes'/>
                        </MenuOptions>}
                    />
                </View>

            </View>

        </View>
    )
}

PatientDetailsTab.propTypes = {}
PatientDetailsTab.defaultProps = {}

export default PatientDetailsTab

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
});
