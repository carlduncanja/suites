import React, { useRef, useEffect, useState } from 'react';
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
        backgroundColor,
        onFocus = ()=>{},
        onEndEditing = ()=>{},
        isFocussed = false
    }){
     
    const theme = useTheme();
    const inputRef = useRef();
    const [hasFocus, setHasFocus] = useState(false)

    useEffect(()=>{
        console.log("Focus: ", inputRef.current.isFocused())
        setHasFocus(inputRef.current.isFocused())
    },[])


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
           
            <View style={[styles.inputWrapper, isFocussed ? styles.shadow : null,{
                borderColor: hasError ? 'red' : '#CCD6E0',
                backgroundColor : backgroundColor ? backgroundColor : theme.colors['--default-shade-white']
                // paddingRight: value ? 4 : 0,
                
            }]}>
                <TextInput
                    style={[styles.inputField, ,{
                        
                    }]}
                    onChangeText={onChangeText}
                    value={value}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    autoFocus = {isFocussed}
                    onFocus={onFocus}
                    onEndEditing = {onEndEditing}
                    ref={inputRef}

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

        // padding: 10,
        // paddingTop: 2,
        // paddingBottom: 2,
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 8,
        height: 32,
        backgroundColor:'yellow'

    },
    shadow : {
        shadowColor: "#000",
        shadowOffset: {
            width: 0.5,
            height: 2.5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
        zIndex:3,
    },
    inputField: {
        width : '85%',
        flex:1,
        paddingLeft :10,
        // padding: 10,
        // paddingTop: 2,
        // paddingBottom: 2,
        // borderWidth: 1,
        // borderColor: '#E3E8EF',
        // borderRadius: 8,
        // height: '100%',
    },
    clearIcon: {
        position: 'absolute',
        right: 0,
        margin: 10,
 
    },
    errorView: {
        position:'absolute',
        top:32,
        paddingTop: 3,
        paddingLeft: 15
    }
});

export default InputField2;
