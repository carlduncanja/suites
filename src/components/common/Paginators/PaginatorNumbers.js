import React, { Component, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import IconButton from "../Buttons/IconButton";


function PaginatorNumbers ({
        currentPage = 0,
        totalPages = 0,
    }){

    const theme = useTheme();
    
    const PaginatorNumbersWrapper = styled.View`
        width: 65px;
        height: 26px;
        background-color: yellow;
    `;
    const PaginatorNumbersContainer = styled.View`
        width : 100%;
        height: 100%;
        padding-top: 6px;
        padding-bottom: 6px;
        justify-content: space-evenly;
        align-items: center;
        background-color : ${theme.colors['--color-neutral-gray-100']};
        border : 1px solid ${theme.colors['--color-gray-400']};
        border-radius : ${theme.space['--space-4']};
    `;

    const Number = styled.Text({
        ...theme.font['--text-base-regular'],
        color : theme.colors['--color-black'],
    })
    
    return (
        <PaginatorNumbersWrapper>
            <PaginatorNumbersContainer>
                <Number>{currentPage} of {totalPages}</Number>
            </PaginatorNumbersContainer>
        </PaginatorNumbersWrapper>   
    );
};

export default PaginatorNumbers;

const styles = StyleSheet.create({
 
  numbersContainer: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#CCD6E0",
    borderRadius: 4,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 2,
    paddingTop: 2,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
  },
  numbers: {
    fontSize: 14,
    color: "#313539",
  },
});
