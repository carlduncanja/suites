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
                    // onClear = {onClear}
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
