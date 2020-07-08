import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PickListCard from '../CaseFiles/PickList/PickListCard'
import DeleteIcon from '../../../assets/svg/wasteIcon';
import RightArrow from '../../../assets/svg/rightArrow';
import NumberChangeField from '../common/Input Fields/NumberChangeField';
import LeftArrow from '../../../assets/svg/leftArrow';

import { withModal } from "react-native-modalfy";
import IconButton from "../common/Buttons/IconButton";
import { TextInput } from "react-native-gesture-handler";
import CartCard from "../common/CartCard";


const SuppliersPurchaseOrder = ({details, onUpdateItems, onClearPress, onListFooterPress, modal}) => {
    const { closeModals } = modal
    const [purchaseOrders, setPurchaseOrders] = useState(details)

    const headers = [
        {
            name : 'Product',
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

    const onNumberArrowChange = (id) => (operation) =>{
        const findIndex = details.findIndex(obj => obj._id === id);
        let objQuantity = purchaseOrders[findIndex].amount || 0
       
        const updatedObj = { 
            ...purchaseOrders[findIndex], 
            amount: operation === 'sub' ? objQuantity === 0 ? objQuantity : objQuantity -1 : objQuantity +1
        };

        const updatedArray = [
            ...purchaseOrders.slice(0, findIndex),
            updatedObj,
            ...purchaseOrders.slice(findIndex + 1),
        ]; 
        setPurchaseOrders(updatedArray) 
        onUpdateItems(updatedArray)
    }

    const onChangeField = (id) => (value)=>{
        const findIndex = purchaseOrders.findIndex(obj => obj._id === id);
        let objQuantity = purchaseOrders[findIndex].amount || 0
        const updatedObj = { 
            ...purchaseOrders[findIndex], 
            amount: parseInt(value) || ""
        };
        const updatedArray = [
            ...purchaseOrders.slice(0, findIndex),
            updatedObj,
            ...purchaseOrders.slice(findIndex + 1),
        ]; 
        setPurchaseOrders(updatedArray) 
        onUpdateItems(updatedArray)
    }

    const onDeletePress = (id) => {
       const filteredArray = purchaseOrders.filter( obj => obj._id !== id)
       setPurchaseOrders(filteredArray)
       onUpdateItems(filteredArray)
    }

    const onClearItems = () => {
        setPurchaseOrders([])
        onClearPress()
    }

    const onFooterPress = () => {

        onListFooterPress(purchaseOrders)
        // onUpdateItems(purchaseOrders)
    }

    const listItemFormat = (item) => { 
        const { _id = "", name = "", amount = 0 } = item
        return (
            <View style={[styles.listDataContainer,{marginBottom:10}]}>
                <View style={{flex:2,justifyContent:"center"}}>
                    <Text style={[styles.dataText,{color:"#3182CE"}]}>{name}</Text>
                </View>
                <View style={{flex:1,alignItems:'center', flexDirection:'row', justifyContent:'space-between'}}>
                    <NumberChangeField
                        onChangePress = {onNumberArrowChange(_id)}
                        onAmountChange = {onChangeField(_id)}
                        value = {amount.toString()}
                    />
                    {/* <IconButton
                        Icon = {<LeftArrow strokeColor="#CCD6E0"/>}
                        onPress = {()=>onNumberArrowChange('subtract')(_id)}
                    />
                    <View style={{padding:5, paddingLeft:8, paddingRight:8, borderColor:'#CCD6E0', borderWidth:1}}>
                        <TextInput
                            value = {quantity.toString()}
                            onChangeText = {(value)=>onChangeField(_id)(value)}
                        />
                        <Text style={[styles.dataText,{color:"#4A5568"}]}>{item.quantity}</Text> 
                    </View>
                    <IconButton
                        Icon = {<RightArrow strokeColor="#CCD6E0"/>}
                        onPress = {()=>onNumberArrowChange('add')(_id)}
                    />  */}
                </View>
                <View style={{flex:1,alignItems:'flex-end'}}>
                    <IconButton
                        Icon = {<DeleteIcon/>}
                        onPress = {()=>onDeletePress(_id)}
                    />
                    
                </View>
            </View>
        )
        
    }

    return (
        <View>
            <CartCard
                title = "Cart"  
                closeModal = {()=>closeModals("OverlayInfoModal")}
                listItemFormat = {listItemFormat}
                headers = {headers}
                isCheckBox = {false}
                data = {purchaseOrders}
                hasFooter = {true}
                footerTitle = "COMPLETE ORDER"
                onFooterPress = {onFooterPress}
                onClearPress = {onClearItems}
            /> 
        </View>
    )
}

export default withModal(SuppliersPurchaseOrder) 

const styles = StyleSheet.create({
    listDataContainer:{
        
        flexDirection:'row',
        justifyContent:'space-between'
    }
    
})
