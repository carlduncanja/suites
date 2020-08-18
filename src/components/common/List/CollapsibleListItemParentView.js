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
`;

function CollapsibleListItemParentView ({hasCheckBox = true, isChecked = false, onCheckBoxPress = ()=>{}, collapse = ()=>{}, isCollapsed=false, render = ()=>{}}){
    
    const theme = useTheme();

    return (
        <CollapsibleParentListItemWrapper>
            <CollapsibleParentListItemContainer>

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
