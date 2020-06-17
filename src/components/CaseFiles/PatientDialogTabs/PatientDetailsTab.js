import React, {useState} from "react";
import {View, Text, StyleSheet, Button} from "react-native";
import InputField2 from "../../common/Input Fields/InputField2";
import OptionsField from "../../common/Input Fields/OptionsField";
import {MenuOptions, MenuOption} from 'react-native-popup-menu';
import DateInputField from "../../common/Input Fields/DateInputField";


const PatientDetailsTab = ({onFieldChange, fields, errors}) => {
    const handleTrnValidation = (trnValue) => {
        if (trnValue.toString().length > 9) return

        if (/^\d+$/g.test(trnValue) || !trnValue) {
            onFieldChange('trn')(trnValue)
        }
    }

    const onDateChange = (date) => {
        onFieldChange("dob")(date)
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
                        hasError={errors['firstName']}
                        errorMessage={errors['firstName']}
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

            <View style={[styles.row, {zIndex: -1}]}>

                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Last Name"}
                        onChangeText={onFieldChange('surname')}
                        value={fields['surname']}
                        onClear={() => onFieldChange('surname')('')}
                        hasError={errors['surname']}
                        errorMessage={errors['surname']}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <OptionsField
                        label={"Title"}
                        text={fields['title']}
                        oneOptionsSelected={onFieldChange('title')}
                        menuOption={<MenuOptions>
                            <MenuOption value={"Mr."} text='Mr.'/>
                            <MenuOption value={"Ms."} text='Ms.'/>
                            <MenuOption value={"Mrs."} text='Mrs.'/>
                            <MenuOption value={"Dr."} text='Dr.'/>
                        </MenuOptions>}
                    />
                </View>

            </View>

            <View style={[styles.row, {zIndex: -2}]}>

                <View style={styles.inputWrapper}>
                    <OptionsField
                        label={"Gender"}
                        text={fields['gender']}
                        oneOptionsSelected={onFieldChange('gender')}
                        menuOption={<MenuOptions>
                            <MenuOption value={"female"} text='Female'/>
                            <MenuOption value={"male"} text='Male'/>
                        </MenuOptions>}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"TRN"}
                        onChangeText={(value) => {
                            handleTrnValidation(value)
                        }}
                        value={fields['trn']}
                        onClear={() => onFieldChange('trn')('')}
                        keyboardType="number-pad"
                        hasError={errors['trn']}
                        errorMessage={errors['trn']}
                    />
                </View>

            </View>

            <View style={[styles.row, {zIndex: -3}]}>

                <View style={styles.inputWrapper}>
                    <DateInputField
                        label={"Date of Birth"}
                        value={fields['dob']}
                        onClear={() => onFieldChange('dob')('')}
                        keyboardType="number-pad"
                        placeholder="YYYY/MM/DD"
                        minDate={null}
                        onDateChange={onDateChange}
                        hasError={errors['dob']}
                        errorMessage={errors['dob']}
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
        alignItems: 'center'
    },
    fieldContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 4,
        height: 32,
        padding: 10,
        paddingTop: 2,
        paddingBottom: 2,
        justifyContent: 'center'
    },
    text: {
        fontSize: 12,
        color: '#718096',
        fontWeight: '500',
        marginRight: 20
    }
});
