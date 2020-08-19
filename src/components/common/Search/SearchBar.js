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
    const [resultsOpen, setResultsOpen] = useState(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState("");
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

    const SearchBarWrapper = styled.TouchableOpacity`
        height: 100%;
        width: 100%;
    `;
    const SearchBarContainer = styled.View`
        display: flex;
        height: 100%;
        width: 100%;
    `
    return (

        <SearchBarWrapper activeOpacity={1} onPress={() => searchClosed()}>
            <SearchBarContainer>

                <SearchInput
                    changeText={changeText}
                    inputText={inputText}
                    matchesFound={matchesFound.length}
                    onPressNextResult={onPressNextResult}
                    onPressPreviousResult={onPressPreviousResult}
                    onPressNewSerch={onPressNewSearch}
                    onPressSubmit={onPressSubmit}
                />

                <TouchableOpacity style={{ width: 35, height: 30 }}>
                    <Text>Filter</Text>
                </TouchableOpacity>

                {/* Search Results Drop down */}

                <SuggestionsComponent
                    isSuggestionsOpen={suggestionsOpen}
                    matchesToDisplay={matchesToDisplay}
                    openSearchResult={openSearchResult}
                    currentListMin={currentListMin}
                    getPreviousResults={getPreviousResults}
                    getNextResults={getNextResults}
                />
                {/* {
                    suggestionsOpen &&
                    <View style={styles.matchesFoundContainer}>
                        {
                            matchesFound.slice(currentListMin, currentListMax)
                                .map((suggestion, index) => {
                                    return (
                                        <TouchableOpacity
                                            style={styles.matchContainer}
                                            key={index}
                                            onPress={() => openSearchResult(suggestion, index)}
                                        >
                                            <Text style={styles.matchText}>
                                                {(suggestion) instanceof Date ?
                                                    formatDate(suggestion,"MMMM D, YYYY")
                                                    :
                                                    suggestion
                                                }
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                        }

                        <View style={styles.buttons}>
                            {
                                currentListMin > 0 &&
                                <View style={[styles.buttonContainer, {marginRight: 10}]}>
                                    <Button
                                        title="Go Back"
                                        buttonPress={getPreviousResults}
                                        color="#0CB0E7"
                                    />
                                </View>
                            }
                            <View style={styles.buttonContainer}>
                                <Button
                                    title="More Results"
                                    buttonPress={getNextResults}
                                    color="#0CB0E7"
                                />
                            </View>
                        </View>

                    </View>
                } */}
            </SearchBarContainer>


            {/*<BottomSheet*/}
            {/*    ref={searchBottomSheetRef}*/}
            {/*    snapPoints={getSnapPoints()}*/}
            {/*    initialSnap={2}*/}
            {/*    callbackNode={fall}*/}
            {/*    borderRadius={14}*/}
            {/*    renderContent={renderSearchContent()}*/}
            {/*    onCloseEnd={() => setResultsOpen(false)}*/}
            {/*    onOpenEnd={() => setResultsOpen(true)}*/}
            {/*    renderHeader={() =>*/}
            {/*        <View*/}
            {/*            style={{*/}
            {/*                height: 8,*/}
            {/*                alignSelf: 'center',*/}
            {/*                width: 50,*/}
            {/*                backgroundColor: 'white',*/}
            {/*                borderRadius: 4,*/}
            {/*                marginBottom: 14*/}
            {/*            }}*/}
            {/*        />*/}
            {/*    }*/}
            {/*/>*/}
        </SearchBarWrapper>
        // </SearchBarWrapper>
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
