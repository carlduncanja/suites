import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import PaginatorNumberButton from "./NumberButton";

/**
 * @callback onPressPageNumber
 * @param {number} pageNumber
 * @returns {void}
 */

/**
 * @typedef {Object} PaginatorNumbersProps
 * @property {number} currentPage
 * @property {number} totalPages
 * @property {boolean} hasNumberBorder
 * @property {onPressPageNumber} onPressPageNumber
 */

/**
 * @param {PaginatorNumbersProps} props
 * @returns {JSX.Element}
 */

function PaginatorNumbersContainer({
    currentPage = 0,
    totalPages = 0,
    onPressPageNumber,
}) {
    const maxNumButtonsBeforeEllipses = 4;

    const numButtonsToRenderBeforeEllipses =
        totalPages > maxNumButtonsBeforeEllipses
            ? maxNumButtonsBeforeEllipses
            : totalPages;

    const areEllipsesVisible = totalPages > maxNumButtonsBeforeEllipses + 1;
    const reference = new Array(numButtonsToRenderBeforeEllipses).fill(null);

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
        },
    });

    return (
        <View style={styles.container}>
            {reference.map((_, index) => (
                <Pressable onPress={() => onPressPageNumber(index + 1)}>
                    <PaginatorNumberButton
                        number={index + 1}
                        isSelected={currentPage === index + 1}
                    />
                </Pressable>
            ))}
        </View>
    );
}

export default PaginatorNumbersContainer;
