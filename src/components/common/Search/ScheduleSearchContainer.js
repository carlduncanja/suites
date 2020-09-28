import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from "lodash";
import { searchSchedule } from "../../../api/network";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import SearchBar from "./SearchBar";
import { formatDate } from "../../../utils/formatter";

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import ShadowContainerComponent from '../ShadowContainerComponent';

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
function ScheduleSearchContainer({ isOpen, onSearchResultSelected, onSearchClose }) {

    const matchesFound = [
        "Coronary Bypass Graft",
        "Cardioplastic Surgery",
        "Colon Screening",
        new Date(2020, 2, 11, 9),
        "Restock Cotton Swabs",
        "MRI Machine #3",
        "Restock Surgical Masks",
        new Date(2020, 2, 20, 9),
        new Date(2020, 3, 8, 10),
        "Restock Gauze"
    ];

    const theme = useTheme();

    //#######  States
    const [currentSearchPosition, setCurrentSearchPosition] = useState(0);
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState({});
    const [searchResults, setSearchResult] = useState([]);


    //#######  Functions

    /**
     * This is called every time there
     * is a change to search input
     *
     * https://medium.com/@mikjailsalazar/just-another-searchbar-react-axios-lodash-340efec6933d
     */


    const searchChangeText = (textInput) => {
        setSearchInput(textInput);

        if (!searchInput) {
            setSearchResult([]);
            // TODO cancel all request
            return;
        }

        const search = _.debounce(sendQuery, 300);

        // saving function
        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search(textInput);
    };

    /**
     * In charge to send the value
     * to the API.
     * @param {*} value
     *
     */
    const sendQuery = async value => {
        const results = await searchSchedule(value);

        // TODO implement and handle api call cancellation logic

        setSearchResult(results)
    };

    const pressNextSearchResult = () => {
        currentSearchPosition < matchesFound &&
            setCurrentSearchPosition(currentSearchPosition + 1)
    };

    const pressPreviousSearchResult = () => {
        currentSearchPosition > 0 &&
            setCurrentSearchPosition(currentSearchPosition - 1)
    };

    const pressNewSearch = () => {
        setSearchInput("");
        // dispatch({
        //     type: 'SETNEWSEARCH',
        //     newState: {
        //         searchValue: "",
        //         searchMatchesFound: []
        //     }
        // })
    };

    const pressSubmit = () => {
        // dispatch({
        //     type: 'GETSEARCHRESULT',
        //     newState: searchInput
        // })
        onSearchClose();
    };

    const handleOnSearchResultSelected = (selectedIndex) => {
        const selectedAppointment = searchResults[selectedIndex];
        onSearchResultSelected(selectedAppointment);
    };

    const handleOnSearchClose = () => {
        onSearchClose();

        // reset states
        setSearchInput("");
        setSearchResult([])
        // TODO cancel any ongoing search request
        // TODO animate closing

    };

    const formatResult = (result) => {
        return result.map(item => {
            const title = item.title;
            const date = formatDate(item.startTime, "MMM D")
            const startTime = formatDate(item.startTime, "h : mm a")
            const endTime = formatDate(item.endTime, "h : mm a")

            return `${title}\t\t ${date}\t (${startTime} - ${endTime})`
        });
    };

    // STYLED COMPONENTS



    return (
        isOpen ? 
            <ScheduleSearchWrapper>
                <SearchContainer>
                    {/* Background Shadow View*/}
                    <ShadowContainerComponent isOpen={isOpen} />
                    {/* <View style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                    }}> */}
                    <SearchBar
                        closeSearch={handleOnSearchClose}
                        changeText={searchChangeText}
                        inputText={searchInput}
                        matchesFound={formatResult(searchResults)}
                        onPressNextResult={pressNextSearchResult}
                        onPressPreviousResult={pressPreviousSearchResult}
                        onPressNewSerch={pressNewSearch}
                        onPressSubmit={pressSubmit}
                        onResultSelected={handleOnSearchResultSelected}
                    />
                    {/* </View> */}
                </SearchContainer>
            </ScheduleSearchWrapper>

            :
            <View />
    );
}

ScheduleSearchContainer.propTypes = {};
ScheduleSearchContainer.defaultProps = {};

export default ScheduleSearchContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA'
    },
    searchContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 5,
    },

    // Shadow
    shadowContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
    },

    searchContent: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 15,
    },
    buttonContainer: {
        height: 24,
        width: 91,
        borderColor: '#CCD6E0',
        borderRadius: 4,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FFFFFF"
    }
});
