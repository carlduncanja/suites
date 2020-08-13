import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import BottomSheetContainer from '../common/BottomSheetContainer';

import { getPurchaseOrderById } from "../../api/network";
import { colors } from "../../styles";
import OrderDetailsTab from '../OverlayTabs/OrderDetailsTab';
import OrderItemTab from '../OverlayTabs/OrderItemTab';
import OrderSuppliersTab from '../OverlayTabs/OrderSuppliersTab';
import SupplierDetailsTab from '../OverlayTabs/SupplierDetailsTab';
import { updatePurchaseOrder } from '../../api/network';
import { PageContext } from "../../contexts/PageContext";
import DetailsPage from "../common/DetailsPage/DetailsPage";
import TabsContainer from "../common/Tabs/TabsContainerComponent";

function OrderItemPage({ route, navigation }) {

    const { order, isOpenEditable } = route.params;


    const currentTabs = ["Details", "Items", "Suppliers"];
    // console.log("Order:", order)
    const { _id, supplier = {}, purchaseOrderNumber } = order;
    const { name = "" } = supplier


    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [isEditMode, setEditMode] = useState(isOpenEditable);
    const [editableTab, setEditableTab] = useState(currentTab)
    const [isFetching, setFetching] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [pageState, setPageState] = useState({});
    const [fields, setFields] = useState({});
    const [isUpdateDone, setIsUpdateDone] = useState(false);

    const [popoverList, setPopoverList] = useState([]);

    // ##### Lifecycle Methods
    useEffect(() => {
        setTimeout(() => fetchOrder(_id), 200);
    }, []);

    // ##### Event Handlers

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    const onEditPress = (tab) => {
        setEditableTab(tab)
        setEditMode(!isEditMode)

        if (isEditMode && isUpdateDone) {
            if (currentTab === "Items") {
                console.log("Edit Press: ", orderItems)
                let dataToSend = orderItems.map(item => {
                    const { amount = 0, productId = {} } = item
                    return {
                        amount,
                        productId: productId?._id || ""
                    }
                })
                // console.log("Updated Data: ", dataToSend)
                // console.log("Order Id: ", _id)
                updatePurchaseOrderItems(dataToSend, _id)
            }


        }

    }

    const updatePurchaseOrderItems = (data, purchaseOrderId) => {
        updatePurchaseOrder(purchaseOrderId, data)
            .then(data => {
                console.log("DB data: ", data)
                Alert.alert('Success', 'Purchase Order has been successfully updated.')
            })
            .catch(error => {
                console.log("Failed to update order", error)
                Alert.alert('Sorry', 'Failed to update order, please try again.')
                //TODO handle error cases.
            })
    }

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
        })
    };

    const handlePopovers = (popoverValue) => (popoverItem) => {

        if (!popoverItem) {
            let updatedPopovers = popoverList.map(item => {
                return {
                    ...item,
                    status: false
                }
            })

            setPopoverList(updatedPopovers)
        } else {
            const objIndex = popoverList.findIndex(obj => obj.name === popoverItem);
            const updatedObj = { ...popoverList[objIndex], status: popoverValue };
            const updatedPopovers = [
                ...popoverList.slice(0, objIndex),
                updatedObj,
                ...popoverList.slice(objIndex + 1),
            ];
            setPopoverList(updatedPopovers)
        }

    }

    const onItemChange = (data) => {
        setOrderItems(data)
        setIsUpdateDone(true)
    }

    const BackTapped = () => {
        navigation.navigate("Orders");
    }

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

    }

    // ##### Helper functions

    const fetchOrder = async (id) => {
        setFetching(true);
        getPurchaseOrderById(id)
            .then(data => {
                const { orders = [] } = data
                setSelectedOrder(data)
                setOrderItems(orders)

            })
            .catch(error => {
                console.log("Failed to get order", error)
                //TODO handle error cases.
            })
            .finally(_ => {
                setFetching(false)
            })
    };

    const getTabContent = (selectedTab) => {
        switch (selectedTab) {
            case "Details":
                return <OrderDetailsTab order={selectedOrder} />
            case "Items":
                return <OrderItemTab
                    orders={orderItems}
                    isEditMode={isEditMode}
                    onItemChange={onItemChange}
                    supplierId={supplier?._id}
                    onAddProductItems={onAddProductItems}
                />
            case "Suppliers":
                return <SupplierDetailsTab order={selectedOrder} />;
            default:
                return <View />
        }
    };

    return (
        // <BottomSheetContainer
        //     isFetching={isFetching}
        //     overlayId={name}
        //     overlayTitle={purchaseOrderNumber}
        //     onTabPressChange={onTabPress}
        //     currentTabs={currentTabs}
        //     selectedTab={currentTab}
        //     isEditMode={isEditMode}
        //     onEditPress={onEditPress}
        //     overlayContent={getTabContent(currentTab)}
        // />

        <>
            <PageContext.Provider value={{ pageState, setPageState }}>
                <DetailsPage
                    title={purchaseOrderNumber}
                    subTitle={``}
                    onBackPress={BackTapped}
                    pageTabs={
                        <TabsContainer
                            tabs={currentTabs}
                            selectedTab={currentTab}
                            onPressChange={onTabPress}
                        />
                    }
                >

                    <OrderPageContent
                        overlayContent={getTabContent(currentTab)}

                    />


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
        color: "#4A5568",
    },
})

function OrderPageContent({
    overlayContent,

}) {



    return (
        <>
            {
                overlayContent
            }

        </>
    )

}

