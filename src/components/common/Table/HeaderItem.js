import React, {Component, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DownArrow from '../../../../assets/svg/downArraow';  

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import SortFilter from './SortFilterIcon';
import HeaderFilterGroup from './HeaderFilterGroup';

function HeaderItem({header,index, selectedHeader = "", onSelectHeader = ()=>{}}){

    const theme = useTheme()

    const HeaderItemWrapper = styled.TouchableOpacity`
        flex : ${header.flex ? header.flex.toString() : '1'};
    `;
    const HeaderItemContainer = styled.View`
        flex-direction: row;
        align-items : ${header.alignment ? header.alignment : 'flex-start'};
    `;


    return (
        <HeaderItemWrapper key={index} onPress = {onSelectHeader}>
            <HeaderItemContainer>

                <HeaderFilterGroup
                    name = {header.name}
                    isSelected = {header.name === selectedHeader}
                />

            </HeaderItemContainer>
        </HeaderItemWrapper>
    )
}

export default HeaderItem
