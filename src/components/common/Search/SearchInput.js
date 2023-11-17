import React from "react";
import MultipleShadowsContainer from "../MultipleShadowContainer";

import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import SearchBox from "./SearchBox";
import SearchControls from "./SearchControls";
import SearchComplete from "./SearchComplete";

/**
 *
 * @param changeText
 * @param inputText
 * @param matchesFound
 * @param onPressNextResult
 * @param onPressPreviousResult
 * @param onPressNewSerch
 * @param onPressSubmit
 * @returns {*}
 * @constructor
 */
const SearchInputWrapper = styled.View`
    margin: 0;
    height: 75px;
    padding: ${({ theme }) => theme.space["--space-14"]};
    background-color: ${({ theme }) =>
        theme.colors["--color-neutral-gray-200"]};
`;
const SearchInputContainer = styled.View`
    height: 100%;
    width: 100%;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06); */
`;

const shadows = [
    {
        shadowColor: "black",
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
    },
    {
        shadowColor: "black",
        shadowOffset: { width: 4, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
];

function SearchInput({
    changeText,
    inputText,
    matchesFound,
    onPressNextResult,
    onPressPreviousResult,
    onPressNewSerch,
    onPressSubmit,
}) {
    const theme = useTheme();

    return (
        <MultipleShadowsContainer shadows={shadows}>
            <SearchInputWrapper theme={theme}>
                <SearchInputContainer>
                    <SearchBox
                        onChangeText={changeText}
                        inputText={inputText}
                        matchesFound={matchesFound}
                        onPressNewSerch={onPressNewSerch}
                    />

                    <SearchControls
                        onPressNextResult={onPressNextResult}
                        onPressPreviousResult={onPressPreviousResult}
                    />

                    <SearchComplete onSubmit={onPressSubmit} />
                </SearchInputContainer>
            </SearchInputWrapper>
        </MultipleShadowsContainer>
    );
}
export default SearchInput;
