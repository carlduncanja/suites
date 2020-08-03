import React, {Component, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DownArrow from '../../../../assets/svg/downArraow';  

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import SortFilter from './SortFilterIcon';

function HeaderFilterGroup({name = "", isSelected = false}){

    const theme = useTheme()
    console.log("Name: ", name, isSelected)

    const HeaderGoupWrapper = styled.View`
        height: 100%;
    `;

    const HeaderGroupContainer = styled.View`
        display: flex;
        padding-top: ${ isSelected ? theme.space['--space-4'] : 0};
        padding-bottom: ${ isSelected ?  theme.space['--space-4'] : 0};
        padding-left: ${ isSelected ? theme.space['--space-8'] : 0};
        padding-right: ${ isSelected ?  theme.space['--space-8'] : 0};
        background-color: ${ isSelected ?  theme.colors['--color-gray-300'] : null };
        border-radius : ${ isSelected ?  '12px' : null };
        flex-direction : row;
        justify-content: center;
    `;

    const HeaderText = styled.Text({
        ...theme.font['--text-sm-medium'],
        color : theme.colors['--color-gray-600'],
        paddingRight: 12,
    })

    return (
       
        <HeaderGoupWrapper>
            <HeaderGroupContainer>
                <HeaderText>{name}</HeaderText>
                {/* <SortFilter isSelected = {isSelected}/> */}
            </HeaderGroupContainer>
        </HeaderGoupWrapper>
    
    )
}

export default HeaderFilterGroup