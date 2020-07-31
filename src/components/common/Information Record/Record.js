import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function Record({
    recordTitle = "", 
    recordValue = '--', 
    titleStyle = "--text-sm-regular",
    valueStyle = "--text-base-regular",
    valueFontSize = 16, 
    titleFontSize = 14, 
    titleColor = '--color-gray-600', 
    valueColor = '--color-gray-900',
    flex = 1
}){
    const theme = useTheme();

    const RecordWrapper = styled.View`
        flex:${flex.toString()};
        background-color: red;
        margin-right: ${theme.space['--space-4']};
    `;
    const RecordContainer = styled.View`
        display: flex;
        flex-direction:column;
    `;

    const TitleText = styled.Text({
        ...theme.font[titleStyle],
        color : theme.colors[titleColor],
        marginBottom: 10,
    });

    const ValueText = styled.Text({
        ...theme.font[valueStyle],
        color : theme.colors[valueColor]
    })

    return ( 
        <RecordWrapper>
            <RecordContainer>
                <TitleText>{recordTitle}</TitleText>
                <ValueText>{recordValue}</ValueText>
            </RecordContainer>
        </RecordWrapper>
    )
}

export default Record 

const styles = StyleSheet.create({
    container:{
        flexDirection:'column'
    },
    recordTitle:{
        paddingBottom:4,
    },
    
})