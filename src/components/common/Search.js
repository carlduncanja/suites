import React, { useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';
import InputText from './InputText';
import InputField2 from './Input Fields/InputField2';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function Search({placeholderText = "Search", changeText = () => {}, inputText, onClear}){
    
    const theme = useTheme(); 
    const [isFocussed, setIsFocussed] = useState(false)

    const SearchWrapper = styled.View` 
        width: 100%; 
        margin-bottom : ${theme.space['--space-24']};
    `;
 
    const SearchContainer = styled.View`
        height: 30px;
        
    `;
    // border : 1px solid ${theme.colors['--color-gray-400']};
    //     border-radius : 8px;

    const onFocus = ()=>{
        setIsFocussed(true)
    }
    const onEndEditing = () =>{
        setIsFocussed(false)
    }

    return (
        <SearchWrapper>
            <SearchContainer>
                <InputField2
                    onChangeText={changeText}
                    placeholder={placeholderText}
                    placeholderTextColor = {theme.colors['--color-gray-500']}
                    value = {inputText}
                    backgroundColor = {theme.colors['--color-gray-100']}
                    isFocussed = {isFocussed}
                    onFocus = {onFocus}
                    onEndEditing = {onEndEditing}
                    onClear = {onClear}
                    
                />
            </SearchContainer>
        </SearchWrapper>
    )
};

export default Search
