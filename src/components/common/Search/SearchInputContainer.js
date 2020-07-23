import React, {Component, useState} from 'react';
import InputText from '../InputText';
import SearchIcon from '../../../../assets/svg/search';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function SearchInputContainer({onChangeText = ()=>{}, inputText}){

    const theme = useTheme();

    const SearchWrapper = styled.View`
        flex:1;
        height: 100%;
    `;

    const SearchContainer = styled.View`
        height: 100%;
        align-items: center;
        flex-direction: row;
    `;

    const SearchIconContainer = styled.View`
        padding-right: 10px;
    `;

    const InputTextContainer = styled.View`
        display: flex;
        flex:1;
    `
    return(
        <SearchWrapper>
            <SearchContainer>

                <SearchIconContainer>
                    <SearchIcon strokeColor="#A0AEC0"/>
                </SearchIconContainer>

                <InputTextContainer>
                    <InputText
                        onChangeText={onChangeText}
                        inputText={inputText}
                        placeholderTextColor="#A0AEC0"
                        placeholder=""
                    />
                </InputTextContainer> 
                        
            </SearchContainer>
        </SearchWrapper>
    )

}

export default SearchInputContainer