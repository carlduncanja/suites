import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from "react-native"; 

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

/**
 *
 * @param label
 * @param value
 * @returns {*}
 * @constructor 
 */
function AutoFillField({label, value = "", flex = 1}) {

    const theme = useTheme();

    const AutoFillFieldWrapper = styled.View`
        flex : ${flex.toString()};
        height : ${theme.space['--space-32']};
    `;
    const AutoFillContainer = styled.View`
        height : 100%;
        position : relative;
        flex-direction : row;
        align-items : center;
    `;

    const Label = styled.Text({
        ...theme.font['--text-xs-medium'],
        color : theme.colors['--color-gray-600'],
        marginRight : label ? 20 : 0,
        minWidth : 60
    });

    const FieldWrapper = styled.View`
        display : flex;
        flex : ${flex.toString()};
        height: 100%;
    `;
    const FieldContainer = styled.View`
        width: 100%;
        height: 100%;
        justify-content: center;
        background-color: ${theme.colors['--color-gray-200']};
        padding-left: ${theme.space['--space-10']};
        padding-right: ${theme.space['--space-10']};
        padding-top: ${theme.space['--space-2']};
        padding-bottom: ${theme.space['--space-2']};
        border-width: 1px;
        border-color: ${theme.colors['--color-gray-300']}
        border-radius: 4px;
    `;

    return (
        <AutoFillFieldWrapper>
            <AutoFillContainer>

            <Label numberOfLines={1}>{label}</Label>

            {/* <Text style={[
                styles.textLabel, {
                    minWidth: 60,
                    marginRight: label ? 20 : 0
                }
            ]}>{label}</Text> */}
            
            <FieldWrapper>
                <FieldContainer>
                    <Text>{value}</Text>
                </FieldContainer>
            </FieldWrapper>

            {/* <View style={[styles.inputWrapper, {
                paddingRight: value ? 4 : 0,
            }]}>
                <View style = {styles.inputField}>
                    <Text>{value}</Text>
                </View>
            </View> */}
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
