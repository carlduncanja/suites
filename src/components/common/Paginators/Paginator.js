import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "emotion-theming";
import RightArrow from "../../../../assets/svg/paginationRight";
import LeftArrow from "../../../../assets/svg/paginationLeft";
import IconButton from "../Buttons/IconButton";
import PaginatorNumbersContainer from "./PaginatorButtonsContainer";
import { View } from "react-native";

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

    const styles = StyleSheet.create({
        container: {
            height: "100%",
            flexDirection: "row",
            justifyContent: "center",
        },
    });

    const leftArrowColor = isLeftArrowDisabled
        ? theme.colors["--color-gray-400"]
        : theme.colors["--company"];

    const rightArrowColor = isRightArrowDisabled
        ? theme.colors["--color-gray-400"]
        : theme.colors["--company"];

    return (
        <View style={styles.container}>
            <View>
                <IconButton
                    Icon={<LeftArrow strokeColor={leftArrowColor} />}
                    onPress={onPressLeftArrow}
                    disabled={isLeftArrowDisabled}
                />
            </View>

            <PaginatorNumbersContainer
                currentPage={currentPage}
                totalPages={totalPages}
                hasNumberBorder={hasNumberBorder}
            />

            <View>
                <IconButton
                    Icon={<RightArrow strokeColor={rightArrowColor} />}
                    onPress={onPressRightArrow}
                    disabled={isRightArrowDisabled}
                />
            </View>
        </View>
    );
}

export default Paginator;
