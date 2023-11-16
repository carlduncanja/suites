import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import React, { useEffect, useState } from "react";
import { useModal } from "react-native-modalfy";
import { connect } from "react-redux";
import {
    getArchivedCaseFiles,
    restoreArchivedCaseFiles,
} from "../../api/network";
import { checkboxItemPress, selectAll } from "../../helpers/caseFilesHelpers";
import { SetArchivedCases } from "../../redux/actions/archiveCaseActions";

import { isEmpty } from "lodash";
import RestoreIcon from "../../../assets/svg/RestoreIcon";
import ConfirmationComponent from "../../components/ConfirmationComponent";
import ActionItem from "../../components/common/ActionItem";
import Button from "../../components/common/Buttons/Button";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import ListItem from "../../components/common/List/ListItem";
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
    border: 1px solid ${({ theme }) => theme.colors["--accent-button"]};
    background-color: ${({ theme }) => theme.colors["--accent-button"]};
    box-sizing: border-box;
    border-radius: 6px;
    padding-top: 2px;
`;

const ArchiveCasesPage = ({
    archivedCases,
    SetArchivedCases,
    navigation,
    route,
}) => {
    const modal = useModal();
    const theme = useTheme();
    const { archivedCaseItem, refreshCases } = route.params;
    const recordsPerPage = 10; //TO-DO: Does this have to be 10?

    const [isFetchingData, setFetchingData] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedArchivedCases, setSelectedArchivedCases] = useState([]);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    useEffect(() => {
        if (!searchValue) {
            setSearchResult([]);
            fetchArchivedCases();
            return;
        }
        const search = _.debounce(fetchArchivedCases, 100);
        setSearchQuery((prevSearch) => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });
        search();
        setCurrentPagePosition(1);
    }, [searchValue]);

    const handleErrorDisplayingData = () => {
        modal.closeModals("ConfirmationModal");
        setTimeout(() => {
            navigation.navigate("CaseFiles");
        }, 200);
    };

    const fetchArchivedCases = (pagePosition) => {
        setFetchingData(true);
        return getArchivedCaseFiles(searchValue, recordsPerPage, pagePosition)
            .then((caseResult) => {
                const { data = [], pages = 0 } = caseResult;
                SetArchivedCases(data);
            })
            .catch((error) => {
                modal.openModal("ConfirmationModal", {
                    content: (
                        <ConfirmationComponent
                            isError={true}
                            isEditUpdate={false}
                            onCancel={() => handleErrorDisplayingData()}
                            onAction={() => handleErrorDisplayingData()}
                            message="Data could not be displayed"
                        />
                    ),
                });
                throw error;
            })
            .finally((_) => {
                setFetchingData(false);
            });
    };

    const onCloseArchivePage = () => {
        navigation.navigate("CaseFiles");
    };

    const onSearchInputChange = (input) => {
        setSearchValue(input);
    };

    const handleOnSelectAll = () => {
        const updatedCases = selectAll(archivedCases, selectedArchivedCases);
        setSelectedArchivedCases(updatedCases);
    };

    const handleOnCheckBoxPress = (item) => () => {
        const { _id } = item;
        const updatedCases = checkboxItemPress(_id, selectedArchivedCases);
        setSelectedArchivedCases(updatedCases);
    };

    const renderArchiveFn = (item) => {
        return (
            <ListItem
                isArchive={true}
                hasCheckBox={true}
                isChecked={selectedArchivedCases.includes(item._id)}
                onCheckBoxPress={handleOnCheckBoxPress(item)}
                onItemPress={() => {}}
                itemView={archivedCaseItem(item)}
            />
        );
    };

    const onRestorePress = (isMultiple = false) => {
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
                            isMultiple
                                ? handleRestoreAllCases()
                                : handleRestoreCases();
                        }}
                        message="Do you want to restore this case/s ?"
                        action="Yes"
                    />
                ),
            });
        }, 200);
    };

    const handleRestoreAllCases = () => {
        handleRestoreCases([...archivedCases]);
    };

    const handleRestoreCases = (cases = selectedArchivedCases) => {
        restoreArchivedCaseFiles({ ids: [...cases] })
            .then((_) => {
                modal.openModal("ConfirmationModal", {
                    content: (
                        <ConfirmationComponent
                            isError={false}
                            isEditUpdate={false}
                            onCancel={() => modal.closeAllModals()}
                            onAction={() => {
                                modal.closeAllModals();
                                fetchArchivedCases();
                            }}
                            action="Yes"
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
            })
            .finally((_) => {
                refreshCases();
                console.log("Archived cases: ", archivedCases);
            });
    };

    const getFabActions = () => {
        const disabled = !!isEmpty(selectedArchivedCases);
        const allDisabled = !!isEmpty(archivedCases);
        const restoreCase = (
            <ActionItem
                title="Restore Case"
                icon={
                    <RestoreIcon
                        strokeColor={
                            disabled
                                ? theme.colors["--color-gray-600"]
                                : theme.colors["--accent-line"]
                        }
                    />
                }
                onPress={() => onRestorePress()}
                disabled={disabled}
                touchable={!disabled}
            />
        );
        const restoreAllCases = (
            <ActionItem
                title="Restore all Cases"
                icon={
                    <RestoreIcon
                        strokeColor={
                            allDisabled
                                ? theme.colors["--color-gray-600"]
                                : theme.colors["--accent-line"]
                        }
                    />
                }
                onPress={() => onRestorePress(true)}
                disabled={allDisabled}
                touchable={!disabled}
            />
        );

        return (
            <ActionContainer
                floatingActions={[restoreCase, restoreAllCases]}
                title="CASE FILES ACTIONS"
            />
        );
    };

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal("ActionContainerModal", {
            actions: getFabActions(),
            title: "CASE FILES ACTIONS",
            onClose: () => {
                setFloatingAction(false);
            },
        });
    };

    return (
        <PaginatedSection
            isFetchingData={isFetchingData}
            onRefresh={() => fetchArchivedCases(currentPagePosition)}
            placeholderText="Search by Case ID, Patient, Staff"
            changeText={onSearchInputChange}
            inputText={searchValue}
            routeName="Archived Case Files"
            listData={[...archivedCases]}
            TopButton={() => (
                <ButtonContainer theme={theme}>
                    <Button
                        title="Close Archive"
                        color={theme.colors["--color-white"]}
                        font="--text-sm-regular"
                        buttonPress={onCloseArchivePage}
                    />
                </ButtonContainer>
            )}
            listHeaders={listHeaders}
            listItemFormat={renderArchiveFn}
            itemsSelected={selectedArchivedCases}
            onSelectAll={handleOnSelectAll}
            fetchSectionDataCb={fetchArchivedCases}
            currentPage={currentPagePosition}
            setCurrentPage={setCurrentPagePosition}
            isDisabled={isFloatingActionDisabled}
            toggleActionButton={toggleActionButton}
            hasPaginator={true}
            hasActionButton={true}
            hasActions={true}
        />
    );
};

const mapStateToProps = (state) => ({
    archivedCases: state.archivedCases,
});

const mapDispatcherToProp = {
    SetArchivedCases,
};

export default connect(mapStateToProps, mapDispatcherToProp)(ArchiveCasesPage);
