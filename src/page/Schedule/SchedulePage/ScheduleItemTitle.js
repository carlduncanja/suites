import React, {Component} from 'react'
import {Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';

function ScheduleItemTitle({onScheduleClick, startTime, endTime, title}){
    
    const theme = useTheme();

    
    return (
        <ScheduleItemTitleWrapper onPress={onScheduleClick}>
            <ScheduleItemTitleContainer>
                <Title>{title}</Title>
                <Time>{startTime} - {endTime}</Time>
            </ScheduleItemTitleContainer>
        </ScheduleItemTitleWrapper>
    )
}

const ScheduleItemTitleWrapper = styled.View`
  flex: 1;
  padding-left: ${({theme}) => theme.space['--space-8']};
`;
const ScheduleItemTitleContainer = styled.View`
  display: flex;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.Text(({theme}) => ({
    ...theme.font['--text-base-regular'],
    color: theme.colors['--color-gray-800']
}));
const Time = styled.Text(({theme}) => ({
    ...theme.font['--text-xs-medium'],
    color: theme.colors['--color-gray-600']
}))

export default ScheduleItemTitle
