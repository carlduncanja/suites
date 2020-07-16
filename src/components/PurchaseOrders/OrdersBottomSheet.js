import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Text, TouchableOpacity} from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";


import {getPurchaseOrderById} from "../../api/network";
import {colors} from "../../styles";
import OrderDetailsTab from '../OverlayTabs/OrderDetailsTab';
import OrderItemTab from '../OverlayTabs/OrderItemTab';
import OrderSuppliersTab from '../OverlayTabs/OrderSuppliersTab';
import SupplierDetailsTab from '../OverlayTabs/SupplierDetailsTab';

function OrdersBottomSheet({order = {}, isOpenEditable}) {

    const currentTabs = ["Details", "Items", "Suppliers"];
    // console.log("Order:", order)
    const {_id, supplier = {}, purchaseOrderNumber} = order;
    const {name = ""} = supplier


    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [isEditMode, setEditMode] = useState(isOpenEditable);
    const [editableTab, setEditableTab] = useState(currentTab)
    const [isFetching, setFetching] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState({})
    const [orderItems, setOrderItems] = useState([])
    const [fields, setFields] = useState({})

    const [popoverList, setPopoverList] = useState([])

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
            const updatedObj = {...popoverList[objIndex], status: popoverValue};
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
    }

    const onAddProductItems = (data) =>{

        let updatedList = data.map( item => {
            return {
                amount : item.amount || 0,
                productId : {
                    ...item
                }
            }
        })
        let itemsList = [...orderItems, ...updatedList]

        setOrderItems(itemsList)
     
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
                return <OrderDetailsTab order={selectedOrder}/>
            case "Items":
                return <OrderItemTab 
                    orders={orderItems}
                    isEditMode = {isEditMode}
                    onItemChange = {onItemChange}
                    supplierId = {supplier?._id}
                    onAddProductItems = {onAddProductItems}
                />
            case "Suppliers":
                return <SupplierDetailsTab order={selectedOrder}/>;
            default :
                return <View/>
        }
    };

    return (
        <View style={{flex: 1}}>
            {
                isFetching
                    ? <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
                        <ActivityIndicator style={{alignSelf: 'center'}} size="large" color={colors.primary}/>
                    </View>
                    : <SlideOverlay
                        overlayId={name}
                        overlayTitle={purchaseOrderNumber}
                        onTabPressChange={onTabPress}
                        currentTabs={currentTabs}
                        selectedTab={currentTab}
                        isEditMode={isEditMode}
                        onEditPress={onEditPress}
                        overlayContent={
                            <View
                                style={{flex: 1, padding: 30, paddingBottom: 20}}
                            >
                                {getTabContent(currentTab)}
                            </View>
                        }
                    />
            }
        </View>
    );
}

OrdersBottomSheet.propTypes = {};
OrdersBottomSheet.defaultProps = {};

export default OrdersBottomSheet;

const styles = StyleSheet.create({
    item: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        color: "#4A5568",
    },
})
