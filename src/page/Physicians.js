import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import _ from "lodash";
import { withModal } from "react-native-modalfy";
import { connect } from "react-redux";
import ActionItem from "../components/common/ActionItem";
import ActionContainer from "../components/common/FloatingAction/ActionContainer";
import ListItem from "../components/common/List/ListItem";
import LongPressWithFeedback from "../components/common/LongPressWithFeedback";

import AddIcon from "../../assets/svg/addIcon";
import WasteIcon from "../../assets/svg/wasteIcon";

import {
    checkboxItemPress,
    handleUnauthorizedError,
    selectAll,
} from "../helpers/caseFilesHelpers";

import { getPhysicians, removePhysicians } from "../api/network";
import { setPhysicians } from "../redux/actions/physiciansActions";

import ConfirmationComponent from "../components/ConfirmationComponent";
import CreatePhysicianDialogContainer from "../components/Physicians/CreatePhyscianDialogContainer";
import DataItem from "../components/common/List/DataItem";
import { LONG_PRESS_TIMER } from "../const";

import PaginatedSection from "../components/common/Page/PaginatedSection";
import { PageSettingsContext } from "../contexts/PageSettingsContext";

const Physicians = (props) => {
    const userPermissions = props.route.params.permissions;
    const recordsPerPage = 12;
    const listHeaders = [
        {
            name: "Name",
            alignment: "flex-start",
        },
        {
            name: "Specialisation",
            alignment: "flex-start",
        },
        {
            name: "Cases",
            alignment: "flex-start",
        },
        {
            name: "Status",
            alignment: "center",
        },
    ];
    const { physicians, setPhysicians, modal } = props;

    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    const [currentPagePosition, setCurrentPagePosition] = useState(1);

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    const [selectedPhysiciansId, setSelectedPhysiciansId] = useState([]);

    const [pageSettingState, setPageSettingState] = useState({});

    useEffect(() => {
        if (!searchValue) {
            setSearchResult([]);
            fetchPhysiciansData(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        const search = _.debounce(fetchPhysiciansData, 300);

        setSearchQuery((prevSearch) => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
        setCurrentPagePosition(1);
    }, [searchValue]);

    const onRefresh = () => {
        fetchPhysiciansData();
    };

    const onSearchInputChange = (input) => {
        setSearchValue(input);
    };

    const handleDataRefresh = () => {
        fetchPhysiciansData();
    };

    const handleOnSelectAll = () => {
        const updatedPhysiciansList = selectAll(
            physicians,
            selectedPhysiciansId
        );
        setSelectedPhysiciansId(updatedPhysiciansList);
    };

    const handleOnCheckBoxPress = (item) => () => {
        const { _id } = item;
        const updatedPhysiciansList = checkboxItemPress(
            _id,
            selectedPhysiciansId
        );
        setSelectedPhysiciansId(updatedPhysiciansList);
    };

    const handleOnItemPress = (item, isOpenEditable) => {
        props.navigation.navigate("PhysicianPage", {
            initial: false,
            physician: item,
            updatePhysicians: userPermissions.update,
            isEdit: isOpenEditable,
            reloadPhysicians: () => fetchPhysiciansData(currentPagePosition),
        });
    };

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal("ActionContainerModal", {
            actions: getFabActions(),
            title: "PHYSICIAN ACTIONS",
            onClose: () => {
                setFloatingAction(false);
            },
        });
    };

    const fetchPhysiciansData = async (pagePosition) => {
        setFetchingData(true);
        return getPhysicians(searchValue, recordsPerPage, pagePosition)
            .then((physicianResult) => {
                const { data = [] } = physicianResult;
                setPhysicians(data);
                return physicianResult;
            })
            .catch((error) => {
                handleUnauthorizedError(error?.response?.status, setPhysicians);
                setPageSettingState({ ...pageSettingState, isDisabled: true });
            })
            .finally((_) => {
                setFetchingData(false);
            });
    };

    const renderPhysiciansFn = (item) => (
        <ListItem
            hasCheckBox={true}
            isChecked={selectedPhysiciansId.includes(item._id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={() => handleOnItemPress(item, false)}
            itemView={physiciansItem(item)}
        />
    );

    const statusColor = (status) =>
        status === "Active" ? "#4E5664" : "#E53E3E";

    const physiciansItem = (item) => {
        const {
            surname = "",
            field: type = "",
            status = "Active",
            casesCount = 0,
        } = item;
        return (
            <>
                <View style={[styles.item, {}]}>
                    <Text
                        numberOfLines={1}
                        style={[
                            styles.itemText,
                            {
                                fontSize: 16,
                                color: "#3182CE",
                            },
                        ]}
                    >
                        Dr. {surname}
                    </Text>
                </View>
                <View style={[styles.item, { alignItems: "flex-start" }]}>
                    <Text
                        numberOfLines={1}
                        style={[
                            styles.itemText,
                            {
                                fontSize: 16,
                                color: "#4E5664",
                            },
                        ]}
                    >
                        {type}
                    </Text>
                </View>
                <DataItem
                    flex={1}
                    text={casesCount}
                    color="--color-blue-600"
                    fontStyle="--text-sm-medium"
                    align="center"
                />
                <View style={[styles.item, { alignItems: "center" }]}>
                    <Text
                        numberOfLines={1}
                        style={[
                            styles.itemText,
                            {
                                fontSize: 14,
                                color: statusColor(status),
                            },
                        ]}
                    >
                        {status}
                    </Text>
                </View>
            </>
        );
    };

    const getFabActions = () => {
        const deleteAction = userPermissions.delete && (
            <LongPressWithFeedback
                pressTimer={LONG_PRESS_TIMER.MEDIUM}
                onLongPress={removePhysiciansLongPress}
            >
                <ActionItem
                    title="Hold to Delete"
                    icon={<WasteIcon />}
                    onPress={() => {}}
                    touchable={false}
                />
            </LongPressWithFeedback>
        );
        const createActionPhysician = userPermissions.create && (
            <ActionItem
                title="Add Physician"
                icon={<AddIcon />}
                onPress={openCreatePhysicians}
            />
        );

        return (
            <ActionContainer
                floatingActions={[deleteAction, createActionPhysician]}
                title="PHYSICIAN ACTIONS"
            />
        );
    };

    const removePhysiciansLongPress = () => {
        if (selectedPhysiciansId.length > 0)
            openDeletionConfirm({ ids: [...selectedPhysiciansId] });
        else openErrorConfirmation();
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
                        removePhysiciansCall(data);
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

    const removePhysiciansCall = (data) => {
        removePhysicians(data)
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
                                    onRefresh();
                                }, 200);
                            }}
                        />
                    ),
                    onClose: () => {
                        modal.closeModals("ConfirmationModal");
                    },
                });

                setSelectedPhysiciansId([]);
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

    const openCreatePhysicians = () => {
        modal.closeModals("ActionContainerModal");

        setTimeout(() => {
            modal.openModal("OverlayModal", {
                content: (
                    <CreatePhysicianDialogContainer
                        onCancel={() => setFloatingAction(false)}
                        onCreated={(item) => {
                            handleOnItemPress(item, true);
                        }}
                    />
                ),
                onClose: () => setFloatingAction(false),
            });
        }, 200);
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
                placeholderText="Search by Physician or phone number"
                changeText={onSearchInputChange}
                inputText={searchValue}
                routeName="Physicians"
                listData={physicians}
                listHeaders={listHeaders}
                itemsSelected={selectedPhysiciansId}
                onSelectAll={handleOnSelectAll}
                listItemFormat={renderPhysiciansFn}
                currentPage={currentPagePosition}
                fetchSectionDataCb={fetchPhysiciansData}
                setCurrentPage={setCurrentPagePosition}
                isDisabled={isFloatingActionDisabled}
                toggleActionButton={toggleActionButton}
                hasPaginator={true}
                hasActionButton={
                    (userPermissions.create || userPermissions.delete) !== false
                }
                hasActions={true}
            />
        </PageSettingsContext.Provider>
    );
};

const mapStateToProps = (state) => {
    const physicians = state.physicians.map((item) => ({
        ...item,
    }));

    return { physicians };
};

const mapDispatcherToProp = { setPhysicians };

export default connect(
    mapStateToProps,
    mapDispatcherToProp
)(withModal(Physicians));

const styles = StyleSheet.create({
    item: { flex: 1 },
    itemText: {},
    footer: {
        flex: 1,
        alignSelf: "flex-end",
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        marginBottom: 20,
        right: 0,
        marginRight: 30,
    },
});
