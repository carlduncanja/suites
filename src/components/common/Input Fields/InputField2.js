import React from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet, TouchableOpacity, Text} from "react-native";
import ClearIcon from "../../../../assets/svg/clearIcon";
import { useTheme } from 'emotion-theming';
import styled, { css } from '@emotion/native';

/**
 * 
 * @param label
 * @param onChangeText
 * @param value
 * @param placeholder
 * @param keyboardType
 * @param onClear
 * @param hasError
 * @param backgroundColor
 * @returns {*}
 * @constructor
 */
function InputField2({
        label, 
        onChangeText = () => {}, 
        value, 
        placeholder = "", 
        keyboardType,
        onClear = () => {}, 
        hasError = false, 
        errorMessage = "Error", 
        backgroundColor
    }){
    
    const theme = useTheme() 

    const InputWrapper = styled.View`
        flex:1;
        position: relative;
        flex-direction: row;
        align-items: center;
    `

    return (
        <View style={[styles.container,]}> 
            {
                label &&  <Text style={[
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
                
            }]}>
                <TextInput
                    style={[styles.inputField, {borderColor: hasError ? 'red' : '#CCD6E0', backgroundColor : backgroundColor ? backgroundColor : theme.colors['--default-shade-white']}]}
                    onChangeText={onChangeText}
                    value={value}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                />
                {
                    hasError && <View style={styles.errorView}>
                        <Text style={{fontSize: 10, color: 'red'}}>{errorMessage}</Text>
                    </View>
                }

            </View>
            {
                !(value === undefined || value === null || value === '') &&
                <TouchableOpacity
                    style={styles.clearIcon}
                    onPress={onClear}
                >
                    <ClearIcon/>
                </TouchableOpacity>
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
        height: 32,
    },
    inputField: {
        padding: 10,
        paddingTop: 2,
        paddingBottom: 2,
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 8,
        height: 32,
    },
    clearIcon: {
        position: 'absolute',
        right: 0,
        margin: 10,
    },
    errorView: {
        paddingTop: 3,
        paddingLeft: 15
    }
});

export default InputField2;
