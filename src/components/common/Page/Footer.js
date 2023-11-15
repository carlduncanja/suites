import React from "react";
import { View, StyleSheet } from "react-native";
import RoundedPaginator from "../Paginators/RoundedPaginator";
import FloatingActionButton from "../FloatingAction/FloatingActionButton";
import DisabledFloatingButton from "../../../../assets/svg/disabledFloatingButton";

/**
 * @typedef {Object} FooterProps
 * @extends import("../Paginators/Paginator").PaginatorAndFooterProps
 * @property {boolean} hasActionButton
 * @property {boolean} hasActions
 * @property {boolean} hasPaginator
 * @property {boolean} isDisabled
 * @property {VoidCallback} toggleActionButton
 * @property {onPressPageNumber} onPressPageNumber
 */

/**
 * @param {FooterProps} props
 * @returns {JSX.Element}
 */
function Footer({
    totalPages = 0,
    currentPage = 0,
    goToNextPage = () => {},
    goToPreviousPage = () => {},
    toggleActionButton = () => {},
    isDisabled = false,
    hasPaginator = true,
    hasActionButton = true,
    hasActions = true,
    isNextDisabled = false,
    isPreviousDisabled = false,
    onPressPageNumber,
}) {
    const styles = StyleSheet.create({
        container: {
            width: "100%",
            position: "absolute",
            alignItems: "center",
            bottom: 20,
            justifyContent: "center",
        },
        fab: {
            position: "absolute",
            right: 32,
            justifyContent: "center",
        },
    });

    return (
        <View style={styles.container}>
            {hasPaginator && (
                <RoundedPaginator
                    totalPages={totalPages}
                    currentPage={currentPage}
                    goToNextPage={goToNextPage}
                    goToPreviousPage={goToPreviousPage}
                    isNextDisabled={isNextDisabled}
                    isPreviousDisabled={isPreviousDisabled}
                    onPressPageNumber={onPressPageNumber}
                />
            )}
            {hasActionButton && (
                <View style={styles.fab}>
                    <FloatingActionButton
                        isDisabled={isDisabled}
                        toggleActionButton={toggleActionButton}
                        hasActions={hasActions}
                    />
                </View>
            )}
            {!hasActionButton ? <DisabledFloatingButton /> : <View />}
        </View>
    );
}

export default Footer;
