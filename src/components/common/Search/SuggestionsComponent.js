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
import Suggestion from './Suggestion';
import SuggestionsMatchesComponent from './SuggestionsMatchesComponent';
import SuggestionsControllerComponent from './SuggestionsControllerComponent';

const SuggestionsComponentWrapper = styled.View`
    width: 100%;
    margin: 0;
    
    padding-bottom: ${ ({theme}) => theme.space['--space-10']};
    padding-top: ${ ({theme}) => theme.space['--space-10']};
    padding-left: ${ ({theme}) => theme.space['--space-14']};
    padding-right: ${ ({theme}) => theme.space['--space-14']};
    border-bottom-left-radius: 12px; 
    border-bottom-right-radius: 12px;
    background-color: ${({ theme }) => theme.colors['--color-neutral-gray-200']};
`;

const SuggestionsComponentContainer = styled.View`
    display: flex;
    width: 100%;
`;

function SuggestionsComponent({
    isSuggestionsOpen = false,
    matchesToDisplay = [],
    currentListMin = 0,
    onSuggestionSelected = () => { },
    getPreviousResults = () => { },
    getNextResults = () => { }
}) {

    const theme = useTheme();
    // STYLED COMPONENTS

    // console.log('Matches:', matchesToDisplay);

    return (

        isSuggestionsOpen &&
        <SuggestionsComponentWrapper theme = {theme}>
            <SuggestionsComponentContainer>

                <SuggestionsMatchesComponent
                    matchesToDisplay={matchesToDisplay}
                    onSuggestionPress={onSuggestionSelected}
                />

                {/* <SuggestionsControllerComponent
                    currentListMin={currentListMin}
                    getPreviousResults={getPreviousResults}
                    getNextResults={getNextResults}
                /> */}

            </SuggestionsComponentContainer>
        </SuggestionsComponentWrapper>

    )
};
export default SuggestionsComponent

const styles = StyleSheet.create({
    matchesFoundContainer: {
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        backgroundColor: '#FAFAFA',
        paddingBottom: 15,
        height: 250
    },
    matchContainer: {
        padding: 10,
        paddingLeft: 18,
        paddingRight: 18
    },
    matchText: {
        fontSize: 16,
        color: '#4E5664'
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'flex-end'
    },
    buttonContainer: {
        height: 28,
        width: 97,
        borderColor: '#E3E8EF',
        borderRadius: 4,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionContainer: {
        paddingRight: 24,
        paddingLeft: 24,
    },
    separatorStyle: {
        borderBottomColor: '#CBD5E0',
        marginTop: 12,
        marginBottom: 12,
        borderBottomWidth: 1,
    },
    dateContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    dateLabelContainer: {
        // backgroundColor: 'rgba(247, 250, 252, 1)',
        backgroundColor: '#FFFFFF',
        borderBottomColor: '#718096',
        borderBottomWidth: 1,
        paddingBottom: 5,
        marginBottom: 10,
        paddingTop: 24,
        height: 50,
    },
    dateLabel: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#4E5664'
    },

})
