import React, {Component, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, TextInput} from 'react-native';
import InputText from '../InputText';

import SvgIcon from '../../../../assets/SvgIcon';
import LeftSelector from '../../../../assets/svg/leftSelector';
import RightSelector from '../../../../assets/svg/rightSelector';

import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import IconButton from '../Buttons/IconButton';
import SearchInputContainer from './SearchInputContainer';
import MatchesFoundComponent from './MatchesFound';
import Button from '../Buttons/Button';

const SearchCompleteWrapper = styled.View`
    margin : 0 ;
    width : 55px;
    height: 26px;
    border-radius: 6px;
    justify-content: center;
    align-items:center;
    
    border-color: ${({theme}) => theme.colors['--color-gray-300']};
    border-width: 1px;
    background-color: ${({theme}) => theme.colors['--color-gray-100']};
`;

function SearchComplete({
                            onSubmit = () => {
                            }
                        }) {

    const theme = useTheme();

    return (

        <SearchCompleteWrapper>
            <Button
                buttonPress={onSubmit}
                color={theme.colors['--accent-button']}
                title="Done"
            />
        </SearchCompleteWrapper>

    )
}

export default SearchComplete

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
