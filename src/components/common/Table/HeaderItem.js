import React, {Component, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import DownArrow from '../../../../assets/svg/downArraow';
import SortFilter from './SortFilterIcon';
import HeaderFilterGroup from './HeaderFilterGroup';

const HeaderItemWrapper = styled.TouchableOpacity`
    flex : ${({header}) => (header.flex ? header.flex.toString() : '1')};
`;
const HeaderItemContainer = styled.View`
    flex-direction: row; 
    justify-content : ${({header}) => (header.alignment ? header.alignment : 'flex-start')};
`;

function HeaderItem({header, index, selectedHeader = '', onSelectHeader = () => {}}) {
    const theme = useTheme();
 
    return (
        <HeaderItemWrapper
            key={index}
            onPress={() => onSelectHeader(header?.name)}
            header={header}
            activeOpacity={header?.hasSort ? 0.5 : 1}
        >
            <HeaderItemContainer header={header}>

                <HeaderFilterGroup
                    name={header?.name}
                    isSelected={header?.name === selectedHeader}
                    hasSort={header?.hasSort}
                />

            </HeaderItemContainer>
        </HeaderItemWrapper>
    );
}

export default HeaderItem;
