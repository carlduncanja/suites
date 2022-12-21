import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useModal} from 'react-native-modalfy';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import Table from '../common/Table/Table';
import Item from '../common/Table/Item';
import RoundedPaginator from '../common/Paginators/RoundedPaginator';
import FloatingActionButton from '../common/FloatingAction/FloatingActionButton';
import LongPressWithFeedback from '../common/LongPressWithFeedback';
import ActionContainer from '../common/FloatingAction/ActionContainer';
import ActionItem from '../common/ActionItem';
import NumberChangeField from '../common/Input Fields/NumberChangeField';
import AddItemContainer from '../PurchaseOrders/AddItemContainer';

import WasteIcon from '../../../assets/svg/wasteIcon';
import AddIcon from '../../../assets/svg/addIcon';
import GenerateIcon from '../../../assets/svg/generateIcon';

import {currencyFormatter} from '../../utils/formatter';
import {useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll} from '../../helpers/caseFilesHelpers';
import {PageContext} from '../../contexts/PageContext';
import { updateInvoiceDocumnet } from '../../api/network';
import Footer from '../common/Page/Footer';
import Search from '../common/Search';

import DataItem from '../common/List/DataItem';
import {LONG_PRESS_TIMER} from '../../const';
import ConfirmationComponent from '../ConfirmationComponent';
import { transformToTitleCase } from '../../utils/formatter';

const headers = [
    {
        name: 'Item Name',
        alignment: 'flex-start',
        flex: 2,
    },
    {
        name: 'Status',
        alignment: 'center',
        flex: 1,
    },
    {
        name: 'SKU',
        alignment: 'center',
        flex: 1,
    },
    {
        name: 'Quantity',
        alignment: 'center',
        flex: 1,
    },
    {
        name: 'Unit',
        alignment: 'center',
        flex: 1,
    },
    {
        name: 'Unit Price',
        alignment: 'flex-end',
        flex: 1,
    },
];

const OrderItemTab = ({
    orders = [],
    // isEditMode = false,
    onItemChange = () => {
    },
    supplierId = '',
    onAddProductItems = () => {
    },
    onRemoveProductItems = () => {
    }, 
    onConfirmDelivery = () => {

    },
    handleGenerateInvoice = () => {}
}) => {
    const modal = useModal();
    const theme = useTheme();
    const {pageState, setPageState} = useContext(PageContext);
    const {isEditMode, isLoading} = pageState;

    const recordsPerPage = 1;

    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);

    const [searchValue, setSearchValue] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [deliveryState, setDeliveryState] = useState(false);

    useEffect(() => {
        setTotalPages(Math.ceil(orders.length / recordsPerPage));
    }, []);

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            const {currentPage, currentListMin, currentListMax} = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        const {currentPage, currentListMin, currentListMax} = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
    };

    const handleOnSelectAll = () => {
        const updatedItemsList = selectAll(orders, selectedItems);
        setSelectedItems(updatedItemsList);
    };

    const handleOnCheckBoxPress = item => () => {
        const {_id} = item;
        const updatedItems = checkboxItemPress(_id, selectedItems);

        setSelectedItems(updatedItems);
    };

    const toggleActionButton = () => {
        setFloatingAction(true);

        modal.openModal('ActionContainerModal',
            {
                actions: floatingActions(),
                title: 'ORDER ACTIONS',
                onClose: () => {
                    setFloatingAction(false);
                },
            });
    };

    const onQuantityChange = item => action => {
        const {amount = 0, productId = {}} = item;
        // console.log('item', action);
        const {_id = ''} = productId;

        const updatedObj = {
            ...item,
            amount: action === 'add' ? amount + 1 : amount === 0 ? amount : amount - 1
        };

        const updatedData = orders.map(item => (item.productId?._id === _id ? {...updatedObj} : {...item}));

        onItemChange(updatedData);
    };

    const onAmountChange = item => value => {
        // console.log('hello', item, value);

        const {productId = {}} = item;
        const {_id = ''} = productId;

        const updatedObj = {
            ...item,
            amount: value === '' ? '' : parseFloat(value) < 0 ? 0 : parseInt(value)
        };

        const updatedData = orders.map(item => (item.productId?._id === _id ?
            {...updatedObj} :
            {...item}));

        onItemChange(updatedData);
    };

    const listItemFormat = (item, index) => {
        const {amount = 0, productId = {}, status} = item;
        const {name = '', sku = '', unitPrice = 0, unit = ''} = productId || {};

        return (
            <>
                <DataItem text={name} flex={2} fontStyle="--text-base-medium" color="--color-blue-600"/>
                <DataItem text={status ? transformToTitleCase(status) : 'Pending'} align="center" flex={1} fontStyle="--text-base-medium" color="--color-gray-800"/>
                <DataItem text={sku === '' ? 'n/a' : sku} align="center" flex={1} fontStyle="--text-base-medium" color="--color-gray-800"/>
                <DataItem text={amount} align="center" flex={1} fontStyle="--text-base-medium" color="--color-gray-800"/>
                <DataItem text={ item.unit &&transformToTitleCase(item.unit)} align="center" flex={1} fontStyle="--text-base-medium" color="--color-gray-800"/>
                <DataItem text={`$ ${currencyFormatter(unitPrice)}`} align="flex-end" flex={1} fontStyle="--text-base-medium" color="--color-gray-800"/>

            </>
        );
    };

    const renderItemFn = (item, index) => (
        <Item
            hasCheckBox={true}
            isChecked={selectedItems.includes(item._id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={() => {
            }}
            isDisabled = {item.status} 
            itemView={listItemFormat(item, index)}
        />
    );

    const floatingActions = () => {
        const isDisabled = selectedItems.length === 0;
        const isDisabledColor = selectedItems.length === 0 ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700'];
        const addItem = (
            <ActionItem
                title="Add Item"
                icon={<AddIcon strokeColor={isEditMode ? theme.colors['--color-green-700'] : theme.colors['--color-gray-600']}/>}
                onPress={onAddItem}
                disabled={!isEditMode}
                touchable={!!isEditMode}
            />
        );

        const cofirmDelivery = (
            <ActionItem
                title="Confirm Delivery"
                icon={<AddIcon strokeColor={isEditMode ? theme.colors['--color-green-700'] : theme.colors['--color-gray-600']}/>}
                onPress={handleConfirmDelivery}
                disabled={!isEditMode}
                touchable={!!isEditMode}
            />

        );

        const deleteItem = (
            <LongPressWithFeedback
                pressTimer={LONG_PRESS_TIMER.MEDIUM}
                onLongPress={handleRemoveItem}
                isDisabled={isDisabled}
            >
                <ActionItem
                    title="Hold to Delete"
                    icon={<WasteIcon strokeColor={isDisabledColor}/>}
                    onPress={() => {
                    }}
                    disabled={isDisabled}
                    touchable={false}
                />
            </LongPressWithFeedback>
        );

        return <ActionContainer
            floatingActions={[
                deleteItem,
                addItem,
                cofirmDelivery
            ]}
            title="ORDERS ACTIONS"
        />;
    };

    const onAddItemsToList = items => {
        // modal.closeModals('OverlayInfoModal');
        setFloatingAction(false);
        onAddProductItems(items);
    };

    const onAddItem = () => {
        modal.closeAllModals();
        setTimeout(() => {
            modal.openModal('OverlayInfoModal',
                {
                    overlayContent: <AddItemContainer
                        supplierId={supplierId}
                        orders={orders}
                        onAddProductItems={onAddItemsToList}
                        onCancel={() => setFloatingAction(false)}
                    />,
                    onClose: () => setFloatingAction(false)
                });
        }, 200);
    };

    const handleRemoveItem = () => {
        let updatedOrders = orders;
        selectedItems.map(item => {
            updatedOrders = updatedOrders.filter(order => order?._id !== item);
        });
        onRemoveProductItems(updatedOrders);
    };

    const handleConfirmDelivery = () => {
        onConfirmDelivery(selectedItems);
        setSelectedItems([]);
    }

    const onChangeText = value => setSearchValue(value);

    let itemsToDisplay;
    if (searchValue) {
        itemsToDisplay = orders.filter(order => order?.productId?.name.toLowerCase() || ''
            .includes(searchValue.toLowerCase() || order?.productId?.sku.toLowerCase() || ''
                .includes(searchValue.toLowerCase())
            ));
    } else itemsToDisplay = [...orders];

    itemsToDisplay = itemsToDisplay.slice(currentPageListMin, currentPageListMax);

    return (
        <>
            <Search
                placeholderText="Search by Item Name or SKU"
                changeText={value => onChangeText(value)}
                inputText={searchValue}
                onClear={() => onChangeText('')}
            />

            <Table
                data={itemsToDisplay}
                listItemFormat={renderItemFn}
                headers={headers}
                isCheckbox={true}
                toggleHeaderCheckbox={handleOnSelectAll}
                itemSelected={selectedItems}
            />

            <Footer
                totalPages={totalPages}
                currentPage={currentPagePosition}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                isDisabled={isFloatingActionDisabled}
                toggleActionButton={toggleActionButton}
                isNextDisabled={currentPagePosition >= totalPages}
                isPreviousDisabled={(currentPagePosition === 1)}
            />

        </>
    );
};

export default OrderItemTab;
