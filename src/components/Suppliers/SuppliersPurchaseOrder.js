import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PickListCard from '../CaseFiles/PickList/PickListCard'
import DeleteIcon from '../../../assets/svg/wasteIcon';
import { withModal } from "react-native-modalfy";

const testData = [
    {
        name :'Neostigme',
        quantity:21
    },
    {
        name :'Gauze',
        quantity:21
    },
    {
        name :'Agents',
        quantity:30
    }
]
const SuppliersPurchaseOrder = ({details, tabs, modal}) => {
    const { closeModals } = modal
    const {inventories = [] } = details

    const [selectedTab, setSelectedTab] = useState(tabs[0])

    const handleOnPressTab = (tab) => {
        setSelectedTab(tab)
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

    const headers = [
        {
            name : 'Product',
            alignment : "flex-start"
        },
        {
            name : 'Quantity',
            alignment : "center"
        },
        {
            name : "Actions",
            alignment : "flex-end"
        }
    ]

    const listItemFormat = (item) => { 
        return (
            <View style={[styles.listDataContainer,{marginBottom:10}]}>
                <View style={{flex:1,}}>
                    <Text style={[styles.dataText,{color:"#3182CE"}]}>{item.name}</Text>
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                    <Text style={[styles.dataText,{color:"#4A5568"}]}>{item.quantity}</Text>
                </View>
                <View style={{flex:1,alignItems:'flex-end'}}>
                    <DeleteIcon/>
                </View>
            </View>
        )
        
    }

    const onEditDone = () => {
        console.log("Done Edit")
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
                data = {testData}
                isEditMode = {true}
                onEditDone = {onEditDone}
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
