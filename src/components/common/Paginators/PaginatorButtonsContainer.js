import React from "react";
import { StyleSheet, View } from "react-native";
import PaginatorNumberButton from "./NumberButton";

/**
 * @typedef {Object} PaginatorNumbersProps
 * @property {number} currentPage
 * @property {number} totalPages
 * @property {boolean} hasNumberBorder
 */

/**
 * @param {PaginatorNumbersProps} props
 * @returns {JSX.Element}
 */

function PaginatorNumbersContainer({ currentPage = 0, totalPages = 0 }) {
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
                <PaginatorNumberButton
                    number={index + 1}
                    isSelected={currentPage === index + 1}
                />
            ))}
        </View>
    );
}

export default PaginatorNumbersContainer;
