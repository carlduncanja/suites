import React from "react";
import Page from "./Page";
import Footer from "./Footer";
import styled from "@emotion/native";
const NavPageWrapper = styled.View`
    width: 100%;
`;
const NavPageContainer = styled.View`
    display: flex;
    align-items: "center";
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
 * @typedef {PageProps & FooterProps} NavPageProps
 */

/**
 *
 * @param {NavPage} props
 * @returns {JSX.Element}
 */
function NavPage({
    changeText = () => {},
    emptyTitle,
    hasEmpty = false,
    hasList,
    inputText = "",
    isFetchingData = () => {},
    itemsSelected = [],
    listData = [],
    listHeaders = [],
    listItemFormat = () => {},
    navigation,
    onRefresh = () => {},
    onSelectAll = () => {},
    placeholderText = "", //for what?
    routeName = "",
    TopButton = null,

    currentPage = 0,
    goToNextPage = () => {},
    goToPreviousPage = () => {},
    hasActionButton = true,
    hasActions = true,
    hasPaginator = true,
    isDisabled = false,
    isNextDisabled = true,
    isPreviousDisabled = true,
    toggleActionButton = () => {},
    totalPages = 0,
}) {
    return (
        <NavPageWrapper>
            <NavPageContainer>
                <Page
                    changeText={changeText}
                    emptyTitle={emptyTitle}
                    hasEmpty={hasEmpty}
                    hasList={hasList}
                    inputText={inputText}
                    isFetchingData={isFetchingData}
                    itemsSelected={itemsSelected}
                    listData={listData}
                    listHeaders={listHeaders}
                    listItemFormat={listItemFormat}
                    navigation={navigation}
                    onRefresh={onRefresh}
                    onSelectAll={onSelectAll}
                    placeholderText={placeholderText}
                    routeName={routeName}
                    TopButton={TopButton}
                />

                <Footer
                    currentPage={currentPage}
                    goToNextPage={goToNextPage}
                    goToPreviousPage={goToPreviousPage}
                    hasActionButton={hasActionButton}
                    hasActions={hasActions}
                    hasPaginator={hasPaginator}
                    isDisabled={isDisabled}
                    isNextDisabled={isNextDisabled}
                    isPreviousDisabled={isPreviousDisabled}
                    toggleActionButton={toggleActionButton}
                    totalPages={totalPages}
                />
            </NavPageContainer>
        </NavPageWrapper>
    );
}

export default NavPage;
