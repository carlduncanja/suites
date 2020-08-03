import React, {Component, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CheckedBox, PartialCheckbox} from '../Checkbox/Checkboxes';
import Checkbox from '../Checkbox/Checkbox';
import CheckBoxComponent from "../Checkbox";

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import HeaderItem from './HeaderItem';

function Header({headers = [], selectedHeader = "", toggleHeaderCheckbox=()=>{}, isIndeterminate = false, checked=false, isCheckbox=true}){

    const theme = useTheme()

    const HeaderWrapper = styled.View`
        margin-bottom: ${theme.space['--space-13']};
  
    `
    const HeaderContainer = styled.View`
        align-items: flex-start;
        flex-direction:row;
        align-items:center;
        padding-left:1px;
    `

    return (
        <HeaderWrapper>
            <HeaderContainer>
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
                        <HeaderItem header={header} index={index} selectedHeader = {selectedHeader} key={index}/>
                    )}
                )}
            </HeaderContainer>
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
