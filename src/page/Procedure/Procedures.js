import React, { useEffect, useState } from "react";

import { useTheme } from "emotion-theming";
import _ from "lodash";
import { useModal } from "react-native-modalfy";
import { connect } from "react-redux";
import ActionItem from "../../components/common/ActionItem";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import ListItem from "../../components/common/List/ListItem";
import LongPressWithFeedback from "../../components/common/LongPressWithFeedback";

import AddIcon from "../../../assets/svg/addIcon";
import WasteIcon from "../../../assets/svg/wasteIcon";

import {
    checkboxItemPress,
    handleUnauthorizedError,
    selectAll,
} from "../../helpers/caseFilesHelpers";

import {
    bulkUploadProcedureRequest,
    getProcedures,
    removeProcedures,
} from "../../api/network";
import { setProcedures } from "../../redux/actions/proceduresActions";

import ConfirmationComponent from "../../components/ConfirmationComponent";
import DataItem from "../../components/common/List/DataItem";
import RightBorderDataItem from "../../components/common/List/RightBorderDataItem";
import TouchableDataItem from "../../components/common/List/TouchableDataItem";
import { DISABLED_COLOR, LONG_PRESS_TIMER } from "../../const";

import ExportIcon from "../../../assets/svg/exportIcon";
import ConfirmationCheckBoxComponent from "../../components/ConfirmationCheckBoxComponent";
import FileUploadComponent from "../../components/FileUploadComponent";
import PaginatedSection from "../../components/common/Page/PaginatedSection";
import { PageSettingsContext } from "../../contexts/PageSettingsContext";

const Procedures = (props) => {
    const recordsPerPage = 12;

    const procedurePermissions = props.route.params.procedurePermissions;

    const modal = useModal();
    const theme = useTheme();

    const listHeaders = [
        {
            name: "Procedure",
            alignment: "flex-start",
            flex: 1.5,
        },
        {
            name: "Physician",
            alignment: "flex-start",
            flex: 1,
        },
        {
            name: "Duration",
            alignment: "flex-start",
            flex: 1,
        },
    ];

    const { procedures = [], setProcedures, navigation } = props;

    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    const [currentPagePosition, setCurrentPagePosition] = useState(1);

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    const [selectedProcedures, setSelectedProcedures] = useState([]);

    const [pageSettingState, setPageSettingState] = useState({});

    useEffect(() => {
        if (!searchValue) {
            setSearchResult([]);
            fetchProceduresData(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        const search = _.debounce(fetchProceduresData, 300);

        setSearchQuery((prevSearch) => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
        setCurrentPagePosition(1);
    }, [searchValue]);

    const onSearchInputChange = (input) => {
        setSearchValue(input);
    };

    const handleDataRefresh = () => {
        fetchProceduresData();
    };

    const handleOnSelectAll = () => {
        const updatedProceduresList = selectAll(procedures, selectedProcedures);
        setSelectedProcedures(updatedProceduresList);
    };

    const handleOnCheckBoxPress = (item) => () => {
        const { _id } = item;
        const updatedProcedures = checkboxItemPress(_id, selectedProcedures);

        setSelectedProcedures(updatedProcedures);
    };

    const handleOnItemPress = (item, isOpenEditable) => () => {
        navigation.navigate("Procedure", {
            screen: "Procedure",
            initial: false,
            procedure: item,
            isOpenEditable,
            onUpdate: () => {
                handleDataRefresh();
            },
            params: {
                procedure: item,
                isOpenEditable,
                onUpdate: () => {
                    handleDataRefresh();
                },
            },
        });
    };

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal("ActionContainerModal", {
            actions: getFabActions(),
            title: "PROCEDURES ACTIONS",
            onClose: () => {
                setFloatingAction(false);
            },
        });
    };

    const fetchProceduresData = async (pagePosition) => {
        setFetchingData(true);
        return getProcedures(searchValue, recordsPerPage, pagePosition)
            .then((proceduresResult) => {
                const { data = [] } = proceduresResult;
                setProcedures(data);
                return proceduresResult;
            })
            .catch((error) => {
                handleUnauthorizedError(error?.response?.status, setProcedures);
                setPageSettingState({ ...pageSettingState, isDisabled: true });
            })
            .finally((_) => {
                setFetchingData(false);
            });
    };

    const renderProcedureFn = (item) => {
        return (
            <ListItem
                hasCheckBox={true}
                isChecked={selectedProcedures.includes(item._id)}
                onCheckBoxPress={handleOnCheckBoxPress(item)}
                onItemPress={handleOnItemPress(item, false)}
                itemView={procedureItem(item)}
            />
        );
    };

    const procedureItem = (item) => {
        const { physicians = [] } = item;

        const firstName = physicians[0]?.firstName || "";
        const surname = physicians[0]?.surname || "";
        let physicianName = `${firstName} ${surname}`;

        if (firstName === "" || surname === "") {
            physicianName = "Unassigned";
        }

        return (
            <>
                <RightBorderDataItem
                    flex={1.5}
                    fontStyle="--text-base-regular"
                    color="--color-gray-800"
                    text={item?.name}
                />
                <TouchableDataItem
                    flex={1}
                    fontStyle="--text-base-regular"
                    text={`${physicianName}`}
                    isDisabled={true}
                />
                <DataItem
                    flex={1}
                    fontStyle="--text-base-regular"
                    align="center"
                    color="--color-blue-600"
                    text={`${item.duration || 1} hours`}
                />
            </>
        );
    };

    const openUploadProceduresModal = () => {
        modal.closeModals("ActionContainerModal");
        setTimeout(() => {
            modal.openModal("OverlayInfoModal", {
                overlayContent: (
                    <FileUploadComponent
                        onCreated={() => {
                            setFloatingAction(false);
                            modal.openModal("ConfirmationModal", {
                                content: (
                                    <ConfirmationComponent
                                        isError={false}
                                        isEditUpdate={false}
                                        message="Procedures Uploaded successfully!"
                                        onAction={() => {
                                            modal.closeModals(
                                                "ConfirmationModal"
                                            );
                                            setTimeout(() => {
                                                modal.closeModals(
                                                    "ActionContainerModal"
                                                );
                                                fetchProceduresData(
                                                    currentPagePosition
                                                );
                                            }, 200);
                                        }}
                                    />
                                ),
                                onClose: () => {
                                    modal.closeModals("ConfirmationModal");
                                },
                            });
                        }}
                        onCancel={() => setFloatingAction(false)}
                        sendFilePromise={bulkUploadProcedureRequest}
                        title="Upload Procedure"
                    />
                ),
                onClose: () => setFloatingAction(false),
            });
        }, 200);
    };

    const getFabActions = () => {
        const actionsArray = [];
        const isDeleteDisabled = selectedProcedures.length < 1; // displayed if no items are selected.
        const deleteAction = (
            <LongPressWithFeedback
                pressTimer={LONG_PRESS_TIMER.MEDIUM}
                onLongPress={removeProceduresLongPress}
                isDisabled={isDeleteDisabled}
            >
                <ActionItem
                    title="Hold to Delete"
                    disabled={isDeleteDisabled}
                    icon={
                        <WasteIcon
                            strokeColor={
                                isDeleteDisabled
                                    ? DISABLED_COLOR(theme)
                                    : "#C53030"
                            }
                        />
                    }
                    touchable={false}
                />
            </LongPressWithFeedback>
        );

        const isCreateCopyDisabled = selectedProcedures.length !== 1;
        const copyProcedure =
            selectedProcedures.length === 1
                ? procedures.find((item) => item._id === selectedProcedures[0])
                : null;

        const createCopy = (
            <ActionItem
                title="Create Copy"
                icon={
                    <AddIcon
                        strokeColor={
                            isCreateCopyDisabled
                                ? theme.colors["--color-gray-600"]
                                : "#2F855A"
                        }
                    />
                }
                onPress={() => openCreateCopy(copyProcedure)}
                disabled={isCreateCopyDisabled}
                touchable={!isCreateCopyDisabled}
            />
        );
        const createNewProcedure = (
            <ActionItem
                title="New Procedure"
                icon={<AddIcon />}
                onPress={openCreateProcedure}
            />
        );

        const uploadProcedures = (
            <ActionItem
                title="Upload Procedures"
                icon={<ExportIcon />}
                onPress={openUploadProceduresModal}
            />
        );

        if (procedurePermissions.create)
            actionsArray.push(createCopy, createNewProcedure, uploadProcedures);
        if (procedurePermissions.delete) actionsArray.push(deleteAction);
        return (
            <ActionContainer
                floatingActions={actionsArray}
                title="PROCEDURES ACTIONS"
            />
        );
    };

    const removeProceduresLongPress = () => {
        if (selectedProcedures.length > 0)
            openDeletionConfirm({ ids: [...selectedProcedures] });
        else openErrorConfirmation();
    };

    const openDeletionConfirm = (data) => {
        modal.openModal("ConfirmationModal", {
            content: (
                <ConfirmationCheckBoxComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={() => modal.closeModals("ConfirmationModal")}
                    onAction={() => {
                        modal.closeModals("ConfirmationModal");
                        removeProceduresCall(data);
                    }}
                    message="Do you want to delete these item(s)?"
                />
            ),
            onClose: () => {
                modal.closeModals("ConfirmationModal");
            },
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

    const removeProceduresCall = (data) => {
        removeProcedures(data)
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

                setSelectedProcedures([]);
            })
            .catch((error) => {
                openErrorConfirmation();
                setTimeout(() => {
                    modal.closeModals("ActionContainerModal");
                }, 200);
                console.log("Failed to remove group: ", error);
            })
            .finally((_) => {
                setFloatingAction(false);
            });
    };

    const openCreateProcedure = () => {
        modal.closeModals("ActionContainerModal");

        navigation.navigate("CreateProcedure", {
            screen: "CreateProcedure",
            initial: false,
            onCancel: () => {
                navigation.goBack();
                setFloatingAction(false);
            },
            onCreated: (createdItem) => {
                navigation.goBack();
                setFloatingAction(false);
                handleDataRefresh();
                setTimeout(() => {
                    handleOnItemPress(createdItem, false)();
                }, 300);
            },
        });
    };

    const openCreateCopy = (item) => {
        modal.closeModals("ActionContainerModal");

        const procedureCopy = { ...item };

        procedureCopy.procedureReferenceName = procedureCopy.name;
        procedureCopy.procedureReference = procedureCopy._id;
        procedureCopy.name = `${procedureCopy.name} - Copy`;
        procedureCopy.physician = procedureCopy.physicians;

        navigation.navigate("CreateProcedure", {
            screen: "CreateProcedure",
            initial: false,
            referenceProcedure: procedureCopy,
            onCancel: () => {
                navigation.goBack();
                setFloatingAction(false);
            },
            onCreated: (createdItem) => {
                navigation.goBack();
                setFloatingAction(false);
                handleDataRefresh();
                setTimeout(() => {
                    handleOnItemPress(createdItem, false)();
                }, 300);
            },
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
                isFetchingData={isFetchingData}
                onRefresh={handleDataRefresh}
                placeholderText="Search by Procedure, or Physician"
                changeText={onSearchInputChange}
                inputText={searchValue}
                routeName="Procedures"
                listData={procedures}
                listHeaders={listHeaders}
                itemsSelected={selectedProcedures}
                onSelectAll={handleOnSelectAll}
                listItemFormat={renderProcedureFn}
                currentPage={currentPagePosition}
                setCurrentPage={setCurrentPagePosition}
                fetchSectionDataCb={fetchProceduresData}
                isDisabled={isFloatingActionDisabled}
                toggleActionButton={toggleActionButton}
                hasPaginator={true}
                hasActionButton={
                    procedurePermissions.create || procedurePermissions.delete
                }
                hasActions={true}
            />
        </PageSettingsContext.Provider>
    );
};

const mapStateToProps = (state) => ({ procedures: state.procedures });

const mapDispatcherToProp = { setProcedures };

export default connect(mapStateToProps, mapDispatcherToProp)(Procedures);
