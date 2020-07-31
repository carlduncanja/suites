import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import LineDivider from '../LineDivider';
import Collapsible from 'react-native-collapsible';
import styled, { css } from '@emotion/native';
import CheckBoxComponent from "../Checkbox";
import { useTheme } from 'emotion-theming';

function CollapsibleListItemChildView ({isCollapsed=false, children =()=>{}}){
    
    const theme = useTheme()

    const ChildContentWrapper = styled.View`
        flex: 1;
        flexDirection: 'column';
        padding-bottom: ${theme.space['--space-20']};
    `

    return (
        <Collapsible collapsed={isCollapsed}>
            <LineDivider/>

            {
                !isCollapsed &&
                <ChildContentWrapper>
                    {children}
                </ChildContentWrapper>
            }

        </Collapsible>
    )
}


export default CollapsibleListItemChildView
