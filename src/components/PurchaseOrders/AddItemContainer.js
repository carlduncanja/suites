import React,{ useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import DeleteIcon from '../../../assets/svg/wasteIcon';
import NumberChangeField from '../common/Input Fields/NumberChangeField';
import IconButton from "../common/Buttons/IconButton";
import AddOverlaywithSearch from "../common/AddOverlaywithSearch";

import { getSupplierProducts } from "../../api/network";
import _ from "lodash";

import { withModal } from "react-native-modalfy";


function AddItemContainer({modal, supplierId = "", onAddProductItems = ()=>{}, orders = [], onCancel = () => {}}){

    const { closeModals } = modal

    const [itemstoAdd, setItems] = useState([])

    const [searchInventoryValue, setSearchInventoryValue] = useState("")
    const [searchInventoryResults, setSearchInventoryResults] = useState([])
    const [searchInventoryQuery, setSearchInventoryQuery] = useState({});

    const headers = [
        {
            name : 'Item',
            alignment : "flex-start",
            flex : 2,
        },
        {
            name : 'Quantity',
            alignment : "center",
            flex:1
        },
        {
            name : "Actions",
            alignment : "flex-end",
            flex:1
        }
    ]

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
                // console.log("Data: ", productsInfo)
                // const results = data.map(item => ({
                //     ...item
                // }));
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
            const {inventoryId = ""} = productId
            return inventoryId === item.inventoryId
        })

        if(filterOrder.length > 0){
            Alert.alert('Sorry',"Item is already listed in the order, please add another product")
            return
        }

        updatedData.filter( productItem => item?.inventoryId === productItem?.inventoryId).length > 0 ? 
            updatedData = updatedData.map( dataItem => {
                if(dataItem._id === item?._id || ""){
                    Alert.alert('Sorry',"Item is currently in the list, please add another product")
                    return {...dataItem}
                }
            })
            :
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

    const onDeletePress = (item) => {
       const filterItems = itemstoAdd.filter( obj => obj._id !== item._id)
       setItems(filterItems)
    }

    const onClearItems = () => {
        setItems([])
    }

    const onFooterPress = () => {
        onAddProductItems(itemstoAdd)
    }

    const onCloseModal = () => {
        closeModals("OverlayInfoModal");
        onCancel()
    }

    const listItemFormat = (item) => { 
        const { _id = "", name = "", amount = 0 } = item
        return (
            <View style={[styles.listDataContainer,{marginBottom:10}]}>

                <View style={{flex:2,justifyContent:"flex-start", justifyContent:'center'}}>
                    <Text style={[styles.dataText,{color:"#3182CE"}]}>{name}</Text>
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                    <NumberChangeField
                        onChangePress = {onQuantityChange(item)}
                        onAmountChange = {onAmountChange(item)}
                        value = {amount.toString()}
                    />
                </View>
                <View style={{flex:1,alignItems:'flex-end'}}>
                    <IconButton
                        Icon = {<DeleteIcon/>}
                        onPress = {()=>onDeletePress(item)}
                    />
                    
                </View>
            </View>
        )
        
    }

    return (
        <View>
            <AddOverlaywithSearch
                title = "Add Items"  
                closeModal = {onCloseModal}
                listItemFormat = {listItemFormat}
                headers = {headers}
                isCheckBox = {false}
                data = {itemstoAdd}
                hasFooter = {true}
                footerTitle = "DONE"
                onFooterPress = {onFooterPress}
                onClearPress = {onClearItems}
                searchText = {searchInventoryValue}
                searchResults = {searchInventoryResults}
                onSearchChange = {onSearchChange}  
                searchQuery = {searchInventoryQuery}
                onSelectItem = {onSelectItem}

            /> 
        </View>
    )
}

export default withModal(AddItemContainer) 

const styles = StyleSheet.create({
    listDataContainer:{
        
        flexDirection:'row',
        justifyContent:'space-between'
    }
    
})
