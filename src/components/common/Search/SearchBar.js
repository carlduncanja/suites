import React, { useState, useEffect } from "react";
import SearchInput from "./SearchInput";

import styled from "@emotion/native";
import SuggestionsComponent from "./SuggestionsComponent";

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
        onPressNewSearch,
        onPressSubmit,
        onResultSelected,
    } = props;

    const resultsSeen = 5;
    const matchesFoundLength = matchesFound.length;

    const [suggestionsOpen, setSuggestionsOpen] = useState(false);
    const [currentListMin, setCurrentListMin] = useState(0);
    const [currentListMax, setCurrentListMax] = useState(5);

    useEffect(() => {
        if (matchesFound.length > 0) setSuggestionsOpen(true);
    }, [matchesFoundLength]);

    const handleOnResultPress = (selectedIndex) => {
        onResultSelected(selectedIndex);
    };

    const searchClosed = () => {
        setTimeout(() => {
            closeSearch(false);
        }, 400);
    };

    const getNextResults = () => {
        if (matchesFoundLength > currentListMax) {
            setCurrentListMin(currentListMin + resultsSeen);
            setCurrentListMax(currentListMax + resultsSeen);
        }
    };

    const getPreviousResults = () => {
        if (currentListMin > 0) {
            setCurrentListMin(currentListMin - resultsSeen);
            setCurrentListMax(currentListMax - resultsSeen);
        }
    };

    const matchesToDisplay = matchesFound.slice(currentListMin, currentListMax);

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

                <SuggestionsComponent
                    isSuggestionsOpen={suggestionsOpen}
                    matchesToDisplay={matchesToDisplay}
                    onSuggestionSelected={handleOnResultPress}
                />
            </SearchBarContainer>
        </SearchBarWrapper>
    );
}
export default SearchBar;
