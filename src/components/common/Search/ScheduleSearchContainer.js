import React, { useState, useRef } from "react";
import _ from "lodash";
import { searchSchedule } from "../../../api/network";
import { View } from "react-native";
import SearchBar from "./SearchBar";
import { formatDate } from "../../../utils/formatter";
import * as Animatable from "react-native-animatable";

import styled from "@emotion/native";
import ShadowContainerComponent from "../ShadowContainerComponent";

/**
 * Handling searching logic and ui for appointments
 *
 * TODO add animation on search open and close
 *
 * @param {boolean} isOpen
 * @param {function} onSearchResultSelected
 * @param {function} onSearchClose
 * @returns {*}
 * @constructor
 */

const ScheduleSearchWrapper = styled.View`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
`;

const SearchContainer = styled.View`
    display: flex;
    width: 100%;
    height: 100%;
`;

function ScheduleSearchContainer({
    isOpen,
    onSearchResultSelected,
    onSearchClose,
}) {
    const matchesFound = [];

    const animateViewRef = useRef();

    const [currentSearchPosition, setCurrentSearchPosition] = useState(0);
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResult] = useState([]);

    const [showSearchBar, setSearchBarShowing] = useState(true);

    const searchChangeText = (textInput) => {
        setSearchInput(textInput);

        if (!searchInput) {
            setSearchResult([]);
            return;
        }

        const search = _.debounce(sendQuery, 300);

        search(textInput);
    };

    /**
     * In charge to send the value
     * to the API.
     * @param {*} value
     *
     */
    const sendQuery = async (value) => {
        const results = await searchSchedule(value);
        setSearchResult(results);
    };

    const pressNextSearchResult = () => {
        currentSearchPosition < matchesFound &&
            setCurrentSearchPosition(currentSearchPosition + 1);
    };

    const pressPreviousSearchResult = () => {
        currentSearchPosition > 0 &&
            setCurrentSearchPosition(currentSearchPosition - 1);
    };

    const pressNewSearch = () => {
        setSearchInput("");
    };

    const handleOnSearchResultSelected = (selectedIndex) => {
        const selectedAppointment = searchResults[selectedIndex];
        onSearchResultSelected(selectedAppointment);

        handleOnSearchClose();
    };

    const handleOnSearchClose = () => {
        setSearchBarShowing(false);
    };

    const formatResult = (result) => {
        return result.map((item) => {
            const title = item.title;
            const date = formatDate(item.startTime, "MMM D");
            const startTime = formatDate(item.startTime, "h : mm a");
            const endTime = formatDate(item.endTime, "h : mm a");

            return {
                title,
                date,
                startTime,
                endTime,
            };
        });
    };

    const handleAnimationEnd = () => {
        if (!showSearchBar) closeSearchComponent();
    };

    const closeSearchComponent = () => {
        onSearchClose();
        setSearchInput("");
        setSearchResult([]);
    };

    return isOpen ? (
        <ScheduleSearchWrapper>
            <SearchContainer>
                <ShadowContainerComponent isOpen={showSearchBar} />

                <Animatable.View
                    ref={animateViewRef}
                    style={{ marginBottom: 10 }}
                    pointerEvents="auto"
                    onAnimationEnd={(endState) =>
                        handleAnimationEnd(showSearchBar, endState)
                    }
                    animation={showSearchBar ? "slideInDown" : "slideOutUp"}
                    duration={400}
                >
                    <SearchBar
                        closeSearch={handleOnSearchClose}
                        changeText={searchChangeText}
                        inputText={searchInput}
                        matchesFound={formatResult(searchResults)}
                        onPressNextResult={pressNextSearchResult}
                        onPressPreviousResult={pressPreviousSearchResult}
                        onPressNewSerch={pressNewSearch}
                        onPressSubmit={handleOnSearchClose}
                        onResultSelected={handleOnSearchResultSelected}
                    />
                </Animatable.View>
            </SearchContainer>
        </ScheduleSearchWrapper>
    ) : (
        <View />
    );
}

export default ScheduleSearchContainer;
