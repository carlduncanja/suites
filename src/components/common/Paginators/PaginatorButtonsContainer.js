import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import PaginatorNumberButton from "./NumberButton";
import Ellipsis from "../../../../assets/svg/ellipsis.svg";

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
    const maxButtonsPreEllipsis = 6;

    const numButtonsPreEllipsis =
        totalPages > maxButtonsPreEllipsis ? maxButtonsPreEllipsis : totalPages;

    const isEllipsisVisible =
        totalPages > maxButtonsPreEllipsis + 1 && currentPage < totalPages - 1;
    const isFinalButtonVisible =
        isEllipsisVisible || currentPage <= totalPages - 1;
    const preEllipsisButtonsReference = new Array(numButtonsPreEllipsis).fill(
        null
    );

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
        },
        ellipsis: {
            justifyContent: "center",
            marginHorizontal: 6,
        },
    });

    const getPageNumber = (index) => {
        if (currentPage <= maxButtonsPreEllipsis) {
            return index + 1;
        } else {
            const overflow = currentPage - maxButtonsPreEllipsis;
            return index + 1 + overflow;
        }
    };

    const isSelected = (index) => {
        if (currentPage <= maxButtonsPreEllipsis) {
            return currentPage === index + 1;
        } else {
            const overflow = currentPage - maxButtonsPreEllipsis;
            return currentPage === index + 1 + overflow;
        }
    };

    return (
        <View style={styles.container}>
            {preEllipsisButtonsReference.map((_, index) => (
                <Pressable
                    onPress={() => onPressPageNumber(getPageNumber(index))}
                >
                    <PaginatorNumberButton
                        number={getPageNumber(index)}
                        isSelected={isSelected(index)}
                    />
                </Pressable>
            ))}
            {isEllipsisVisible && (
                <View style={styles.ellipsis}>
                    <Ellipsis fill="#313539" height={13} width={16} />
                </View>
            )}
            {isFinalButtonVisible && (
                <Pressable onPress={() => onPressPageNumber(totalPages)}>
                    <PaginatorNumberButton
                        number={totalPages}
                        isSelected={currentPage === totalPages}
                    />
                </Pressable>
            )}
        </View>
    );
}

export default PaginatorNumbersContainer;
