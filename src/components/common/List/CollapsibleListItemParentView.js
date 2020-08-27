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
    background-color : ${ ({backgroundColor, theme}) => theme.colors[backgroundColor]};
`;

function CollapsibleListItemParentView ({hasCheckBox = true, isChecked = false, onCheckBoxPress = ()=>{}, collapse = ()=>{}, isCollapsed=false, render = ()=>{}, backgroundColor = 'default-shade-white'}){
    
    const theme = useTheme();

    return (
        <CollapsibleParentListItemWrapper>
            <CollapsibleParentListItemContainer backgroundColor = {backgroundColor} theme = {theme}>

                { hasCheckBox &&
                
                    <CheckBoxComponent
                        isCheck={isChecked}
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
