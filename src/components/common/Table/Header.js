import React, {Component, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CheckedBox, PartialCheckbox} from '../Checkbox/Checkboxes';
import Checkbox from '../Checkbox/Checkbox';
import CheckBoxComponent from "../Checkbox";

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function Header({headers, toggleHeaderCheckbox, isIndeterminate, checked, isCheckbox}){

    const theme = useTheme()

    const HeaderWrapper = styled.View`
        align-items: flex-start;
        flex-direction:row;
        align-items:center;
        background-color: ${theme.colors['--color-orange-400']};
    `
    const HeaderItemWrapper = styled.View`
        display : flex;
    `
    const HeaderItem = styled.Text({
        ...theme.font['--text-sm-medium'],
        color : theme.colors['--color-gray-600']
    })
        
    

    return (
        <HeaderWrapper>
            {
                isCheckbox &&
                    <CheckBoxComponent
                        isIndeterminate={isIndeterminate}
                        onPress={toggleHeaderCheckbox}
                        isCheck={checked}
                    />

            }
           
            {headers.map((header, index) => {
                return (
                    <HeaderItemWrapper style={[header.styles, {alignItems: header.alignment, flex: header.flex || 1}]} key={index}>
                        <HeaderItem>{header.name}</HeaderItem>
                    </HeaderItemWrapper>
                )}
            )}
            
        </HeaderWrapper>
    );
}

export default Header;

const styles = StyleSheet.create({
    headersContainer: {
        //flex:1,
        // marginLeft: 10,
        flexDirection: 'row',
        //width:'100%'
    },
    item: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 16,
        color: '#718096'
    }
});
