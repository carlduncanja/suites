import React, {Component, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, TextInput} from 'react-native';
import InputText from '../InputText';

import SvgIcon from '../../../../assets/SvgIcon';
import LeftSelector from '../../../../assets/svg/leftSelector';
import RightSelector from '../../../../assets/svg/rightSelector';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import IconButton from '../Buttons/IconButton';
import SearchInputContainer from './SearchInputContainer';
import MatchesFoundComponent from './MatchesFound';

function SearchControls({onPressPreviousResult = ()=>{}, onPressNextResult=()=>{}}){

    const theme = useTheme();

    const SearchControlsWrapper = styled.View`
        margin : 0 ;
        margin-right: 12px;
        width : 66px;
        height: 100%;
        align-items: center;
        justify-content: center;
    `;

    const SearchControlsContainer = styled.View`
        display: flex;
        height: 100%;
        width: 100%;
        flex-direction:row;
        background-color: ${theme.colors['--color-gray-100']};
        border-width: 1px;
        border-color: ${theme.colors['--color-gray-300']};
        border-radius: 8px;
    `;

    const ControlDivider = styled.View`
        border-width: 1px;
        border-color: ${theme.colors['--color-gray-300']};
    `;

    return (
        <SearchControlsWrapper>
            <SearchControlsContainer>
                <IconButton
                    Icon = {<LeftSelector/>}
                    onPress = {onPressPreviousResult}
                />

                <ControlDivider/>

                <IconButton
                    Icon = {<RightSelector/>}
                    onPress = {onPressNextResult}
                />

            </SearchControlsContainer>
        </SearchControlsWrapper>
    )
}

export default SearchControls

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
