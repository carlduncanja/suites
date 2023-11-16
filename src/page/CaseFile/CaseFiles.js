import React, { useState, useEffect } from "react";
import { View } from "react-native";

import { connect } from "react-redux";
import _, { isEmpty } from "lodash";
import { useModal } from "react-native-modalfy";
import moment from "moment";
import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import ListItem from "../../components/common/List/ListItem";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import ActionItem from "../../components/common/ActionItem";
import AddIcon from "../../../assets/svg/addIcon";
import ArchiveIcon from "../../../assets/svg/archiveIcon";
import DraftItem from "../../components/common/List/DraftItem";

import { setCaseFiles } from "../../redux/actions/caseFilesActions";
import {
    getCaseFiles,
    removeCaseFiles,
    removeCaseFilesId,
} from "../../api/network";

import {
    selectAll,
    checkboxItemPress,
    handleUnauthorizedError,
} from "../../helpers/caseFilesHelpers";
import { currencyFormatter, formatDate } from "../../utils/formatter";

import DataItem from "../../components/common/List/DataItem";
import MultipleTextDataItem from "../../components/common/List/MultipleTextDataItem";
import { emptyFn, LONG_PRESS_TIMER, RECORDS_PER_PAGE_MAIN } from "../../const";
import { PageSettingsContext } from "../../contexts/PageSettingsContext";
import LongPressWithFeedback from "../../components/common/LongPressWithFeedback";
import WasteIcon from "../../../assets/svg/wasteIcon";
import { removeDraft } from "../../redux/actions/draftActions";
import Button from "../../components/common/Buttons/Button";
import ConfirmationComponent from "../../components/ConfirmationComponent";
import PaginatedSection from "../../components/common/Page/PaginatedSection";

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

    const {
        caseFiles = [],
        setCaseFiles,
        drafts = [],
        removeDraft = emptyFn,

        navigation,
    } = props;

    const [selectedCaseIds, setSelectedCaseIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);
    const [pageSettingState, setPageSettingState] = useState({});

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    useEffect(() => {
        if (!searchValue) {
            setSearchResult([]);
            fetchCaseFilesData(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        const search = _.debounce(fetchCaseFilesData, 300);

        setSearchQuery((prevSearch) => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
        setCurrentPage(1);
    }, [searchValue]);

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
        }
    };

    const handleOnCheckBoxPress = (caseItem) => () => {
        const { _id, id } = caseItem; // account for both drafts and created cases.
        const updatedCases = checkboxItemPress(_id || id, selectedCaseIds);
        setSelectedCaseIds(updatedCases);
    };

    const handleOnSelectAll = () => {
        const updatedCases = selectAll(caseFiles, selectedCaseIds);
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

    const fetchCaseFilesData = async (pagePosition) => {
        setIsFetchingData(true);
        return getCaseFiles(searchValue, RECORDS_PER_PAGE_MAIN, pagePosition)
            .then((caseResult) => {
                const { data = [] } = caseResult;
                setCaseFiles(data);
                //TO-DO: Ask why this is necessary
                setPageSettingState({ ...pageSettingState, isDisabled: false });
                return caseResult;
            })
            .catch((error) => {
                handleUnauthorizedError(error?.response?.status, setCaseFiles);
                setPageSettingState({ ...pageSettingState, isDisabled: true });
                throw error;
            })
            .finally(() => {
                setIsFetchingData(false);
            });
    };

    const renderFn = (item) => (
        <ListItem
            hasCheckBox={true}
            isChecked={selectedCaseIds.includes(item._id || item.id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={handleOnItemPress(item, false)}
            itemView={item.isDraft ? renderDraft(item) : caseItem(item)}
        />
    );

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
                            ? `${patient?.firstName || ""} ${
                                  patient?.surname || ""
                              }`
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
            staff = {},
            caseProcedures = [],
        } = item || {};

        let name, physicianName;

        const { total = 0 } = item.chargeSheet || {};
        const { leadPhysician } = staff;

        patient
            ? (name = `${patient.firstName} ${patient.surname}`)
            : (name = "");
        leadPhysician
            ? (physicianName = `Dr. ${leadPhysician.surname}`)
            : (physicianName = "");

        const dates = caseProcedures.map((item) => {
            const { appointment } = item;
            const startTime = appointment?.startTime;

            return moment(startTime);
        });

        const nextVisit = getDate(dates);

        return (
            <>
                <MultipleTextDataItem
                    primaryText={`# ${caseNumber}`}
                    secondaryText={name}
                />
                <DataItem text={`$ ${currencyFormatter(total)}`} />
                <DataItem text={physicianName} />
                <DataItem
                    text={formatDate(nextVisit, "MMM DD, YYYY") || "n/a"}
                />
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

    const handleRemoveCase = async () => {
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

        if (userPermissions.delete)
            actionArray.push(deleteDraftAction, deleteAction);
        if (userPermissions.create) actionArray.push(createNewCase);
        if (userPermissions.update) actionArray.push(archiveCase);

        return (
            <ActionContainer
                floatingActions={actionArray}
                title="CASE ACTIONS"
            />
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
            <PaginatedSection
                changeText={changeText}
                currentPage={currentPage}
                fetchSectionDataCb={fetchCaseFilesData}
                hasActions={true}
                hasActionButton={true}
                hasPaginator={true}
                inputText={searchValue}
                isDisabled={isFloatingActionDisabled}
                isFetchingData={isFetchingData}
                itemsSelected={selectedCaseIds}
                listData={caseFiles}
                listHeaders={listHeaders}
                listItemFormat={renderFn}
                onRefresh={handleDataRefresh}
                onSelectAll={handleOnSelectAll}
                placeholderText="Search by Case ID, Patient, Staff"
                routeName="Case Files"
                setCurrentPage={setCurrentPage}
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
                toggleActionButton={toggleActionButton}
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
