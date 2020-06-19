import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ReportHeader from './ReportHeader'
import ReportHeaderSummary from './ReportHeaderSummary'; 
import ReportDetails from './ReportDetails';
import BillingSummary from './BillingSummary';
import { CaseFileContext } from '../../../contexts/CaseFileContext';
import {caseActions} from '../../../redux/reducers/caseFilesReducer'
import { formatAmount } from '../../../helpers/caseFilesHelpers';
import { currencyFormatter } from '../../../utils/formatter';

const Rectangle = () =>{
    return(
        <View
            style={{
                height:1,
                backgroundColor:"#CCD6E0",
                marginBottom:28,
                marginTop:20
            }}
        />
    )
}

const ReportPreview = ({type = "", details = {}, reportDetails }) => {

    const { billingDetails = {}, dateGenerated = "", amountDue = 0 } = details
    const { address = {}, email = "", name= "", phone = "", billedFor="" } = billingDetails

    const reportNumber = type === 'Invoice' ? details.invoiceNumber : details.quotationNumber
    const purchaseOrderNumber = details.purchaseOrderNumber || ""
    const { procedures = [], discount = 0, hasDiscount = false, tax = 0} = reportDetails
    const total = hasDiscount ? (amountDue - (amountDue * discount)) * (1+tax) : (amountDue) * (1+tax)
    const formatDiscount = amountDue * discount

    console.log("ReportDetails: ", reportDetails)
    
    const headers = [
            {
                name: "Item Name",
                alignment: "flex-start"
            },
            {
                name: "Quanity",
                alignment: "flex-start"
            },
            {
                name: "Unit Price",
                alignment: "center"
            },
            {
                name: "Total",
                alignment: "flex-end"
            }
    ]

    
    const listItemFormat = (item) =>{
        const total = item.cost * item.amount
        return (
            <View style={{marginBottom:10, flexDirection:'row', justifyContent:'space-between', marginLeft:10}}>
                <View style={[styles.textContainer,{alignItems:"flex-start"}]}>
                    <Text style={[styles.text,{}]}>{item.name}</Text>
                </View>
                <View style={[styles.textContainer,{alignItems:"flex-start"}]}>
                    <Text style={[styles.text,{}]}>{item.amount}</Text>
                </View>
                <View style={[styles.textContainer,{alignItems:"center"}]}>
                    <Text style={[styles.text,{}]}>$ {currencyFormatter(item.cost)}</Text>
                </View>
                <View style={[styles.textContainer,{alignItems:"flex-end"}]}>
                    <Text style={[styles.text,{}]}>$ {currencyFormatter(total)}</Text>
                </View>
            </View>
        )
    }
  
    return (
        <View style={{flex:1, backgroundColor:'#FFFFFF'}}>

            <ReportHeader/>
 
            <View style={{padding:25}}>

                <ReportHeaderSummary
                    billedTo = {name}
                    address = {address}
                    billedFor = {billedFor}
                    reportNumber = {reportNumber}
                    total = {amountDue}
                    type = {type}
                    reportDate = {dateGenerated}
                    purchaseOrderNo = {purchaseOrderNumber}
                />

                {Rectangle()}
            
                <ReportDetails
                    reportList = {procedures}
                    // reportTable = {reportTable}
                    listItemFormat = {listItemFormat}
                    headers = {headers}
                />

                {Rectangle()}
            </View>

            <View style={{width:250, alignSelf:'flex-end'}}>
                <BillingSummary
                    subtotal = {amountDue}
                    discount = {hasDiscount ? formatDiscount : 0}
                    tax = {tax}
                    total = {total}
                />
            </View> 

        </View>
    );
}

export default ReportPreview;

const styles = StyleSheet.create({
    textContainer:{
        flex:1,
    },
    text:{
        color:'#4E5664',
        fontSize:16
    }
})
