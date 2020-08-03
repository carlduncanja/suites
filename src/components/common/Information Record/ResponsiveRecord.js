import React,{Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function ResponsiveRecord({
    recordTitle = "", 
    recordValue = '--', 
    titleStyle = "--text-sm-regular",
    valueStyle = "--text-base-medium",
    valueFontSize = 16, 
    titleFontSize = 14, 
    titleColor = '--color-gray-600', 
    valueColor = '--color-blue-600',
    handleRecordPress = ()=>{},
    index
}){

    const theme = useTheme();

    const RecordWrapper = styled.TouchableOpacity`
        flex:1;
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
        <RecordWrapper onPress={()=>handleRecordPress()}>
            <RecordContainer>
                <TitleText>{recordTitle}</TitleText>
                <ValueText>{recordValue === "" ? "--" : recordValue}</ValueText>
            </RecordContainer>
        </RecordWrapper>
    )
}

export default ResponsiveRecord 

const styles = StyleSheet.create({
    container:{
        flexDirection:'column'
    },
    recordTitle:{
        paddingBottom:4,
    },
    
})