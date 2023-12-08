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
  changeText = () => {},
  inputText = "",
  isFetchingData = () => {},
  itemsSelected = [],
  listData = [],
  listHeaders = [],
  listItemFormat = () => {},
  onRefresh = () => {},
  onSelectAll = () => {},
  placeholderText = "",
  routeName = "",
  TopButton = null,

  currentPage = 0,
  emptyTitle,
  grandparentState,
  goToNextPage = () => {},
  goToPreviousPage = () => {},
  hasActionButton = true,
  hasActions = true,
  hasEmpty = false,
  hasList,
  hasPaginator = true,
  isDisabled = false,
  isNextDisabled = () => {},
  isPreviousDisabled = () => {},
  navigation,
  toggleActionButton = () => {},
  totalPages = 0,
}) {
  return (
    <NavPageWrapper>
      <NavPageContainer>
        <Page
          changeText={changeText}
          emptyTitle={emptyTitle}
          grandparentState={grandparentState}
          hasEmpty={hasEmpty}
          hasList={hasList}
          inputText={inputText}
          isFetchingData={isFetchingData}
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
