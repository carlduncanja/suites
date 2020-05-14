import React,{useContext, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Consumables, Equipment, Invoices, Quotation, Billing } from '../../OverlayPages/ChargeSheet';
import BillingCaseCard from '../../Billing/BillingCaseCard'
import { currencyFormatter } from '../../../../utils/formatter';

const ChargeSheet = ({chargeSheets = [], selectedTab}) => {

    useEffect(()=>{},[])

    let allInventories = []
    let allEquipments = []

    chargeSheets.map( item => {
       const {inventories, equipments} = item
        allInventories = [...allInventories,...inventories.map( inventory => {return {...inventory, name : inventory.inventory}})]
        allEquipments = [...allEquipments,...equipments.map( equipment => {return {...equipment, name : equipment.equipment}})]
    })

    const quotation = []
    const invoices = []

    const headers = [
        {
            name :"Item Name",
            alignment: "flex-start"
        },
        {
            name :"Type",
            alignment: "center"
        },
        {
            name :"Quantity",
            alignment: "center"
        },
        {
            name :"Unit Price",
            alignment: "flex-end"
        }
    ]

    const listItem = (item) => <>
        <View style={styles.item}>
            <Text style={[styles.itemText,{color:"#3182CE"}]}>{item.name}</Text>
        </View>
        <View style={[styles.item,{alignItems:'center'}]}>
            <Text style={styles.itemText}>Type</Text>
        </View>
        <View style={[styles.item,{alignItems:'center'}]}>
            <Text style={styles.itemText}>{item.amount}</Text>
        </View>
        <View style={[styles.item,{alignItems:'flex-end'}]}>
            <Text style={styles.itemText}>{currencyFormatter(2000.00)}</Text>
        </View>
            
    </>
        
    return (
        selectedTab === 'Consumables' ?
            <Consumables 
                tabDetails = {allInventories} 
                headers= {headers}
                listItemFormat = {listItem}
            />
            :
            selectedTab === 'Equipment' ?
                <Equipment 
                    tabDetails = {allEquipments}
                    headers = {headers}
                    listItemFormat = {listItem}
                />
                :
                selectedTab === 'Invoices' ?
                    <Invoices tabDetails = {invoices}/>
                    :
                    selectedTab === 'Quotation' ?
                        <Quotation tabDetails = {quotation}/>
                        :
                        // <BillingCaseCard tabDetails = {{}}/>  
                        <View/>      
    );
}
 
export default ChargeSheet;

const styles = StyleSheet.create({
    item:{
        flex:1,
    },
    itemText:{
        fontSize:16,
        color:"#4A5568",
    },
})

