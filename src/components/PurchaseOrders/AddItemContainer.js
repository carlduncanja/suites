import React,{ useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import DeleteIcon from '../../../assets/svg/wasteIcon';
import NumberChangeField from '../common/Input Fields/NumberChangeField';
import IconButton from "../common/Buttons/IconButton";
import AddOverlayDialog from "../common/AddOverlayDialog";
import ConfirmationComponent from '../ConfirmationComponent';


import { getSupplierProducts } from "../../api/network";
import _ from "lodash";
import styled, {css} from '@emotion/native';
import { useTheme } from 'emotion-theming';

import {useModal} from "react-native-modalfy";
import DataItem from "../common/List/DataItem";
import ContentDataItem from "../common/List/ContentDataItem";

const Row = styled.View`
    /* width : 100%; */
    height : 20px;
    flex-direction : row;
    margin-bottom : ${ ({theme}) => theme.space['--space-24']}; 

`

const headers = [
    {
        name : 'Item',
        alignment : "flex-start",
        flex : 1,
    },
    {
        name : 'Quantity',
        alignment : "center",
        flex:1
    },
    {
        name : 'Unit',
        alignment : "center",
        flex:1
    },
    {
        name : "Actions",
        alignment : "flex-end",
        flex:1
    }
]

function AddItemContainer({supplierId = "", onAddProductItems = ()=>{}, orders = [], onCancel = () => {}}){

    const theme = useTheme();
    const modal = useModal();
    const { closeModals } = modal;

    const [itemstoAdd, setItems] = useState([])

    const [searchInventoryValue, setSearchInventoryValue] = useState("")
    const [searchInventoryResults, setSearchInventoryResults] = useState([])
    const [searchInventoryQuery, setSearchInventoryQuery] = useState({});


    useEffect(() => {
        if (!searchInventoryValue) {
            // empty search values and cancel any out going request.
            setSearchInventoryResults([]);
            if (searchInventoryQuery.cancel) searchInventoryQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchProducts, 300);

        setSearchInventoryQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [searchInventoryValue]);

    const fetchProducts = () => {
        getSupplierProducts(supplierId,searchInventoryValue, 5)
            .then((productsInfo = {}) => {
                setSearchInventoryResults(productsInfo?.data || []);
            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get products");
                Alert.alert("Failed", "Failed to get suggestions, please try again.")
                setSearchInventoryResults([]);
            })
    };

    const onSearchChange = (value) => {
        setSearchInventoryValue(value)
    }

    const onSelectItem = (item) => {
        let updatedData = [...itemstoAdd]

        let filterOrder = orders.filter( order => {
            const { productId = {} } = order
            const {inventoryVariant = ""} = productId
            return inventoryVariant === item?.inventoryVariant._id
        })

        if(filterOrder.length > 0){
            Alert.alert('Sorry',"Item is already listed in the order, please add another product")
            return
        }

        updatedData = [...updatedData,item]

        setItems(updatedData)
    }

    const onQuantityChange = (item) => (action) =>{

        const { amount = 0 } = item

        const updatedObj = {
            ...item,
            amount: action === 'add' ? amount + 1 : amount === 0 ? amount : amount - 1
        };

        const updatedData = itemstoAdd.map(item => {
            return item._id === updatedObj._id
                ? {...updatedObj}
                : {...item}
        })

        setItems(updatedData)
    }

    const onAmountChange = (item) => (value) => {

        const updatedObj = {
            ...item,
            amount: value === '' ? '' : parseFloat(value) < 0 ? 0 : parseInt(value)
        };

        const updatedData = itemstoAdd.map(item => {
            return item._id === updatedObj._id
                ? {...updatedObj}
                : {...item}
        })

        setItems(updatedData)
    }

    const handleDeleteItem = (item) => {
        modal
            .openModal(
                'ConfirmationModal',
                {
                    content: <ConfirmationComponent
                        isError = {false}
                        isEditUpdate = {true}
                        onCancel = {()=> modal.closeModals('ConfirmationModal')}
                        onAction = {()=>{
                            onDeletePress(item);
                            setTimeout(()=>{modal.closeModals('ConfirmationModal')}, 100)
                        }}
                        // onAction = { () => confirmAction()}
                        message = {"Do you want to delete this item ?"}
                    />
                    ,
                    onClose: () => {modal.closeModals('ConfirmationModal')}
                })
    };

    const handleClearList = () => {
        modal
            .openModal(
                'ConfirmationModal',
                {
                    content: <ConfirmationComponent
                        isError = {false}
                        isEditUpdate = {true}
                        onCancel = {()=> modal.closeModals('ConfirmationModal')}
                        onAction = {()=>{
                            onClearItems();
                            setTimeout(()=>{modal.closeModals('ConfirmationModal')}, 100)
                        }}
                        // onAction = { () => confirmAction()}
                        message = {"Do you want to delete these item(s) ?"}
                    />
                    ,
                    onClose: () => {modal.closeModals('ConfirmationModal')}
                })
    }

    const onDeletePress = (item) => {
       const filterItems = itemstoAdd.filter( obj => obj._id !== item._id)
       setItems(filterItems)
    }

    const onClearItems = () => {
        setItems([])
    }

    const handlePositiveButtonPress = () => {
        modal
            .openModal(
                'ConfirmationModal',
                {
                    content: <ConfirmationComponent
                        isError = {false}
                        isEditUpdate = {true}
                        onCancel = {()=> modal.closeModals('ConfirmationModal')}
                        onAction = {()=>{
                            setTimeout(()=>{
                                modal.closeModals('ConfirmationModal')
                            }, 100);
                            onFooterPress();

                        }}
                        // onAction = { () => confirmAction()}
                        message = {"Do you want to save your changes ? "}
                    />
                    ,
                    onClose: () => {modal.closeModals('ConfirmationModal')}
                })
    }

    const onFooterPress = () => {
        onAddProductItems(itemstoAdd);
        setTimeout(()=>{
            modal.closeModals('OverlayInfoModal');
        },200);
    }

    const onCloseModal = () => {
        closeModals("OverlayInfoModal");
        onCancel();
    }

    const listItemFormat = (item) => {
        const { _id = "", name = "", amount = 0, unit = "n/a" } = item
        return (
            <Row theme = {theme}>
                <DataItem text = {name} flex = {1} fontStyle = "--text-base-medium" color = "--color-blue-600" />
                <NumberChangeField
                    onChangePress = {onQuantityChange(item)}
                    onAmountChange = {onAmountChange(item)}
                    value = {amount.toString()}
                />
                <DataItem text = {unit} flex = {1}  align = "center" fontStyle = "--text-sm-regular" color = "--color-gray-800" />
                <ContentDataItem
                    align = "flex-end"
                    content = {
                        <IconButton
                            Icon = {<DeleteIcon/>}
                            onPress = {()=>handleDeleteItem(item)}
                        />
                    }
                />
            </Row>
        )

    }

    return (
        <View>
            <AddOverlayDialog
                title = "Add Items"
                closeModal = {onCloseModal}
                listItemFormat = {listItemFormat}
                headers = {headers}
                isCheckBox = {false}
                data = {itemstoAdd}
                tabs = {["Add Item"]}
                selectedTab = {0}
                onFooterPress = {handlePositiveButtonPress}
                onClearPress = {handleClearList}
                searchText = {searchInventoryValue}
                searchResults = {searchInventoryResults}
                onSearchChange = {onSearchChange}
                searchQuery = {searchInventoryQuery}
                onSelectItem = {onSelectItem}
                footerIndex={'30'}

            />
        </View>
    )
}

export default AddItemContainer
