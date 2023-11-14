import React from "react";
import { StyleSheet } from "react-native";
import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import RightArrow from "../../../../assets/svg/paginationRight";
import LeftArrow from "../../../../assets/svg/paginationLeft";
import IconButton from "../Buttons/IconButton";
import PaginatorNumbers from "./PaginatorNumbers";

const PaginatorWrapper = styled.View`
    height: 100%;
    width: 100%;
`;
const PaginatorContainer = styled.View`
    height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

/**
 * @typedef {Object} PaginatorAndFooterProps
 * @property {number} currentPage
 * @property {VoidCallback} goToNextPage
 * @property {VoidCallback} goToPreviousPage
 * @property {boolean} isNextDisabled
 * @property {boolean} isPreviousDisabled
 * @property {number} totalPages
 */

/**
 * @typedef {Object} PaginatorProps
 * @extends PaginatorAndFooterProps
 * @property {boolean} hasNumberBorder
 * */

/**
 *
 * @param {PaginatorProps} props
 * @returns {JSX.Element}
 */
function Paginator({
    currentPage = 0,
    goToNextPage: onPressRightArrow = () => {},
    goToPreviousPage: onPressLeftArrow = () => {},
    hasNumberBorder = true,
    isNextDisabled: isRightArrowDisabled = false,
    isPreviousDisabled: isLeftArrowDisabled = false,
    totalPages = 0,
}) {
    const theme = useTheme();

    const leftArrowColor = isLeftArrowDisabled
        ? theme.colors["--color-gray-400"]
        : theme.colors["--company"];

    const rightArrowColor = isRightArrowDisabled
        ? theme.colors["--color-gray-400"]
        : theme.colors["--company"];

    return (
        <PaginatorWrapper>
            <PaginatorContainer>
                <IconButton
                    Icon={<LeftArrow strokeColor={leftArrowColor} />}
                    onPress={onPressLeftArrow}
                    disabled={isLeftArrowDisabled}
                />

                <PaginatorNumbers
                    currentPage={currentPage}
                    totalPages={totalPages}
                    hasNumberBorder={hasNumberBorder}
                />

                <IconButton
                    Icon={<RightArrow strokeColor={rightArrowColor} />}
                    onPress={onPressRightArrow}
                    disabled={isRightArrowDisabled}
                />
            </PaginatorContainer>
        </PaginatorWrapper>
    );
}

export default Paginator;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "yellow",
    },
    numbersContainer: {
        backgroundColor: "#FAFAFA",
        borderWidth: 1,
        borderColor: "#CCD6E0",
        borderRadius: 4,
        paddingLeft: 7,
        paddingRight: 7,
        paddingBottom: 2,
        paddingTop: 2,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: "row",
    },
    numbers: {
        fontSize: 14,
        color: "#313539",
    },
});
