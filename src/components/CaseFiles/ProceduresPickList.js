import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PickListCard from './PickList/PickListCard' 
import { withModal } from "react-native-modalfy";

const ProceduresPickList = ({details, tabs, modal, pickListData}) => {
    const { closeModals } = modal

    const {inventories = [], equipments = [] } = pickListData;

    const [selectedTab, setSelectedTab] = useState(0);

    const handleOnPressTab = (tab) => {
        setSelectedTab(tabs.indexOf(tab)) 
        // setSelectedTab(tab)
    }

    // Format data
    const inventoriesArray = inventories.map( item => {

        const { inventory = {} } = item
        const { name = "" } = inventory
        return {
            // ...item,
            name : name,
            amount : item?.amount
        }
    })

    const equipmentsArray = equipments.map( item => {
        const { equipment = {} } = item
        const { name = "" } = equipment
        return {
            // ...item,
            name : name,
            amount : item?.amount
        }
    })


    const headers = [
        {
            name : tabs[selectedTab],
            alignment : "flex-start"
        },
        {
            name : "Amount",
            alignment : "flex-end"
        }
    ]

    const listItemFormat = (item) => { 
        return (
            <View style={[styles.listDataContainer,{marginBottom:10}]}>
                <View style={{}}>
                    <Text style={[styles.dataText,{color:"#3182CE"}]}>{item.name}</Text>
                </View>
                <View style={{alignItems:'flex-end'}}>
                    <Text style={[styles.dataText,{color:"#4A5568"}]}>{item.amount}</Text>
                </View>
            </View>
        )
        
    }

    return (
        <View>
            <PickListCard
                title = "Picklist" 
                tabs = {tabs} 
                selectedTab = {selectedTab}
                closeModal = {()=>closeModals("OverlayInfoModal")}
                onPressTab = {handleOnPressTab}
                listItemFormat = {listItemFormat}
                headers = {headers}
                isCheckBox = {false}
                data = {tabs[selectedTab] === 'Consumables' ? inventoriesArray : equipmentsArray} 
            /> 
        </View>
    )
}

export default withModal(ProceduresPickList) 

const styles = StyleSheet.create({
    listDataContainer:{
        
        flexDirection:'row',
        justifyContent:'space-between'
    }
    
})
