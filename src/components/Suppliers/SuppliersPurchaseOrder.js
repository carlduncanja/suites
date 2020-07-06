import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PickListCard from '../CaseFiles/PickList/PickListCard'
import DeleteIcon from '../../../assets/svg/wasteIcon';
import RightArrow from '../../../assets/svg/rightArrow';
import LeftArrow from '../../../assets/svg/leftArrow';

import { withModal } from "react-native-modalfy";
import IconButton from "../common/Buttons/IconButton";
import { TextInput } from "react-native-gesture-handler";

const testData = [
    {
        _id : 'NEO-67341',
        name :'Neostigme',
        quantity:21
    },
    {
        _id: 'GZ-973142',
        name :'Gauze',
        quantity:21
    },
    {
        _id : 'AG-083184',
        name :'Agents',
        quantity:30
    }
]
const SuppliersPurchaseOrder = ({details, tabs, modal}) => {
    const { closeModals } = modal
    const {inventories = [] } = details

    const [selectedTab, setSelectedTab] = useState(tabs[0])
    const [purchaseOrders, setPurchaseOrders] = useState(testData)

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

    const handleOnPressTab = (tab) => {
        setSelectedTab(tab)
    }

    const onNumberArrowChange = (operation) => (id) =>{
        const findIndex = purchaseOrders.findIndex(obj => obj._id === id);
        const updatedObj = { 
            ...purchaseOrders[findIndex], 
            quantity: operation === 'subtract' ? purchaseOrders[findIndex].quantity -1 : purchaseOrders[findIndex].quantity +1
        };
        const updatedArray = [
            ...purchaseOrders.slice(0, findIndex),
            updatedObj,
            ...purchaseOrders.slice(findIndex + 1),
        ]; 
        setPurchaseOrders(updatedArray) 
    }

    const onChangeField = (id) => (value)=>{
        const findIndex = purchaseOrders.findIndex(obj => obj._id === id);
        const updatedObj = { 
            ...purchaseOrders[findIndex], 
            quantity: parseInt(value) || ""
        };
        const updatedArray = [
            ...purchaseOrders.slice(0, findIndex),
            updatedObj,
            ...purchaseOrders.slice(findIndex + 1),
        ]; 
        setPurchaseOrders(updatedArray) 
    }

    const onDeletePress = (id) => {
       const filteredArray = purchaseOrders.filter( obj => obj._id !== id)
       setPurchaseOrders(filteredArray)
    }

    // Format data
    const inventoriesArray = inventories.map( item => {
        const { inventory = {} } = item
        const { name = "" } = inventory
        return {
            ...item,
            name : name
        }
    })


    const listItemFormat = (item) => { 
        const { _id = "" } = item
        return (
            <View style={[styles.listDataContainer,{marginBottom:10}]}>
                <View style={{flex:2,}}>
                    <Text style={[styles.dataText,{color:"#3182CE"}]}>{item.name}</Text>
                </View>
                <View style={{flex:1,alignItems:'center', flexDirection:'row', justifyContent:'space-between'}}>
                    <IconButton
                        Icon = {<LeftArrow strokeColor="#CCD6E0"/>}
                        onPress = {()=>onNumberArrowChange('subtract')(_id)}
                    />
                    <View style={{padding:5, paddingLeft:8, paddingRight:8, borderColor:'#CCD6E0', borderWidth:1}}>
                        <TextInput
                            value = {item.quantity.toString()}
                            onChangeText = {(value)=>onChangeField(_id)(value)}
                        />
                        {/* <Text style={[styles.dataText,{color:"#4A5568"}]}>{item.quantity}</Text> */}
                    </View>
                    <IconButton
                        Icon = {<RightArrow strokeColor="#CCD6E0"/>}
                        onPress = {()=>onNumberArrowChange('add')(_id)}
                    />
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

    const onEditDone = () => {
        console.log("Done Edit")
    }

    const onFooterPress = () =>{

    }

    return (
        <View>
            <PickListCard
                title = "Purchase Order"  
                tabs = {tabs}
                selectedTab = {selectedTab}
                closeModal = {()=>closeModals("OverlayInfoModal")}
                onPressTab = {handleOnPressTab}
                listItemFormat = {listItemFormat}
                headers = {headers}
                isCheckBox = {false}
                data = {purchaseOrders}
                isEditMode = {true}
                onEditDone = {onEditDone}
                hasFooter = {true}
                footerTitle = "COMPLETE ORDER"
                onFooterPress = {onFooterPress}
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
