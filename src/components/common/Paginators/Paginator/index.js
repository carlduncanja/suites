import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "emotion-theming";
import RightArrow from "../../../../../assets/svg/paginationRight";
import LeftArrow from "../../../../../assets/svg/paginationLeft";
import IconButton from "../../Buttons/IconButton";
import PaginatorButtonsContainer from "../PaginatorButtonsContainer";

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
 * @property {onPressPageNumber} onPressPageNumber
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
    isNextDisabled: isRightArrowDisabled = true,
    isPreviousDisabled: isLeftArrowDisabled = true,
    onPressPageNumber,
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
                    disabled={isLeftArrowDisabled}
                    Icon={<LeftArrow strokeColor={leftArrowColor} />}
                    onPress={onPressLeftArrow}
                    testID="pag-left-arrow"
                />
            </View>

            <PaginatorButtonsContainer
                currentPage={currentPage}
                totalPages={totalPages}
                onPressPageNumber={onPressPageNumber}
            />

            <View>
                <IconButton
                    disabled={isRightArrowDisabled}
                    Icon={<RightArrow strokeColor={rightArrowColor} />}
                    onPress={onPressRightArrow}
                    testID="pag-right-arrow"
                />
            </View>
        </View>
    );
}

export default Paginator;
