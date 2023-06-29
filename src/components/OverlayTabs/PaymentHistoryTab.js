import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import styled from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { PageContext } from "../../contexts/PageContext";
import { useModal } from "react-native-modalfy";
import EmptyPaymentHistoryContainer from "../PurchaseOrders/EmptyPaymentHistoryContainer";
import AddIcon from "../../../assets/svg/addIcon";
import RemoveIcon from "../../../assets/svg/remove2"; 
import Minus from "../../../assets/svg/minus";
import Footer from "../common/Page/Footer";
import ActionItem from "../common/ActionItem";
import ActionContainer from "../common/FloatingAction/ActionContainer";
import RegisterPaymentDialogContainer from "../PurchaseOrders/RegisterPaymentDialogContainer";
import RevertPaymentDialogContainer from "../PurchaseOrders/RevertPaymentDialogContainer";
import { registerPayment, revertPayment } from "../../api/network";
import ConfirmationComponent from "../ConfirmationComponent";
import Search from "../common/Search";
import Table from "../common/Table/Table";
import { useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll } from '../../helpers/caseFilesHelpers';
import Item from "../common/Table/Item";
import DataItem from "../common/List/DataItem";
import { currencyFormatter, formatDate } from "../../utils/formatter";
import Row from "../common/Row";
import { add } from "react-native-reanimated";

const HeaderText = styled.Text(({ theme }) => ({
    ...theme.font['--text-lg-regular'],
    color: theme.colors['--color-gray-600'],
    marginBottom: 10
}))

const SecondaryText = styled.Text(({ theme }) => ({
    ...theme.font['--text-xl-medium'],
    color: theme.colors['--color-black']
}))

const PaymentHistoryTab = ({
    order,
    onUpdate,
    permissions
}) => {

    const theme = useTheme();
    const modal = useModal();

    const { pageState, setPageState } = useContext(PageContext);
    const { isEditMode } = pageState;
    const [selectedPayment, setSelectedPayment] = useState({});
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);


    const [searchValue, setSearchValue] = useState('');

    const recordsPerPage = 15;

    // pagination
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [listItems, setListItems] = useState();
    const [selectedItems, setSelectedItems] = useState([]);
    const [transactionData,setTransactionData]=useState({})
    const totalPages = order.payments.length === 0 ? 1 : Math.ceil(order.payments.length / recordsPerPage);




    useEffect(() => {
        let itemsToDisplay;
        if (searchValue) {
            itemsToDisplay = listItems.filter(item => item.receiptId.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.registeredBy.toLowerCase().includes(searchValue.toLowerCase()));
        }
        else itemsToDisplay = order.payments;
        setListItems(itemsToDisplay)
    }, [searchValue, order])

    const floatingActions = () => { 
        let active  = selectedItems.length === 1 ? true :false 
        let actionsArray=[]
        
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
                icon={<Minus strokeColor={active ? "red":"gray"}/>}
                onPress={()=>{showConfirmation(selectedItems[0])}}
                disabled={!active}

            />
        )  
        permissions.update && actionsArray.push(addItem,revertPayment)


        return <ActionContainer
            floatingActions={actionsArray}
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
            .then(_ => {
                onUpdate();
                setSelectedItems([]);
                setTransactionData({});
                successModal()
            })
            .catch(_ => errorModal())
    }

    const handleRevertPayment = (receipt) => {
        revertPayment(order._id, { paymentId: receipt })
            .then(_ => {
                onUpdate() 
                setSelectedItems([])
                setTransactionData({})
                successModal()
            })
            .catch(_ => errorModal())
    }

    const openRegisterPaymentDialog = () => {
        modal.closeModals('ActionContainerModal');
        setTimeout(() => {
            modal.openModal('OverlayModal',
                {
                    content: <RegisterPaymentDialogContainer
                        headerTitle={"Register Payment"}
                        handleDonePressed={handleAddPayment}
                    />,
                    onClose: () => setFloatingAction(false)
                });
        }, 200);
    };



    const openRevertPaymentDialog = () => {
        modal.closeModals('ActionContainerModal')

        modal.openModal('OverlayModal',
            {
                content: <RevertPaymentDialogContainer
                    headerTitle={"Revert Payment"}
                    selectedPayment={selectedItems[0]}
                    transactionData={transactionData}
                    onCancel={() => { console.log("false") }}
                    handleDonePressed={(receipt) => { showConfirmation(receipt) }}
                />,
                onClose: () => setFloatingAction(false)
            }
        )
    }

    const showConfirmation = (receipt) => {
        modal.openModal('ConfirmationModal', {
            content: (
                <ConfirmationComponent
                    isWarning={true}
                    onCancel={() => {
                        modal.closeModals('ConfirmationModal');
                    }}
                    onAction={() => {

                        modal.closeAllModals();
                        handleRevertPayment(receipt)
                    }}
                    message={"Reverting this payment will be subtracted from the Total Paid and increease the Outstanding Balance. Are you sure you want to continue?"}
                    secondaryMessage={"Do you wish to continue?"}
                />
            ),
            onClose: () => {
                modal.closeModals('ConfirmationModal');
            },
        });
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
        setTransactionData(item)
    };



    const listItemFormat = (item, index) => {
        const { receiptId, paid, registeredBy, createdAt } = item;

        return (
            <>
                <DataItem text={receiptId} fontStyle="--text-base-medium" color="--color-blue-600" />
                <DataItem text={`$${currencyFormatter(paid)}`} fontStyle="--text-base-medium" color="--color-gray-800" />
                <DataItem text={registeredBy} fontStyle="--text-base-medium" color="--color-gray-800" />
                <DataItem text={formatDate(createdAt, 'DD/MM/YYYY')} fontStyle="--text-base-medium" color="--color-gray-800" />
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

    let dataToDisplay = listItems ? [...listItems] : [...order.payments];
    dataToDisplay = dataToDisplay.slice(currentPageListMin, currentPageListMax);

    return (
        <>
            {
                order.payments?.length ?
                    <>
                        <Row>
                            <View style={styles.headerItem}>
                                <HeaderText>Outstanding Amount</HeaderText>
                                <SecondaryText>${currencyFormatter(order.total - order.total_paid)}</SecondaryText>
                            </View>

                            <View style={styles.headerItem}>
                                <HeaderText >Total Paid</HeaderText>
                                <SecondaryText>${currencyFormatter(order.total_paid)}</SecondaryText>
                            </View>

                            <View style={styles.headerItem}>
                                <HeaderText>Payment Status</HeaderText>
                                <SecondaryText>{order.total_paid >= order.total ? 'Paid in Full' : 'Paid in Part'} </SecondaryText>
                            </View>
                        </Row>

                        <Search
                            placeholderText="Search by Transaciton ID or Registered By"
                            changeText={value => onChangeText(value)}
                            inputText={searchValue}
                            onClear={() => onChangeText('')}
                        />
                        <View style={styles.spacer} />
                        <Table
                            data={dataToDisplay}
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

const styles = StyleSheet.create({

    headerItem: {
        flex: 1,
        flexDirection: 'column',

    },

    spacer: {
        marginTop: 10,
        marginBottom: 10
    }


});


const listHeaders = [
    {
        name: 'Transaction ID',
        hasSort: false
    },
    {
        name: 'Registered By',
        hasSort: false
    },
    {
        name: 'Paid By',
    },
    {
        name: 'Date',
    }
];

