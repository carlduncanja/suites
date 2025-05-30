import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Keyboard } from "react-native";
import ClearIcon from "../../../../assets/svg/clearIcon";

/**
 *
 * @param label
 * @param onChangeText
 * @param value
 * @param placeholder
 * @param keyboardType
 * @param onClear
 * @param hasError
 * @returns {*}
 * @constructor
 */
function TextArea({ label, enabled = true, editable = true, onChangeText, value, placeholder = '', keyboardType, onClear, hasError = false, errorMessage = "Error", numberOfLines = 4 }) {
    return (
        <View style={styles.container}>
            {
                label && <Text style={[
                    styles.textLabel, {
                        minWidth: 60,
                        marginRight: label ? 20 : 0
                    }
                ]}>
                    {label}
                </Text>
            }

            <View style={[styles.inputWrapper, {
                paddingRight: value ? 4 : 0,
                flex: 1,
                height: '100%'
                // height:200
            }]}>
                <TextInput
                    style={[placeholder === '' ? styles.inputField : styles.inputWithPlaceholder, { borderColor: hasError ? 'red' : '#E3E8EF' }, { backgroundColor: enabled ? "white" : "#EDF0F2" }]}
                    onChangeText={onChangeText}
                    value={value}
                    keyboardType={keyboardType}
                    focusable={editable}
                    placeholder={placeholder}
                    multiline={true}
                    numberOfLines={numberOfLines}
                    editable={editable}
                />
                {
                    hasError && <View style={styles.errorView}>
                        <Text style={{ fontSize: 10, color: 'red' }}>{errorMessage}</Text>
                    </View>
                }

            </View>
            {
                !(value === undefined || value === null || value === '') &&
                <TouchableOpacity
                    style={[styles.clearIcon, { alignSelf: 'flex-start' }]}
                    onPress={onClear}
                >
                    <ClearIcon />
                </TouchableOpacity>
            }
        </View>
    );
}

TextArea.propTypes = {};
TextArea.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#E3E8EF',
        borderRadius: 4,
    },
    textLabel: {
        fontSize: 12,
        color: '#718096',
        fontWeight: '500',
    },
    inputWrapper: {
        flex: 1,
        // height: 32,
        justifyContent:"center",
    },
    inputWithPlaceholder:
    {
        padding: 10,
        paddingTop: 2,
        paddingBottom: 2,
        borderWidth: 0,
        borderRadius: 4,
        height: '100%'
    },
    inputField: {
        // flex:1,
        padding: 10,
        paddingTop: 10,
        paddingBottom: 2,
        height: '100%'
        // height: 32,
    },
    clearIcon: {
        //position: 'absolute',
        justifyContent:"center",
        right: 0,
        margin: 10,
        

    },
    errorView: {
        paddingTop: 3,
        paddingLeft: 15
    }
});

export default TextArea;
