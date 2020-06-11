import React,{ useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { withModal } from "react-native-modalfy";
import ActionableListCard from "../PickList/ActionableListCard";
import IconButton from '../../common/Buttons/IconButton';
import LeftArrow from '../../../../assets/svg/leftArrow';
import RightArrow from '../../../../assets/svg/rightArrow';
import CreateLineItemDialog from "../Billing/CreateLineItemDialog";

const testData = [
    {
        name : 'Agents',
        amount : 1,
    },
    {
        name : 'Agents',
        amount : 2,
    },
    {
        name : 'Agents',
        amount : 1,
    },
    {
        name : 'Agents',
        amount : 4,
    },
    {
        name : 'Agents',
        amount : 1,
    },
    {
        name : 'Agents',
        amount : 1,
    },
    {
        name : 'Agents',
        amount : 1,
    },


]

const chargeTestData = [
    {
        charge : 'X-Ray',
        type : 'Lab Work',
        amount : 1,
    },
    {
        charge : 'X-Ray',
        type : 'Lab Work',
        amount : 2,
    },
    {
        charge : 'X-Ray',
        type : 'Lab Work',
        amount : 1,
    },
    {
        charge : 'X-Ray',
        type : 'Lab Work',
        amount : 1,
    },
    {
        charge : 'X-Ray',
        type : 'Lab Work',
        amount : 1,
    },
    {
        charge : 'X-Ray',
        type : 'Lab Work',
        amount : 4,
    },
    {
        charge : 'X-Ray',
        type : 'Lab Work',
        amount : 1,
    },


]

const EditProcedure = ({details, tabs, procedureName, modal}) => {
    const { closeModals } = modal
    const {inventories = [], equipments = [] } = details

    const [selectedTab, setSelectedTab] = useState(tabs[0])
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

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

    const equipmentsArray = equipments.map( item => {
        const { equipment = {} } = item
        const { name = "" } = equipment
        return {
            ...item,
            name : name
        }
    })
    
    const data = selectedTab === 'Consumables' ? testData : chargeTestData

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
                        onPress = {()=>{}}
                        disabled = {false}
                    />

                    <TextInput style={styles.editTextBox}>
                        <Text style={styles.itemText}>{item.amount}</Text>
                    </TextInput>
                    
                    <IconButton
                        Icon = {<RightArrow strokeColor="#38A169"/>}
                        onPress = {()=>{}}
                        disabled = {false}
                    />
                </View>
           
                <View style={{alignItems:'flex-end', flex:1}}>
                    <Text style={[styles.dataText,{color:"#4A5568"}]}>Remove</Text>
                </View>
            </View>
        )
        
    }

    const chargeItemFormat = (item) => {
        return (
            <View style={[styles.listDataContainer,{marginBottom:10, marginLeft:10}]}>
                <View style={{flex:1}}>
                    <Text style={[styles.dataText,{color:"#3182CE",}]}>{item.charge}</Text>
                </View>

                <View style={{alignItems:'center', flex:1}}>
                    <Text style={[styles.dataText,{color:"#4A5568"}]}>{item.type}</Text>
                </View>

                <View style={[styles.editItem, {alignItems: 'center',flex:1}]}>
                    <IconButton
                        Icon = {<LeftArrow strokeColor="#718096"/>}
                        onPress = {()=>{}}
                        disabled = {false}
                    />

                    <TextInput style={styles.editTextBox}>
                        <Text style={styles.itemText}>{item.amount}</Text>
                    </TextInput>
                    
                    <IconButton
                        Icon = {<RightArrow strokeColor="#38A169"/>}
                        onPress = {()=>{}}
                        disabled = {false}
                    />
                </View>
           
                <View style={{alignItems:'flex-end', flex:1}}>
                    <Text style={[styles.dataText,{color:"#4A5568"}]}>Remove</Text>
                </View>
            </View>
        )
    }

    const openDialogContainer = () => {
        modal.openModal('OverlayModal',{
            content: <CreateLineItemDialog
                onCreated={() => {}}
                onCancel={() => setFloatingAction(false)}
            />,
            onClose: () => setFloatingAction(false)
        })
    }

    const itemFormat = selectedTab === 'Charges and Fees' ? chargeItemFormat : listItemFormat
    const listHeaders = selectedTab === 'Charges and Fees' ? chargeHeaders : headers

    return (
        <View>
            <ActionableListCard
                title = {procedureName}
                tabs = {tabs}
                selectedTab = {selectedTab}
                closeModal = {()=>closeModals("OverlayInfoModal")}
                onPressTab = {handleOnPressTab}
                listItemFormat = {itemFormat}
                headers = {listHeaders}
                isCheckBox = {false}
                data = {data}
                onActionPress = {openDialogContainer}
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
