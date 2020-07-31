import React, { useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import InputText from './InputText';
import InputField2 from './Input Fields/InputField2';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function Search({placeholderText = "Search", changeText = () => {}, inputText}){
    
    const theme = useTheme(); 

    const SearchWrapper = styled.View`
        margin-bottom : 24px;
    `;

    const SearchContainer = styled.View`
        height: 30px;
        border : 1px solid ${theme.colors['--color-gray-400']};
        border-radius : 8px;
    `;

    return (
        <SearchWrapper>
            <SearchContainer>
                <InputField2
                    onChangeText={changeText}
                    placeholder={placeholderText}
                    placeholderTextColor = {theme.colors['--color-gray-500']}
                    value = {inputText}
                    backgroundColor = {theme.colors['--color-gray-100']}
                />
            </SearchContainer>
        </SearchWrapper>
    )
};

export default Search
