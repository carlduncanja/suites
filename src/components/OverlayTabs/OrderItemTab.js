import React,{ useEffect, useState } from "react";
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

const OrderItemTab = ({orders = [], isEditMode = false, onItemChange = ()=>{}, supplierId = "", onAddProductItems = ()=>{}}) =>{
    
    const modal = useModal();

    const recordsPerPage = 15;

    const headers = [
        {
            name : 'Item Name',
            alignment : 'flex-start',
            flex : 1,
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
            alignment : 'flex-start',
            flex : 1,
        },
        {
            name : 'Unit Price',
            alignment : 'flex-start',
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

        const updatedObj = {
            ...item,
            amount: action === 'add' ? item.amount + 1 : item.amount === 0 ? item.amount : item.amount - 1
        };

        const updatedData = orders.map(item => {
            return item._id === updatedObj._id
                ? {...updatedObj}
                : {...item}
        })

        onItemChange(updatedData)
    }

    const onAmountChange = (item) => (value) => {

        const updatedObj = {
            ...item,
            amount: value === '' ? 0 : parseFloat(value) < 0 ? 0 : parseInt(value)
        };

        const updatedData = orders.map(item => {
            return item._id === updatedObj._id
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
                <View style={styles.item}>
                    <Text style={[styles.itemText,{color:'#3182CE'}]}>{name}</Text>
                </View>

                <View style={[styles.item,{alignItems:'center'}]}>
                    <Text style={styles.itemText}>{sku === "" ? `n/a` : sku}</Text>
                </View>

                {
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
                
                <View style={[styles.item,{alignItems:'flex-start'}]}>
                    <Text style={styles.itemText}>{unit}</Text>
                </View>

                <View style={styles.item}>
                    <Text style={styles.itemText}>$ {currencyFormatter(unitPrice)}</Text>
                </View>
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

        const addItem = <ActionItem title={"Add Item"} icon={<AddIcon/>}onPress={onAddItem}/>;
        const deleteItem = <LongPressWithFeedback pressTimer={700} onLongPress={() => {}}>
            <ActionItem title={"Hold to Delete"} icon={<WasteIcon/>} onPress={() => {}} touchable={false}/>
        </LongPressWithFeedback>;

        return <ActionContainer
            floatingActions={[
                deleteItem,
                addItem,
            ]}
            title={"SUPPLIER ACTIONS"}
        />
    }

    const onAddItemsToList = (items) => {
        modal.closeModals('OverlayInfoModal');
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

    let itemsToDisplay = [...orders];
    itemsToDisplay = itemsToDisplay.slice(currentPageListMin, currentPageListMax); 
    
    return (
        <View style={{flex:1}}>
            <Table
                data = {itemsToDisplay}
                listItemFormat = {renderItemFn}
                headers = {headers} 
                isCheckbox = {true}
                toggleHeaderCheckbox = {handleOnSelectAll}
                itemSelected = {selectedItems}
            />

            <View style={styles.footer}>
                <View style={{alignSelf: "center", marginRight: 10}}>
                    <RoundedPaginator
                        totalPages={totalPages}
                        currentPage={currentPagePosition}
                        goToNextPage={goToNextPage}
                        goToPreviousPage={goToPreviousPage}
                    />
                </View>

                <FloatingActionButton
                    isDisabled={isFloatingActionDisabled}
                    toggleActionButton={toggleActionButton}
                />
            </View>
        </View>
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