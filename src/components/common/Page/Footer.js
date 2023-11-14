import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RoundedPaginator from "../Paginators/RoundedPaginator";
import FloatingActionButton from "../FloatingAction/FloatingActionButton";
import DisabledFloatingButton from "../../../../assets/svg/disabledFloatingButton";
import styled, { css } from "@emotion/native";
import { useTheme } from "emotion-theming";

const FooterWrapper = styled.View`
    width: 100%;
    position: absolute;
    bottom: 20;
    right: 20;
`;
const FooterContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-self: flex-end;
`;

/**
 * @typedef {Object} FooterProps
 * @property {number} currentPage
 * @property {VoidCallback} goToNextPage
 * @property {VoidCallback} goToPreviousPage
 * @property {boolean} hasActionButton
 * @property {boolean} hasActions
 * @property {boolean} hasPaginator
 * @property {boolean} isDisabled
 * @property {boolean} isNextDisabled
 * @property {boolean} isPreviousDisabled
 * @property {VoidCallback} toggleActionButtonß
 * @property {number} totalPages
 */

/**
 *
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
}) {
    const theme = useTheme();

    return (
        <FooterWrapper>
            <FooterContainer>
                {hasPaginator && (
                    <RoundedPaginator
                        totalPages={totalPages}
                        currentPage={currentPage}
                        goToNextPage={goToNextPage}
                        goToPreviousPage={goToPreviousPage}
                        isNextDisabled={isNextDisabled}
                        isPreviousDisabled={isPreviousDisabled}
                    />
                )}
                {hasActionButton && (
                    <FloatingActionButton
                        isDisabled={isDisabled}
                        toggleActionButton={toggleActionButton}
                        hasActions={hasActions}
                    />
                )}
                {!hasActionButton ? <DisabledFloatingButton /> : <View />}
            </FooterContainer>
        </FooterWrapper>
    );
}

export default Footer;

const styles = StyleSheet.create({
    footer: {
        flex: 1,
        alignSelf: "flex-end",
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        marginBottom: 20,
        right: 0,
        marginRight: 30,
    },
});
