import React, { useState } from "react";
import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import { MenuOptions, MenuOption } from "react-native-popup-menu";
import Svg, { Path } from "react-native-svg";
import ClearList from "../../../assets/svg/clearList";
import CalendarIcon from "../../../assets/svg/calendar";
import Table from "./Table/Table";
import Paginator from "./Paginators/Paginator";
import CreationDialogTabs from "./Dialog/CreationDialogTabs";
import DateInputField from "./Input Fields/DateInputField";
import {
  useNextPaginator,
  usePreviousPaginator,
} from "../../helpers/caseFilesHelpers";
import OverlayDialog from "./Dialog/OverlayDialog";
import OptionsField from "./Input Fields/OptionsField";

const OverlayWrapper = styled.View`
  display: flex;
  width: 500px;
  min-height: 500px;
  max-height: 530px;
  background-color: yellowgreen;
`;
const OverlayContainer = styled.View`
  height: 100%;
  width: 100%;
`;

const ContentContainer = styled.View`
  height: 100%;
  width: 100%;
  padding: 24px;
`;

const ListContainerWrapper = styled.View`
  height: 299px;
  border: 1px solid ${({ theme }) => theme.colors["--color-gray-400"]};
  background-color: ${({ theme }) => theme.colors["--default-shade-white"]};
  padding: ${({ theme }) => theme.space["--space-16"]};
  margin-top: ${({ theme }) => theme.space["--space-24"]};
  border-radius: 8px;
`;
const ListContentContainer = styled.View`
  height: 100%;
`;

const List = styled.View`
  height: 219px;
  border-bottom-color: ${({ theme }) => theme.colors["--color-gray-300"]};
  border-bottom-width: 1px;
`;

const FooterContainer = styled.View`
  width: 100%;
  height: 32px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
`;

const PaginatorContainer = styled.View`
  height: 100%;
  width: 122px;
  border: 1px solid ${({ theme }) => theme.colors["--color-gray-400"]};
  border-radius: 4px;
`;

const ClearListContainer = styled.TouchableOpacity`
  height: 100%;
  flex-direction: row;
  width: 80px;
  align-items: center;
  justify-content: space-between;
`;

const ClearListText = styled.Text(({ theme }) => ({
  ...theme.font["--text-xs-regular"],
  color: theme.colors["--color-gray-800"],
}));

const DateWrapper = styled.View`
  height: 34px;
  width: 100%;
  justify-content: space-between;
`;
const DateContainer = styled.View`
  height: 100%;
  width: 100%;
  flex-direction: row;
  border: 1px solid ${({ theme }) => theme.colors["--color-gray-400"]};
  border-radius: 4px;
  justify-content: space-between;
  align-items: center;
  padding-right: ${({ theme }) => theme.space["--space-8"]};
`;

const CardText = styled.Text(({ theme }) => ({
  ...theme.font["--text-base-regular"],
  color: theme.colors["--color-gray-600"],
}));

const FrequencyContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.space["--space-24"]};
  padding-bottom: ${({ theme }) => theme.space["--space-16"]};
`;

const FrequencyCheckboxContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 178px;
`;

const tickSVG = (
  <Svg
    width="10"
    height="8"
    viewBox="0 0 10 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M9.4001 1.99998L8.0001 0.599976L4.0001 4.59998L2.0001 2.59998L0.600098 3.99998L4.0001 7.39998L9.4001 1.99998Z"
      fill="#48BB78"
    />
  </Svg>
);

const Checkbox = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 24px;
  border: 1px solid ${({ theme }) => theme.colors["--color-gray-400"]};
  border-radius: 4px;
  margin-right: ${({ theme }) => theme.space["--space-12"]};
`;

const FrequencyDropdownContainer = styled.View`
  width: 170px;
`;

const TYPES = {
  weekly: "Weekly",
  biweekly: "Bi-Weekly",
  monthly: "Monthly",
};

function CartCard(props) {
  const {
    title = "",
    onClearPress = () => {},
    closeModal = () => {},
    data = [],
    selectedTab = 0,
    listItemFormat = () => {},
    tabs,
    headers = [],
    isCheckBox = false,
    onFooterPress = () => {},
    footerTitle = "DONE",
    onDateChange = () => {},
    errors = { errors },
    fields,
    isFrequency,
    setIsFrequency,
    onFieldChange,
  } = props;

  const theme = useTheme();

  const recordsPerPage = 3;
  const dataLength = data.length;
  const totalPages = Math.ceil(dataLength / recordsPerPage);

  const [currentPagePosition, setCurrentPagePosition] = useState(1);
  const [currentPageListMin, setCurrentPageListMin] = useState(0);
  const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);

  const goToNextPage = () => {
    if (currentPagePosition < totalPages) {
      const { currentPage, currentListMin, currentListMax } = useNextPaginator(
        currentPagePosition,
        recordsPerPage,
        currentPageListMin,
        currentPageListMax
      );
      setCurrentPagePosition(currentPage);
      setCurrentPageListMin(currentListMin);
      setCurrentPageListMax(currentListMax);
    }
  };

  const goToPreviousPage = () => {
    if (currentPagePosition > 1) {
      const { currentPage, currentListMin, currentListMax } =
        usePreviousPaginator(
          currentPagePosition,
          recordsPerPage,
          currentPageListMin,
          currentPageListMax
        );
      setCurrentPagePosition(currentPage);
      setCurrentPageListMin(currentListMin);
      setCurrentPageListMax(currentListMax);
    }
  };

  let dataToDisplay = [...data];
  dataToDisplay = dataToDisplay.slice(currentPageListMin, currentPageListMax);

  return (
    <OverlayWrapper>
      <OverlayContainer>
        <OverlayDialog
          title={title}
          onPositiveButtonPress={onFooterPress}
          onClose={closeModal}
          positiveText={footerTitle}
          footerIndex={"30"}
        >
          {tabs && <CreationDialogTabs tabs={tabs} tab={selectedTab} />}

          <ContentContainer>
            <DateWrapper>
              <DateContainer theme={theme}>
                <DateInputField
                  placeholder="Delivery Date"
                  borderColor="--color-gray-400"
                  hasBorder={false}
                  minDate={new Date()}
                  onDateChange={onDateChange("deliveryDate")}
                  value={fields.deliveryDate}
                  onClear={() => onDateChange("deliveryDate")("")}
                  mode="date"
                  format="YYYY-MM-DD"
                  errorMessage="Set an estimated date"
                  hasError={errors.deliveryDate}
                />
                <CalendarIcon />
              </DateContainer>
            </DateWrapper>

            <ListContainerWrapper theme={theme}>
              <ListContentContainer>
                <List theme={theme}>
                  <Table
                    data={dataToDisplay}
                    currentListMin={currentPageListMin}
                    currentListMax={currentPageListMax}
                    listItemFormat={listItemFormat}
                    headers={headers}
                    isCheckbox={isCheckBox}
                  />
                </List>

                <FooterContainer>
                  <PaginatorContainer theme={theme}>
                    <Paginator
                      currentPage={currentPagePosition}
                      totalPages={totalPages}
                      goToNextPage={goToNextPage}
                      goToPreviousPage={goToPreviousPage}
                      hasNumberBorder={false}
                    />
                  </PaginatorContainer>

                  <ClearListContainer onPress={onClearPress}>
                    <ClearListText theme={theme}>Clear List</ClearListText>
                    <ClearList />
                  </ClearListContainer>
                </FooterContainer>
              </ListContentContainer>
            </ListContainerWrapper>

            <FrequencyContainer theme={theme}>
              <FrequencyCheckboxContainer
                onPress={() => setIsFrequency(!isFrequency)}
                activeOpacity={0.8}
              >
                <Checkbox theme={theme}>{isFrequency && tickSVG}</Checkbox>
                <CardText theme={theme}>This order repeats</CardText>
              </FrequencyCheckboxContainer>

              {isFrequency && (
                <FrequencyDropdownContainer>
                  <OptionsField
                    text={TYPES[fields.orderFrequency]}
                    oneOptionsSelected={(value) => {
                      onFieldChange("orderFrequency")(value);
                    }}
                    menuOption={
                      <MenuOptions>
                        <MenuOption value="weekly" text="Weekly" />
                        <MenuOption value="biweekly" text="Bi-Weekly" />
                        <MenuOption value="monthly" text="Monthly" />
                      </MenuOptions>
                    }
                  />
                </FrequencyDropdownContainer>
              )}
            </FrequencyContainer>
          </ContentContainer>
        </OverlayDialog>
      </OverlayContainer>
    </OverlayWrapper>
  );
}

export default CartCard;
