import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import moment from "moment";
import { formatDate } from '../../utils/formatter';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import RightSelector from '../../../assets/svg/rightSelector';
import LeftSelector from '../../../assets/svg/leftSelector';
import IconButton from '../common/Buttons/IconButton';
import MonthTitleContainer from './MonthTitleContainer';

/**
 *
 * @param selectedMonth
 * @param onMonthUpdated  :  function that takes a date as a
 * @returns {*}
 * @constructor
 */

function MonthSelector ({selectedMonth = new Date(), onMonthUpdated = ()=>{}}){

    const theme = useTheme();

    const handleOnMonthIncrement = () => {
        const newMonth = moment(selectedMonth).add(1, "month");
        onMonthUpdated(newMonth);
    };

    const handelOnMonthDecrement = () => {
        console.log("Decrement: ")
        const newMonth = moment(selectedMonth).subtract(1, "month");
        onMonthUpdated(newMonth);
    };
    
    const MONTH = formatDate(selectedMonth,"MMMM YYYY");

    // ###### STYLED COMPONENTS

    const MonthSelectorWrapper = styled.View`
        margin: 0px;
    `
    const MonthSelectorContainer = styled.View`
        display: flex;
        flex-direction:row;
        justify-content:center;
        align-items: center;
    `

    const SelectorContainer = styled.View`
        display:flex;
        height:100%;
    `;


    return (
        <MonthSelectorWrapper>
            <MonthSelectorContainer>

                <SelectorContainer>
                    <IconButton
                        onPress = {handelOnMonthDecrement}
                        Icon = {<LeftSelector/>}
                    />
                </SelectorContainer>
            
                <MonthTitleContainer month = {MONTH}/>
                
                <SelectorContainer>
                    <IconButton
                        onPress = {handleOnMonthIncrement}
                        Icon = {<RightSelector/>}
                    />
                </SelectorContainer>

            </MonthSelectorContainer>
        </MonthSelectorWrapper>

    )
};

export default MonthSelector

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 24,
        color: '#104587',
    }
});
