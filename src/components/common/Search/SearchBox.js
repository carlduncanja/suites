import React, {Component, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, TextInput} from 'react-native';
import InputText from '../InputText';

import SvgIcon from '../../../../assets/SvgIcon';
import SearchIcon from '../../../../assets/svg/search';
import Close from '../../../../assets/svg/clearIcon';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import IconButton from '../Buttons/IconButton';
import SearchInputContainer from './SearchInputContainer';
import MatchesFoundComponent from './MatchesFound';

function SearchBox({onChangeText = ()=>{}, inputText = "", matchesFound = [], onPressNewSerch = ()=>{} }){

    const theme = useTheme();

    const SearchBoxWrapper = styled.View`
        margin : 0 ;
        width : 498px;
        height : 32px;
        align-items: center;
        justify-content: center;
    `;

    const SearchBoxContainer = styled.View`
        height: 100%;
        width: 100%;
        flex-direction:row;
        padding-left: 9px;
        padding-right: 9px;
        padding-top: 4px;
        padding-bottom: 4px;
        background-color: ${theme.colors['--color-gray-100']};
        border-width: 1px;
        border-color: ${theme.colors['--color-gray-300']},
        border-radius: 8px;
    `;

    

    return (
        <SearchBoxWrapper>
            <SearchBoxContainer>
                
                <SearchInputContainer
                    onChangeText = {onChangeText}
                    inputText = {inputText}
                />

                <MatchesFoundComponent
                    matchesFound = {matchesFound}
                    onPressNewSearch = {onPressNewSerch}
                />
                    
            </SearchBoxContainer>
        </SearchBoxWrapper>
    )
}

export default SearchBox

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: "#F8FAFB",
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 8,
        padding: 8,
        paddingLeft: 6,
        paddingRight: 6,
    },
    searchContent: {
        flex: 1,
        //alignItems:'center',
        //justifyContent:'space-between'
    },
    control: {
        backgroundColor: '#FFFFFF',
        marginLeft: 10,
        padding: 0,
    },
})
