import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { colors } from 'react-native-elements';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function DayIdentifier({color}){

    const theme = useTheme();
    const DayIdentifierWrapper = styled.View`
        width: 100%;
        height: 4px;
    `
    const DayIdentifierContainer = styled.View`
        background-color: ${color ? color : theme.colors['--accent-button']};
        border-radius : 8px;
        height:100%;
        width:100%;
        box-shadow: ${theme.shadow['--shadow-identifier']};
        
    `
    return(
        <DayIdentifierWrapper>
            <DayIdentifierContainer/>
        </DayIdentifierWrapper>
    )
}

export default DayIdentifier

const styles = StyleSheet.create({
    container:{
        borderRadius: 8,
        height:4, 
        width: '90%',
    }
})