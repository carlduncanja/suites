import React, {useRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native';
import ClearIcon from '../../../../assets/svg/clearIcon';
import InputErrorComponent from "../InputErrorComponent";

/**
 *
 * @param hasError
 * @param errorMessage
 * @param label
 * @param onChangeText
 * @param value
 * @param placeholder
 * @param keyboardType
 * @param autoCapitalize
 * @param onClear
 * @param icon
 * @param secureTextEntry
 * @param inputRef
 * @param isFocus
 * @returns {*}
 * @constructor
 */
function InputFieldWithIcon({hasError = false, errorMessage, label, onChangeText, value, placeholder, keyboardType, autoCapitalize = 'sentences', onClear, icon, secureTextEntry, inputRef = useRef(), isFocus = false,}) {
    return (
        <View style={styles.container}>
            {
                label &&
                <Text style={[styles.textLabel]}>{label}</Text>
            }

            <View style={[styles.inputWrapper,
                {
                    paddingRight: value ? 4 : 0,
                    borderColor: hasError ? '#fc8181' : '#E3E8EF'
                }]}>
                <TextInput
                    style={[styles.inputField, {}]}
                    onChangeText={onChangeText}
                    value={value}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    autoFocus={isFocus}
                    ref={inputRef}
                />
                <View style={{marginRight: 5, justifyContent: 'center'}}>
                    {icon}
                </View>
            </View>

            {
                hasError &&
                <View style={{position: "absolute"}}>
                    <InputErrorComponent errorMessage={errorMessage}/>
                </View>
            }

        </View>
    );
}

InputFieldWithIcon.propTypes = {};
InputFieldWithIcon.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        // flexDirection: 'row',
        // alignItems: 'center',
    },
    textLabel: {
        fontSize: 12,
        color: '#718096',
        fontWeight: '500',
        marginBottom: 8
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 4,
        height: 32,
        marginBottom: 5,
        justifyContent: 'center'
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

export default InputFieldWithIcon;
