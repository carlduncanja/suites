import React,{ useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Table from "../common/Table/Table";
import Item from '../common/Table/Item'; 
import RoundedPaginator from '../common/Paginators/RoundedPaginator';
import FloatingActionButton from '../common/FloatingAction/FloatingActionButton';
import LongPressWithFeedback from "../common/LongPressWithFeedback";
import ActionContainer from "../common/FloatingAction/ActionContainer";
import ActionItem from "../common/ActionItem";
import NumberChangeField from "../common/Input Fields/NumberChangeField";
import AddItemContainer from '../PurchaseOrders/AddItemContainer';

import WasteIcon from "../../../assets/svg/wasteIcon";
import AddIcon from "../../../assets/svg/addIcon";

import { currencyFormatter } from "../../utils/formatter";
import {useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll} from '../../helpers/caseFilesHelpers';
import {useModal} from "react-native-modalfy";
import {PageContext} from '../../contexts/PageContext';
import Footer from "../common/Page/Footer";
import Search from "../common/Search";

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import DataItem from "../common/List/DataItem";

const OrderItemTab = ({ 
    orders = [],  
    // isEditMode = false, 
    onItemChange = ()=>{},  
    supplierId = "", 
    onAddProductItems = ()=>{},
    onRemoveProductItems = ()=>{},
}) =>{
    
    const modal = useModal();  
    const theme = useTheme();
    const {pageState, setPageState} = useContext(PageContext);
    const {isEditMode, isLoading} = pageState;

    const recordsPerPage = 15;

    const headers = [
        {
            name : 'Item Name',
            alignment : 'flex-start',
            flex : 2,
        },
        {
            name : 'SKU',
            alignment : 'center',
            flex : 1,
        },
        {
            name : 'Quantity',
            alignment : 'center',
            flex : 1,
        },
        {
            name : 'Unit',
            alignment : 'center',
            flex : 1,
        },
        {
            name : 'Unit Price',
            alignment : 'flex-end',
            flex : 1,
        },
    ]

    const [isFloatingActionDisabled, setFloatingAction] = useState(false)
    
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
    const [currentPagePosition, setCurrentPagePosition] = useState(1)

    const [selectedItems, setSelectedItems] = useState([])

    useEffect(() => {
        setTotalPages(Math.ceil(orders.length / recordsPerPage))
    }, []);

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            let {currentPage, currentListMin, currentListMax} = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        let {currentPage, currentListMin, currentListMax} = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
    };

    const handleOnSelectAll = () => {
        let updatedItemsList = selectAll(orders, selectedItems)
        setSelectedItems(updatedItemsList)
    }

    const handleOnCheckBoxPress = (item) => () => {
        const {_id} = item;
        let updatedItems = checkboxItemPress(item, _id, selectedItems)

        setSelectedItems(updatedItems)
    }

    const toggleActionButton = () => {
        setFloatingAction(true)

        modal.openModal("ActionContainerModal",
            {
                actions: floatingActions(),
                title: "ORDER ACTIONS",
                onClose: () => {
                    setFloatingAction(false)
                },
            })
    }

    const onQuantityChange = (item) => (action) =>{
        const { amount = 0, productId = {} } = item
        const { inventoryId = "" } = productId

        const updatedObj = {
            ...item,
            amount: action === 'add' ? amount + 1 : amount === 0 ? amount : amount - 1
        };


        const updatedData = orders.map(item => {
            // console.log("Order: ", item.p)
            return item.productId?.inventoryId === inventoryId
                ? {...updatedObj}
                : {...item}
        })

        onItemChange(updatedData)
    }

    const onAmountChange = (item) => (value) => {

        const { productId = {} } = item
        const { inventoryId = "" } = productId

        const updatedObj = {
            ...item,
            amount: value === '' ? "" : parseFloat(value) < 0 ? 0 : parseInt(value)
        };

        const updatedData = orders.map(item => {
            return item.productId?.inventoryId === inventoryId
                ? {...updatedObj}
                : {...item}
        })

        onItemChange(updatedData)
    }

    const listItemFormat = (item,index) => {
        const { amount = 0, productId = {} } = item
        const { name = "", sku = "", unitPrice = 0, unit = "" } = productId
        
        return (
            <>
                <DataItem text = {name} flex = {2} fontStyle = "--text-base-medium" color = "--color-blue-600" />
                <DataItem text = {sku === "" ? `n/a` : sku} align = "center" flex = {1} fontStyle = "--text-base-medium" color = "--color-gray-800"/>
                {
                    isEditMode ?
                        <NumberChangeField
                            onChangePress={onQuantityChange(item)}
                            onAmountChange = {onAmountChange(item)}
                            value={amount === 0 ? "0" : amount.toString()}
                            borderColor = '--color-gray-400'
                            backgroundColor = '--color-gray-100'
                        />
                        :
                        <DataItem text = {amount} align = "center" flex = {1} fontStyle = "--text-base-medium" color = "--color-gray-800"/>

                }
                <DataItem text = {unit} align = "center" flex = {1} fontStyle = "--text-base-medium" color = "--color-gray-800"/>
                <DataItem text = {`$ ${currencyFormatter(unitPrice)}`} align = "flex-end" flex = {1} fontStyle = "--text-base-medium" color = "--color-gray-800"/>

                {/* <View style={styles.item}>
                    <Text style={[styles.itemText,{color:'#3182CE'}]}>{name}</Text>
                </View>

                <View style={[styles.item,{alignItems:'center'}]}>
                    <Text style={styles.itemText}>{sku === "" ? `n/a` : sku}</Text>
                </View> */}

                {/* {
                    isEditMode ?
                        <NumberChangeField
                            onChangePress = {onQuantityChange(item)}
                            onAmountChange = {onAmountChange(item)}
                            value = {amount.toString()}
                        />
                    :
                        <View style={[styles.item,{alignItems:'center'}]}>
                            <Text style={styles.itemText}>{amount}</Text>
                        </View>
                }
                 */}
                {/* <View style={[styles.item,{alignItems:'flex-start'}]}>
                    <Text style={styles.itemText}>{unit}</Text>
                </View>

                <View style={styles.item}>
                    <Text style={styles.itemText}>$ {currencyFormatter(unitPrice)}</Text>
                </View> */}
            </>
        )
    }

    const renderItemFn = (item,index) => {
        return <Item
            hasCheckBox={true}
            isChecked={selectedItems.includes(item._id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={() => {}}
            itemView={listItemFormat(item, index)}
        />
    }

    const floatingActions = () =>{
        let isDisabled = selectedItems.length === 0 ? true : false;
        let isDisabledColor = selectedItems.length === 0 ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700']
        const addItem = 
            <ActionItem 
                title={"Add Item"} 
                icon={<AddIcon strokeColor = {isEditMode ? theme.colors['--color-green-700'] : theme.colors['--color-gray-600']}/>}
                onPress={onAddItem}
                disabled = {isEditMode ? false : true}
                touchable = {isEditMode ? true : false}
        />;

        const deleteItem = 
            <LongPressWithFeedback 
                pressTimer={700} 
                onLongPress={handleRemoveItem}
                isDisabled = {isDisabled}
            >
                <ActionItem 
                    title={"Hold to Delete"} 
                    icon={<WasteIcon strokeColor = {isDisabledColor}/>} 
                    onPress={() => {}} 
                    disabled = {isDisabled}
                    touchable={false}
                />
            </LongPressWithFeedback>;

        return <ActionContainer
            floatingActions={[
                deleteItem,
                addItem,
            ]}
            title={"ORDERS ACTIONS"}
        />
    }

    const onAddItemsToList = (items) => {
        // modal.closeModals('OverlayInfoModal');
        setFloatingAction(false)
        onAddProductItems(items)
    }

    const onAddItem = () =>{
        modal.closeModals('ActionContainerModal')

        setTimeout(()=>{
            modal.openModal('OverlayInfoModal',
                {
                    overlayContent : <AddItemContainer
                        supplierId = {supplierId}
                        orders = {orders}
                        onAddProductItems = {onAddItemsToList}
                        onCancel = {()=> setFloatingAction(false)}
                    />,
                    onClose: () => setFloatingAction(false)
                })
        },200)
    }

    const handleRemoveItem = () => {
        let updatedOrders = orders
        selectedItems.map( item => {
            updatedOrders = updatedOrders.filter(order => order?._id !== item)
        })
        onRemoveProductItems(updatedOrders);
    }

    let itemsToDisplay = [...orders];
    itemsToDisplay = itemsToDisplay.slice(currentPageListMin, currentPageListMax); 
    
    return (
        <>
            <Search
                placeholderText = "Search by Item Name or SKU"
                changeText = {()=>{}}
                inputText = {""}
                onClear = {()=>{}}
            />

            <Table
                data = {itemsToDisplay}
                listItemFormat = {renderItemFn}
                headers = {headers} 
                isCheckbox = {true}
                toggleHeaderCheckbox = {handleOnSelectAll}
                itemSelected = {selectedItems}
            />
            <Footer
                totalPages={totalPages}
                currentPage={currentPagePosition}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                isDisabled={isFloatingActionDisabled}
                toggleActionButton={toggleActionButton}
                isNextDisabled = {true}
                isPreviousDisabled = {true}
            />

        </>
    )
}

export default OrderItemTab

const styles = StyleSheet.create({
    row: {
        // borderBottomColor : '#E3E8EF',
        // borderBottomWidth : 1,
        paddingBottom:8,
        paddingLeft:10,
        marginBottom:10
    },
    item: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        color: "#4A5568",
    },
    footer: {
        flex: 1,
        alignSelf: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        marginBottom: 0,
        right: 0,
        marginRight: 30,
    },
})