import React, {Component, useState, useEffect, useRef, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Animated, SectionList} from 'react-native';
import SearchInput from './SearchInput'
import {scheduleActions} from '../../../redux/reducers/scheduleReducer';
import {ScheduleContext} from '../../../contexts/ScheduleContext';
import BottomSheet from 'reanimated-bottom-sheet'
import Button from '../Buttons/Button';
import moment from 'moment'; 
import ScheduleItem from '../../Schedule/ScheduleItem';
import { formatDate } from '../../../utils/formatter';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import Suggestion from './Suggestion';
import SuggestionsMatchesComponent from './SuggestionsMatchesComponent';

function SuggestionsControllerComponent({
        currentListMin = 0,
        getPreviousResults = ()=>{},
        getNextResults = ()=>{}
    }){
    

    const theme = useTheme();
    // STYLED COMPONENTS

    const SuggestionsControllerWrapper = styled.View`
        width: 100%;
        flex:1;
        margin: 0;
        align-items: center;
    `;
    const SuggestionsControllerContainer = styled.View`
        display: flex;
        width: 50%;
        height:100%;
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-evenly;
    `;

    const ButtonContainer = styled.View`
        height: 28px;
        width: 98px;
        border-color: ${theme.colors['--color-gray-300']};
        border-radius: 4px;
        border-width: 1px;
        align-items: center;
        justify-content: center;
    `
    return (
        
        <SuggestionsControllerWrapper>
            <SuggestionsControllerContainer>

                <ButtonContainer>
                    <Button
                        title="Go Back"
                        buttonPress={getPreviousResults}
                        color={theme.colors['--accent-button']}
                    />
                </ButtonContainer>
                <ButtonContainer>
                    <Button
                        title="More Results"
                        buttonPress={getNextResults}
                        color={theme.colors['--accent-button']}
                    />
                </ButtonContainer>
            
            </SuggestionsControllerContainer>
        </SuggestionsControllerWrapper>

    )
};
export default SuggestionsControllerComponent

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
