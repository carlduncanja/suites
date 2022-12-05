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
        if (trnValue.toString().length > 9) return;
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

                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Contact"}
                        onChangeText={onFieldChange('phone')}
                        value={fields['phone']}
                        onClear={() => onFieldChange('phone')('')}
                        hasError = {errorFields['phone']}
                        errorMessage = "Please provide contact."
                    />
                </View>
                

            </View>

            {/*<View*/}
            {/*    style={{*/}
            {/*        height: 2,*/}
            {/*        backgroundColor: '#CCD6E0',*/}
            {/*        marginBottom: 20*/}
            {/*    }}*/}
            {/*/>*/}

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Category"}
                        onChangeText={onFieldChange('phone')}
                        value={fields['phone']}
                        onClear={() => onFieldChange('phone')('')}
                        hasError = {errorFields['phone']}
                        errorMessage = "Please provide contact."
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
        height: 190,
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
