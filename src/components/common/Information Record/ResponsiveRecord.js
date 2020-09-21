import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';

const RecordWrapper = styled.TouchableOpacity`
        flex:1;
        margin-right: ${({theme}) => theme.space['--space-4']};
    `;
const RecordContainer = styled.View`
        display: flex;
        flex-direction:column;
    `;

const TitleText = styled.Text( ({theme, titleStyle, titleColor}) => ({
    ...theme.font[titleStyle],
    color : theme.colors[titleColor],
    marginBottom: 10,
}));

const ValueText = styled.Text( ({theme, valueStyle, valueColor}) => ({
    ...theme.font[valueStyle],
    color : theme.colors[valueColor]
}))

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
    disabled= false,
    index
}) {
    const theme = useTheme();

    return (
        <RecordWrapper theme={theme} disabled={disabled} onPress={()=>handleRecordPress()}>
            <RecordContainer>
                <TitleText theme={theme} titleStyle={titleStyle}  titleColor={titleColor}>{recordTitle}</TitleText>
                <ValueText theme={theme} valueStyle={valueStyle} valueColor={valueColor}>{recordValue === "" ? "--" : recordValue}</ValueText>
            </RecordContainer>
        </RecordWrapper>
    );
}

export default ResponsiveRecord;

const styles = StyleSheet.create({
    container: {flexDirection: 'column'},
    recordTitle: {paddingBottom: 4},
});
