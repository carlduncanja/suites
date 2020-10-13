import React, {useRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useTheme} from 'emotion-theming';
import styled, {css} from '@emotion/native';
import ClearIcon from '../../../../assets/svg/clearIcon';
import IconButton from '../Buttons/IconButton';
import InputLabelComponent from '../InputLablel';
import InputContainerComponent from '../InputContainerComponent';
import InputErrorComponent from '../InputErrorComponent';
import InputFieldWithIcon from './InputFieldWithIcon';

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

const InputFieldWrapper = styled.View`
    flex:1;
    position: relative;
`;

const InputFieldContainer = styled.View`
    width : 100%;
    flex-direction: row;
    align-items: center;
`;

const LabelWrapper = styled.View(({theme, label}) => ({
    minWidth: 70,
    marginRight: label ? 20 : 0
}));

const TextInputWrapper = styled.View`
    flex:1;
    height : 32px;
`;
const TextInputContainer = styled.View`
    position: relative;
    height : 100%;
    width : 100%;
    border-width: ${ ({hasBorder}) => hasBorder ? `1px` : 0};
    border-color: ${({theme, hasError}) => (hasError ? theme.colors['--color-red-600'] : theme.colors['--color-gray-300'])};
    //background-color : ${({theme, backgroundColor}) => (backgroundColor ? theme.colors[backgroundColor] : theme.colors['--default-shade-white'])};
    background-color : ${({theme, enabled, backgroundColor}) => (backgroundColor ? theme.colors[backgroundColor] : !enabled ? theme.colors['--color-gray-100'] : theme.colors['--default-shade-white'])};
    border-radius: 4px;
    box-shadow : ${({isFocussed, theme}) => (isFocussed ? theme.shadow['--shadow-lg'] : null)};
    flex-direction : row;
    align-items:center;
    padding-left : ${ ({hasIcon, theme}) => hasIcon ? theme.space['--space-4'] : 0};
`;

const Input = styled.TextInput`
    flex:1;
    width : 85%;
    padding-left : ${({theme}) => theme.space['--space-10']};
`;

const ErrorContainer = styled.View`
    position : absolute;
    top : 16;
    padding-left : 15px;
`;

const ErrorText = styled.Text(({theme}) => ({
    ...theme.font['--text-xs-regular'],
    color: theme.colors['--color-red-700']
}));

const IconContainer = styled.View`
    position: absolute;
    height: 100%;
    right : 0;
`;

function InputField2({
    label,
    labelWidth,
    secureTextEntry = false,
    onChangeText = () => {
    },
    value,
    enabled = true,
    placeholder = '',
    keyboardType,
    onClear = () => {
    },
    hasError = false,
    errorMessage = 'Error',
    backgroundColor,
    onFocus = () => {
    },
    onEndEditing = () => {
    },
    isFocussed = false,
    autoCapitalize = 'sentences', // default from docs
    hasBorder = true,
    Icon
}) {
    const theme = useTheme();
    const inputRef = useRef();

    return (
        <InputContainerComponent>

            {
                label &&
                <LabelWrapper>
                    <InputLabelComponent label={label} width={labelWidth}/>
                </LabelWrapper>
            }

            <TextInputWrapper>
                <TextInputContainer
                    backgroundColor={backgroundColor}
                    enabled={enabled}
                    theme={theme}
                    style={isFocussed ? styles.shadow : null}
                    hasBorder={hasBorder}
                    hasIcon={Icon ? true : false}
                >
                    {Icon}
                    <Input
                        theme={theme}
                        onChangeText={onChangeText}
                        value={value}
                        editable={enabled}
                        keyboardType={keyboardType}
                        placeholder={placeholder}
                        secureTextEntry={secureTextEntry}
                        autoFocus={isFocussed}
                        onFocus={onFocus}
                        onEndEditing={onEndEditing}
                        autoCapitalize={autoCapitalize}
                        ref={inputRef}
                    />

                    {
                        hasError &&
                        <View style={{position: 'absolute'}}>
                            <InputErrorComponent errorMessage={errorMessage}/>
                        </View>
                    }

                    {
                        !!value && enabled &&
                        <IconContainer>
                            <IconButton
                                Icon={<ClearIcon/>}
                                onPress={onClear}
                            />
                        </IconContainer>
                    }

                </TextInputContainer>
            </TextInputWrapper>

        </InputContainerComponent>
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
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0.5,
            height: 2.5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 3,
        zIndex: 3,
    },
    inputField: {
        width: '85%',
        flex: 1,
        paddingLeft: 10,
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
        marginTop: 6,
        margin: 10,
    },
    errorView: {
        position: 'absolute',
        top: 32,
        paddingTop: 3,
        paddingLeft: 15
    }
});

export default InputField2;
