import { useTheme } from "emotion-theming";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useModal } from "react-native-modalfy";
import { connect } from "react-redux";
import AddIcon from "../../assets/svg/addIcon";
import WasteIcon from "../../assets/svg/wasteIcon";
import { getStorage, removeStorageLocations } from "../api/network";
import ConfirmationComponent from "../components/ConfirmationComponent";
import CreateStorageDialogContainer from "../components/Storage/CreateStorageDialogContainer";
import ActionItem from "../components/common/ActionItem";
import ActionContainer from "../components/common/FloatingAction/ActionContainer";
import DataItem from "../components/common/List/DataItem";
import ListItem from "../components/common/List/ListItem";
import RightBorderDataItem from "../components/common/List/RightBorderDataItem";
import LongPressWithFeedback from "../components/common/LongPressWithFeedback";
import { LONG_PRESS_TIMER, RECORDS_PER_PAGE_MAIN } from "../const";
import {
    checkboxItemPress,
    handleUnauthorizedError,
    selectAll,
} from "../helpers/caseFilesHelpers";
import { setStorage } from "../redux/actions/storageActions";

import PaginatedSection from "../components/common/Page/PaginatedSection";
import { PageSettingsContext } from "../contexts/PageSettingsContext";

const listHeaders = [
    {
        name: "Room Name",
        alignment: "flex-start",
        flex: 1.2,
    },
    {
        name: "Stored Items",
        alignment: "flex-start",
        flex: 1,
    },
    {
        name: "Pending Transfers",
        alignment: "flex-start",
        flex: 1,
    },
];

function Storage(props) {
    const { storageLocations = [], setStorage } = props;

    const storagePermissions = props.route.params.storagePermissions;
    const pageTitle = "Storage";
    const modal = useModal();
    const theme = useTheme();

    const [currentPage, setCurrentPage] = useState(1);
    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    const [selectedIds, setSelectedIds] = useState([]);

    const [pageSettingState, setPageSettingState] = useState({});

    useEffect(() => {
        //TO-DO: Should search results replace the existing list data?
        if (!searchValue) {
            setSearchResult([]);
            fetchStorageData(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        const search = _.debounce(fetchStorageData, 300);

        setSearchQuery((prevSearch) => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
        setCurrentPage(1);
    }, [searchValue]);

    const onRefresh = () => {
        fetchStorageData();
    };

    const onSearchChange = (input) => {
        setSearchValue(input);
    };

    const onSelectAll = () => {
        const updatedStorage = selectAll(storageLocations, selectedIds);
        setSelectedIds(updatedStorage);
    };

    const onCheckBoxPress = (item) => () => {
        const { _id } = item;
        const updatedStorage = checkboxItemPress(_id, selectedIds);
        setSelectedIds(updatedStorage);
    };

    const onItemPress = (item) => () => {
        props.navigation.navigate("StoragePage", {
            initial: false,
            storage: item,
            updateStorage: storagePermissions.update,
            reloadStorageLocations: () => fetchStorageData(currentPage),
        });
    };

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal("ActionContainerModal", {
            actions: getFabActions(),
            title: "STORAGE ACTIONS",
            onClose: () => {
                setFloatingAction(false);
            },
        });
    };

    const storageItem = ({ name, stock, levels, products, transfers }) => (
        <>
            <RightBorderDataItem
                fontStyle="--text-base-regular"
                color="--color-gray-800"
                text={name}
                flex={1.2}
            />
            <DataItem
                fontStyle="--text-base-medium"
                color="--color-gray-800"
                align="center"
                text={`${products} ${products === 1 ? "Product" : "Products"}`}
            />
            <DataItem
                fontStyle="--text-base-medium"
                color="--color-blue-600"
                align="center"
                text={`${transfers} ${
                    transfers === 1 ? "Transfer" : "Transfers"
                }`}
            />
        </>
    );

    const fetchStorageData = async (pagePosition) => {
        setFetchingData(true);
        return getStorage(searchValue, RECORDS_PER_PAGE_MAIN, pagePosition)
            .then((storageResult) => {
                const { data = [] } = storageResult;
                setStorage(data);
                return storageResult;
            })
            .catch((error) => {
                handleUnauthorizedError(error?.response?.status, setStorage);
                setPageSettingState({ ...pageSettingState, isDisabled: true });
            })
            .finally((_) => {
                setFetchingData(false);
            });
    };

    const renderItem = (item) => {
        const totalStock =
            item.inventoryLocations?.reduce(
                (acc, item) => acc + item.stock,
                0
            ) || 0;
        const totalProducts = item?.inventoryLocations?.length || 0;
        const totalTransfers = item?.transfers?.length || 0;

        const formattedItem = {
            name: item.name,
            stock: totalStock,
            products: totalProducts,
            transfers: totalTransfers,
            levels: {
                min: 0,
                max: item.capacity,
            },
        };

        const itemView = storageItem(formattedItem);

        return (
            <ListItem
                isChecked={selectedIds.includes(item._id)}
                onCheckBoxPress={onCheckBoxPress(item)}
                onItemPress={onItemPress(item)}
                itemView={itemView}
            />
        );
    };

    const getFabActions = () => {
        const isDisabled = selectedIds.length === 0;
        const deleteAction = storagePermissions.delete && (
            <View style={{ borderRadius: 6, flex: 1, overflow: "hidden" }}>
                <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.LONG}
                    onLongPress={removeStorageLocationsLongPress}
                    isDisabled={isDisabled}
                >
                    <ActionItem
                        title="Hold to Delete"
                        icon={
                            <WasteIcon
                                strokeColor={
                                    isDisabled
                                        ? theme.colors["--color-gray-600"]
                                        : theme.colors["--color-red-700"]
                                }
                            />
                        }
                        onPress={() => {}}
                        touchable={false}
                        disabled={isDisabled}
                    />
                </LongPressWithFeedback>
            </View>
        );

        const createAction = storagePermissions.create && (
            <ActionItem
                title="New Location"
                icon={<AddIcon />}
                onPress={openCreateStorageModel}
            />
        );

        return (
            <ActionContainer
                floatingActions={[deleteAction, createAction]}
                title="STORAGE ACTIONS"
            />
        );
    };

    const removeStorageLocationsLongPress = () => {
        if (selectedIds.length > 0)
            openDeletionConfirm({ ids: [...selectedIds] });
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
                        removeStorageLocationsCall(data);
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

    const removeStorageLocationsCall = (data) => {
        removeStorageLocations(data)
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

                setSelectedIds([]);
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

    const openCreateStorageModel = () => {
        modal.closeModals("ActionContainerModal");

        setTimeout(() => {
            modal.openModal("OverlayModal", {
                content: (
                    <CreateStorageDialogContainer
                        onCreated={(item) => {
                            onItemPress(item)();
                            setFloatingAction(false);
                        }}
                        onCancel={() => setFloatingAction(false)}
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
                placeholderText="Search by room name."
                fetchSectionDataCb={fetchStorageData}
                setCurrentPage={setCurrentPage}
                routeName={pageTitle}
                listData={storageLocations}
                inputText={searchValue}
                itemsSelected={selectedIds}
                listItemFormat={renderItem}
                listHeaders={listHeaders}
                changeText={onSearchChange}
                onRefresh={onRefresh}
                isFetchingData={isFetchingData}
                onSelectAll={onSelectAll}
                currentPage={currentPage}
                isDisabled={isFloatingActionDisabled}
                toggleActionButton={toggleActionButton}
                hasPaginator={true}
                hasActionButton={
                    storagePermissions.create || storagePermissions.delete
                }
                hasActions={true}
            />
        </PageSettingsContext.Provider>
    );
}

const mapStateToProps = (state) => ({ storageLocations: state.storage });

const mapDispatcherToProp = { setStorage };

export default connect(mapStateToProps, mapDispatcherToProp)(Storage);
