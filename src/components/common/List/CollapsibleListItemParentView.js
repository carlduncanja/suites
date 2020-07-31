import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import styled, { css } from '@emotion/native';
import CheckBoxComponent from "../Checkbox";
import { useTheme } from 'emotion-theming';

function CollapsibleListItemParentView ({hasCheckBox = true, isChecked = false, onCheckBoxPress = ()=>{}, collapse = ()=>{}, isCollapsed=false, render = ()=>{}}){
    
    const theme = useTheme()

    const CollapsibleParentListItemWrapper = styled.View`
        flex-direction : row;
        align-items: center;
    `

    return (
        <CollapsibleParentListItemWrapper>
            {
                hasCheckBox &&
                
                    <CheckBoxComponent
                        isCheck={isChecked}
                        onPress={onCheckBoxPress}
                    />
                
            }
            
            {
                render(collapse, isCollapsed)
            }
        </CollapsibleParentListItemWrapper>
    )
}

export default CollapsibleListItemParentView
