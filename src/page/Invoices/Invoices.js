import { useTheme } from 'emotion-theming';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList, ScrollView} from 'react-native';
import { useModal } from 'react-native-modalfy';
import {connect} from 'react-redux';
import {setInvoices} from '../../redux/actions/invoicesActions'; 
import {PageSettingsContext} from '../../contexts/PageSettingsContext';
import { deleteInvoices, getInvoices } from '../../api/network';
import { useNextPaginator, usePreviousPaginator, selectAll, checkboxItemPress, handleUnauthorizedError } from '../../helpers/caseFilesHelpers';
import { formatDate } from "../../utils/formatter"

import ActionContainer from '../../components/common/FloatingAction/ActionContainer';
import ActionItem from '../../components/common/ActionItem';
import WasteIcon from '../../../assets/svg/wasteIcon';
import AddIcon from '../../../assets/svg/addIcon';
import LongPressWithFeedback from '../../components/common/LongPressWithFeedback';
import CreateStorageDialogContainer from '../../components/Storage/CreateStorageDialogContainer';
import NavPage from '../../components/common/Page/NavPage';
import ConfirmationComponent from '../../components/ConfirmationComponent';
import DataItem from '../../components/common/List/DataItem';
import RightBorderDataItem from '../../components/common/List/RightBorderDataItem';
import { LONG_PRESS_TIMER } from '../../const';
import styled, { css } from '@emotion/native';
import ListItem from '../../components/common/List/ListItem';
import _ from 'lodash';
import InvoicesPage from './InvoicesPage';

// here
 const listHeaders = [
    {
        name: 'Invoices',
        alignment: 'flext-start',
        flex: 1
    },

    {
        name: 'Status',
        alignment: 'left'
    },

    {
        name: 'Delivery Date',
        alignment: 'flext-start',
        flex: 1
    } ,

    {
        name: 'Supplier',
        alignment: 'flext-start',
        flex: 1.5
    }
];  

function Invoices(props) {
    const {setInvoices, navigation, route, invoices=[]} = props;
    const pageTitle = "Invoices";
    const modal = useModal();
    const theme = useTheme();
    const recordsPerPage = 10;


    // ##### States
    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});
    const [selectedIds, setSelectedIds] = useState([]);
    const [allInvoices, setAllInvoices] = useState([]);

    // pagination
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [isNextDisabled, setNextDisabled] = useState(false);
    const [isPreviousDisabled, setPreviousDisabled] = useState(true);

    const [pageSettingState, setPageSettingState] = useState({});

    useEffect(() => {

        if (!invoices.length) fetchInvoiceData(currentPagePosition);

        setTotalPages(Math.ceil(invoices.length / recordsPerPage));

    }, []);

    // for the serch may needd to be modified 
    useEffect(() => {
        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            fetchInvoiceData(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchInvoiceData, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
        setCurrentPagePosition(1);
    }, [searchValue]);

    const onRefresh = () => {
        fetchInvoiceData();
    }

    const onSearchChange = (input) => {
        setSearchValue(input)
    } 

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            const { currentPage, currentListMin, currentListMax } = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
            fetchInvoiceData(currentPage);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        const { currentPage, currentListMin, currentListMax } = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
        fetchInvoiceData(currentPage);
    }; 

    const fetchInvoiceData = pagePosition => {
        const currentPosition = pagePosition || 1;
        setCurrentPagePosition(currentPosition);

        setFetchingData(true);
        getInvoices(searchValue, recordsPerPage, currentPosition)
            .then(storageResult => {
                const { data = [], pages = 0 } = storageResult;
                
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

                setAllInvoices(data);

                data.length === 0 ? setTotalPages(0) : setTotalPages(pages);
            })
            .catch(error => {
                console.log('failed to get invoices', error);

                handleUnauthorizedError(error?.response?.status, setInvoices);
                setPageSettingState({...pageSettingState, isDisabled: true});

            })
            .finally(_ => {
                setFetchingData(false);
            });
    }; 

    // here
    const invoiceItem = ({ name, status, deliveryDate, supplier, transfers }) => (
        <>
            <RightBorderDataItem
                fontStyle={'--text-base-regular'}
                color={'--color-gray-800'}
                text={name}
                align="flext-start"
                flex={1}
            />
            <DataItem
                fontStyle={'--text-base-medium'}
                color={'--color-gray-800'}
                text={status}
                align="flext-start"
                flex={1}
            />
            <DataItem
                fontStyle={'--text-base-medium'}
                color={'--color-blue-600'}
                align="flext-start"
                text={ formatDate(deliveryDate, 'DD/MM/YYYY')}
                //text={deliveryDate}
                flex={1}
            /> 
            <DataItem
                fontStyle={'--text-base-medium'}
                color={'--color-blue-600'}
                align="flext-start"
                text={supplier}
                flex={1}
            />
        </>
    );

    const renderItem = item => {
        // console.log("Storage item: ", item);
        const formattedItem = {
            name: item.invoiceNumber,
            status: item.status,
            deliveryDate: item.purchaseOrder.deliveryDate,
            supplier: item.supplier.name,
            levels: {
                min: 0,
                max: item.capacity
            }
        };

        const itemView = invoiceItem(
            formattedItem,
        );

        return <ListItem
            isChecked={selectedIds.includes(item._id)}
            onCheckBoxPress={() => onCheckBoxPress(item)}
            onItemPress={() => handleOnItemPress(item, false)}
            itemView={itemView}
        />;
    };

    const handleOnItemPress = (item, isOpenEditable) => {
        props.navigation.navigate("InvoicesPage", {
            initial: false,
            invoiceItem: item,
            isEditable: isOpenEditable,
            updateInvoices: () => {
                onRefresh();
            }
        });
    } 

    const onCheckBoxPress = item => {
        const { _id } = item;

        const updateInvioces = checkboxItemPress(_id, selectedIds);

        setSelectedIds(updateInvioces);

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

        return <ActionContainer
            floatingActions={[
                deleteAction
            ]}
            title="INVOICE ACTIONS"
        />;
    };  


    const removeStorageLocationsLongPress = () => {
        // Done with one or more ids selected
        if (selectedIds.length > 0) openDeletionConfirm({ ids: [...selectedIds] });
        else openErrorConfirmation();
    };

    const removeInvoiceCall= (data) => {
        deleteInvoices(data)
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
                console.log('Failed to remove invoices: ', error);
            })
            .finally(_ => {
                setFloatingAction(false);
            });
    }

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
                        removeInvoiceCall(data);
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

    const invoicesToDisplay = [...allInvoices ]

    const onSelectAll = () => {

        const updatedInvoices = selectAll(allInvoices , selectedIds);
        console.log(updatedInvoices)
        setSelectedIds(updatedInvoices);
    };
    
    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal("ActionContainerModal", {
            actions: getFabActions(),
            title: "INVOICE ACTIONS",
            onClose: () => {
                setFloatingAction(false);
            },

        });

    };

    return (
        <PageSettingsContext.Provider value={{
            pageSettingState,
            setPageSettingState
        }}
        >
            <NavPage
                placeholderText="Search by Invoices"
                routeName={pageTitle}
                listData={invoicesToDisplay }
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
        </PageSettingsContext.Provider>
    );
};

Invoices.propTypes = {};
Invoices.defaultProps = {};

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
const mapStateToProps = state => ({ Invoices: state.invoices });

const mapDispatcherToProp = { setInvoices };

export default connect(mapStateToProps, mapDispatcherToProp)(Invoices);