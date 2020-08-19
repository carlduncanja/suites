import React,{Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
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

const ValueContainer = styled.View`
    flex-direction : row;  
`;

const TitleText = styled.Text( ({theme, titleColor, titleStyle}) => ({
    ...theme.font[titleStyle],
    color : theme.colors[titleColor],
    marginBottom: 10,
}));

const ValueText = styled.Text( ({theme, valueStyle, valueColor}) => ({
    ...theme.font[valueStyle],
    color : theme.colors[valueColor],
}));


function ListTextRecord({
    recordTitle = "", 
    titleStyle = "--text-sm-regular",
    valueStyle = "--text-base-regular",
    values = [],
    titleColor = '--color-gray-600', 
    valueColor = '--color-gray-900',
    flex = 1
}){
    const theme = useTheme();

    return ( 
        <RecordWrapper flex = {flex} theme = {theme}>
            <RecordContainer>
                <TitleText theme = {theme} titleColor = {titleColor} titleStyle = {titleStyle}>{recordTitle}</TitleText>
                {
                    values.length === 0 && <ValueText theme = {theme} valueColor = {valueColor} valueStyle = {valueStyle}>--</ValueText>
                }
                <ValueContainer>
                    {
                        values.map( (value,index) => {
                            return index === values.length-1 ? 
                                <ValueText key = {index} theme = {theme} valueColor = {valueColor} valueStyle = {valueStyle}>{value}</ValueText>
                                :
                                <ValueText key = {index} theme = {theme} valueColor = {valueColor} valueStyle = {valueStyle}>{value}, </ValueText>
                            
                        })
                    }
                </ValueContainer>
                
                
            </RecordContainer>
        </RecordWrapper>
    )
}

export default ListTextRecord 

const styles = StyleSheet.create({
    container:{
        flexDirection:'column'
    },
    recordTitle:{
        paddingBottom:4,
    },
    
})