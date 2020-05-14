import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PickListCard from './PickList/PickListCard'
import { withModal } from "react-native-modalfy";

const ProceduresPickList = ({details, tabs, modal}) => {
    const { closeModals } = modal
    const {inventories, equipments } = details

    const [selectedTab, setSelectedTab] = useState(tabs[0])

    const handleOnPressTab = (tab) => {
        setSelectedTab(tab)
    }

    // Format data
    const inventoriesArray = inventories.map( item => {
        return {
            ...item,
            name : item.inventory
        }
    })

    const equipmentsArray = equipments.map( item => {
        return {
            ...item,
            name : item.equipment
        }
    })
    
    const data = selectedTab === 'Consumables' ? inventoriesArray : equipmentsArray

    const headers = [
        {
            name : selectedTab,
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
                <View style={{alignItems:'flex-end', marginRight:5}}>
                    <Text style={[styles.dataText,{color:"#4A5568"}]}>{item.amount}</Text>
                </View>
            </View>
        )
        
    }

    return (
        <View>
            <PickListCard
                tabs = {tabs}
                selectedTab = {selectedTab}
                closeModal = {()=>closeModals("OverlayInfoModal")}
                onPressTab = {handleOnPressTab}
                listItemFormat = {listItemFormat}
                headers = {headers}
                isCheckBox = {false}
                data = {data}
            />
        </View>
    )
}

export default withModal(ProceduresPickList) 

const styles = StyleSheet.create({

})
