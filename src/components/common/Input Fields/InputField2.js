import React from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet, TouchableOpacity, Text} from "react-native";
import ClearIcon from "../../../../assets/svg/clearIcon";

/**
 *
 * @param label
 * @param onChangeText
 * @param value
 * @param placeholder
 * @param keyboardType
 * @param onClear
 * @returns {*}
 * @constructor
 */
function InputField2({label, onChangeText, value, placeholder, keyboardType, onClear}) {

    return (
        <View style={styles.container}>
            <Text style={[
                styles.textLabel, {
                    minWidth: 60,
                    marginRight: label ? 20 : 0
                }
            ]}>{label}</Text>

            <View style={[styles.inputWrapper, {paddingRight: value ? 4 : 0}]}>
                <TextInput
                    style={[styles.inputField,{}]}
                    onChangeText={onChangeText}
                    value={value}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                />
            </View>


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

InputField2.propTypes = {};
InputField2.defaultProps = {};

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

export default InputField2;
