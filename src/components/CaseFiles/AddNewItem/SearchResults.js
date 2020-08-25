import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import styled, {css} from '@emotion/native';
import { useTheme } from 'emotion-theming';

import _ from "lodash";


const ResultsWrapper = styled.View`
    height : 160px;
    width : 100%;
    position : absolute;
    top : 32;
    box-shadow : 0px 4px 6px rgba(0, 0, 0, 0.05);
`;
const ResultsContainer = styled.View`
    height : 100%;
    width : 100%;
    padding : ${ ({theme}) => `${theme.space['--space-10']} ${theme.space['--space-12']}`};
    background-color: ${ ({theme}) => theme.colors['--default-shade-white']};
    border : 1px solid ${({theme}) => theme.colors['--color-gray-400']};
    border-top-width : 0px;
    border-radius : 0px 0px 8px 8px;
`;

const ResultWrapper = styled.TouchableOpacity`
    height : 32px;
    width : 100%;
`;

const Result = styled.Text(({theme}) => ({
    ...theme.font['--text-sm-regular'],
    color : theme.colors['--color-gray-800'],
}));


function SearchResults({results = [], onPressResult = ()=>{}}){

    const theme = useTheme();
   
    return (
        <ResultsWrapper theme = {theme}>
            <ResultsContainer theme={theme}>
                {
                    results.map( (result, index) => {
                        const { name = "" } = result || {}
                        return (
                            <ResultWrapper key = {index} onPress = {()=>onPressResult(result)}>
                                <Result theme = {theme}>
                                    {name}
                                </Result>
                            </ResultWrapper>
                        )
                    })
                }

            </ResultsContainer>
        </ResultsWrapper> 
    )
}

export default SearchResults


