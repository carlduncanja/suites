import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from "react-native"; 

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import InputLabelComponent from '../InputLablel';

/**
 *
 * @param label
 * @param value
 * @returns {*}
 * @constructor 
 */

const AutoFillFieldWrapper = styled.View`
    flex : ${ ({flex}) => flex.toString()};
    height : ${ ({theme}) => theme.space['--space-30']};
`;
const AutoFillContainer = styled.View`
    height : 100%;
    position : relative;
    flex-direction : row;
    align-items : center;
`;

const FieldWrapper = styled.View`
    display : flex;
    flex : ${ ({flex}) => flex.toString()};
    height: 100%;
`;
const FieldContainer = styled.View`
    width: 100%;
    height: 100%;
    justify-content: center;
    background-color: ${ ({theme}) => theme.colors['--color-gray-100']};
    padding-left: ${ ({theme}) => theme.space['--space-10']};
    padding-right: ${ ({theme}) => theme.space['--space-10']};
    padding-top: ${ ({theme}) => theme.space['--space-2']};
    padding-bottom: ${ ({theme}) =>theme.space['--space-2']};
    border-width: 1px;
    border-color: ${ ({theme}) => theme.colors['--color-gray-300']};
    border-radius: 4px;
`;

const Value = styled.Text( ({theme}) => ({
    ...theme.font['--text-sm-regular'],
    color : theme.colors['--color-gray-500'],
}));


function AutoFillField({label, value = "", flex = 1}) {

    const theme = useTheme();

    
    return (
        <AutoFillFieldWrapper flex = {flex} theme = {theme}>
            <AutoFillContainer>

                <InputLabelComponent label = {label}/>
            
                <FieldWrapper flex = {flex}>
                    <FieldContainer theme = {theme}>
                        <Value theme = {theme} >{value}</Value>
                    </FieldContainer>
                </FieldWrapper>

            </AutoFillContainer>
        </AutoFillFieldWrapper>
    );
}

AutoFillField.propTypes = {};
AutoFillField.defaultProps = {};

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
        // flex: 1,
        padding: 10,
        paddingTop: 2,
        paddingBottom: 2,
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 4,
        height: 32,
        justifyContent:'center'
    },
});

export default AutoFillField;
