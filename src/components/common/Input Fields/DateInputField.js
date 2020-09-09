import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet, TouchableOpacity, Text} from "react-native";
import ClearIcon from "../../../../assets/svg/clearIcon";
import DatePicker from "react-native-datepicker";
import {useTheme} from "emotion-theming";
import Styled from "@emotion/native"
import InputLabelComponent from "../InputLablel";


const LabelContainer = Styled.View(({theme, label}) => ({
    minWidth: 70,
    marginRight: label ? 20 : 0
}))

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
function DateInputField({
                            label,
                            labelWidth,
                            onDateChange,
                            value,
                            enabled = true,
                            placeholder,
                            onClear,
                            hasError = false,
                            errorMessage = "",
                            minDate,
                            mode,
                            format,
                            maxDate,
                            borderColor = '--color-gray-300',
                            hasBorder = true
                        }) {

    const theme = useTheme();

    const handleOnDateChange = (dateString, dateObj) => {
        // if (!onDateChange) {
        //     setDate(dateObj)
        // } else {
        onDateChange(dateObj)

        // }
    }

    return (
        <View style={styles.container}>
            {
                label &&
                <LabelContainer theme={theme} lable={!!label}>
                    <InputLabelComponent label={label} width={labelWidth}/>
                </LabelContainer>
            }

            <View
                style={{
                    flex: 1,
                    position: 'relative',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <DatePicker
                    style={{flex: 1, height: 32}}
                    date={value}
                    mode={mode}
                    format={format}
                    disabled={!enabled}
                    placeholder={placeholder}
                    minDate={minDate}
                    maxDate={maxDate}
                    iconComponent={<View/>}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateInput: {
                            ...styles.inputWrapper,
                            flex: 1,
                            backgroundColor: theme.colors['--default-shade-white'],
                            borderColor: hasBorder ? theme.colors[borderColor] : null,
                            justifyContent: 'center',
                            alignSelf: 'flex-start',
                            borderWidth: hasBorder ? 1 : null,
                            borderRadius: 4,
                            height: 32,
                            padding: 4,
                            paddingLeft: 12,
                            paddingRight: 12,
                            marginBottom: 0,
                        },
                        disabled: {
                            backgroundColor: theme.colors['--color-gray-100'],
                        }
                    }}
                    onDateChange={handleOnDateChange}
                />


                {
                    hasError && <View style={{
                        position: "absolute",
                        top: 35,
                        paddingTop: 3,
                        paddingLeft: 15
                    }}>
                        <Text style={{fontSize: 10, color: 'red'}}>{errorMessage}</Text>
                    </View>
                }

                {
                    !!value && enabled &&
                    <TouchableOpacity
                        style={styles.clearIcon}
                        onPress={onClear}
                    >
                        <ClearIcon/>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
}

DateInputField.propTypes = {};
DateInputField.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        height: 32,
        paddingLeft: 10,
        alignItems: 'flex-start',
    },
    clearIcon: {
        position: 'absolute',
        right: 0,
        margin: 9
    },
    errorView: {
        paddingTop: 3,
        paddingLeft: 15
    }
});

export default DateInputField;
