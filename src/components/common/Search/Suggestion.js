import React, { Component, useState, useEffect, useRef, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated, SectionList } from 'react-native';
import SearchInput from './SearchInput'
import { scheduleActions } from '../../../redux/reducers/scheduleReducer';
import { ScheduleContext } from '../../../contexts/ScheduleContext';
import BottomSheet from 'reanimated-bottom-sheet'
import Button from '../Buttons/Button';
import moment from 'moment';
import ScheduleItem from '../../Schedule/ScheduleItem';
import { formatDate } from '../../../utils/formatter';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

const SuggestionWrapper = styled.TouchableOpacity`
    width: 100%;
    padding-bottom: ${ ({theme}) => theme.space['--space-14']};
`;

const SuggestionContainer = styled.View`
    display: flex;
    width: 100%;
    flex-direction: row;
`;

const SuggestionText = styled.Text( ({theme}) => ({
    ...theme.font['--text-base-medium'],
    color: theme.colors['--color-gray-600']
}))

function Suggestion({
    onPress = () => { },
    suggestion = {},
}) {


    const theme = useTheme();

    const { date = '', title = '', startTime = '', endTime = '' } = suggestion;

    return (
        <SuggestionWrapper onPress={onPress} theme={theme}>
            <SuggestionContainer>
                <SuggestionText theme={theme} numberOfLines={1} style={css` width: 200px;`}>
                    {title}
                    {/* {(suggestion) instanceof Date ?
                        formatDate(suggestion, "MMMM D, YYYY") : suggestion
                    } */}
                </SuggestionText>
                <SuggestionText>
                    {date} ({startTime} - {endTime})
                </SuggestionText>
            </SuggestionContainer>
        </SuggestionWrapper>
    )
};

export default Suggestion
