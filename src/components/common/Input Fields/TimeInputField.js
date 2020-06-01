import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet, TouchableOpacity, Text} from "react-native";
import ClearIcon from "../../../../assets/svg/clearIcon";
import DatePicker from "react-native-datepicker";
import moment from 'moment';

/**
 *
 * @param label
 * @param onChangeText
 * @param value
 * @param placeholder
 * @param onClear
 * @returns {*}
 * @constructor
 */
function TimeInputField({label, onDateChange, value, placeholder, onClear}) {

    // const [date, setDate] = useState(value);

    const handleOnDateChange = (dateString, dateObj) => {
            onDateChange(dateObj)
    }

    return (
        <View style={styles.container}>
            <Text style={[
                styles.textLabel, {
                    minWidth: 60,
                    marginRight: label ? 20 : 0
                }
            ]}>{label}</Text>

            <DatePicker
                style={{flex: 1}}
                date={value}
                mode="time"
                placeholder={placeholder}
                showIcon={false}
                format="hh:mm A"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateInput: styles.inputWrapper
                }}
                onDateChange={handleOnDateChange}
            />

            {
                value
                    ? <TouchableOpacity
                        style={styles.clearIcon}
                        onPress={onClear}
                    >
                        <ClearIcon/>
                    </TouchableOpacity>
                    : null
            }
        </View>
    );
}

TimeInputField.propTypes = {};
TimeInputField.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textLabel: {
        fontSize: 12,
        color: '#718096',
        fontWeight: '500',
    },
    inputWrapper: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 4,
        height: 32,
    },
    inputField: {
        flex: 1,
        padding: 10,
        paddingTop: 2,
        paddingBottom: 2,
    },
    clearIcon: {
        position: 'absolute',
        right: 0,
        margin: 5
    }
});

export default TimeInputField;
