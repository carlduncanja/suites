import React, {Component, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DownArrow from '../../../../assets/svg/downArraow';  

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import SortFilter from './SortFilterIcon';


const HeaderGoupWrapper = styled.View`
    height: 100%;
`;

const HeaderGroupContainer = styled.View`
    display: flex;
    padding-top: ${ ({theme, isSelected, hasSort}) => isSelected && hasSort? theme.space['--space-4'] : 0};
    padding-bottom: ${ ({theme, isSelected, hasSort}) => isSelected && hasSort ?  theme.space['--space-4'] : 0};
    padding-left: ${ ({theme, isSelected, hasSort}) => isSelected && hasSort ? theme.space['--space-8'] : 0};
    padding-right: ${ ({theme, isSelected, hasSort}) => isSelected && hasSort ?  theme.space['--space-8'] : 0};
    background-color: ${ ({theme, isSelected, hasSort}) => isSelected && hasSort ?  theme.colors['--color-gray-300'] : null };
    border-radius : ${ ({isSelected, hasSort}) => isSelected && hasSort ?  '12px' : null };
    flex-direction : row;
    justify-content: center;
`;
 
const HeaderText = styled.Text( ({theme}) =>({
    ...theme.font['--text-sm-medium'],
    color : theme.colors['--color-gray-600'],
    paddingRight: 12,
}))

function HeaderFilterGroup({name = "", isSelected = false, hasSort = false}){

    const theme = useTheme()
    // console.log("Name: ", name, isSelected)

    return (
       name !=="" &&
        <HeaderGoupWrapper>
            <HeaderGroupContainer theme = {theme} isSelected = {isSelected} hasSort = {hasSort}>
                <HeaderText theme = {theme}>{name}</HeaderText>
                {
                    hasSort && <SortFilter isSelected = {isSelected}/>
                }
                
            </HeaderGroupContainer>
        </HeaderGoupWrapper>
    
    )
}

export default HeaderFilterGroup