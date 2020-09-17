import React, {Component, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import SvgIcon from '../../../../assets/SvgIcon';
import PaginatorRight from '../../../../assets/svg/paginationRight';
import PaginatorLeft from '../../../../assets/svg/paginationLeft';
import IconButton from '../Buttons/IconButton';
import PaginatorNumbers from './PaginatorNumbers';

const PaginatorWrapper = styled.View`
  height: 100%;
  width: 100%;
`;
const PaginatorContainer = styled.View`
  height: 100%;
  flex-direction : row;
  align-items: center;
  justify-content: center;
`;

function Paginator({
    currentPage = 0,
    totalPages = 0,
    hasNumberBorder = true,
    goToNextPage = () => {
    },
    goToPreviousPage = () => {
    },
    isNextDisabled = false,
    isPreviousDisabled = false,
}) {
    const theme = useTheme();

    return (
        <PaginatorWrapper>
            <PaginatorContainer>

                <IconButton
                    Icon={(
                        <PaginatorLeft
                            strokeColor={isPreviousDisabled ? theme.colors['--color-gray-400'] : theme.colors['--company']}
                        />
                    )}
                    onPress={goToPreviousPage}
                    disabled={isPreviousDisabled}
                />

                <PaginatorNumbers
                    currentPage={currentPage}
                    totalPages={totalPages}
                    hasNumberBorder={hasNumberBorder}
                />

                <IconButton
                    Icon={(
                        <PaginatorRight
                            strokeColor={isNextDisabled ? theme.colors['--color-gray-400'] : theme.colors['--company']}
                        />
                    )}
                    onPress={goToNextPage}
                    disabled={isNextDisabled}
                />

            </PaginatorContainer>
        </PaginatorWrapper>

    );
}

export default Paginator;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'yellow',
    },
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
