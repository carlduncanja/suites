import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useModal } from 'react-native-modalfy';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
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

import { currencyFormatter } from '../../utils/formatter';
import { useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll } from '../../helpers/caseFilesHelpers';
import { PageContext } from '../../contexts/PageContext';
import { updateInvoiceDocumnet } from '../../api/network';
import Footer from '../common/Page/Footer';
import Search from '../common/Search';

import DataItem from '../common/List/DataItem';
import { LONG_PRESS_TIMER } from '../../const';
import ConfirmationComponent from '../ConfirmationComponent';

const headers = [
    {
        name: 'Item Name',
        alignment: 'flex-start',
        flex: 2,
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
        name: 'Unit Price',
        alignment: 'flex-end',
        flex: 1,
    },
];

const InvoiceItemTab = ({
    invoice = [],
    // isEditMode = false,
    onItemChange = () => {
    },
    supplierId = '',
    onAddProductItems = () => {
    },
    onRemoveProductItems = () => {
    },
    handleGenerateInvoice = () => { }
}) => {
    const modal = useModal();
    const theme = useTheme();
    const { pageState, setPageState } = useContext(PageContext);
    const { isEditMode, isLoading } = pageState;

    const recordsPerPage = 15;

    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);

    const [searchValue, setSearchValue] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        setTotalPages(Math.ceil(invoice.length / recordsPerPage));
    }, []);

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            const { currentPage, currentListMin, currentListMax } = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        const { currentPage, currentListMin, currentListMax } = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
    };


    const listItemFormat = (item, index) => {
        const { amount = 0, productId = {} } = item;
        const { name = '', sku = '', unitPrice = 0, unit = '' } = productId || {};

        return (
            <>
                <DataItem text={name} flex={2} fontStyle="--text-base-medium" color="--color-blue-600" />
                <DataItem text={sku === '' ? 'n/a' : sku} align="center" flex={1} fontStyle="--text-base-medium" color="--color-gray-800" />

                <DataItem text={unit} align="center" flex={1} fontStyle="--text-base-medium" color="--color-gray-800" />
                <DataItem text={`$ ${currencyFormatter(unitPrice)}`} align="flex-end" flex={1} fontStyle="--text-base-medium" color="--color-gray-800" />

            </>
        );
    };
    let itemsToDisplay;
    if (searchValue) {
        itemsToDisplay = invoice.filter(order => order?.productId?.name.toLowerCase() || ''
            .includes(searchValue.toLowerCase() || order?.productId?.sku.toLowerCase() || ''
                .includes(searchValue.toLowerCase())
            ));
    } else itemsToDisplay = [...invoice];


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

export default InvoiceItemTab