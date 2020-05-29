import React, {useState} from "react";
import {View, Text, StyleSheet, Button} from "react-native";
import InputField2 from "../../common/Input Fields/InputField2";
import OptionsField from "../../common/Input Fields/OptionsField";
import {MenuOptions, MenuOption} from 'react-native-popup-menu';
import moment from "moment";
// import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from "react-native-datepicker";
import DateInput from "../../common/Input Fields/DateInput";
import DateInputField from "../../common/Input Fields/DateInputField";


const PatientDetailsTab = ({onFieldChange, fields}) => {

    const [isMinor, setIsMinor] = useState("No")
    const [trnText, setTrnText] = useState(fields['trn'])
    const [dateText, setDateText] = useState(fields['dob'])

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };


    const handleTrnValidation = (trnValue) => {
        if (/^\d{9}$/g.test(trnValue) || !trnValue) {
            onFieldChange('trn')(trnValue)
        }
        setTrnText(trnValue)
    }

    const handleDateValidation = (date) => {

        let dateInstance = new Date(moment(date).toISOString());
        let dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}/g
        if ((dateRegex.test(date) && dateInstance instanceof Date) || !date) {
            onFieldChange('dob')(date)
            handleMinor(date)
        }
        setDateText(date)
    }

    const formatTrn = (value) => {
        return value.replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3")
    }

    const handleMinor = (date) => {
        var duration = moment.duration(moment().diff(moment(date)));
        var years = duration.asYears();

        if (Math.ceil(years) >= 18) {
            setIsMinor('No')
            onFieldChange('minor')('No')
        } else {
            setIsMinor('Yes')
            onFieldChange('minor')('Yes')
        }
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
                            <MenuOption value={"Female"} text='Female'/>
                            <MenuOption value={"Male"} text='Male'/>
                        </MenuOptions>}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"TRN"}
                        onChangeText={(value) => {
                            handleTrnValidation(value)
                        }}
                        value={formatTrn(trnText)}
                        onClear={() => onFieldChange('trn')('')}
                        keyboardType="number-pad"
                    />
                </View>

            </View>

            <View style={[styles.row, {zIndex: -3}]}>

                <View style={styles.inputWrapper}>
                    <DateInputField
                        label={"Date of Birth"}
                        onChangeText={(value) => {
                            handleDateValidation(value)
                        }}
                        value={dateText}
                        onClear={() => onFieldChange('dob')('')}
                        keyboardType="number-pad"
                        placeholder="DD/MM/YYYY"
                    />
                </View>

                {/*<View style={styles.inputWrapper}>*/}
                {/*    <Text style={styles.text}>Minor ?</Text>*/}
                {/*    <View style={styles.fieldContainer}>*/}
                {/*        <Text>{isMinor}</Text>*/}
                {/*    </View>*/}
                {/*</View>*/}

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
