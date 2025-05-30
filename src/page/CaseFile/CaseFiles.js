import React, { useEffect, useState } from "react";
import { View } from "react-native";

import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import _, { isEmpty } from "lodash";
import moment from "moment";
import { useModal } from "react-native-modalfy";
import { connect } from "react-redux";
import AddIcon from "../../../assets/svg/addIcon";
import ArchiveIcon from "../../../assets/svg/archiveIcon";
import ActionItem from "../../components/common/ActionItem";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import DraftItem from "../../components/common/List/DraftItem";
import ListItem from "../../components/common/List/ListItem";

import {
  getCaseFiles,
  removeCaseFiles,
  removeCaseFilesId,
} from "../../api/network";
import { setCaseFiles } from "../../redux/actions/caseFilesActions";

import {
  checkboxItemPress,
  handleUnauthorizedError,
  selectAll,
  useNextPaginator,
  usePreviousPaginator,
} from "../../helpers/caseFilesHelpers";
import { currencyFormatter, formatDate } from "../../utils/formatter";

import WasteIcon from "../../../assets/svg/wasteIcon";
import Button from "../../components/common/Buttons/Button";
import DataItem from "../../components/common/List/DataItem";
import MultipleTextDataItem from "../../components/common/List/MultipleTextDataItem";
import LongPressWithFeedback from "../../components/common/LongPressWithFeedback";
import NavPage from "../../components/common/Page/NavPage";
import ConfirmationComponent from "../../components/ConfirmationComponent";
import { emptyFn, LONG_PRESS_TIMER } from "../../const";
import { PageSettingsContext } from "../../contexts/PageSettingsContext";
import { removeDraft } from "../../redux/actions/draftActions";

const listHeaders = [
  {
    name: "Patient",
    alignment: "flex-start",
  },
  {
    name: "Balance",
    alignment: "flex-start",
  },
  {
    name: "Staff",
    alignment: "flex-start",
  },
  {
    name: "Next Visit",
    alignment: "flex-start",
  },
];

// style for the top left "view archive button"
const ButtonContainer = styled.View`
  width: 105px;
  height: 26px;
  border: 1px solid #a0aec0;
  box-sizing: border-box;
  border-radius: 6px;
  padding-top: 2px;
`;

function CaseFiles(props) {
  const modal = useModal();
  const theme = useTheme();
  const userPermissions = props.route.params.permissions;

  const recordsPerPage = 12;

  const {
    // Redux props
    caseFiles = [],
    setCaseFiles,
    drafts = [],
    removeDraft = emptyFn,

    // React Navigation Props
    navigation,
    route,
  } = props;

  const [selectedCaseIds, setSelectedCaseIds] = useState([]);
  const [isFetchingCaseFiles, setFetchingCaseFiles] = useState(false);
  const [isFloatingActionDisabled, setFloatingAction] = useState(false);
  const [isNextDisabled, setNextDisabled] = useState(false);
  const [isPreviousDisabled, setPreviousDisabled] = useState(true);
  const [pageSettingState, setPageSettingState] = useState({});
  const { isDisabled } = pageSettingState;

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState({});

  const [totalPages, setTotalPages] = useState(1);
  const [currentPagePosition, setCurrentPagePosition] = useState(1);
  const [currentPageListMin, setCurrentPageListMin] = useState(0);
  const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);

  useEffect(() => {
    if (!caseFiles.length) {
      fetchCaseFilesData(currentPagePosition);
    }
    setTotalPages(
      caseFiles.length === 0 ? 1 : Math.ceil(caseFiles.length / recordsPerPage)
    );
  }, []);

  useEffect(() => {
    if (!searchValue) {
      // empty search values and cancel any out going request.
      setSearchResult([]);
      fetchCaseFilesData(1);
      if (searchQuery.cancel) searchQuery.cancel();
      return;
    }

    // wait 300ms before search. cancel any prev request before executing current.
    // controls how long the search takes to trigger
    // 300 ms
    const search = _.debounce(fetchCaseFilesData, 300);

    setSearchQuery((prevSearch) => {
      if (prevSearch && prevSearch.cancel) {
        prevSearch.cancel();
      }
      return search;
    });

    search();
    setCurrentPagePosition(1);
  }, [searchValue]);

  const goToNextPage = () => {
    if (currentPagePosition < totalPages) {
      console.log("Next page", currentPage);
      const { currentPage, currentListMin, currentListMax } = useNextPaginator(
        currentPagePosition,
        recordsPerPage,
        currentPageListMin,
        currentPageListMax
      );
      console.log("Next page", currentPage);
      setCurrentPagePosition(currentPage);
      setCurrentPageListMin(currentListMin);
      setCurrentPageListMax(currentListMax);
      fetchCaseFilesData(currentPage);
      //setNextDisabled(false);
    }
  };

  const goToPreviousPage = () => {
    if (currentPagePosition === 1) {
      return;
    }
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
    fetchCaseFilesData(currentPage);
  };

  // checks if patient info is empty
  // if not pops up the case page
  // else create case page
  const handleOnItemPress = (item, isOpenEditable) => () => {
    if (item !== null) {
      isEmpty(item?.patient?.medicalInfo)
        ? navigation.navigate("CreateCase", {
            initial: false,
            draftItem: item,
          })
        : navigation.navigate("Case", {
            initial: false,
            caseId: item._id,
            isEdit: isOpenEditable,
          });
    } else return;
  };

  const handleOnCheckBoxPress = (caseItem) => () => {
    const { _id, id } = caseItem; // account for both drafts and created cases.
    const updatedCases = checkboxItemPress(_id || id, selectedCaseIds);
    setSelectedCaseIds(updatedCases);
  };

  const handleOnSelectAll = () => {
    const updatedCases = selectAll(caseFiles, selectedCaseIds);
    console.log("box clicked");
    setSelectedCaseIds(updatedCases);
  };

  const handleDataRefresh = () => {
    fetchCaseFilesData();
  };

  const toggleActionButton = () => {
    setFloatingAction(true);
    modal.openModal("ActionContainerModal", {
      actions: getFabActions(),
      title: "CASE ACTIONS",
      onClose: () => {
        setFloatingAction(false);
      },
    });
  };

  const changeText = (text) => {
    setSearchValue(text);
  };

  const fetchCaseFilesData = (pagePosition) => {
    const currentPosition = pagePosition || 1;
    setCurrentPagePosition(currentPosition);

    setFetchingCaseFiles(true);
    getCaseFiles(searchValue, recordsPerPage, currentPosition)
      .then((caseResult) => {
        console.log(
          "this all the data i will ever neeed",
          caseResult.data[0].caseProcedures
        );
        const { data = [], pages = 0 } = caseResult;

        if (pages === 1) {
          setPreviousDisabled(true);
          setNextDisabled(true);
        } else if (currentPosition === 1) {
          setPreviousDisabled(true);
          setNextDisabled(false);
        } else if (currentPosition === pages) {
          setNextDisabled(true);
          setPreviousDisabled(false);
        } else if (currentPosition < pages) {
          setNextDisabled(false);
          setPreviousDisabled(false);
        } else {
          setNextDisabled(true);
          setPreviousDisabled(true);
        }
        setCaseFiles(data);
        //setTotalPages(pages);
        setPageSettingState({ ...pageSettingState, isDisabled: false });
        data.length === 0 ? setTotalPages(1) : setTotalPages(pages);
      })
      .catch((error) => {
        console.log("failed to get case files", error);

        handleUnauthorizedError(error?.response?.status, setCaseFiles);
        setPageSettingState({ ...pageSettingState, isDisabled: true });
        setTotalPages(1);
        setPreviousDisabled(true);
        setNextDisabled(true);
      })
      .finally((_) => {
        setFetchingCaseFiles(false);
      });
  };

  const renderFn = (item) => {
    const { patient = {} } = item;

    return (
      <>
        <ListItem
          hasCheckBox={true}
          isChecked={selectedCaseIds.includes(item._id || item.id)}
          onCheckBoxPress={handleOnCheckBoxPress(item)}
          onItemPress={handleOnItemPress(item, false)}
          itemView={item.isDraft ? renderDraft(item) : caseItem(item)}
        />
      </>
    );
  };

  const getDate = (dates) => {
    let updatedDates = [...dates];
    let dateIndex = 0;
    while (dateIndex < dates.length) {
      const earliestDate = moment.min(updatedDates);
      const isAfterToday = moment(earliestDate).isSameOrAfter(new Date());

      if (isAfterToday) {
        return earliestDate;
      }
      updatedDates = updatedDates.filter((item) => item !== earliestDate);

      dateIndex += 1;
    }
  };

  const renderDraft = (item) => {
    if (item !== null) {
      const { patient = {} } = item || {};

      return (
        <DraftItem
          text={`${
            patient?.firstName
              ? `${patient?.firstName || ""} ${patient?.surname || ""}`
              : "N/A"
          } `}
        />
      );
    }
  };

  const caseItem = (item) => {
    const {
      caseNumber,
      patient = {},
      chargeSheet = {},
      staff = {},
      caseProcedures = [],
    } = item || {};

    let name, physicianName;

    const { total = 0, amountDue } = chargeSheet || {};
    const { leadPhysician } = staff;

    patient ? (name = `${patient.firstName} ${patient.surname}`) : (name = "");
    leadPhysician
      ? (physicianName = `Dr. ${leadPhysician.surname}`)
      : (physicianName = "");

    const dates = caseProcedures.map((item) => {
      const { appointment } = item;
      const startTime = appointment?.["startTime"];

      return moment(startTime);
    });

    const nextVisit = getDate(dates);

    return (
      <>
        <MultipleTextDataItem
          primaryText={`# ${caseNumber}`}
          secondaryText={name}
        />
        <DataItem text={`$ ${currencyFormatter(Math.max(total, amountDue))}`} />
        <DataItem text={physicianName} />
        <DataItem text={formatDate(nextVisit, "MMM DD, YYYY") || "n/a"} />
      </>
    );
  };

  const handleRemoveDraft = (id) => {
    modal.closeAllModals();
    removeDraft(id);
    setFloatingAction(false);
  };

  const onArchivePress = () => {
    modal.closeModals("ActionContainerModal");
    setTimeout(() => {
      modal.openModal("ConfirmationModal", {
        content: (
          <ConfirmationComponent
            isError={false}
            isEditUpdate={true}
            onCancel={() => modal.closeAllModals()}
            onAction={() => {
              modal.closeAllModals();
              handleArchiveCases();
            }}
            message="Do you want to archive these cases?"
            action="Yes"
          />
        ),
      });
    }, 200);
  };

  const handleArchiveCases = () => {
    const caseIds = { ids: [...selectedCaseIds] };
    console.log("Archive case/s: ", caseIds);

    removeCaseFiles({ ids: [...selectedCaseIds] })
      .then((_) => {
        modal.openModal("ConfirmationModal", {
          content: (
            <ConfirmationComponent
              isError={false}
              isEditUpdate={false}
              onCancel={() => modal.closeAllModals()}
              onAction={() => {
                modal.closeAllModals();
                handleDataRefresh();
                setTimeout(() => {
                  openViewArchivedCases();
                }, 200);
              }}
            />
          ),
        });
      })
      .catch((_) => {
        modal.openModal("ConfirmationModal", {
          content: (
            <ConfirmationComponent
              isError={true}
              isEditUpdate={false}
              onCancel={() => modal.closeAllModals()}
              onAction={() => modal.closeAllModals()}
            />
          ),
        });
      });
  };

  const openErrorConfirmation = () => {
    modal.openModal("ConfirmationModal", {
      content: (
        <ConfirmationComponent
          isError={true}
          isEditUpdate={false}
          onCancel={() => modal.closeModals("ConfirmationModal")}
        />
      ),
      onClose: () => {
        modal.closeModals("ConfirmationModal");
      },
    });
  };

  const handleRemoveCase = async (id) => {
    openDeletionConfirm({ ids: [...selectedCaseIds] });
  };

  const removeCaseFilesCall = (data) => {
    removeCaseFilesId(data)
      .then((_) => {
        modal.openModal("ConfirmationModal", {
          content: (
            <ConfirmationComponent
              isError={false}
              isEditUpdate={false}
              onAction={() => {
                modal.closeModals("ConfirmationModal");
                setTimeout(() => {
                  modal.closeModals("ActionContainerModal");
                  handleDataRefresh();
                }, 200);
              }}
            />
          ),
          onClose: () => {
            modal.closeModals("ConfirmationModal");
          },
        });

        setSelectedCaseIds([]);
      })
      .catch((error) => {
        openErrorConfirmation();
        setTimeout(() => {
          modal.closeModals("ActionContainerModal");
        }, 200);
        console.log("Failed to remove case file: ", error);
      })
      .finally((_) => {
        setFloatingAction(false);
      });
  };

  const openDeletionConfirm = (data) => {
    modal.openModal("ConfirmationModal", {
      content: (
        <ConfirmationComponent
          isError={false}
          isEditUpdate={true}
          onCancel={() => modal.closeModals("ConfirmationModal")}
          onAction={() => {
            modal.closeModals("ConfirmationModal");
            removeCaseFilesCall(data);
          }}
          message="Do you want to delete these item(s)?"
        />
      ),
      onClose: () => {
        modal.closeModals("ConfirmationModal");
      },
    });
  };

  const getFabActions = () => {
    const actionArray = [];

    const disabled = !!isEmpty(selectedCaseIds);
    const archiveCase = (
      <ActionItem
        title="Archive Case"
        icon={
          <ArchiveIcon
            strokeColor={
              disabled
                ? theme.colors["--color-gray-600"]
                : theme.colors["--company"]
            }
          />
        }
        onPress={onArchivePress}
        disabled={disabled}
        touchable={!disabled}
      />
    );

    const enabled =
      selectedCaseIds.length === 1 &&
      drafts.some((item) => item.id === selectedCaseIds[0]);
    const strokeColor = !enabled
      ? theme.colors["--color-gray-600"]
      : theme.colors["--color-red-700"];

    const deleteDraftAction = (
      <View
        style={{
          borderRadius: 6,
          flex: 1,
          overflow: "hidden",
        }}
      >
        <LongPressWithFeedback
          pressTimer={LONG_PRESS_TIMER.LONG}
          onLongPress={() => {
            handleRemoveDraft(selectedCaseIds[0]);
          }}
          isDisabled={!enabled}
        >
          <ActionItem
            title="Hold to Delete Draft"
            icon={<WasteIcon strokeColor={strokeColor} />}
            disabled={!enabled}
            touchable={false}
          />
        </LongPressWithFeedback>
      </View>
    );

    const createNewCase = (
      <ActionItem
        title="New Case"
        icon={<AddIcon />}
        onPress={openCreateCaseFile}
      />
    );

    const deleteAction = (
      <View
        style={{
          borderRadius: 6,
          flex: 1,
          overflow: "hidden",
        }}
      >
        <LongPressWithFeedback
          pressTimer={LONG_PRESS_TIMER.MEDIUM}
          isDisabled={disabled}
          onLongPress={() => handleRemoveCase(selectedCaseIds[0])}
        >
          <ActionItem
            title="Hold to Delete Case"
            icon={
              <WasteIcon
                strokeColor={
                  disabled
                    ? theme.colors["--color-gray-600"]
                    : theme.colors["--color-red-700"]
                }
              />
            }
            touchable={false}
            disabled={disabled}
          />
        </LongPressWithFeedback>
      </View>
    );

    userPermissions.delete && actionArray.push(deleteDraftAction, deleteAction);
    userPermissions.create && actionArray.push(createNewCase);
    userPermissions.update && actionArray.push(archiveCase);

    return (
      <ActionContainer floatingActions={actionArray} title="CASE ACTIONS" />
    );
  };

  const openCreateCaseFile = () => {
    modal.closeModals("ActionContainerModal");
    navigation.navigate("CreateCase", {
      initial: false,
      draftItem: null,
    });
  };

  const openViewArchivedCases = () => {
    console.log("View Archived Cases");
    props.navigation.navigate("ArchiveCasesPage", {
      archivedCaseItem: caseItem,
      refreshCases: handleDataRefresh,
    });
  };

  return (
    <PageSettingsContext.Provider
      value={{
        pageSettingState,
        setPageSettingState,
      }}
    >
      <NavPage
        isFetchingData={isFetchingCaseFiles}
        onRefresh={handleDataRefresh}
        placeholderText="Search by Case ID, Patient, Staff"
        changeText={changeText}
        inputText={searchValue}
        routeName="Case Files"
        listData={caseFiles}
        TopButton={() => (
          <ButtonContainer theme={theme}>
            <Button
              title="Archives"
              color={theme.colors["--color-gray-500"]}
              font="--text-sm-regular"
              buttonPress={openViewArchivedCases}
            />
          </ButtonContainer>
        )}
        listHeaders={listHeaders}
        itemsSelected={selectedCaseIds}
        onSelectAll={handleOnSelectAll}
        listItemFormat={renderFn}
        totalPages={totalPages}
        currentPage={currentPagePosition}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        isDisabled={isFloatingActionDisabled}
        toggleActionButton={toggleActionButton}
        hasPaginator={true}
        hasActionButton={true}
        hasActions={true}
        isNextDisabled={isNextDisabled}
        isPreviousDisabled={isPreviousDisabled}
      />
    </PageSettingsContext.Provider>
  );
}

const mapStateToProps = (state) => {
  let { caseFiles } = state;
  const { drafts } = state;

  if (drafts && drafts.length) caseFiles = [...drafts, ...caseFiles];

  return {
    caseFiles,
    drafts,
  };
};

const mapDispatcherToProp = { setCaseFiles, removeDraft };

export default connect(mapStateToProps, mapDispatcherToProp)(CaseFiles);
