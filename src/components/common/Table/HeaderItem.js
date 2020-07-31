import React, {Component, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function HeaderItem({header,index}){

    const theme = useTheme()

    const HeaderItemWrapper = styled.View`
        display : flex;
    `
    const HeaderItem = styled.Text({
        ...theme.font['--text-sm-medium'],
        color : theme.colors['--color-gray-600']
    })

    return (
        <HeaderItemWrapper style={[header.styles, {alignItems: header.alignment, flex: header.flex || 1}]} key={index}>
            <HeaderItem>{header.name}</HeaderItem>
        </HeaderItemWrapper>
    )
}

export default HeaderItem