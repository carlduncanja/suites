import React, { useState, useEffect, useContext } from 'react';
import { withModal } from 'react-native-modalfy';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import {useNavigation} from '@react-navigation/native';
import Table from '../common/Table/Table';
import Item from '../common/Table/Item';
import { formatDate } from '../../utils/formatter';
import ImageIcon from '../../../assets/svg/imageIcon';
import Footer from '../common/Page/Footer';

import { useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll } from '../../helpers/caseFilesHelpers';
import DataItem from '../common/List/DataItem';
import TouchableDataItem from '../common/List/TouchableDataItem';
import DataItemWithIcon from '../common/List/DataItemWithIcon';
import { transformToSentence } from '../../hooks/useTextEditHook';
import DateInputField from '../common/Input Fields/DateInputField';

const EditDateRecord = styled.View`
    flex: 1.2;
    border: ${({theme}) => `1px solid ${theme.colors['--color-gray-300']}` };
    border-radius: 6px;
    flex-direction: row;
    justify-content: space-between;
`;

const testData = [
    {
        order: 'PO-0000023',
        invoiceNumber: 'IN-00009675',
        status: 'Payment Due',
        orderDate: new Date(2019, 11, 12),
        deliveryDate: new Date(2019, 11, 16),
        image: null
    },
    {
        order: 'PO-0000024',
        invoiceNumber: 'IN-00009685',
        status: 'Payment Due',
        orderDate: new Date(2019, 11, 12),
        deliveryDate: new Date(2019, 11, 16),
        image: {}
    },
    {
        order: 'PO-0000024',
        invoiceNumber: '',
        status: 'Request Sent',
        orderDate: new Date(2019, 11, 12),
        deliveryDate: new Date(2019, 11, 16),
        image: {}
    },

];

const SupplierInvoicePage = ({ data = [...testData], supplierName }) => {
    console.log('Data: ', data);
    const navigation = useNavigation();
    const [checkBoxList, setCheckBoxList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);

    const recordsPerPage = 15;

    const headers = [
        {
            name: 'Invoice',
            alignment: 'flex-start',
            flex: 1.2
        },
        {
            name: 'Purchase Orders',
            alignment: 'flex-start',
        },
        {
            name: 'Status',
            alignment: 'flex-start',
            flex: 1
        },
        {
            name: 'Order Date',
            alignment: 'flex-start',
            flex: 1
        },
        {
            name: 'Delivery Date',
            alignment: 'flex-start',
        }
    ];

    useEffect(() => {
        setTotalPages(Math.ceil(data.length / recordsPerPage));
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

    const goToDetailsTab = invoiceObj => {
        navigation.navigate('SupplierInvoiceUpload', {
            initial: false,
            invoiceItem: invoiceObj,
            selectedSupplierName: supplierName
        });
    };

    const listItemFormat = item => {
        const { invoiceNumber = '', order = '', status = '', nextOrderDate = '', deliveryDate = '', image } = item;
        const invoice = invoiceNumber === '' ? 'n/a' : invoiceNumber;
        const invoiceColor = invoiceNumber === '' ? '--color-gray-500' : '--color-blue-600';
        const statusColor = status === 'Request Sent' ? '--color-teal-600' : '--color-red-700';
        return (
            <>
                {
                    !image ?
                        (
                            <DataItem
                                text={invoice}
                                fontStyle="--text-base-medium"
                                color="--color-blue-600"
                                flex={1.2}
                            />
                        ) :
                        (
                            <DataItemWithIcon
                                text={invoice}
                                onPress={() => {}}
                                fontStyle="--text-base-medium"
                                icon={<ImageIcon />}
                                color={invoiceColor}
                                flex={1.2}
                            />
                        )
                }

                <DataItem
                    text={order}
                    fontStyle="--text-base-medium"
                    color="--color-blue-600"
                />
                <DataItem
                    text={transformToSentence(status)}
                    color={statusColor}
                    fontStyle="--text-sm-medium"
                />
                <DataItem text={formatDate(nextOrderDate, 'DD/MM/YYYY') || 'n/a'}/>
                <DataItem text={formatDate(deliveryDate, 'DD/MM/YYYY') || 'n/a'}/>
            </>
        );
    };

    const renderListFn = item => (
        <Item
            hasCheckBox={false}
            // isChecked={checkBoxList.includes(item)}
            // onCheckBoxPress={toggleCheckbox(item)}
            onItemPress={() => goToDetailsTab(item)}
            itemView={listItemFormat(item)}
        />
    );

    return (
        <>
            <Table
                data={data}
                listItemFormat={renderListFn}
                headers={headers}
                isCheckbox={false}
                // toggleHeaderCheckbox={toggleHeaderCheckbox}
                itemSelected={checkBoxList}
            />

            <Footer
                hasActions={false}
                totalPages={totalPages}
                currentPage={currentPagePosition}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
            />
        </>
    );
};

SupplierInvoicePage.propTypes = {};
SupplierInvoicePage.defaultProps = {};

export default withModal(SupplierInvoicePage);
