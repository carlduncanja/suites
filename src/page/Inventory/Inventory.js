import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import { useModal } from 'react-native-modalfy';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import _ from 'lodash';
import IconButton from '../../components/common/Buttons/IconButton';
import LevelIndicator from '../../components/common/LevelIndicator/LevelIndicator';
import LongPressWithFeedback from '../../components/common/LongPressWithFeedback';
import ActionItem from '../../components/common/ActionItem';
import ActionContainer from '../../components/common/FloatingAction/ActionContainer';
import CreateInventoryDialogContainer from '../../components/Inventory/CreateInventoryDialogContainer';
import CollapsibleListItem from '../../components/common/List/CollapsibleListItem';
import CreateInventoryGroupDialogContainer from '../../components/Inventory/CreateInventoryGroupDialogContainer';
import NavPage from '../../components/common/Page/NavPage';
import Item from '../../components/common/Table/Item';
import DataItem from '../../components/common/List/DataItem';
import RightBorderDataItem from '../../components/common/List/RightBorderDataItem';
import ContentDataItem from '../../components/common/List/ContentDataItem';
import ConfirmationComponent from '../../components/ConfirmationComponent';
import MultipleShadowsContainer from '../../components/common/MultipleShadowContainer';

import CollapsedIcon from '../../../assets/svg/closeArrow';
import ActionIcon from '../../../assets/svg/dropdownIcon';
import SvgIcon from '../../../assets/SvgIcon';
import WasteIcon from '../../../assets/svg/wasteIcon';
import TransferIcon from '../../../assets/svg/transferIcon';
import AddIcon from '../../../assets/svg/addIcon';
import ExportIcon from '../../../assets/svg/exportIcon';

import { numberFormatter } from '../../utils/formatter';
import { setInventory } from '../../redux/actions/InventorActions';
import {
    getInventoriesGroup, getInventoriesGroupBulkUploadRequest,
    removeInventoryGroup,
    removeInventoryGroups,
    removeInventoryVariants
} from '../../api/network';
import {
    useNextPaginator,
    usePreviousPaginator,
    selectAll,
    checkboxItemPress,
    handleUnauthorizedError
} from '../../helpers/caseFilesHelpers';
import { LONG_PRESS_TIMER } from '../../const';
import { PageSettingsContext } from '../../contexts/PageSettingsContext';
import FileUploadComponent from "../../components/FileUploadComponent";

function Inventory(props) {
    const {
        inventory,
        setInventory,
        route,
        navigation
    } = props;

    const inventoryPermissions = route.params.inventoryPermissions
    console.log('hajhska', inventoryPermissions.create)
    const pageTitle = 'Inventory';
    const modal = useModal();
    const theme = useTheme();
    const recordsPerPage = 10;

    // ##### States

    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedVariants, setSelectedVariants] = useState([]);

    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    const [expandedItems, setExpandedItems] = useState([]);

    // pagination
    const [totalPages, setTotalPages] = useState(1);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [isNextDisabled, setNextDisabled] = useState(false);
    const [isPreviousDisabled, setPreviousDisabled] = useState(true);

    const [pageSettingState, setPageSettingState] = useState({});

    // ##### Lifecycle Methods

    useEffect(() => {
        if (!inventory.length) fetchInventory(currentPagePosition);
        setTotalPages(Math.ceil(inventory.length / recordsPerPage));
    }, []);

    useEffect(() => {
        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            fetchInventory(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchInventory, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
        setCurrentPagePosition(1);
    }, [searchValue]);

    // ##### Handler functions

    const onSearchChange = input => {
        setSearchValue(input);
    };

    const onItemPress = item => () => {
        navigation.navigate('InventoryPage', {
            screen: 'InventoryPage',
            initial: false,
            // params : {
            data: item,
            isGroup: true,
            isEdit: false
            // }
        });
    };

    const onItemVariantPress = (item, parentItem) => () => {
        // console.log("parent: ", parentItem)
        const updatedItem = {
            ...item,
            name: item?.itemName,
            groupId: parentItem?._id,
            groupName: parentItem?.name
        };
        // console.log("Updated item: ", updatedItem);
        navigation.navigate('InventoryVariantPage', {
            screen: 'InventoryVariantPage',
            initial: false,
            // params : {
            data: updatedItem,
            isEdit: false
            // }
        });
    };

    const onRefresh = () => {
        fetchInventory();
    };

    const onSelectAll = () => {
        const updatedInventory = selectAll(inventory, selectedIds);
        setSelectedIds(updatedInventory);
    };

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            const {
                currentPage,
                currentListMin,
                currentListMax
            } = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
            fetchInventory(currentPage);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        const {
            currentPage,
            currentListMin,
            currentListMax
        } = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
        fetchInventory(currentPage);
    };

    const toggleActionButton = () => {
        setFloatingAction(!isFloatingActionDisabled);
        modal.openModal('ActionContainerModal',
            {
                actions: getFabActions(),
                title: 'INVENTORY ACTIONS',
                onClose: () => setFloatingAction(false)
            });
    };

    // ####### PARENT CHECKBOXPRESS

    const onCheckBoxPress = item => () => {
        const { _id, variants = [] } = item;
        // const variantIds = [];

        const updatedInventory = checkboxItemPress(_id, selectedIds);
        setSelectedIds(updatedInventory);

        const removeChildren = selectedVariants.filter(obj => obj.groupId !== _id);
        setSelectedVariants(removeChildren);

        // if (selectedIds.includes(_id)) {
        //     const removeChildren = selectedChildIds.filter(obj => obj.groupId !== _id);
        //     setSelectedChildIs(removeChildren);
        //     console.log("Remove children: ", removeChildren)
        // } else {
        //     variants.map(variant => variantIds.push(variant?._id));
        //     const updatedIds = [...selectedChildIds, {
        //         groupId: _id,
        //         variantIds
        //     }];
        //     setSelectedChildIs(updatedIds);
        //     console.log("Included: ", updatedIds)
        // }
    };

    // ####### CHILD CHECK BOX PRESS

    const onChildCheckBoxPress = (inventoryVariant, inventoryGroup) => () => {
        const { _id } = inventoryVariant;
        const { _id: groupId } = inventoryGroup;

        // get ids for variants
        const variantIds = selectedVariants.map(variantObj => variantObj._id);
        const updatedChildIds = checkboxItemPress(_id, variantIds);

        // set selected variant
        const updatedSelectedVariants = updatedChildIds.map(_id => ({ _id, groupId: inventoryGroup._id }));
        setSelectedVariants(updatedSelectedVariants);

        // unselect group when child is selected
        const updatedIds = selectedIds.filter(id => id !== groupId);
        setSelectedIds(updatedIds);
    };

    const onCollapseView = key => {
        if (expandedItems.includes(key)) {
            setExpandedItems(expandedItems.filter(item => item !== key));
        } else {
            setExpandedItems([...expandedItems, key]);
        }
    };

    // ##### Helper functions

    const getFabActions = () => {
        const isRemoveGroupsDisabled = selectedIds.length === 0;
        const deleteAction = (
            <View style={{
                borderRadius: 6,
                flex: 1,
                overflow: 'hidden'
            }}
            >
                <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.LONG}
                    onLongPress={removeGroups}
                    isDisabled={isRemoveGroupsDisabled}
                >
                    <ActionItem
                        title="Hold to Delete Group"
                        icon={(
                            <WasteIcon
                                strokeColor={isRemoveGroupsDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700']}
                            />
                        )}
                        disabled={isRemoveGroupsDisabled}
                        touchable={false}
                    />
                </LongPressWithFeedback>
            </View>
        );

        const isRemoveVariantsDisabled = selectedVariants.length === 0;
        const deleteInventoryItemAction = (
            <View style={{
                borderRadius: 6,
                flex: 1,
                overflow: 'hidden'
            }}
            >
                <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.LONG}
                    onLongPress={removeVariants}
                    isDisabled={isRemoveVariantsDisabled}
                >
                    <ActionItem
                        title="Hold to Delete Inventory"
                        icon={(
                            <WasteIcon
                                strokeColor={isRemoveVariantsDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700']}
                            />
                        )}
                        disabled={isRemoveVariantsDisabled}
                        touchable={false}
                    />
                </LongPressWithFeedback>
            </View>
        );

        const createAction =  <ActionItem title="Add Item" icon={<AddIcon />} onPress={openCreateInventoryModel} />;
        const createGroup =   <ActionItem title="Create Item Group" icon={<AddIcon />} onPress={openCreateGroupDialog} />;
        const itemTransfer = (
            <ActionItem
                title="Item Transfer"
                icon={(
                    <TransferIcon
                        strokeColor={isRemoveGroupsDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-orange-700']}
                    />
                )}
                onPress={() => {
                    // handleTransferItems()
                }}
                disabled={isRemoveGroupsDisabled}
                touchable={!isRemoveGroupsDisabled}
            />
        );
        const uploadInventory = <ActionItem title="Upload Inventory" icon={<ExportIcon />}
            onPress={openUploadInventoryModal} />;

        return <ActionContainer
            floatingActions={[
                deleteAction,
                deleteInventoryItemAction,
                uploadInventory,
                createAction && inventoryPermissions.create,
                createGroup && inventoryPermissions.create,
            ]}
            title="INVENTORY ACTIONS"
        />;
    };

    const removeGroups = () => {
        openConfirmationScreen(() => removeGroupsCall(selectedIds));
    };

    const removeVariants = () => {
        const variantIds = selectedVariants.map(variant => variant._id);
        openConfirmationScreen(() => removeVariantsCall(variantIds));
    };

    const openCreateInventoryModel = () => {
        modal.closeModals('ActionContainerModal');
        navigation.navigate('CreateInventoryDialogContainer', {
            screen: 'CreateInventoryDialogContainer',
            initial: false,
            // params : {
            onCreated: () => {
                setFloatingAction(false);
                // navigation.goBack();
                onRefresh();
            },
            onCancel: () => {
                setFloatingAction(false);
                navigation.goBack();
            },
            // }
        });
    };

    const openCreateGroupDialog = () => {
        modal.closeModals('ActionContainerModal');
        navigation.navigate('CreateInventoryGroupDialogContainer', {
            screen: 'CreateInventoryGroupDialogContainer',
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
        modal.closeModals('ActionContainerModal');
        setTimeout(() => {
            modal.openModal('OverlayInfoModal',
                {
                    overlayContent: <FileUploadComponent
                        onCreated={() => {
                            // refresh inventory view.
                            setFloatingAction(false);
                            modal.openModal('ConfirmationModal', {
                                content: <ConfirmationComponent
                                    isError={false}
                                    isEditUpdate={false}
                                    message="Inventory updated successfully!"
                                    onAction={() => {
                                        modal.closeModals('ConfirmationModal');
                                        setTimeout(() => {
                                            modal.closeModals('ActionContainerModal');
                                            onRefresh();
                                        }, 200);
                                    }}
                                />,
                                onClose: () => {
                                    modal.closeModals('ConfirmationModal');
                                }
                            });
                        }}
                        onCancel={() => setFloatingAction(false)}
                        sendFilePromise={getInventoriesGroupBulkUploadRequest}
                        title="Upload Inventory"
                    />,
                    onClose: () => setFloatingAction(false)
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

        locations.forEach(location => {
            const { levels = {} } = location;

            levelsTotal.max += levels.max || 0;
            levelsTotal.min += levels.min || 0;
            levelsTotal.critical += levels.critical || 0;
            levelsTotal.ideal += levels.ideal || 0;
        });

        return levelsTotal;
    };

    const getStock = locations => locations.reduce((acc, curr) => acc + curr.stock, 0);

    const inventoryItemView = ({ name, stock, locations, levels }, onActionPress, isCollapsed) => (
        <>
            {
                isCollapsed ?
                    <DataItem text={name} flex={2.3} color="--color-gray-800" fontStyle="--text-base-regular" /> : (
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
                content={(
                    <LevelIndicator
                        max={levels.max}
                        min={0}
                        level={stock}
                        ideal={levels.ideal}
                        critical={levels.critical}
                    />
                )}
            />
            <LocationsWrapper>
                <MultipleShadowsContainer shadows={shadows}>
                    <LocationsContainer theme={theme} isCollapsed={isCollapsed}>
                        <LocationText theme={theme} isCollapsed={isCollapsed}>{locations}</LocationText>
                    </LocationsContainer>
                </MultipleShadowsContainer>
            </LocationsWrapper>

            <ContentDataItem
                align="center"
                flex={0.5}
                content={(
                    <IconButton
                        Icon={isCollapsed ? <ActionIcon /> : <CollapsedIcon />}
                        onPress={onActionPress}
                    />
                )}
            />

        </>
    );

    const inventoryVariantItem = ({ itemName, stock, levels, locations }, onActionPress) => (
        <>

            <RightBorderDataItem text={itemName} flex={4.2} color="--color-blue-600" fontStyle="--text-sm-medium" />
            <DataItem
                text={numberFormatter(stock)}
                //flex={}
                color="--color-gray-700"
                fontStyle="--text-base-regular"
                align="center"
            />
            <ContentDataItem
                align="center"
                flex={3.5}
                content={(
                    <LevelIndicator
                        max={levels.max}
                        min={0}
                        level={stock}
                        ideal={levels.ideal}
                        critical={levels.critical}
                    />
                )}
            />

            <DataItem flex={1.5} text={locations} color="--color-blue-600" fontStyle="--text-base-regular" align='flex-end' />

            <DataItem flex={0.5} />
        </>
    );

    const renderChildItemView = (item, parentItem, onActionPress) => {
        const { _id } = item;
        const variantIds = selectedVariants.map(obj => obj._id);

        return (
            <Item
                itemView={inventoryVariantItem(item, onActionPress)}
                hasCheckBox={true}
                isChecked={variantIds.includes(_id)}
                onCheckBoxPress={onChildCheckBoxPress(item, parentItem)}
                onItemPress={onItemVariantPress(item, parentItem)}
            />
        );
    };

    const renderItem = (item, index) => {
        // console.log("Render ite:",item)
        const formattedItem = {
            _id: item?._id,
            name: item?.name || '',
            stock: item?.stock || 0,
            locations: item?.locations || 0,
            levels: item?.levels,
        };

        // console.log("Item: ", formattedItem);

        let { variants = [] } = item;

        variants = variants.map(item => {
            // console.log("Variant item: ", item);
            const { storageLocations = [] } = item;
            const levels = getLevels(storageLocations);
            const stock = getStock(storageLocations) || 0;

            return (
                {
                    _id: item?._id,
                    itemName: item?.name || '',
                    stock,
                    locations: storageLocations.length,
                    storageLocations,
                    levels: levels || {}
                }
            );
        });

        const isIndeterminate = selectedVariants.some(variant => variant.groupId === item._id);

        return <CollapsibleListItem
            isChecked={selectedIds.includes(item._id)}
            onCheckBoxPress={onCheckBoxPress(item)}
            hasCheckBox={true}
            isIndeterminate={isIndeterminate}
            onItemPress={onItemPress(item)}
            collapsed={!expandedItems.includes(item.name)}
            onCollapsedEnd={() => onCollapseView(item.name)}
            render={(collapse, isCollapsed) => inventoryItemView(formattedItem, collapse, isCollapsed)}
            backgroundColor={item.name.toLowerCase()
                .includes('ungrouped') ? '#EEF2F6' : ''}
        >
            <FlatList
                data={variants}
                // nestedScrollEnabled={true}
                renderItem={({ item }) => renderChildItemView(item, formattedItem, () => {
                })}
                keyExtractor={(item, index) => `${index}`}
                backgroundColor={item.name.toLowerCase().includes('ungrouped') ? '#EEF2F6' : ''}
                ItemSeparatorComponent={() => (
                    <View style={{
                        flex: 1,
                        margin: 10,
                        marginLeft: 10,
                        borderColor: '#E3E8EF',
                        borderWidth: 0.5
                    }}
                    />
                )}
            />
        </CollapsibleListItem>;
    };

    const openConfirmationScreen = callbackFn => {
        modal
            .openModal(
                'ConfirmationModal',
                {
                    content: <ConfirmationComponent
                        isError={false}
                        isEditUpdate={true}
                        onCancel={() => modal.closeModals('ConfirmationModal')}
                        onAction={() => {
                            modal.closeModals('ConfirmationModal');
                            callbackFn();
                        }}
                        // onAction = { () => confirmAction()}
                        message="Do you want to delete these item(s)?"
                    />,
                    onClose: () => {
                        modal.closeModals('ConfirmationModal');
                    }
                }
            );
    };

    const openErrorConfirmation = message => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError={true}
                    isEditUpdate={false}
                    message={message}
                    onCancel={() => modal.closeModals('ConfirmationModal')}
                />,
                onClose: () => {
                    modal.closeModals('ConfirmationModal');
                }
            }
        );
    };

    const fetchInventory = pagePosition => {
        const currentPosition = pagePosition || 1;
        setCurrentPagePosition(currentPosition);

        setFetchingData(true);
        getInventoriesGroup(searchValue, recordsPerPage, currentPosition)
            .then(inventoryResult => {
                const { data = [], pages = 0 } = inventoryResult;

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

                setInventory(data);
                data.length === 0 ? setTotalPages(1) : setTotalPages(pages);
            })
            .catch(error => {
                // handle error
                console.log('Failed to fetch inventory', error);

                handleUnauthorizedError(error?.response?.status, setInventory);
                setPageSettingState({ ...pageSettingState, isDisabled: true });
                setTotalPages(1);
                setPreviousDisabled(true);
                setNextDisabled(true);
            })
            .finally(_ => {
                setFetchingData(false);
            });
    };

    const removeGroupsCall = ids => {
        removeInventoryGroups(ids)
            .then(_ => {
                modal.openModal('ConfirmationModal', {
                    content: <ConfirmationComponent
                        isError={false}
                        isEditUpdate={false}
                        message="Item Group(s) successfully removed."
                        onAction={() => {
                            modal.closeModals('ConfirmationModal');
                            setTimeout(() => {
                                modal.closeModals('ActionContainerModal');
                                onRefresh();
                            }, 200);
                        }}
                    />,
                    onClose: () => {
                        modal.closeModals('ConfirmationModal');
                    }
                });
                setSelectedIds([]);
            })
            .catch(error => {
                const errorMessage = error.response?.data?.msg.includes('Ungrouped') ? 'Unable to remove \'Ungrouped\' Inventory Group.' : '';
                openErrorConfirmation(errorMessage);
                setTimeout(() => {
                    modal.closeModals('ActionContainerModal');
                }, 200);
                console.log('Failed to remove group: ', error);
            })
            .finally(_ => {
                setFloatingAction(false);
            });
    };

    const removeVariantsCall = ids => {
        removeInventoryVariants(ids)
            .then(_ => {
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={false}
                            isEditUpdate={false}
                            message="Item(s) successfully removed."
                            onAction={() => {
                                modal.closeModals('ConfirmationModal');
                                setTimeout(() => {
                                    modal.closeModals('ActionContainerModal');
                                    onRefresh();
                                }, 200);
                            }}
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    }
                );
                setSelectedVariants([]);
            })
            .catch(error => {
                openErrorConfirmation();
                setTimeout(() => {
                    modal.closeModals('ActionContainerModal');
                }, 200);
                console.log('Failed to remove group: ', error);
            })
            .finally(_ => {
                setFloatingAction(false);
            });
    };

    const inventoryToDisplay = [...inventory];

    return (
        <PageSettingsContext.Provider value={{
            pageSettingState,
            setPageSettingState
        }}>
            <NavPage
                placeholderText="Search by item name."
                routeName={pageTitle}
                listData={inventoryToDisplay}
                listItemFormat={renderItem}
                inputText={searchValue}
                itemsSelected={selectedIds}
                listHeaders={listHeaders}
                changeText={onSearchChange}
                onRefresh={onRefresh}
                isFetchingData={isFetchingData}
                onSelectAll={onSelectAll}
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

Inventory.propTypes = {};
Inventory.defaultProps = {};

const mapStateToProps = state => {
    const getLevels = (variants = []) => {
        const levelsTotal = {
            max: 0,
            min: 0,
            critical: 0,
            ideal: 0,
        };

        variants.forEach(variant => {
            const { storageLocations = [] } = variant;
            storageLocations.map(location => {
                const { levels = {} } = location;

                levelsTotal.max += levels.max || 0;
                levelsTotal.min += levels.min || 0;
                levelsTotal.critical += levels.critical || 0;
                levelsTotal.ideal += levels.ideal || 0;
            });
        });

        return levelsTotal;
    };

    const getLocations = variant => {
        let count = 0;
        variant.map(item => {
            count += item?.storageLocations?.length;
        });
        return count;
    };

    const getStock = variant => {
        let count = 0;
        variant.map(item => {
            count += item.storageLocations.reduce((acc, curr) => acc + curr.stock, 0);
        });
        return count;
    };

    // REMAPPING INVENTORY ITEMS
    const inventory = state.inventory.map(item => {
        const { variants = [] } = item;

        const stock = getStock(variants);
        const locations = getLocations(variants);
        const levels = getLevels(variants);

        return {
            ...item,
            // id: item._id,
            stock,
            locations,
            levels
            // storageLocations: inventoryLocations
        };
    });

    return { inventory };
};

const mapDispatchToProps = { setInventory };

const listHeaders = [
    {
        name: 'Item Name',
        alignment: 'flex-start',
        flex: 1.5,
        hasSort: false
    },
    {
        name: 'In Stock',
        alignment: 'center',
        flex: 1.4,
        hasSort: false
    },
    {
        name: 'Capacity',
        alignment: 'center',
        flex: 1,
    },
    {
        name: 'Locations',
        alignment: 'center',
        flex: 1
    },
    {
        name: '',
        alignment: 'center',
        flex: 0.5
    }
];

const LocationsWrapper = styled.View`
  flex: 1;
  align-items: center;
  /* background-color:yellowgreen; */
`;

const LocationsContainer = styled.View`
  height: 24px;
  width: 28px;
  background-color: ${({
    theme,
    isCollapsed
}) => (isCollapsed === false ? theme.colors['--color-gray-100'] : theme.colors['--default-shade-white'])};
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const LocationText = styled.Text(({ theme, isCollapsed }) => ({
    ...theme.font['--text-base-regular'],
    color: isCollapsed === false ? theme.colors['--color-gray-500'] : theme.colors['--color-gray-700'],
}));

const shadows = [
    {
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: 0
        },
        shadowOpacity: 0.06,
        shadowRadius: 2
    },
    {
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: 0
        },
        shadowOpacity: 0.1,
        shadowRadius: 3
    },
];

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);

