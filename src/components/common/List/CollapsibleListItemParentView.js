import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import styled, { css } from '@emotion/native';
import CheckBoxComponent from "../Checkbox";
import { useTheme } from 'emotion-theming';


const CollapsibleParentListItemWrapper = styled.View`
    width : 100%;
    height: 54px;
`;

const CollapsibleParentListItemContainer = styled.View`
    flex-direction : row;
    align-items: center;  
    height:  ${({isCollapsed}) => isCollapsed ? '54px' : '55px'};
    align-self: flex-start;
    justify-self: flex-start;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: ${({isCollapsed, theme}) => isCollapsed ? theme.space['--space-8'] : '0'};
    border-bottom-left-radius: ${({isCollapsed, theme}) => isCollapsed ? theme.space['--space-8'] : '0'};
    
    //border: 1px solid ${ ({theme}) => theme.colors['--color-gray-300']};
    
    background-color : ${ ({backgroundColor, theme}) => theme.colors[backgroundColor]};
`;

function CollapsibleListItemParentView ({hasCheckBox = true, isChecked = false, isIndeterminate = false, onCheckBoxPress = ()=>{}, collapse = ()=>{}, isCollapsed=false, render = ()=>{}, backgroundColor = 'default-shade-white'}){

    const theme = useTheme();

    return (
        <CollapsibleParentListItemWrapper>
            <CollapsibleParentListItemContainer isCollapsed={isCollapsed} backgroundColor = {backgroundColor} theme = {theme}>

                { hasCheckBox &&

                    <CheckBoxComponent
                        isCheck={isChecked}
                        isIndeterminate={isIndeterminate}
                        onPress={onCheckBoxPress}
                    />

                }

                {
                    render(collapse, isCollapsed)
                }
            </CollapsibleParentListItemContainer>
        </CollapsibleParentListItemWrapper>
    )
}

export default CollapsibleListItemParentView
