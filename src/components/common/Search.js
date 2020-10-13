import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import InputText from './InputText';
import InputField2 from './Input Fields/InputField2';
import SearchIcon from '../../../assets/svg/search';

import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';

const SearchWrapper = styled.View` 
    width: 100%; 

`;

const SearchContainer = styled.View`
    height: 30px;
`;

function Search({
        placeholderText = "Search", 
        changeText = () => {}, 
        inputText, 
        onClear,
        backgroundColor,
        hasIcon = false,
        hasBorder,
        Icon
}) { 

    const theme = useTheme();

    const [isFocussed, setIsFocussed] = useState(false);

    const onFocus = () => {
        setIsFocussed(true);
    }
    const onEndEditing = () => {
        setIsFocussed(false);
    }


    return (
        <SearchWrapper>
            <SearchContainer>
                <InputField2
                    onChangeText={changeText}
                    placeholder={placeholderText}
                    placeholderTextColor={theme.colors['--color-gray-500']}
                    value={inputText}
                    backgroundColor={backgroundColor ? backgroundColor : theme.colors['--color-gray-100']}
                    isFocussed={isFocussed}
                    onFocus={onFocus}
                    onEndEditing={onEndEditing}
                    onClear={onClear}
                    hasBorder={hasBorder}
                    Icon={Icon}

                />
            </SearchContainer>
        </SearchWrapper>
    )
};

export default Search
