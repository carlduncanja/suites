import React, { Component, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, CheckBox } from 'react-native';
import InputText from '../InputText';
import SvgIcon from '../../../../assets/SvgIcon';
import MultipleShadowsContainer from '../MultipleShadowContainer';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import SearchBox from './SearchBox';
import SearchControls from './SearchControls';
import SearchComplete from './SearchComplete';
import DropDown from "../../../../assets/svg/dropdownIcon";

/**
 *
 * @param changeText
 * @param inputText
 * @param matchesFound
 * @param onPressNextResult
 * @param onPressPreviousResult
 * @param onPressNewSerch
 * @param onPressSubmit
 * @returns {*}
 * @constructor
 */
const SearchInputWrapper = styled.View`
    margin:0; 
    height: 60px;
    padding:${({ theme }) => theme.space['--space-14']};
    background-color: ${({ theme }) => theme.colors['--color-neutral-gray-200']};

`;
const SearchInputContainer = styled.View`
    height: 100%;
    width: 100%;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06); */

`;

const PopUp = styled.View`
    width:180px;
    align-self:center;
    align-items:flex-start;
    position:absolute;
    padding:5px;
    top:50px;
    height:175px;
    background-color:${({ theme }) => theme.colors["--default-shade-white"]};
    z-index:10;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius:3.6px;

`;

const PopupContainer = styled.View`
    align-items:center;
    flex-direction:row;
    margin:2px;

`;

const RadioContainer = styled.View`
    background-color:${({ checkedButton, name, theme }) => checkedButton === name ? theme.colors["--color-blue-600"] : "white"};
    border-color:${({ theme }) => theme.colors["--color-neutral-gray-300"]};
    border-width:1px;
    width:15px;
    height:15px;
    border-radius:7.5px;
    margin-right:10px;
`;

const OptionContainer = styled.View`
    background-color:${({ item }) => item.color};
    border-radius:4.6px;
    height:25px;
    margin:1.8px;
    align-items:center;
    justify-content:center;
`;

const shadows = [
    {
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.06,
        shadowRadius: 4
    },
    {
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 6
    },
];

function SearchInput({ changeText, inputText, matchesFound, onPressNextResult, onPressPreviousResult, onPressNewSerch, onPressSubmit }) {
    const theme = useTheme();

    const optionList = [
        {
            name: "Delivery",
            color: "#38A169"

        },
        {
            name: "Inventory Re-Stock",
            color: "#D69E2E"
        },
        {
            name: "Inventory Audit",
            color: "#D53F8C"
        },
        {
            name: "Payment Due",
            color: "#3182CE"
        },
        {
            name: "Procedure",
            color: "#C53030"
        }

    ];




    const renderDropDown = () => {
        console.log(checkedRadioButton);

        const options = [...optionList];
        return (

            <PopUp theme={theme}>

                {options.map((item, index) => {
                    return (<PopupContainer>
                        <RadioContainer theme={theme} checkedButton={checkedRadioButton} name={item.name}>
                            <RadioButton
                                value={item.name}
                                status={checkedRadioButton === item.name ? 'checked' : 'unchecked'}
                                onPress={() => setcheckedButton(item.name)}
                                color="blue"
                            />

                        </RadioContainer>
                        <OptionContainer key={index} item={item}>
                            <Text style={{ color: "white", fontSize: 15 }}>{item.name}</Text>
                        </OptionContainer>
                    </PopupContainer>




                    );

                })}</PopUp>

        );
    };

    return (
        <MultipleShadowsContainer shadows = {shadows}>
            <SearchInputWrapper theme={theme}>
                <SearchInputContainer>

                    <SearchBox
                        onChangeText={changeText}
                        inputText={inputText}
                        matchesFound={matchesFound}
                        onPressNewSerch={onPressNewSerch}
                    />

                    <SearchControls
                        onPressNextResult={onPressNextResult}
                        onPressPreviousResult={onPressPreviousResult}
                    />

                    <SearchComplete onSubmit={onPressSubmit}/>

                </SearchInputContainer>
            </SearchInputWrapper>
        </MultipleShadowsContainer>
    );
}
export default SearchInput;
