import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import Paginator from './Paginator';
import MultipleShadowContainer from '../MultipleShadowContainer';

const RoundedPaginatorWrapper = styled.View`
    width: 145px;
    height: 48px;
    margin-right: ${({theme}) => theme.space['--space-10']};
    justify-content: center;
    
`;
const RoundedPaginatorContainer = styled.View`
    display: flex;
    width: 100%;
    height: 100%;
    align-self: center;
    justify-content: center;
    background-color: ${({theme}) => theme.colors['--default-shade-white']};
    padding-top: ${({theme}) => theme.space['--space-10']};
    padding-left: ${({theme}) => theme.space['--space-12']};
    padding-right: ${({theme}) => theme.space['--space-12']};
    padding-bottom: ${({theme}) => theme.space['--space-10']};
    /* box-shadow : 0px 4px 6px rgba(0, 0, 0, 0.05); */
    border-radius: 32px;
`;

const shadows = [
    {
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 15
      },
      {
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 0 },
        shadowOpacity: 0.05,
        shadowRadius: 6
      },
]

function RoundedPaginator({
    totalPages = 0,
    currentPage = 0,
    goToNextPage = () => {},
    goToPreviousPage = () => {},
    isNextDisabled = false,
    isPreviousDisabled = false
}) {
    const theme = useTheme();

    return (
        <MultipleShadowContainer shadows = {shadows}>
            <RoundedPaginatorWrapper theme={theme}>
                <RoundedPaginatorContainer theme={theme}>
                    <Paginator
                        totalPages={totalPages}
                        currentPage={currentPage}
                        goToNextPage={goToNextPage}
                        goToPreviousPage={goToPreviousPage}
                        isNextDisabled={isNextDisabled}
                        isPreviousDisabled={isPreviousDisabled}
                    />
                </RoundedPaginatorContainer>
            </RoundedPaginatorWrapper>
        </MultipleShadowContainer>
        

    );
}

export default RoundedPaginator;

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 32,
        // backgroundColor: '#FFFFFF',
        backgroundColor: 'green',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
