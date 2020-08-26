import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';


const RecordWrapper = styled.View`
    flex:${ ({flex}) => flex.toString()};
    margin-right: ${ ({theme}) => theme.space['--space-4']};

`;
const RecordContainer = styled.View`
    display: flex;
    flex-direction:column;
`;

const TitleText = styled.Text( ({theme, titleColor, titleStyle}) => ({
    ...theme.font[titleStyle],
    color : theme.colors[titleColor],
    marginBottom: 10,
}));

const ValueText = styled.Text( ({theme, valueStyle, valueColor}) => ({
    ...theme.font[valueStyle],
    color : theme.colors[valueColor]
}));


function Record({
    recordTitle = "", 
    recordValue = '--', 
    titleStyle = "--text-sm-regular",
    valueStyle = "--text-base-regular",
    titleColor = '--color-gray-600', 
    valueColor = '--color-gray-900',
    flex = 1
}){
    const theme = useTheme();

    

    return ( 
        <RecordWrapper flex = {flex} theme = {theme}>
            <RecordContainer>
                <TitleText theme = {theme} titleColor = {titleColor} titleStyle = {titleStyle}>{recordTitle}</TitleText>
                <ValueText theme = {theme} valueColor = {valueColor} valueStyle = {valueStyle}>{recordValue || "--"}</ValueText>
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