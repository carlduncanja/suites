import React from "react";
import Page from "./Page";
import Footer from "./Footer";
import styled from "@emotion/native";

const NavPageWrapper = styled.View`
    height: 100%;
    width: 100%;
`;
const NavPageContainer = styled.View`
    display: flex;
    height: 100%;
`;

/**
 * @callback VoidCallback
 * @returns {void}
 */

/**
 * @callback JSXCallback
 * @returns {JSX.Element}
 */

/**
 * @typedef {Object} NavPageProps
 * @property {boolean} isFetchingData
 * @property {JSX.Element} TopButton
 * @property {VoidCallback} onRefresh
 * @property {string} placeholderText
 * @property {VoidCallback} changeText
 * @property {string} inputText
 * @property {string} routeName
 * @property {Array} listData
 * @property {Array} listHeaders
 * @property {Array} itemsSelected
 * @property {VoidCallback} onSelectAll
 * @property {JSXCallback} listItemFormat
 *
 * @property {number} totalPages
 * @property {number} currentPage
 * @property {VoidCallback} goToNextPage
 * @property {VoidCallback} goToPreviousPage
 * @property {boolean} isDisabled
 * @property {VoidCallback} toggleActionButton
 * @property {boolean} hasPaginator
 * @property {boolean} hasActionButton
 * @property {boolean} hasActions
 * @property {boolean} isNextDisabled
 * @property {boolean} isPreviousDisabled
 * @property {Object} navigation
 * @property {boolean} hasEmpty - what does this mean?
 * @property {boolean} hasList
 * @property {string} emptyTitle
 */

/**
 *
 * @param {NavPage} props
 * @returns {JSX.Element}
 */
function NavPage({
    isFetchingData = () => {},
    TopButton = null,
    onRefresh = () => {},
    placeholderText = "",
    changeText = () => {},
    inputText = "",
    routeName = "",
    listData = [],
    listHeaders = [],
    itemsSelected = [],
    onSelectAll = () => {},
    listItemFormat = () => {},

    totalPages = 0,
    currentPage = 0,
    goToNextPage = () => {},
    goToPreviousPage = () => {},
    isDisabled = false,
    toggleActionButton = () => {},
    hasPaginator = true,
    hasActionButton = true,
    hasActions = true,
    isNextDisabled = () => {},
    isPreviousDisabled = () => {},
    navigation,
    hasEmpty = false,
    hasList,
    emptyTitle,
}) {
    return (
        <NavPageWrapper>
            <NavPageContainer>
                <Page
                    isFetchingData={isFetchingData}
                    onRefresh={onRefresh}
                    placeholderText={placeholderText}
                    changeText={changeText}
                    inputText={inputText}
                    routeName={routeName}
                    listData={listData}
                    TopButton={TopButton}
                    listHeaders={listHeaders}
                    itemsSelected={itemsSelected}
                    onSelectAll={onSelectAll}
                    listItemFormat={listItemFormat}
                    navigation={navigation}
                    hasEmpty={hasEmpty}
                    hasList={hasList}
                    emptyTitle={emptyTitle}
                />

                <Footer
                    totalPages={totalPages}
                    currentPage={currentPage}
                    goToNextPage={goToNextPage}
                    goToPreviousPage={goToPreviousPage}
                    isDisabled={isDisabled}
                    toggleActionButton={toggleActionButton}
                    hasPaginator={hasPaginator}
                    hasActionButton={hasActionButton}
                    hasActions={hasActions}
                    isNextDisabled={isNextDisabled}
                    isPreviousDisabled={isPreviousDisabled}
                />
            </NavPageContainer>
        </NavPageWrapper>
    );
}

export default NavPage;
