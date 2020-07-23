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
        <View style={[styles.container, styles.control]}>
            <TouchableOpacity
                activeOpacity={1}
                style={{padding: 8, paddingLeft: 6}}
                onPress={() => onPressPreviousResult()}
            >
                <SvgIcon iconName="scheduleMonthLeft" strokeColor="#718096"/>
            </TouchableOpacity>

            <View style={{borderWidth: 1, borderColor: '#E3E8EF'}}/>

            <TouchableOpacity
                activeOpacity={1}
                style={{padding: 8, paddingRight: 6}}
                onPress={() => onPressNextResult()}
            >
                <SvgIcon iconName="scheduleMonthRight" strokeColor="#718096"/>
            </TouchableOpacity>
        </View>
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
