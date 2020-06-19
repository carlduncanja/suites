import React,{ useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { withModal } from "react-native-modalfy";
import ActionableListCard from "../PickList/ActionableListCard";
import IconButton from '../../common/Buttons/IconButton';
import LeftArrow from '../../../../assets/svg/leftArrow';
import RightArrow from '../../../../assets/svg/rightArrow';
import CreateLineItemDialog from "../Billing/CreateLineItemDialog";
import CreateServiceLineItem from '../Billing/CreateServiceLineItem';
import { transformToSentence } from "../../../utils/formatter";
import { updateChargeSheet } from "../../../api/network";


const EditProcedure = ({tabs, procedureName, consumables, equipments, services, onCreated, modal}) => {
    const { closeModals } = modal
    // const {inventories = [], equipments = [] } = details
    // console.log("Id: ", caseId, )

    const [selectedTab, setSelectedTab] = useState(tabs[0])
    const [selectedConsumables, setSelectConsumables] = useState(consumables)
    const [selectedServices, setSelectedServices] = useState(services)
    const [selectedEquipments, setSelectedEquipments] = useState(equipments)
    const [newData, setNewData] = useState({})
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    const handleOnPressTab = (tab) => {
        setSelectedTab(tab)
    }

    const onItemAction = (item) => (action) => {

        const itemsToEdit = selectedTab === 'Consumables' ? selectedConsumables :
                            selectedTab === 'Equipments' ? selectedEquipments :
                            selectedServices

        const findIndex = itemsToEdit.findIndex(obj => obj.name === item.name);

        let selectedItem = itemsToEdit[findIndex]
        let updatedItems = []
        if(action === 'remove'){
            updatedItems = [
                ...itemsToEdit.slice(0, findIndex),
                ...itemsToEdit.slice(findIndex + 1),
            ]
        }else{
            let updatedObj = {}
            if (selectedTab === 'Consumables' || selectedTab === 'Equipments'){
                updatedObj = { ...selectedItem, amount: action === 'add' ? selectedItem.amount + 1 : selectedItem.amount - 1}
            }else{
                updatedObj = { ...selectedItem, quantity: action === 'add' ? selectedItem.quantity + 1 : selectedItem.quantity - 1}
            }

            updatedItems = [
                ...itemsToEdit.slice(0, findIndex),
                updatedObj,
                ...itemsToEdit.slice(findIndex + 1),
            ]; 
        }
        
        selectedTab === 'Consumables' ? setSelectConsumables(updatedItems) : 
        selectedTab === 'Equipments' ? setSelectedEquipments(updatedItems) :
        setSelectedServices(updatedItems)
    
    }

    const onAmountChange = (value) => (item) => {

        const itemsToEdit = selectedTab === 'Consumables' ? selectedConsumables :
                            selectedTab === 'Equipments' ? selectedEquipments :
                            selectedServices
        
        const findIndex = itemsToEdit.findIndex(obj => obj.name === item.name);
        let selectedItem = itemsToEdit[findIndex]
        let updatedObj = {}
        if(selectedTab === 'Consumables' || selectedTab === 'Equipments'){
            updatedObj = { ...selectedItem, amount: value === "" ? 0 : parseInt(value)};
        }else{
            updatedObj = { ...selectedItem, quantity: value === "" ? 0 : parseInt(value)};
        }
        const updatedItems = [
                ...itemsToEdit.slice(0, findIndex),
                updatedObj,
                ...itemsToEdit.slice(findIndex + 1),
            ]; 
        
        
        selectedTab === 'Consumables' ? setSelectConsumables(updatedItems) : 
        selectedTab === 'Equipments' ? setSelectedEquipments(updatedItems) :
        setSelectedServices(updatedItems)

        console.log("Inventories: ", updatedItems)
    }

    const handleNewData = (data) =>{
        
        const updatedData = selectedTab === 'Consumables' ? {...data, inventory : data.id} :
                            selectedTab === 'Equipments' ? {...data, equipment : data.id} : data

        const itemsToEdit = selectedTab === 'Consumables' ? selectedConsumables :
                            selectedTab === 'Equipments' ? selectedEquipments :
                            selectedServices
        const updatedItems = [
            ...itemsToEdit,
            updatedData
        ]
        selectedTab === 'Consumables' ? setSelectConsumables(updatedItems) : 
        selectedTab === 'Equipments' ? setSelectedEquipments(updatedItems) :
        setSelectedServices(updatedItems)
    }

    const headers = [
        {
            name : selectedTab,
            alignment : "flex-start",
            flex:2
        },
        {
            name : "Amount",
            alignment : "center",
            flex:1
        },
        {
            name : "Action",
            alignment : "flex-end",
            flex:1
        }
    ]

    const chargeHeaders = [
        {
            name : 'Charge',
            alignment : "flex-start",
            flex:1
        },
        {
            name : "Type",
            alignment : "center",
            flex:1
        },
        {
            name : "Amount",
            alignment : "center",
            flex:1
        },
        {
            name : "Action",
            alignment : "flex-end",
            flex:1
        }
    ]

    const listItemFormat = (item) => { 
        return (
            <View style={[styles.listDataContainer,{marginBottom:10, marginLeft:10}]}>
                <View style={{flex:2}}>
                    <Text style={[styles.dataText,{color:"#3182CE",}]}>{item.name}</Text>
                </View>

                <View style={[styles.editItem, {alignItems: 'center',flex:1}]}>
                    <IconButton
                        Icon = {<LeftArrow strokeColor="#718096"/>}
                        onPress = {()=>onItemAction(item)('subtract')}
                        disabled = {false}
                    />

                    <TextInput 
                        style={styles.editTextBox}
                        onChangeText = {(value)=>onAmountChange(value)(item)}
                        value = {item.amount === 0 ? "" : item.amount.toString()}
                        keyboardType = "number-pad"
                    />
                    
                    <IconButton
                        Icon = {<RightArrow strokeColor="#38A169"/>}
                        onPress = {()=>onItemAction(item)('add')}
                        disabled = {false}
                    />
                </View>
           
                <TouchableOpacity style={{alignItems:'flex-end', flex:1}} onPress={()=>onItemAction(item)('remove')}>
                    <Text style={[styles.dataText,{color:"#0CB0E7"}]}>Remove</Text>
                </TouchableOpacity>
            </View>
        )
        
    } 

    const chargeItemFormat = (item) => {
        return (
            <View style={[styles.listDataContainer,{marginBottom:10, marginLeft:10}]}>
                <View style={{flex:1}}>
                    <Text style={[styles.dataText,{color:"#3182CE",}]}>{item.name}</Text>
                </View>

                <View style={{alignItems:'center', flex:1}}>
                    <Text style={[styles.dataText,{color:"#4A5568"}]}>{transformToSentence(item.type)}</Text>
                </View>

                <View style={[styles.editItem, {alignItems: 'center',flex:1}]}>
                    <IconButton
                        Icon = {<LeftArrow strokeColor="#718096"/>}
                        onPress = {()=>onItemAction(item)('subtract')}
                        disabled = {false}
                    />

                    <TextInput 
                        style={styles.editTextBox}
                        onChangeText = {(value)=>onAmountChange(value)(item)}
                        value = {item.quantity === 0 ? "" : item.quantity.toString()}
                        keyboardType = "number-pad"
                    />
                   
                    <IconButton
                        Icon = {<RightArrow strokeColor="#38A169"/>}
                        onPress = {()=>onItemAction(item)('add')}
                        disabled = {false}
                    />
                </View>

                <TouchableOpacity style={{alignItems:'flex-end', flex:1}} onPress={()=>onItemAction(item)('remove')}>
                    <Text style={[styles.dataText,{color:"#0CB0E7"}]}>Remove</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const openDialogContainer = () => {
        modal.openModal('OverlayModal',{
            content: selectedTab === 'Consumables' || selectedTab === 'Equipments'? 
                <CreateLineItemDialog
                    selectedTab = {selectedTab}
                    onCreated={(obj) => {handleNewData(obj)}}
                    onCancel={() => setFloatingAction(false)}
                />
                :
                <CreateServiceLineItem
                    onCreated={(obj) => {handleNewData(obj)}}
                    onCancel={() => setFloatingAction(false)}
                />,
            onClose: () => setFloatingAction(false)
        })
    }

    const onDonePress = () => {
        let updatedInventory = selectedConsumables.map( item => {
            const { amount, inventory } = item
            return {
                amount,
                inventory
            }
        })
        let updatedEquipment = selectedEquipments.map( item => {
            const { amount, equipment } = item
            return {
                amount,
                equipment
            }
        })
        let updatedBilling = 
            {
                inventories : updatedInventory,
                equipments : updatedEquipment,
                lineItems : selectedServices,
                // caseProcedureId
            }
        
       
        onCreated(updatedBilling)
        // console.log("Updated: ", updatedBilling)
        // updateCase(updatedBilling)
    }

    const handleClose = () => {
        console.log("Close")
        modal.closeModals("OverlayInfoModal")
    }

    const itemFormat = selectedTab === 'Charges and Fees' ? chargeItemFormat : listItemFormat
    const listHeaders = selectedTab === 'Charges and Fees' ? chargeHeaders : headers
    const data = selectedTab === 'Consumables' ? selectedConsumables :  selectedTab === 'Equipments' ? selectedEquipments : selectedServices

    return (
        <View>
            <ActionableListCard
                title = {procedureName}
                tabs = {tabs} 
                selectedTab = {selectedTab}
                closeModal = {handleClose} 
                onPressTab = {handleOnPressTab}
                listItemFormat = {itemFormat}
                headers = {listHeaders}
                isCheckBox = {false}
                data = {data}
                onActionPress = {openDialogContainer}
                onFooterPress = {onDonePress}
            /> 
        </View>
    )
}

export default withModal(EditProcedure) 

const styles = StyleSheet.create({
    listDataContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    editItem:{
        flex:1,
        flexDirection:'row',  
        justifyContent:'center'
    },
    editTextBox:{
        backgroundColor:'#F0FFF4',
        borderColor:'#48BB78',
        borderWidth:1,
        borderRadius:4,
        padding:6,
        paddingTop:2,
        paddingBottom:2,
        marginLeft:10,
        marginRight:10
    },
    
})
