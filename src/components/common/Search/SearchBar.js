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
import SuggestionsComponent from './SuggestionsComponent';

const SearchBarWrapper = styled.TouchableOpacity`
    height: 100%;
    width: 100%;
`;
const SearchBarContainer = styled.View`
    display: flex;
    height: 100%;
    width: 100%;
`;

function SearchBar(props) {
    const {
        changeText,
        closeSearch,

        inputText,
        matchesFound,
        onPressNextResult,
        onPressPreviousResult,
        onPressNewSearch,
        onPressSubmit,

        onResultSelected,
    } = props;

    const resultsSeen = 5;
    const theme = useTheme();
    const matchesFoundLength = matchesFound.length;

    const [suggestionsOpen, setSuggestionsOpen] = useState(false);
    const [currentListMin, setCurrentListMin] = useState(0);
    const [currentListMax, setCurrentListMax] = useState(5);

    useEffect(() => {
        if (matchesFound.length > 0) setSuggestionsOpen(true)
    }, [matchesFoundLength]);

    const openSearchResult = (suggestion, selectedIndex) => {
        console.log("selected search result");
        onResultSelected(selectedIndex)
    };

    const searchClosed = () => {
        // searchBottomSheetRef.current.snapTo(2);
        setTimeout(() => {
            closeSearch(false)
        }, 400)
    };

    const getNextResults = () => {
        if (matchesFoundLength > currentListMax) {
            setCurrentListMin(currentListMin + resultsSeen)
            setCurrentListMax(currentListMax + resultsSeen)
        }
    };

    const getPreviousResults = () => {
        if (currentListMin > 0) {
            setCurrentListMin(currentListMin - resultsSeen);
            setCurrentListMax(currentListMax - resultsSeen)
        }
    };

    let matchesToDisplay = [...matchesFound]
    matchesToDisplay = matchesFound.slice(currentListMin, currentListMax)
    // STYLED COMPONENTS


    return (

        <SearchBarWrapper activeOpacity={1} onPress={() => searchClosed()}>
            <SearchBarContainer>

                <SearchInput
                    changeText={changeText}
                    inputText={inputText}
                    matchesFound={matchesFound.length}
                    onPressNextResult={getNextResults}
                    onPressPreviousResult={getPreviousResults}
                    onPressNewSerch={onPressNewSearch}
                    onPressSubmit={onPressSubmit}
                />


                {/* Search Results Drop down */}

                <SuggestionsComponent
                    isSuggestionsOpen={suggestionsOpen}
                    matchesToDisplay={matchesToDisplay}
                    openSearchResult={openSearchResult}
                />

            </SearchBarContainer>
        </SearchBarWrapper>
    )
};
export default SearchBar

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
