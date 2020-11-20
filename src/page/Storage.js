import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { useModal } from 'react-native-modalfy';
import { connect } from 'react-redux';
import _ from 'lodash';
import Page from '../components/common/Page/Page';
import ListItem from '../components/common/List/ListItem';
import LevelIndicator from '../components/common/LevelIndicator/LevelIndicator';
import { numberFormatter } from '../utils/formatter';
import { getStorage, removeStorageLocations } from '../api/network';
import { setStorage } from '../redux/actions/storageActions';
import RoundedPaginator from '../components/common/Paginators/RoundedPaginator';
import FloatingActionButton from '../components/common/FloatingAction/FloatingActionButton';
import { useNextPaginator, usePreviousPaginator, selectAll, checkboxItemPress, handleUnauthorizedError } from '../helpers/caseFilesHelpers';
import ActionContainer from '../components/common/FloatingAction/ActionContainer';
import ActionItem from '../components/common/ActionItem';
import WasteIcon from '../../assets/svg/wasteIcon';
import AddIcon from '../../assets/svg/addIcon';
import LongPressWithFeedback from '../components/common/LongPressWithFeedback';
import CreateStorageDialogContainer from '../components/Storage/CreateStorageDialogContainer';
import NavPage from '../components/common/Page/NavPage';
import ConfirmationComponent from '../components/ConfirmationComponent';
import DataItem from '../components/common/List/DataItem';
import RightBorderDataItem from '../components/common/List/RightBorderDataItem';
import { LONG_PRESS_TIMER } from '../const';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

const listHeaders = [
    {
        name: 'Room Name',
        alignment: 'flex-start',
        flex: 1.2
    },
    {
        name: 'Stored Items',
        alignment: 'center',
        flex: 1,
    },
    {
        name: 'Pending Transfers',
        alignment: 'center',
        flex: 1
    }
];

function Storage(props) {
    const {
        storageLocations = [],
        setStorage,
    } = props;

    const pageTitle = 'Storage';
    const recordsPerPage = 10;
    const modal = useModal();
    const theme = useTheme();

    // ##### States
    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    const [selectedIds, setSelectedIds] = useState([]);

    // pagination
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [isNextDisabled, setNextDisabled] = useState(false);
    const [isPreviousDisabled, setPreviousDisabled] = useState(true);

    // ############# Life Cycle Methods

    useEffect(() => {
        if (!storageLocations.length) fetchStorageData(currentPagePosition);
        setTotalPages(Math.ceil(storageLocations.length / recordsPerPage));
    }, []);

    useEffect(() => {
        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            fetchStorageData(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchStorageData, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
        setCurrentPagePosition(1);
    }, [searchValue]);

    // ############# Event Handlers

    const onRefresh = () => {
        fetchStorageData();
    };

    const onSearchChange = input => {
        setSearchValue(input);
    };

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            const { currentPage, currentListMin, currentListMax } = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
            fetchStorageData(currentPage);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        const { currentPage, currentListMin, currentListMax } = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
        fetchStorageData(currentPage);
    };

    const onSelectAll = () => {
        const updatedStorage = selectAll(storageLocations, selectedIds);
        setSelectedIds(updatedStorage);
    };

    const onCheckBoxPress = item => () => {
        const { _id } = item;
        const updatedStorage = checkboxItemPress(_id, selectedIds);
        setSelectedIds(updatedStorage);
    };

    const onItemPress = item => () => {
        props.navigation.navigate('StoragePage', {
            initial: false,
            storage: item,
            reloadStorageLocations: () => fetchStorageData(currentPagePosition)
        });
        // modal.openModal('BottomSheetModal', {
        //     content: <StorageBottomSheetContainer storage={item}/>
        // })
    };

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal('ActionContainerModal',
            {
                actions: getFabActions(),
                title: 'STORAGE ACTIONS',
                onClose: () => {
                    setFloatingAction(false);
                }
            });
    };

    // ##### Helper functions
    const storageItem = ({ name, stock, levels, products, transfers }) => (
        <>

            {/* <View style={[styles.item, {flex: 1.5, justifyContent: 'space-between', ...styles.rowBorderRight}]}>
                <Text style={{color: '#3182CE', fontSize: 16}}>
                    {name}
                </Text>
            </View> */}
            <RightBorderDataItem
                fontStyle={'--text-base-regular'}
                color={'--color-gray-800'}

                text={name}
                flex={1.2}
            />
            <DataItem
                fontStyle={'--text-base-medium'}
                color={'--color-gray-800'}
                align="center"
                text={`${products} ${products === 1 ? 'Product' : 'Products'}`}
            />
            <DataItem
                fontStyle={'--text-base-medium'}
                color={'--color-blue-600'}
                align="center"
                text={`${transfers} ${transfers === 1 ? 'Transfer' : 'Transfers'}`}
            />

            {/* <View style={[
                styles.item, {justifyContent: 'center'}
            ]}
            >
                {/*   LEVELS
                <LevelIndicator
                    max={levels.max}
                    min={0}
                    level={stock}
                    ideal={levels.ideal}
                    critical={levels.critical}
                />
            </View> */}
        </>
    );

    const fetchStorageData = pagePosition => {
        const currentPosition = pagePosition || 1;
        setCurrentPagePosition(currentPosition);

        setFetchingData(true);
        getStorage(searchValue, recordsPerPage, currentPosition)
            .then(storageResult => {
                const { data = [], pages = 0 } = storageResult;
                console.log("Dta: ", data);

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

                setStorage(data);
                data.length === 0 ? setTotalPages(0) : setTotalPages(pages);
            })
            .catch(error => {
                console.log('failed to get storage', error);

                handleUnauthorizedError(error?.response?.status, setStorage);
            })
            .finally(_ => {
                setFetchingData(false);
            });
    };

    const renderItem = item => {
        // console.log("Storage item: ", item);
        const totalStock = item.inventoryLocations?.reduce((acc, item) => acc + item.stock, 0) || 0;
        const totalProducts = item?.inventoryLocations?.length || 0;
        const totalTransfers = item?.transfers?.length || 0;;

        const formattedItem = {
            name: item.name,
            stock: totalStock,
            products: totalProducts,
            transfers: totalTransfers,
            levels: {
                min: 0,
                max: item.capacity
            }
        };

        const itemView = storageItem(
            formattedItem,
        );

        return <ListItem
            isChecked={selectedIds.includes(item._id)}
            onCheckBoxPress={onCheckBoxPress(item)}
            onItemPress={onItemPress(item)}
            itemView={itemView}
        />;
    };

    const getFabActions = () => {
        const isDisabled = selectedIds.length === 0;
        const deleteAction = (
            <View style={{ borderRadius: 6, flex: 1, overflow: 'hidden' }}>
                <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.LONG}
                    onLongPress={removeStorageLocationsLongPress}
                    isDisabled={isDisabled}
                >
                    <ActionItem
                        title="Hold to Delete"
                        icon={<WasteIcon strokeColor={isDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700']} />}
                        onPress={() => {
                        }}
                        touchable={false}
                        disabled={isDisabled}
                    />
                </LongPressWithFeedback>
            </View>
        );

        const createAction = (
            <ActionItem
                title="New Location"
                icon={<AddIcon />}
                onPress={
                    openCreateStorageModel
                }
            />
        );

        return <ActionContainer
            floatingActions={[
                deleteAction,
                createAction
            ]}
            title="STORAGE ACTIONS"
        />;
    };

    const removeStorageLocationsLongPress = () => {
        // Done with one or more ids selected
        if (selectedIds.length > 0) openDeletionConfirm({ ids: [...selectedIds] });
        else openErrorConfirmation();
    };

    const openDeletionConfirm = data => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={() => modal.closeModals('ConfirmationModal')}
                    onAction={() => {
                        modal.closeModals('ConfirmationModal');
                        removeStorageLocationsCall(data);
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

    const openErrorConfirmation = () => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError={true}
                    isEditUpdate={false}
                    onCancel={() => modal.closeModals('ConfirmationModal')}
                />,
                onClose: () => {
                    modal.closeModals('ConfirmationModal');
                }
            }
        );
    };

    const removeStorageLocationsCall = data => {
        removeStorageLocations(data)
            .then(_ => {
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={false}
                            isEditUpdate={false}
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

                setSelectedIds([]);
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

    const openCreateStorageModel = () => {
        modal.closeModals('ActionContainerModal');

        // For some reason there has to be a delay between closing a modal and opening another.
        setTimeout(() => {
            modal
                .openModal(
                    'OverlayModal',
                    {
                        content: <CreateStorageDialogContainer
                            onCreated={item => { onItemPress(item)(); setFloatingAction(false) }}
                            onCancel={() => setFloatingAction(false)}
                        />,
                        onClose: () => setFloatingAction(false)
                    }
                );
        }, 200);
    };

    const storageToDisplay = [...storageLocations];
    // storageToDisplay = storageToDisplay.slice(currentPageListMin, currentPageListMax);

    return (
        <NavPage
            placeholderText="Search by room name."
            routeName={pageTitle}
            listData={storageToDisplay}
            inputText={searchValue}
            itemsSelected={selectedIds}
            listItemFormat={renderItem}
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
    );
}

Storage.propTypes = {};
Storage.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    item: {
        flex: 1,
        flexDirection: 'row',
    },
    itemText: {
        fontSize: 14,
        color: '#4E5664',
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: 20,
        marginRight: 30,
    },
    rowBorderRight: {
        borderRightColor: '#E3E8EF',
        borderRightWidth: 1,
    }
});
const mapStateToProps = state => ({ storageLocations: state.storage });

const mapDispatcherToProp = { setStorage };

export default connect(mapStateToProps, mapDispatcherToProp)(Storage);
