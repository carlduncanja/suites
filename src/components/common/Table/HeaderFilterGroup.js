import React, {Component, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import SortFilter from './SortFilterIcon';

const HeaderGoupWrapper = styled.View`
    flex:1;
    height: 100%;
    align-items : ${({alignment}) => (alignment ? alignment : 'flex-start')};
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
 
const HeaderText = styled.Text( ({theme, isSelected, hasSort}) =>({
    ...theme.font['--text-sm-medium'],
    color: theme.colors['--color-gray-600'],
    paddingRight: (hasSort) ? 12 : 0,
    paddingTop: 2,

}));

function HeaderFilterGroup({name = '', isSelected = false, hasSort = false, alignment}) {
    const theme = useTheme();
    // console.log("Name: ", name, isSelected)

    return (
        name !== '' &&
        <HeaderGoupWrapper alignment={alignment}>
            <HeaderGroupContainer theme={theme} isSelected={isSelected} hasSort={hasSort}>
                <HeaderText theme={theme} isSelected={isSelected} hasSort={hasSort}>{name}</HeaderText>
                {
                    hasSort && <SortFilter isSelected={isSelected}/>
                }
                
            </HeaderGroupContainer>
        </HeaderGoupWrapper>
    
    );
}

export default HeaderFilterGroup;
