import React,{useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Consumables, Equipment, Invoices, Quotation, Billing } from '../../OverlayPages/ChargeSheet';
import BillingCaseCard from '../../Billing/BillingCaseCard'

const ChargeSheet = ({item, selectedTab}) => {
    const [state] = useContext(SuitesContext)
    const name = selectedTab

    const chargeSheet = item.caseFileDetails.chargeSheet
    const procedures = item.caseFileDetails.caseProcedures

    const consumables = []
    const equipments = []
    procedures.map(procedure => procedure.consumables.map(consumable => consumables.push(consumable)))
    procedures.map(procedure => procedure.equipments.map(equipment => equipments.push(equipment)))

    const quotation = chargeSheet.quotation
    const invoices = chargeSheet.invoices

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
            <Text style={[styles.itemText,{color:"#3182CE"}]}>{item.item}</Text>
        </View>
        <View style={[styles.item,{alignItems:'flex-start'}]}>
            <Text style={styles.itemText}>{item.type}</Text>
        </View>
        <View style={[styles.item,{alignItems:'center'}]}>
            <Text style={styles.itemText}>{item.quantity}</Text>
        </View>
        <View style={[styles.item,{alignItems:'flex-end'}]}>
            <Text style={styles.itemText}>{item.unitPrice}</Text>
        </View>
            
    </>
        
    return (
        name === 'Consumables' ?
            <Consumables 
                tabDetails = {consumables} 
                headers= {headers}
                listItemFormat = {listItem}
            />
            :
            name === 'Equipment' ?
                <Equipment 
                    tabDetails = {equipments}
                    headers = {headers}
                    listItemFormat = {listItem}
                />
                :
                name === 'Invoices' ?
                    <Invoices tabDetails = {invoices}/>
                    :
                    name === 'Quotation' ?
                        <Quotation tabDetails = {quotation}/>
                        :
                        <BillingCaseCard tabDetails = {item.caseFileDetails}/>        
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

