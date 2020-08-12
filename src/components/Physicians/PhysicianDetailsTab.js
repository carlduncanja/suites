import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField2 from "../common/Input Fields/InputField2";
import OptionsField from "../common/Input Fields/OptionsField";
import { MenuOptions, MenuOption } from 'react-native-popup-menu';
import DateInputField from "../common/Input Fields/DateInputField";
import moment from 'moment';



const PhysiciansDetailsTab = ({ onFieldChange, fields, errorFields }) =>{

    const templateText = {
        true: "Yes",
        false: "No"
    }

    const [dateText, setDateText] = useState(fields['dob'])
    const [trnText, setTrnText] = useState(fields['trn'])

    const handleDateValidation = (date) => {
        onFieldChange('dob')(date)
        // let dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}/g
        // if (dateRegex.test(date) || !date) {
        //     onFieldChange('dob')(date)
        // }
        // setDateText(date)
    }

    const handleTrnValidation = (trnValue) => {
        if (/^\d{9}$/g.test(trnValue) || !trnValue) {
            onFieldChange('trn')(trnValue)
        }
        setTrnText(trnValue)
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
                        hasError = {errorFields['firstName']}
                        errorMessage = "Name must be filled."
                    />
                </View>
                <View style={[styles.inputWrapper]}>
                    <InputField2
                        label={"Middle Name"}
                        onChangeText={onFieldChange('middleName')}
                        value={fields['middleName']}
                        onClear={() => onFieldChange('middleName')('')}
                    />
                </View>

            </View>

            <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Surname"}
                        onChangeText={onFieldChange('surname')}
                        value={fields['surname']}
                        onClear={() => onFieldChange('surname')('')}
                        hasError = {errorFields['surname']}
                        errorMessage = "Name must be filled."
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
                        onChangeText={(value) => { handleTrnValidation(value)}}
                        value={trnText}
                        onClear={() => onFieldChange('trn')('')}
                        keyboardType = "number-pad"
                        hasError = {errorFields['trn']}
                        errorMessage = "TRN must contain 9 numbers."
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <DateInputField
                        label={"Date of Birth"}
                        value={fields['dob']}
                        onClear={() => onFieldChange('dob')('')}
                        keyboardType="number-pad"
                        mode={'date'}
                        format={"YYYY-MM-DD"}
                        placeholder="YYYY/MM/DD"
                        hasError={errorFields['dob']}
                        errorMessage={errorFields['dob']}
                        onDateChange={handleDateValidation}
                        maxDate = {new Date(moment().subtract(1, 'days'))}
                    />
                    {/* <DateInputField
                        label= "Date"
                    /> */}
                    {/* <InputField2
                        label={"Date of Birth"}
                        onChangeText={(value) => {
                            handleDateValidation(value)
                        }}
                        // value={fields['dob']}
                        value = {dateText}
                        onClear={() => onFieldChange('dob')('')}
                        placeholder="DD/MM/YYYY"
                        keyboardType = "number-pad"
                    /> */}
                </View>

            </View>

            <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    <OptionsField
                        label={"Gender"}
                        text={fields['gender']}
                        oneOptionsSelected={onFieldChange('gender')}
                        menuOption={<MenuOptions>
                            <MenuOption value={'Male'} text='Male'/>
                            <MenuOption value={'Female'} text='Female'/>
                        </MenuOptions>}
                        hasError = {errorFields['gender']}
                        errorMessage = "Select a gender from list."
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
