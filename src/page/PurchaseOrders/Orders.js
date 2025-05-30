import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import Page from "../../components/common/Page/Page";
import ListItem from "../../components/common/List/ListItem";
import RoundedPaginator from "../../components/common/Paginators/RoundedPaginator";
import FloatingActionButton from "../../components/common/FloatingAction/FloatingActionButton";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import ActionItem from "../../components/common/ActionItem";
import AddIcon from "../../../assets/svg/addIcon";
import Notifier from "../../components/NotificationComponent";
import NavPage from '../../components/common/Page/NavPage';
import DataItem from '../../components/common/List/DataItem';
import ConfirmationComponent from '../../components/ConfirmationComponent';
import { PageSettingsContext } from '../../contexts/PageSettingsContext';
import ConfirmationCheckBoxComponent from "../../components/ConfirmationCheckBoxComponent";

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

import {
    useNextPaginator,
    usePreviousPaginator,
    checkboxItemPress,
    selectAll, handleUnauthorizedError,
} from '../../helpers/caseFilesHelpers';

import { connect } from "react-redux";
import {
    setPurchaseOrders,
    updatePurchaseOrder,
} from "../../redux/actions/purchaseOrdersActions";
import {
    getPurchaseOrders,
    createInvoiceViaOrders,
    updatePurchaseOrderStatus, removePurchaseOrderCall, createAlert, getRolesCall, requestQuotation, sendToSupplier,
} from "../../api/network";
import _ from "lodash";

import { withModal, useModal } from "react-native-modalfy";
import { formatDate, transformToSentence, transformToTitleCase } from '../../utils/formatter';
import OrderItemPage from "./OrderItemPage";
import { LONG_PRESS_TIMER, PURCHASE_ORDER_STATUSES, ORDER_TYPES, ROLES } from "../../const";
import EditIcon from "../../../assets/svg/editIcon";
import { addNotification } from "../../redux/actions/NotificationActions";
import RightBorderDataItem from "../../components/common/List/RightBorderDataItem";
import LongPressWithFeedback from "../../components/common/LongPressWithFeedback";
import WasteIcon from "../../../assets/svg/wasteIcon";
import ExportIcon from "../../../assets/svg/exportIcon";

const listHeaders = [
    {
        name: "Order ID",
        alignment: "flex-start",
        flex: 1.5,
    },
    {
        name: "Status",
        alignment: "flex-start",
        flex: 1.1,
    },
    {
        name: "Type",
        alignment: "flex-start",
        flex: 1.5,
    },
    {
        name: "Supplier",
        alignment: "flex-start",
        flex: 1.5,
    },
];

const Orders = (props) => {
    // ############# Const data
    const recordsPerPage = 12;

    //  ############ Props
    const {
        purchaseOrders = [],
        setPurchaseOrders,
        updatePurchaseOrder,
        addNotification,

    } = props;

    const purchaseOrderPermissions = props.route.params.purchaseOrderPermissions;
    const modal = useModal();
    const theme = useTheme();

    //  ############ State
    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    const [totalPages, setTotalPages] = useState(1);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [isNextDisabled, setNextDisabled] = useState(false);
    const [isPreviousDisabled, setPreviousDisabled] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});
    const [selectedOrders, setSelectedOrders] = useState([]);

    const [pageSettingState, setPageSettingState] = useState({});
    const [adminId, setAdminId] = useState('');

    // ############# Lifecycle methods

    useEffect(() => {
        if (!purchaseOrders.length) fetchOrdersData(currentPagePosition);
        setTotalPages(Math.ceil(purchaseOrders.length / recordsPerPage));
        fetchRole();
    }, []);

    useEffect(() => {
        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            fetchOrdersData(1)
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchOrdersData, 300);

        setSearchQuery((prevSearch) => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
        setCurrentPagePosition(1)
    }, [searchValue]);

    // ############# Event Handlers

    const onSearchInputChange = (input) => {
        setSearchValue(input);
    };

    const fetchRole = () => {
        getRolesCall()
            .then((data) => {
                setAdminId(data.find(x => x.name == "Admin")._id)
            })
            .catch(error => {
                console.log("Error occured whilst fetching admin Id", error)
            })
    }

    const handleDataRefresh = () => {
        fetchOrdersData();
    };

    const handleOnSelectAll = () => {
        let updatedOrdersList = selectAll(purchaseOrders, selectedOrders);
        setSelectedOrders(updatedOrdersList);
    };

    const onRemovePurchaseOrder = () => {
        setFetchingData(true);
        removePurchaseOrderCall(selectedOrders)
            .then(_ => {
                console.log('purchase order items removed');
                showSuccessModal()
                fetchOrdersData(currentPagePosition);
            })
            .catch(error => {
                console.log('failed to remove purchase orders', error)
                errorScreen()
                setFetchingData(false);
            })
            .finally(_ => {
                setSelectedOrders([])
            })
    }

    const handleOnCheckBoxPress = (item) => () => {
        const { _id } = item;
        let updatedOrders = checkboxItemPress(_id, selectedOrders);

        setSelectedOrders(updatedOrders);
    };

    const handleOnItemPress = (item, isOpenEditable) => {
        props.navigation.navigate("OrderItemPage", {
            initial: false,
            order: item,
            isEdit: isOpenEditable,
            updateOrders: () => {
                {
                    handleDataRefresh();
                }
            }
        });
    };

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            let { currentPage, currentListMin, currentListMax } = useNextPaginator(
                currentPagePosition,
                recordsPerPage,
                currentPageListMin,
                currentPageListMax
            );
            setCurrentPagePosition(currentPage);
            setCurrentPage(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
            fetchOrdersData(currentPage)
        }
    };

    const goToPreviousPage = () => {
        //if (currentPagePosition === 1) return;

        let { currentPage, currentListMin, currentListMax } = usePreviousPaginator(
            currentPagePosition,
            recordsPerPage,
            currentPageListMin,
            currentPageListMax
        );
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
        fetchOrdersData(currentPage)

    };

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal("ActionContainerModal", {
            actions: getFabActions(),
            title: "ORDERS ACTIONS",
            onClose: () => {
                setFloatingAction(false);
            },
        });
    };

    const openDeletionConfirm = () => {

        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationCheckBoxComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={() => modal.closeModals('ConfirmationModal')}
                    onAction={() => {
                        modal.closeModals('ConfirmationModal');
                        onRemovePurchaseOrder();
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
    // ############# Helper functions

    const errorScreen = () => {
        setTimeout(() => {
            modal.openModal(
                'ConfirmationModal',
                {
                    content: <ConfirmationComponent
                        isEditUpdate={false}
                        isError={true}
                        onCancel={onCancelErrorScreen}
                        message="There was an issue performing this action."
                    />
                    ,
                    onClose: () => {
                        modal.closeModals('ConfirmationModal')
                    }
                })
        }, 100);
    }

    const showSuccessModal = () => {
        setTimeout(() => {
            modal.openModal(
                'ConfirmationModal',
                {
                    content: <ConfirmationComponent
                        isEditUpdate={false}
                        isError={false}
                        message={'Completed Successfully!'}
                        onCancel={modal.closeAllModals}
                        onAction={modal.closeAllModals}
                    />
                    ,
                    onClose: () => {
                        modal.closeModals('ConfirmationModal')
                    }
                })
        }, 100);
    }

    const onCancelErrorScreen = () => {
        modal.closeAllModals();
        setTimeout(() => {
            handleDataRefresh();
        }, 200)
    }

    const fetchOrdersData = (pagePosition) => {

        let currentPosition = pagePosition ? pagePosition : 1;
        setCurrentPagePosition(currentPosition)

        setFetchingData(true);
        getPurchaseOrders(searchValue, recordsPerPage, currentPosition)
            .then((ordersInfo) => {

                const { data = [], pages = 0 } = ordersInfo;

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
                    setPreviousDisabled(false)
                } else {
                    setNextDisabled(true);
                    setPreviousDisabled(true);
                }

                setPurchaseOrders(data);
                data.length === 0 ? setTotalPages(1) : setTotalPages(pages)

            })
            .catch((error) => {
                console.log("failed to get orders", error);

                handleUnauthorizedError(error?.response?.status, setPurchaseOrders);
                setPageSettingState({ ...pageSettingState, isDisabled: true });

                setTotalPages(1);
                setPreviousDisabled(true);
                setNextDisabled(true);
                // errorScreen();
            })
            .finally((_) => {
                setFetchingData(false);
            });
    };

    const renderOrderFn = (item) => {
        return (
            <ListItem
                hasCheckBox={true}
                isChecked={selectedOrders.includes(item._id)}
                onCheckBoxPress={handleOnCheckBoxPress(item)}
                onItemPress={() => handleOnItemPress(item, false)}
                itemView={orderItem(item)}
            />
        );
    };

    const orderItem = (item) => {
        let {
            purchaseOrderNumber = "",
            status = "",
            deliveryDate,
            supplier = {},
            type,
        } = item;
        const { name = "" } = supplier;
        const statusColor =
            status === "Incomplete"
                ? "--color-purple-600"
                : status === "Request Sent"
                    ? "--color-teal-600"
                    : status === "Payment Due"
                        ? "--color-red-700"
                        : "--color-gray-700";

        deliveryDate = deliveryDate ? formatDate(deliveryDate, "DD/MM/YYYY") : "n/a";

        return (
            <>
                <RightBorderDataItem text={purchaseOrderNumber} fontStyle="--text-sm-medium" flex={1.5} />
                <DataItem text={transformToTitleCase(status, '_')} fontStyle="--text-sm-medium" flex={1.2} color={statusColor} />
                <DataItem text={transformToTitleCase(type, '_')} fontStyle="--text-sm-medium" flex={1.5} align={"center"} />
                <DataItem text={name} fontStyle="--text-sm-medium" flex={1.5} color="--color-blue-600" />
            </>
        );
    };

    const getFabActions = () => {
        console.log("we up and we not dead ", purchaseOrderPermissions)
        let actions = [];

        const isOneSelected = selectedOrders.length === 1;
        const isDeleteDisabled = !selectedOrders.length;
        const deleteAction = (
            <View style={{
                borderRadius: 6,
                flex: 1,
                overflow: 'hidden'
            }}
            >
                <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.MEDIUM}
                    isDisabled={isDeleteDisabled}
                    onLongPress={openDeletionConfirm}
                >
                    <ActionItem
                        title="Hold to Delete"
                        icon={(
                            <WasteIcon
                                strokeColor={isDeleteDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700']}
                            />
                        )}
                        touchable={false}
                        disabled={isDeleteDisabled}
                    />
                </LongPressWithFeedback>
            </View>
        );

         purchaseOrderPermissions.delete && actions.push(deleteAction);

        const orderId = isOneSelected ? selectedOrders[0] : '';
        const purchaseOrder = purchaseOrders.find((item) => item._id === orderId) || {};
        const { status, type } = purchaseOrder;
        let isRequestDisabled = true;
        if (status === PURCHASE_ORDER_STATUSES.PENDING || status === PURCHASE_ORDER_STATUSES.QUOTATION_REQUESTED) isRequestDisabled = false;
        const requestApproval = (
            <ActionItem
                title={"Request Approval"}
                icon={<AddIcon
                    strokeColor={isRequestDisabled ? theme.colors['--color-gray-600'] : undefined}
                />}
                disabled={isRequestDisabled}
                touchable={!isRequestDisabled}
                onPress={() => showConfirmation('Your request will be sent to the admin. Once approved you can either request a quotation or send a purchase order', 'request_approval', purchaseOrder, status === PURCHASE_ORDER_STATUSES.QUOTATION_REQUESTED && PURCHASE_ORDER_STATUSES.PENDING)}
            />
        )

        const isApprovedDisabled = status !== PURCHASE_ORDER_STATUSES.PENDING;
        const approveOrder = (
            <ActionItem
                title={"Approve"}
                icon={<AddIcon
                    strokeColor={isApprovedDisabled ? theme.colors['--color-gray-600'] : undefined}
                />}
                disabled={isApprovedDisabled}
                touchable={!isApprovedDisabled}
                onPress={() =>
                    updateStatus(orderId, PURCHASE_ORDER_STATUSES.APPROVED)
                }
            />
        )

        let isSendToSupplierDisabled = true;
        if (status === PURCHASE_ORDER_STATUSES.APPROVED && type === ORDER_TYPES.PURCHASE_ORDER) isSendToSupplierDisabled = false;
        const sendToSupplier = (
            <ActionItem
                title={"Send to Supplier"}
                icon={<ExportIcon
                    strokeColor={isSendToSupplierDisabled ? theme.colors['--color-gray-600'] : undefined}
                />}
                touchable={!isSendToSupplierDisabled}
                disabled={isSendToSupplierDisabled}
                onPress={() => showConfirmation('A purchase order will be sent to the supplier via email. You may view a copy of it under invoice tab.', 'purchase_order', purchaseOrder)}
            />
        )
        let isQuotationDisabled = true;
        if (status === PURCHASE_ORDER_STATUSES.APPROVED || status === PURCHASE_ORDER_STATUSES.QUOTATION_REQUESTED) isQuotationDisabled = false;
        const requestQuotation = (
            <ActionItem
                title={"Request Quotation"}
                icon={<EditIcon
                    strokeColor={isQuotationDisabled ? theme.colors['--color-gray-600'] : undefined}
                />}
                disabled={isQuotationDisabled}
                touchable={!isQuotationDisabled}
                onPress={() => showConfirmation('By requesting a quotation, a requisition with the items and quanities needed will be sent to the supplier. You may view the document under the requisition tab.', 'quotation', purchaseOrder)}
            />
        )

        purchaseOrderPermissions.update && actions.push(requestApproval, approveOrder, requestQuotation, sendToSupplier)


        return (
            <ActionContainer floatingActions={actions} title={"ORDERS ACTIONS"} />
        );
    };

    const onCreateInvoice = (purchaseOrderId) => {
        modal.closeAllModals()
        setSelectedOrders([])
        setFetchingData(true);
        createInvoiceViaOrders(purchaseOrderId)
            .then((data) => {
                console.log("Invoice Record:", data);
                updatePurchaseOrder(purchaseOrderId, { status: "billed" });
                modal.closeAllModals();
                addNotification(
                    "Inventory Items have been added to the system.",
                    "Inventory"
                );
            })
            .catch((error) => {

                const errorMessage = error?.response?.data?.msg || error?.response?.data?.message;
                // change to modal
                Alert.alert(
                    "Failed To Invoice PO.",
                    errorMessage,
                    [
                        {
                            text: "Ok",
                            onPress: () => console.log("Ok pressed"),
                        },
                    ],
                    {
                        cancelable: false,
                    }
                );
                console.log("Failed to create invoice", error);
            })
            .finally(_ => {
                setFetchingData(false);
            });

    };

    const updateStatus = (purchaseOrderId, status) => {
        modal.closeAllModals();
        setFetchingData(true)
        updatePurchaseOrderStatus(purchaseOrderId, status)
            .then((data) => {
                updatePurchaseOrder(purchaseOrderId, { status });
                handleDataRefresh();
                showSuccessModal()
            })
            .catch((error) => {
                console.log("Failed to update status", error);
                errorScreen()
            })
            .finally(_ => {
                setFetchingData(false)
            });
    };

    const handleRequestQuotation = (purchaseOrder) => {
        modal.closeAllModals();
        const { _id, supplier } = purchaseOrder
        console.log('i am sidosi',_id, { email: supplier.email })
        setFetchingData(true)
        requestQuotation(_id, { email: supplier.email })
            .then(_ => {
                showSuccessModal();
                handleDataRefresh();
            })
            .catch((error) => {
                console.log("An error has occured", error);
                errorScreen();
            })
            .finally(_ => {
                setFetchingData(false)
            })

    }

    const handleSendToSupplier = (purchaseOrder) => {
        modal.closeAllModals();
        const { _id, supplier } = purchaseOrder
        setFetchingData(true)
        sendToSupplier(_id, { email: supplier.email })
            .then(_ => {
                showSuccessModal();
                handleDataRefresh();
            })
            .catch((error) => {
                console.log("An error has occured", error);
                errorScreen();
            })
            .finally(_ => {
                setFetchingData(false)
            })

    }

    const handleRequestApproval = (purchaseOrder, status) => {
        createAlert({ title: 'Approval Request', message: `Order ${purchaseOrder.purchaseOrderNumber} requires approval`, roles: [adminId] })
            .then(_ => {
                status && updateStatus(purchaseOrder._id, status);
                showSuccessModal()
            })
            .catch((error) => {
                console.log("Error whilst requesting approval", error)
                errorScreen()
            });
    }

    const showConfirmation = (message, type, purchaseOrder, status) => {
        modal.openModal('ConfirmationModal', {
            content: (
                <ConfirmationComponent
                    textPadding={25}
                    textAlign={'left'}
                    isWarning={true}
                    onCancel={() => {
                        modal.closeModals('ConfirmationModal');
                    }}
                    onAction={() => {
                        switch (type) {
                            case 'request_approval':
                                handleRequestApproval(purchaseOrder, status)
                                break;
                            case 'quotation':
                                handleRequestQuotation(purchaseOrder)
                                break;
                            case 'purchase_order':
                                handleSendToSupplier(purchaseOrder)
                            default: break;
                        }
                        modal.closeModals('ConfirmationModal');
                    }}
                    message={message}
                    secondaryMessage={"Do you wish to continue?"}
                />
            ),
            onClose: () => {
                modal.closeModals('ConfirmationModal');
            },
        });
    }

    // ############# Prepare list data

    let ordersToDisplay = [...purchaseOrders];

    return (
        <PageSettingsContext.Provider value={{
            pageSettingState,
            setPageSettingState
        }}
        >
            <NavPage
                isFetchingData={isFetchingData}
                onRefresh={handleDataRefresh}
                placeholderText={"Search by any heading or entry below"}
                changeText={onSearchInputChange}
                inputText={searchValue}
                routeName={"Orders"}
                listData={ordersToDisplay}
                listHeaders={listHeaders}
                itemsSelected={selectedOrders}
                onSelectAll={handleOnSelectAll}
                listItemFormat={renderOrderFn}
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

const mapStateToProps = (state) => ({
    purchaseOrders: state.orders,
});

const mapDispatcherToProp = {
    setPurchaseOrders,
    updatePurchaseOrder,
    addNotification,
};

export default connect(mapStateToProps, mapDispatcherToProp)(withModal(Orders));

const styles = StyleSheet.create({
    item: {
        // flex:1
        marginRight: 25,
    },
    itemText: {
        fontSize: 16,
    },
    footer: {
        flex: 1,
        alignSelf: "flex-end",
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        marginBottom: 20,
        right: 0,
        marginRight: 30,
    },
    rowBorderRight: {
        borderRightColor: "#E3E8EF",
        borderRightWidth: 1,
        // marginRight: 20,
    },
});
