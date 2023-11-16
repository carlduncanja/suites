import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";

import { connect } from "react-redux";
import { useModal } from "react-native-modalfy";
import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import _ from "lodash";
import IconButton from "../../components/common/Buttons/IconButton";
import LevelIndicator from "../../components/common/LevelIndicator/LevelIndicator";
import LongPressWithFeedback from "../../components/common/LongPressWithFeedback";
import ActionItem from "../../components/common/ActionItem";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import CollapsibleListItem from "../../components/common/List/CollapsibleListItem";
import Item from "../../components/common/Table/Item";
import DataItem from "../../components/common/List/DataItem";
import RightBorderDataItem from "../../components/common/List/RightBorderDataItem";
import ContentDataItem from "../../components/common/List/ContentDataItem";
import ConfirmationComponent from "../../components/ConfirmationComponent";
import MultipleShadowsContainer from "../../components/common/MultipleShadowContainer";

import CollapsedIcon from "../../../assets/svg/closeArrow";
import ActionIcon from "../../../assets/svg/dropdownIcon";
import WasteIcon from "../../../assets/svg/wasteIcon";
import AddIcon from "../../../assets/svg/addIcon";
import ExportIcon from "../../../assets/svg/exportIcon";

import { numberFormatter } from "../../utils/formatter";
import { setInventory } from "../../redux/actions/InventorActions";
import {
    getInventoriesGroup,
    getInventoriesGroupBulkUploadRequest,
    removeInventoryGroups,
    removeInventoryVariants,
} from "../../api/network";
import {
    selectAll,
    checkboxItemPress,
    handleUnauthorizedError,
} from "../../helpers/caseFilesHelpers";
import { LONG_PRESS_TIMER, RECORDS_PER_PAGE_MAIN } from "../../const";
import { PageSettingsContext } from "../../contexts/PageSettingsContext";
import FileUploadComponent from "../../components/FileUploadComponent";
import PaginatedSection from "../../components/common/Page/PaginatedSection";

function Inventory(props) {
    const { inventory, setInventory, route, navigation } = props;

    const inventoryPermissions = route.params.inventoryPermissions;
    const pageTitle = "Inventory";
    const modal = useModal();
    const theme = useTheme();

    const [currentPage, setCurrentPage] = useState(1);
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedVariants, setSelectedVariants] = useState([]);

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    const [expandedItems, setExpandedItems] = useState([]);
    const [pageSettingState, setPageSettingState] = useState({});

    useEffect(() => {
        if (!searchValue) {
            setSearchResult([]);
            fetchInventory(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        const search = _.debounce(fetchInventory, 300);

        setSearchQuery((prevSearch) => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
        setCurrentPage(1);
    }, [searchValue]);

    const onSearchChange = (input) => {
        setSearchValue(input);
    };

    const onItemPress = (item) => () => {
        navigation.navigate("InventoryPage", {
            screen: "InventoryPage",
            initial: false,
            data: item,
            isGroup: true,
            isEdit: false,
            inventoryPermissions: inventoryPermissions.update,
        });
    };

    const onItemVariantPress = (item, parentItem) => () => {
        const updatedItem = {
            ...item,
            name: item?.itemName,
            groupId: parentItem?._id,
            groupName: parentItem?.name,
        };
        navigation.navigate("InventoryVariantPage", {
            screen: "InventoryVariantPage",
            initial: false,
            data: updatedItem,
            isEdit: false,
            inventoryPermissions: inventoryPermissions.update,
        });
    };

    const onRefresh = () => {
        fetchInventory();
    };

    const onSelectAll = () => {
        const updatedInventory = selectAll(inventory, selectedIds);
        setSelectedIds(updatedInventory);
    };

    const toggleActionButton = () => {
        setFloatingAction(!isFloatingActionDisabled);
        modal.openModal("ActionContainerModal", {
            actions: getFabActions(),
            title: "INVENTORY ACTIONS",
            onClose: () => setFloatingAction(false),
        });
    };

    const onPressParentCheckbox = (item) => () => {
        const { _id } = item;

        const updatedInventory = checkboxItemPress(_id, selectedIds);
        setSelectedIds(updatedInventory);

        const removeChildren = selectedVariants.filter(
            (obj) => obj.groupId !== _id
        );
        setSelectedVariants(removeChildren);
    };

    const onPressChildCheckbox = (inventoryVariant, inventoryGroup) => () => {
        const { _id } = inventoryVariant;
        const { _id: groupId } = inventoryGroup;

        const variantIds = selectedVariants.map((variantObj) => variantObj._id);
        const updatedChildIds = checkboxItemPress(_id, variantIds);

        const updatedSelectedVariants = updatedChildIds.map((_id) => ({
            _id,
            groupId: inventoryGroup._id,
        }));
        setSelectedVariants(updatedSelectedVariants);

        const updatedIds = selectedIds.filter((id) => id !== groupId);
        setSelectedIds(updatedIds);
    };

    const onCollapseView = (key) => {
        if (expandedItems.includes(key)) {
            setExpandedItems(expandedItems.filter((item) => item !== key));
        } else {
            setExpandedItems([...expandedItems, key]);
        }
    };

    const getFabActions = () => {
        const actionsArray = [];
        const isRemoveGroupsDisabled = selectedIds.length === 0;
        const deleteAction = inventoryPermissions.delete && (
            <View
                style={{
                    borderRadius: 6,
                    flex: 1,
                    overflow: "hidden",
                }}
            >
                <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.LONG}
                    onLongPress={removeGroups}
                    isDisabled={isRemoveGroupsDisabled}
                >
                    <ActionItem
                        title="Hold to Delete Group"
                        icon={
                            <WasteIcon
                                strokeColor={
                                    isRemoveGroupsDisabled
                                        ? theme.colors["--color-gray-600"]
                                        : theme.colors["--color-red-700"]
                                }
                            />
                        }
                        disabled={isRemoveGroupsDisabled}
                        touchable={false}
                    />
                </LongPressWithFeedback>
            </View>
        );

        const isRemoveVariantsDisabled = selectedVariants.length === 0;
        const deleteInventoryItemAction = inventoryPermissions.delete && (
            <View
                style={{
                    borderRadius: 6,
                    flex: 1,
                    overflow: "hidden",
                }}
            >
                <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.LONG}
                    onLongPress={removeVariants}
                    isDisabled={isRemoveVariantsDisabled}
                >
                    <ActionItem
                        title="Hold to Delete Inventory"
                        icon={
                            <WasteIcon
                                strokeColor={
                                    isRemoveVariantsDisabled
                                        ? theme.colors["--color-gray-600"]
                                        : theme.colors["--color-red-700"]
                                }
                            />
                        }
                        disabled={isRemoveVariantsDisabled}
                        touchable={false}
                    />
                </LongPressWithFeedback>
            </View>
        );

        const createAction = (
            <ActionItem
                title="Add Item"
                icon={<AddIcon />}
                onPress={openCreateInventoryModel}
            />
        );
        const createGroup = (
            <ActionItem
                title="Create Item Group"
                icon={<AddIcon />}
                onPress={openCreateGroupDialog}
            />
        );
        const uploadInventory = (
            <ActionItem
                title="Upload Inventory"
                icon={<ExportIcon />}
                onPress={openUploadInventoryModal}
            />
        );

        if (inventoryPermissions.delete) {
            actionsArray.push(
                uploadInventory,
                deleteAction,
                deleteInventoryItemAction
            );
        }

        if (inventoryPermissions.create) {
            actionsArray.push(uploadInventory, createAction, createGroup);
        }

        return (
            <ActionContainer
                floatingActions={actionsArray}
                title="INVENTORY ACTIONS"
            />
        );
    };

    const removeGroups = () => {
        openConfirmationScreen(() => removeGroupsCall(selectedIds));
    };

    const removeVariants = () => {
        const variantIds = selectedVariants.map((variant) => variant._id);
        openConfirmationScreen(() => removeVariantsCall(variantIds));
    };

    const openCreateInventoryModel = () => {
        modal.closeModals("ActionContainerModal");
        navigation.navigate("CreateInventoryDialogContainer", {
            screen: "CreateInventoryDialogContainer",
            initial: false,
            onCreated: () => {
                setFloatingAction(false);
                onRefresh();
            },
            onCancel: () => {
                setFloatingAction(false);
                navigation.goBack();
            },
        });
    };

    const openCreateGroupDialog = () => {
        modal.closeModals("ActionContainerModal");
        navigation.navigate("CreateInventoryGroupDialogContainer", {
            screen: "CreateInventoryGroupDialogContainer",
            initial: false,
            onCreated: () => {
                onRefresh();
                setFloatingAction(false);
                navigation.goBack();
            },
            onCancel: () => {
                setFloatingAction(false);
                navigation.goBack();
            },
        });
    };

    const openUploadInventoryModal = () => {
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
                                        message="Inventory updated successfully!"
                                        onAction={() => {
                                            modal.closeModals(
                                                "ConfirmationModal"
                                            );
                                            setTimeout(() => {
                                                modal.closeModals(
                                                    "ActionContainerModal"
                                                );
                                                onRefresh();
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
                        sendFilePromise={getInventoriesGroupBulkUploadRequest}
                        title="Upload Inventory"
                    />
                ),
                onClose: () => setFloatingAction(false),
            });
        }, 200);
    };

    const getLevels = (locations = []) => {
        const levelsTotal = {
            max: 0,
            min: 0,
            critical: 0,
            ideal: 0,
        };

        locations.forEach((location) => {
            const { levels = {} } = location;

            levelsTotal.max += levels.max || 0;
            levelsTotal.min += levels.min || 0;
            levelsTotal.critical += levels.critical || 0;
            levelsTotal.ideal += levels.ideal || 0;
        });

        return levelsTotal;
    };

    const getStock = (locations) =>
        locations.reduce((acc, curr) => acc + curr.stock, 0);

    const inventoryItemView = (
        { name, stock, locations, levels },
        onActionPress,
        isCollapsed
    ) => (
        <>
            {isCollapsed ? (
                <DataItem
                    text={name}
                    flex={2.3}
                    color="--color-gray-800"
                    fontStyle="--text-base-regular"
                />
            ) : (
                <RightBorderDataItem
                    text={name}
                    flex={2.3}
                    color="--color-gray-800"
                    fontStyle="--text-base-regular"
                />
            )}
            <DataItem
                text={numberFormatter(stock)}
                color="--color-gray-700"
                fontStyle="--text-base-regular"
                align="center"
                flex={1}
            />
            <ContentDataItem
                align="center"
                content={
                    <LevelIndicator
                        max={levels.max}
                        min={0}
                        level={stock}
                        ideal={levels.ideal}
                        critical={levels.critical}
                    />
                }
            />
            <LocationsWrapper>
                <MultipleShadowsContainer shadows={shadows}>
                    <LocationsContainer theme={theme} isCollapsed={isCollapsed}>
                        <LocationText theme={theme} isCollapsed={isCollapsed}>
                            {locations}
                        </LocationText>
                    </LocationsContainer>
                </MultipleShadowsContainer>
            </LocationsWrapper>

            <ContentDataItem
                align="center"
                flex={0.5}
                content={
                    <IconButton
                        Icon={isCollapsed ? <ActionIcon /> : <CollapsedIcon />}
                        onPress={onActionPress}
                    />
                }
            />
        </>
    );

    const inventoryVariantItem = ({ itemName, stock, levels, locations }) => (
        <>
            <RightBorderDataItem
                text={itemName}
                flex={4.2}
                color="--color-blue-600"
                fontStyle="--text-sm-medium"
            />
            <DataItem
                text={numberFormatter(stock)}
                color="--color-gray-700"
                fontStyle="--text-base-regular"
                align="center"
            />
            <ContentDataItem
                align="center"
                flex={3.5}
                content={
                    <LevelIndicator
                        max={levels.max}
                        min={0}
                        level={stock}
                        ideal={levels.ideal}
                        critical={levels.critical}
                    />
                }
            />

            <DataItem
                flex={1.5}
                text={locations}
                color="--color-blue-600"
                fontStyle="--text-base-regular"
                align="flex-end"
            />

            <DataItem flex={0.5} />
        </>
    );

    const renderChildItemView = (item, parentItem, onActionPress) => {
        const { _id } = item;
        const variantIds = selectedVariants.map((obj) => obj._id);

        return (
            <Item
                itemView={inventoryVariantItem(item, onActionPress)}
                hasCheckBox={true}
                isChecked={variantIds.includes(_id)}
                onCheckBoxPress={onPressChildCheckbox(item, parentItem)}
                onItemPress={onItemVariantPress(item, parentItem)}
            />
        );
    };

    const renderItem = (item) => {
        const formattedItem = {
            _id: item?._id,
            name: item?.name || "",
            stock: item?.stock || 0,
            locations: item?.locations || 0,
            levels: item?.levels,
        };

        let { variants = [] } = item;

        variants = variants.map((item) => {
            const { storageLocations = [] } = item;
            const levels = getLevels(storageLocations);
            const stock = getStock(storageLocations) || 0;

            return {
                _id: item?._id,
                itemName: item?.name || "",
                stock,
                locations: storageLocations.length,
                storageLocations,
                levels: levels || {},
            };
        });

        const isIndeterminate = selectedVariants.some(
            (variant) => variant.groupId === item._id
        );

        return (
            <CollapsibleListItem
                isChecked={selectedIds.includes(item._id)}
                onCheckBoxPress={onPressParentCheckbox(item)}
                hasCheckBox={true}
                isIndeterminate={isIndeterminate}
                onItemPress={onItemPress(item)}
                collapsed={!expandedItems.includes(item.name)}
                onCollapsedEnd={() => onCollapseView(item.name)}
                render={(collapse, isCollapsed) =>
                    inventoryItemView(formattedItem, collapse, isCollapsed)
                }
                backgroundColor={
                    item.name.toLowerCase().includes("ungrouped")
                        ? "#EEF2F6"
                        : ""
                }
            >
                <FlatList
                    data={variants}
                    renderItem={({ item }) =>
                        renderChildItemView(item, formattedItem, () => {})
                    }
                    keyExtractor={(item, index) => `${index}`}
                    backgroundColor={
                        item.name.toLowerCase().includes("ungrouped")
                            ? "#EEF2F6"
                            : ""
                    }
                    ItemSeparatorComponent={() => (
                        <View
                            style={{
                                flex: 1,
                                margin: 10,
                                marginLeft: 10,
                                borderColor: "#E3E8EF",
                                borderWidth: 0.5,
                            }}
                        />
                    )}
                />
            </CollapsibleListItem>
        );
    };

    const openConfirmationScreen = (callbackFn) => {
        modal.openModal("ConfirmationModal", {
            content: (
                <ConfirmationComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={() => modal.closeModals("ConfirmationModal")}
                    onAction={() => {
                        modal.closeModals("ConfirmationModal");
                        callbackFn();
                    }}
                    message="Do you want to delete these item(s)?"
                />
            ),
            onClose: () => {
                modal.closeModals("ConfirmationModal");
            },
        });
    };

    const openErrorConfirmation = (message) => {
        modal.openModal("ConfirmationModal", {
            content: (
                <ConfirmationComponent
                    isError={true}
                    isEditUpdate={false}
                    message={message}
                    onCancel={() => modal.closeModals("ConfirmationModal")}
                />
            ),
            onClose: () => {
                modal.closeModals("ConfirmationModal");
            },
        });
    };

    const fetchInventory = async (pagePosition) => {
        setIsFetchingData(true);
        return getInventoriesGroup(
            searchValue,
            RECORDS_PER_PAGE_MAIN,
            pagePosition
        )
            .then((inventoryResult) => {
                const { data = [] } = inventoryResult;
                setInventory(data);
                return inventoryResult;
            })
            .catch((error) => {
                handleUnauthorizedError(error?.response?.status, setInventory);
                setPageSettingState({ ...pageSettingState, isDisabled: true });
                throw error;
            })
            .finally(() => {
                setIsFetchingData(false);
            });
    };

    const removeGroupsCall = (ids) => {
        removeInventoryGroups(ids)
            .then((_) => {
                modal.openModal("ConfirmationModal", {
                    content: (
                        <ConfirmationComponent
                            isError={false}
                            isEditUpdate={false}
                            message="Item Group(s) successfully removed."
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
                const errorMessage = error.response?.data?.msg.includes(
                    "Ungrouped"
                )
                    ? "Unable to remove 'Ungrouped' Inventory Group."
                    : "";
                openErrorConfirmation(errorMessage);
                setTimeout(() => {
                    modal.closeModals("ActionContainerModal");
                }, 200);
                console.log("Failed to remove group: ", error);
            })
            .finally((_) => {
                setFloatingAction(false);
            });
    };

    const removeVariantsCall = (ids) => {
        removeInventoryVariants(ids)
            .then((_) => {
                modal.openModal("ConfirmationModal", {
                    content: (
                        <ConfirmationComponent
                            isError={false}
                            isEditUpdate={false}
                            message="Item(s) successfully removed."
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
                setSelectedVariants([]);
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

    return (
        <PageSettingsContext.Provider
            value={{
                pageSettingState,
                setPageSettingState,
            }}
        >
            <PaginatedSection
                changeText={onSearchChange}
                currentPage={currentPage}
                fetchSectionDataCb={fetchInventory}
                hasActionButton={
                    inventoryPermissions.delete || inventoryPermissions.create
                }
                hasActions={true}
                hasPaginator={true}
                inputText={searchValue}
                isDisabled={isFloatingActionDisabled}
                isFetchingData={isFetchingData}
                itemsSelected={selectedIds}
                listData={inventory}
                listHeaders={listHeaders}
                listItemFormat={renderItem}
                onRefresh={onRefresh}
                onSelectAll={onSelectAll}
                placeholderText="Search by item name."
                routeName={pageTitle}
                setCurrentPage={setCurrentPage}
                toggleActionButton={toggleActionButton}
            />
        </PageSettingsContext.Provider>
    );
}

const mapStateToProps = (state) => {
    const getLevels = (variants = []) => {
        const levelsTotal = {
            max: 0,
            min: 0,
            critical: 0,
            ideal: 0,
        };

        variants.forEach((variant) => {
            const { storageLocations = [] } = variant;
            storageLocations.map((location) => {
                const { levels = {} } = location;

                levelsTotal.max += levels.max || 0;
                levelsTotal.min += levels.min || 0;
                levelsTotal.critical += levels.critical || 0;
                levelsTotal.ideal += levels.ideal || 0;
            });
        });

        return levelsTotal;
    };

    const getLocations = (variant) => {
        let count = 0;
        variant.map((item) => {
            count += item?.storageLocations?.length;
        });
        return count;
    };

    const getStock = (variant) => {
        let count = 0;
        variant.map((item) => {
            count += item.storageLocations.reduce(
                (acc, curr) => acc + curr.stock,
                0
            );
        });
        return count;
    };

    const inventory = state.inventory.map((item) => {
        const { variants = [] } = item;

        const stock = getStock(variants);
        const locations = getLocations(variants);
        const levels = getLevels(variants);

        return {
            ...item,
            stock,
            locations,
            levels,
        };
    });

    return { inventory };
};

const mapDispatchToProps = { setInventory };

const listHeaders = [
    {
        name: "Item Name",
        alignment: "flex-start",
        flex: 1.5,
        hasSort: false,
    },
    {
        name: "In Stock",
        alignment: "center",
        flex: 1.4,
        hasSort: false,
    },
    {
        name: "Capacity",
        alignment: "center",
        flex: 1,
    },
    {
        name: "Locations",
        alignment: "center",
        flex: 1,
    },
    {
        name: "",
        alignment: "center",
        flex: 0.5,
    },
];

const LocationsWrapper = styled.View`
    flex: 1;
    align-items: center;
    /* background-color:yellowgreen; */
`;

const LocationsContainer = styled.View`
    height: 24px;
    width: 28px;
    background-color: ${({ theme, isCollapsed }) =>
        isCollapsed === false
            ? theme.colors["--color-gray-100"]
            : theme.colors["--default-shade-white"]};
    border-radius: 4px;
    align-items: center;
    justify-content: center;
`;

const LocationText = styled.Text(({ theme, isCollapsed }) => ({
    ...theme.font["--text-base-regular"],
    color:
        isCollapsed === false
            ? theme.colors["--color-gray-500"]
            : theme.colors["--color-gray-700"],
}));

const shadows = [
    {
        shadowColor: "black",
        shadowOffset: {
            width: 1,
            height: 0,
        },
        shadowOpacity: 0.06,
        shadowRadius: 2,
    },
    {
        shadowColor: "black",
        shadowOffset: {
            width: 1,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
];

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
