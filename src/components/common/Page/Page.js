import React, { useContext, useEffect, useState } from "react";
import PageTitle from "./PageTitle";
import Search from "../Search";
import List from "../List/List";
import EmptyState from "../../../../assets/svg/emptyState";
import LoadingIndicator from "../LoadingIndicator";
import { PageSettingsContext } from "../../../contexts/PageSettingsContext";
import PropTypes from "prop-types";
import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import { useNavigation } from "@react-navigation/native";
import LostConnectionPage from "./LostConnectionPage";
import NetInfo from "@react-native-community/netinfo";

const PageWrapper = styled.View`
  display: flex;
  height: 100%;
  flex-direction: column;
  margin-left: 0px;
  padding-left: ${({ theme }) => theme.space["--space-32"]};
  padding-top: 28px;
  padding-right: 32px;
  padding-bottom: 28px;
  background-color: ${({ theme }) => theme.colors["--color-gray-100"]};
`;

const PageContainer = styled.View`
  display: flex;
  height: 100%;
`;

const PageSearchWrapper = styled.View`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.space["--space-24"]};
`;

const EmptyWrapper = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const PageHeader = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;
const PageContent = styled.View`
  align-items: center;
  justify-content: center;
  padding-bottom: ${({ theme }) => theme.space["--space-72"]};
`;
const IconWrapper = styled.View`
  margin-bottom: ${({ theme }) => theme.space["--space-40"]};
`;
const MessageWrapper = styled.Text(({ theme }) => ({
  ...theme.font["--text-base-bold"],
  color: theme.colors["--color-gray-600"],
  marginBottom: 20,
}));

/**
 * @returns {*}
 * @constructor
 */
function Page(props) {
  const theme = useTheme();
  const { pageSettingState } = useContext(PageSettingsContext);
  const { isDisabled } = pageSettingState;
  const {
    placeholderText,
    changeText,
    inputText,
    routeName,
    listData,
    listHeaders,
    isFetchingData,
    listItemFormat,
    onRefresh,
    onSelectAll,
    itemsSelected,
    TopButton,
    hasSearch = true,
    pageContent,
    grandparentState,
  } = props;

  const navigation = useNavigation();

  const [lostConnection, setLostConnection] = useState("false");

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      setLostConnection(state.isInternetReachable);
    });
  }, []);

  const content =
    listData?.length > 0 ? (
      <List
        listData={listData}
        listHeaders={listHeaders}
        onRefresh={onRefresh}
        isCheckbox={true}
        onSelectAll={onSelectAll}
        listItemFormat={listItemFormat}
        refreshing={isFetchingData}
        grandparentState={grandparentState}
      />
    ) : listData?.length < 1 ? (
      <EmptyWrapper theme={theme}>
        <PageContent theme={theme}>
          {/*    ICON     */}
          <IconWrapper theme={theme}>
            <EmptyState />
          </IconWrapper>

          {/*    MESSAGE HEADER  */}
          <MessageWrapper theme={theme}>{"No Records Found"}</MessageWrapper>
        </PageContent>
      </EmptyWrapper>
    ) : (
      pageContent
    );
  return (
    <PageWrapper theme={theme}>
      {lostConnection ? (
        <PageContainer theme={theme}>
          <PageHeader>
            <PageTitle pageTitle={routeName} />

            {TopButton && <TopButton />}
          </PageHeader>

          {hasSearch && (
            <PageSearchWrapper theme={theme}>
              <Search
                placeholderText={placeholderText}
                changeText={changeText}
                inputText={inputText}
                onClear={() => {
                  changeText("");
                }}
              />
            </PageSearchWrapper>
          )}

          {isFetchingData ? (
            <LoadingIndicator />
          ) : isDisabled ? (
            <EmptyWrapper theme={theme}>
              <PageContent theme={theme}>
                {/*    ICON     */}
                <IconWrapper theme={theme}>
                  <EmptyState />
                </IconWrapper>

                {/*    MESSAGE HEADER  */}
                <MessageWrapper theme={theme}>
                  {"No Records Found"}
                </MessageWrapper>
              </PageContent>
            </EmptyWrapper>
          ) : (
            content
          )}
        </PageContainer>
      ) : (
        <LostConnectionPage navigation={navigation} />
      )}
    </PageWrapper>
  );
}

export default Page;

Page.propTypes = {
  placeholderText: PropTypes.string,
  changeText: PropTypes.any,
  inputText: PropTypes.any,
  routeName: PropTypes.any,
  listData: PropTypes.any,
  listHeaders: PropTypes.any,
  isFetchingData: PropTypes.any,
  listItemFormat: PropTypes.any,
  onRefresh: PropTypes.any,
  onSelectAll: PropTypes.any,
  itemsSelected: PropTypes.any,
};
