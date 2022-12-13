import React, { useRef, useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { PageContext } from "../../contexts/PageContext";
import { useModal } from "react-native-modalfy";
import EmptyPaymentHistoryContainer from "../PurchaseOrders/EmptyPaymentHistoryContainer";
import AddIcon from "../../../assets/svg/addIcon";
import RemoveIcon from "../../../assets/svg/remove2";
import Footer from "../common/Page/Footer";
import ActionItem from "../common/ActionItem";
import ActionContainer from "../common/FloatingAction/ActionContainer";
import RegisterPaymentDialogContainer from "../PurchaseOrders/RegisterPaymentDialogContainer";
import RevertPaymentDialogContainer from "../PurchaseOrders/RevertPaymentDialogContainer";
import { registerPayment } from "../../api/network";
import ConfirmationComponent from "../ConfirmationComponent";
import Search from "../common/Search";
import Table from "../common/Table/Table";
import {useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll} from '../../helpers/caseFilesHelpers';
import Item from "../common/Table/Item";
import DataItem from "../common/List/DataItem";
import { currencyFormatter } from "../../utils/formatter";

const PaymentHistoryTab = ({
    order,
}) => {

    const theme = useTheme();
    const modal = useModal();
    const baseStateRef = useRef();
    const { pageState, setPageState } = useContext(PageContext);
    const { isEditMode } = pageState;
    const [selectedPayment, setSelectedPayment] = useState({});
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);
    const { payments } = order;

    const [isFetchingData, setFetchingData] = useState(false);

    const [searchValue, setSearchValue] = useState('');

    const recordsPerPage = 1;

    // pagination
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [isNextDisabled, setNextDisabled] = useState(false);
    const [isPreviousDisabled, setPreviousDisabled] = useState(true);



    useEffect(() => {
        setTotalPages(Math.ceil(payments.length / recordsPerPage));
    }, []);

    const [listItems, setListItems] = useState(payments)
    const [selectedItems, setSelectedItems] = useState([]);
    useEffect(() => {
        let itemsToDisplay;
        if (searchValue) {
            itemsToDisplay = listItems.filter(item => item.receiptId?.toLowerCase() || ''
                .includes(searchValue.toLowerCase() || item.registeredBy?.toLowerCase() || ''
                    .includes(searchValue.toLowerCase() || item.date?.toLowerCase() || ''
                        .includes(searchValue.toLowerCase()))
                ));
        }
        else itemsToDisplay = payments;

        itemsToDisplay = itemsToDisplay.slice(currentPageListMin, currentPageListMax);
        setListItems(itemsToDisplay)
    }, [searchValue])

    const floatingActions = () => {

        const addItem = (
            <ActionItem
                title="Register Payment"
                icon={<AddIcon strokeColor={selectedPayment ? theme.colors['--color-green-700'] : theme.colors['--color-gray-600']} />}
                onPress={openRegisterPaymentDialog}
                disabled={!selectedPayment}
                touchable={selectedPayment}
            />
        );
        const revertPayment = (
            <ActionItem
                title="Revert Payment"
                icon={<RemoveIcon />}
                onPress={openRevertPaymentDialog}

            />
        )


        return <ActionContainer
            floatingActions={[
                addItem,
                revertPayment
            ]}
            title="PAYMENT ACTIONS"
        />;
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

    const handleAddPayment = (amount, receipt) => {
        registerPayment(order._id, { paid: amount, receiptId: receipt })
            .then(_ => successModal())
            .catch(_ => errorModal())
    }


    const openRegisterPaymentDialog = () => {
        modal.closeModals('ActionContainerModal');
        setTimeout(() => {
            modal.openModal('OverlayModal',
                {
                    content: <RegisterPaymentDialogContainer
                        headerTitle={"Register Payment"}
                        onCancel={() => { console.log("false") }}
                        handleDonePressed={handleAddPayment}
                    />,
                    onClose: () => setFloatingAction(false)
                });
        }, 200);
    };
    
    const handleRevertPayment =(receipt)=>{
         console.log(receipt)
    }

    const openRevertPaymentDialog = () => {
        modal.closeModals('ActionContainerModal')
        modal.openModal('OverlayModal',
            {
                content: <RevertPaymentDialogContainer
                    headerTitle={"Revert Payment"}
                    onCancel={() => { console.log("false") }}
                    handleDonePressed={handleRevertPayment}
                />,
                onClose: () => setFloatingAction(false)
            }
        )
    }

    const successModal = () => {
        modal.openModal(
            'ConfirmationModal', {
            content: <ConfirmationComponent
                isError={false}
                isEditUpdate={false}
                onAction={() => {
                    modal.closeAllModals();
                }}
                onCancel={() => {
                    modal.closeAllModals();
                }}
            />,
            onClose: () => {
                modal.closeAllModals();
            }
        }
        );
    }

    const errorModal = () => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError={true}
                    isEditUpdate={false}
                    onCancel={() => modal.closeAllModals()}
                />,
                onClose: () => {
                    modal.closeAllModals();
                }
            }
        );
    }

    const onChangeText = value => setSearchValue(value);

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

    const handleOnSelectAll = () => {
        const updatedItemsList = selectAll(listItems, selectedItems);
        setSelectedItems(updatedItemsList);
    };

    const handleOnCheckBoxPress = item => () => {
        const { _id } = item;
        const updatedItems = checkboxItemPress(_id, selectedItems);

        setSelectedItems(updatedItems);
    };



    const listItemFormat = (item, index) => {
        const { receiptId, paid, registeredBy, date = '1/2/22' } = item;

        return (
            <>
                <DataItem text={receiptId}  fontStyle="--text-base-medium" color="--color-blue-600" />
                <DataItem text={`$${currencyFormatter(paid)}`}  fontStyle="--text-base-medium" color="--color-gray-800" />
                <DataItem text={registeredBy}  fontStyle="--text-base-medium" color="--color-gray-800" />
                <DataItem text={date}  fontStyle="--text-base-medium" color="--color-gray-800" />

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
            isDisabled={item.status}
            itemView={listItemFormat(item, index)}
        />
    );

    return (
        <>
            {
                payments?.length ?
                    <>
                        <Search
                            placeholderText="Search by Item Name or SKU"
                            changeText={value => onChangeText(value)}
                            inputText={searchValue}
                            onClear={() => onChangeText('')}
                        />

                        <Table
                            data={listItems}
                            listItemFormat={renderItemFn}
                            headers={listHeaders}
                            isCheckbox={true}
                            toggleHeaderCheckbox={handleOnSelectAll}
                            itemSelected={selectedItems}
                        />
                    </>
                    :
                    <EmptyPaymentHistoryContainer handleRegisterPayment={openRegisterPaymentDialog} />
            }


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

    )
}

export default PaymentHistoryTab



const listHeaders = [
    {
        name: 'Transaction ID',
        hasSort: false
    },
    {
        name: 'Amount Paid',
        hasSort: false
    },
    {
        name: 'Paid By',
    },
    {
        name: 'Date',
    }
];

