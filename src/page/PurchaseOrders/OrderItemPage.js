import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { getPurchaseOrderById, updatePurchaseOrder, updatePurchaseOrderDetails, updateInvoiceDocumnet, updatePurchaseOrderStatus, generatePurchaseOrderInvoice } from '../../api/network';
import OrderDetailsTab from '../../components/OverlayTabs/OrderDetailsTab';
import OrderItemTab from '../../components/OverlayTabs/OrderItemTab';
import SupplierDetailsTab from '../../components/OverlayTabs/SupplierDetailsTab';
import { PageContext } from '../../contexts/PageContext';
import DetailsPage from '../../components/common/DetailsPage/DetailsPage';
import TabsContainer from '../../components/common/Tabs/TabsContainerComponent';
import ConfirmationComponent from '../../components/ConfirmationComponent';
import { useModal } from 'react-native-modalfy';

function OrderItemPage({ route, navigation }) {

    const { order, isOpenEditable, updateOrders } = route.params;
    const baseStateRef = useRef();
    const modal = useModal();


    const currentTabs = ['Details', 'Items', 'Suppliers'];
    // console.log("Order:", order);
    const { _id, supplier = {}, purchaseOrderNumber, deliveryDate = '', description = '' } = order;
    const { name = '' } = supplier


    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [selectedOrder, setSelectedOrder] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [pageState, setPageState] = useState({});

    const [isUpdateDone, setIsUpdateDone] = useState(false);
    const [isUpdateDetails, setIsUpdateDetails] = useState(false);

    const { isEditMode } = pageState;

    // ##### Lifecycle Methods
    useEffect(() => {
        setTimeout(() => fetchOrder(_id), 200);
    }, []);

    useEffect(() => {

        if (pageState.isEditMode) {
            baseStateRef.current = orderItems // save the base state for as we enter edit mode.
        }

        if (pageState.isEditMode === false && isUpdateDone) {
            handleSaveEdit();
            setIsUpdateDone(false);
        }
    }, [pageState.isEditMode])
    // ##### Event Handlers

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    const handleSaveEdit = () => {
        let dataToSend = orderItems.map(item => {
            const { amount = 0, productId = {} } = item
            return {
                amount,
                productId: productId?._id || ''
            }
        })
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={() => {
                        modal.closeModals('ConfirmationModal')
                        setOrderItems(baseStateRef.current);
                    }}
                    onAction={() => {
                        updatePurchaseOrderItems(dataToSend, _id)
                        setTimeout(() => {
                            modal.closeModals('ConfirmationModal')
                        }, 100)
                    }}
                    // onAction = { () => confirmAction()}
                    message={'Do you want to save your changes ?'}
                />
                ,
                onClose: () => {
                    modal.closeModals('ConfirmationModal')
                }
            })
    };

    const updatePurchaseOrderItems = (data, purchaseOrderId) => {
        updatePurchaseOrder(purchaseOrderId, data)
            .then(data => {
                console.log('DB data: ', data)
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={false}
                            isEditUpdate={false}
                            message={'Changes have been saved. \n You can now resend request to vendor.'}
                            onAction={() => {
                                modal.closeModals('ConfirmationModal')
                            }}
                            onCancel={() => {
                                modal.closeModals('ConfirmationModal')

                            }}
                        />
                        ,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal')
                        }
                    })
            })
            .catch(error => {
                console.log('Failed to update order', error);
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={isError}
                            isEditUpdate={false}
                            onAction={() => {
                                modal.closeModals('ConfirmationModal')
                            }}

                            onCancel={() => {
                                setPageState({
                                    ...pageState,
                                    isEditMode: true
                                });
                                modal.closeModals('ConfirmationModal')

                            }}
                        />
                        ,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal')
                        }
                    })
            })
            .finally(_ => {
                fetchOrder(_id);
            })
    };

    const onItemChange = (data) => {
        setOrderItems(data)
        setIsUpdateDone(true)
    };

    const BackTapped = () => {
        navigation.goBack('Orders');
    };

    const onAddProductItems = (data) => {

        let updatedList = data.map(item => {
            return {
                amount: item.amount || 0,
                productId: {
                    ...item
                }
            }
        })
        let itemsList = [...orderItems, ...updatedList]
        // console.log("Items: ", itemsList)
        setOrderItems(itemsList)
        setIsUpdateDone(true)

    };

    const onRemoveProductItems = (data) => {
        console.log('Current data list');
        modal.openModal('ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError={false}
                    isEditUpdate={true}
                    onAction={() => {
                        modal.closeModals('ConfirmationModal');
                        updatePurchaseOrderItems(data, _id)
                    }}

                    onCancel={() => {
                        modal.closeModals('ConfirmationModal')

                    }}
                    message="Do you want to delete these item(s)?"

                />
                ,
                onClose: () => {
                    modal.closeModals('ConfirmationModal')
                }
            })
    };

    // ##### Helper functions

    const setPageLoading = (value) => {
        setPageState({
            ...pageState,
            isLoading: value,
            isEdit: false
        })
    }

    const errorScreen = () => {
        setTimeout(() => {
            modal
                .openModal(
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

    const onCancelErrorScreen = () => {
        modal.closeAllModals();
        setTimeout(() => {
            BackTapped();
        }, 200)
    }

    const fetchOrder = async (id) => {
        setPageLoading(true);
        getPurchaseOrderById(id)
            .then(data => {
                const { orders = [] } = data || {};
                
                setSelectedOrder(data)
                setOrderItems(orders)
            })
            .catch(error => {
                console.log('Failed to get order', error)
                errorScreen();

                // Add confirmation componenet
                //TODO handle error cases.
            })
            .finally(_ => {
                setPageLoading(false)
            })
    };

    const getTabContent = (selectedTab) => {
        switch (selectedTab) {
            case 'Details':
                return <OrderDetailsTab
                    order={selectedOrder}
                    onUpdate={() => fetchOrder(_id)}
                // fields={fields}
                // onFieldChange={onFieldChange}
                />;
            case 'Items':
                return <OrderItemTab
                    orders={orderItems}
                    isEditMode={isEditMode}
                    onItemChange={onItemChange}
                    supplierId={supplier?._id}
                    onAddProductItems={onAddProductItems}
                    onRemoveProductItems={onRemoveProductItems}
                />;
            case 'Suppliers':
                return <SupplierDetailsTab supplierId={supplier?._id} order={selectedOrder} onUpdated={fetchOrder} />;
            default:
                return <View />;
        }
    };

    return (
        <>
            <PageContext.Provider value={{ pageState, setPageState }}>
                <DetailsPage
                    headerChildren={[purchaseOrderNumber]}
                    onBackPress={BackTapped}
                    pageTabs={
                        <TabsContainer
                            tabs={currentTabs}
                            selectedTab={currentTab}
                            onPressChange={onTabPress}
                        />
                    }
                >

                    {getTabContent(currentTab)}

                </DetailsPage>
            </PageContext.Provider>
        </>
    );
}

OrderItemPage.propTypes = {};
OrderItemPage.defaultProps = {};

export default OrderItemPage;

const styles = StyleSheet.create({
    item: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        color: '#4A5568',
    },
})


