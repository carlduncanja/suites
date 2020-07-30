import React, {Component, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DownArrow from '../../../../assets/svg/downArraow';  

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function SortFilter({isSelected = false}){

    const theme = useTheme()

    const SortFilterWrapper = styled.View`
        height: 12px;
        width : 12px;

    `;
    const SortFilterContainer = styled.View`
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
        background-color: ${ isSelected ? theme.colors['--color-blue-500'] : null};
        border : ${ isSelected ? null : `1px solid ${theme.colors['--color-gray-500']}`};
        border-radius : 2px;
    `;

    

    return (
        <SortFilterWrapper>
            <SortFilterContainer>
                <DownArrow strokeColor = {isSelected ? theme.colors['--default-shade-white'] : theme.colors['--color-gray-600']}/>
            </SortFilterContainer>
        </SortFilterWrapper>
    )
}

export default SortFilter