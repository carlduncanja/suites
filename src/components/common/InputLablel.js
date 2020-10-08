import React, {useRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet, TouchableOpacity, Text} from "react-native";

import {useTheme} from 'emotion-theming';
import styled, {css} from '@emotion/native';


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

const InputLabelWrapper = styled.View`
    min-width: 60px;
    height : 32px;
    align-items: flex-start;
    justify-content: flex-start;
`;

const InputLabelContainer = styled.View`
    width : 100%;
    height : 100%;
    justify-content : center;
`;

const InputLabel = styled.Text(({theme, minWidth, label}) => ({
    ...theme.font['--text-xs-medium'],
    minWidth: minWidth || 70,
    color: theme.colors['--color-gray-600'],
}));


function InputLabelComponent({
                                 label,
                                 width
                             }) {

    const theme = useTheme();

    const minWidth = isNaN(width) ? 98 : width

    return (
        <InputLabelWrapper>
            <InputLabelContainer>
                <InputLabel minWidth={minWidth} theme={theme} numberOfLines={1}>{label}</InputLabel>
            </InputLabelContainer>
        </InputLabelWrapper>

    );
}

InputLabelComponent.propTypes = {};
InputLabelComponent.defaultProps = {};


export default InputLabelComponent;
