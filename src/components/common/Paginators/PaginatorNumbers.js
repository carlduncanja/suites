import React, {Component, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import IconButton from '../Buttons/IconButton';

const PaginatorNumbersWrapper = styled.View`
    width: 65px;
    height: 26px;
`;

const PaginatorNumbersContainer = styled.View`
    width : 100%;
    height: 100%;
    padding-top: ${({theme}) => theme.space['--space-6']};
    padding-bottom:  ${({theme}) => theme.space['--space-6']};
    justify-content: space-evenly;
    align-items: center;
    background-color : ${({theme, hasNumberBorder}) => hasNumberBorder && theme.colors['--color-neutral-gray-100']};
    border : ${({theme, hasNumberBorder}) => hasNumberBorder && `1px solid ${theme.colors['--color-gray-400']}`} ;
    border-radius : ${({theme, hasNumberBorder}) => hasNumberBorder && theme.space['--space-4']};
`;

const Number = styled.Text(({theme}) => ({
    ...theme.font['--text-base-regular'],
    color: theme.colors['--color-black'],
}));

function PaginatorNumbers({
    currentPage = 0,
    totalPages = 0,
    hasNumberBorder = true,
}) {
    const theme = useTheme();

    return (
        <PaginatorNumbersWrapper>
            <PaginatorNumbersContainer theme={theme} hasNumberBorder={hasNumberBorder}>
                <Number theme={theme}>{currentPage || 1} of {totalPages || 1}</Number>
            </PaginatorNumbersContainer>
        </PaginatorNumbersWrapper>
    );
}

export default PaginatorNumbers;

const styles = StyleSheet.create({

    numbersContainer: {
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#CCD6E0',
        borderRadius: 4,
        paddingLeft: 7,
        paddingRight: 7,
        paddingBottom: 2,
        paddingTop: 2,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
    },
    numbers: {
        fontSize: 14,
        color: '#313539',
    },
});
