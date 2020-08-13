import React from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet, TouchableOpacity, Text} from "react-native";
import RemoveIcon from "../../../../../assets/svg/remove2";
import IconButton from '../../Buttons/IconButton';
import TextArea from '../../Input Fields/TextArea';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

/**
 *
 * @param onChangeText
 * @param value
 * @param placeholder
 * @param keyboardType
 * @param onClear
 * @returns {*}
 * @constructor
 */

const InputFrameWrapper = styled.View`
    flex:1;
    margin-bottom : ${ ({theme}) => theme.space['--space-14']}
`;
const InputFrameContinaer = styled.View`
    height : 100%;
    width : 100%;
`;

function InputFrameItem({onChangeText, value, placeholder = "", keyboardType, onClear}) {

    const theme = useTheme();

    return (

        <InputFrameWrapper theme = {theme}>
            <InputFrameContinaer>
                <TextArea
                    onChangeText={onChangeText}
                    value={value}
                    keyboardType={keyboardType} 
                    placeholder={placeholder}
                    multiline = {true}
                    numberOfLines = {2}
                    onClear = {onClear}
                />
            </InputFrameContinaer>
            
        </InputFrameWrapper>
    );
}

InputFrameItem.propTypes = {};
InputFrameItem.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        position: 'relative',
        height :100
        // marginBottom:12,
        // flexDirection: 'row',
        // alignItems: 'center',
    },
    textLabel: {
        fontSize: 12,
        color: '#718096',
        fontWeight: '500',
        marginBottom:8
    },
    inputWrapper: {
        flex:1,
        borderColor:'#CCD6E0',
        borderWidth:1,
        backgroundColor:"#FFFFFF",
        borderRadius:4,
        alignItems:'center',
        justifyContent:'space-between',
        padding:5,
        flexDirection:'row',
        height: 32,
    },
    inputField: {
        flex: 1,
        fontSize:16,
        color:'#1D2129'
    },
    clearIcon: {
        position: 'absolute',
        right: 0,
        margin: 5
    }
});

export default InputFrameItem;
