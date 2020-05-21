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

const ReportPreview = ({type = "", details = {}}) => {

    const { billing = {}, billedItems = {}} = details
    const {
        billedTo = {}, 
        billedFor = "", 
        date = "", 
        charges = {}, 
        invoiceNumber = type = "Invoice" ? invoiceNumber : "",
        purchaseOrderNumber = type = "Invoice" ? purchaseOrderNumber : ""
    } = billing
    const { physicians = [], procedures = [], equipment = [], inventories = [] } = billedItems 
    const { discount = 0, subTotal = 0, tax = 0 } = charges

    const reportList = [...physicians,...procedures]
    const reportTable = [...inventories]

    const total = (subTotal - discount) * (1+tax)

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
        const total = item.unitPrice * item.amount
        return (
            <View style={{marginBottom:10, flexDirection:'row', justifyContent:'space-between'}}>
                <View style={[styles.textContainer,{alignItems:"flex-start"}]}>
                    <Text style={[styles.text,{}]}>{item.name}</Text>
                </View>
                <View style={[styles.textContainer,{alignItems:"flex-start"}]}>
                    <Text style={[styles.text,{}]}>{item.amount}</Text>
                </View>
                <View style={[styles.textContainer,{alignItems:"center"}]}>
                    <Text style={[styles.text,{}]}>$ {currencyFormatter(item.unitPrice)}</Text>
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
                    billedTo = {billedTo}
                    billedFor = {billedFor}
                    total = {total}
                    type = {"Quotation"}
                    reportDate = {date}
                    invoiceNo = {invoiceNumber}
                    purchaseOrderNo = {purchaseOrderNumber}
                />

                {Rectangle()}
            
                <ReportDetails
                    reportList = {reportList}
                    reportTable = {reportTable}
                    listItemFormat = {listItemFormat}
                    headers = {headers}
                />

                {Rectangle()}
            </View>

            <View style={{width:250, alignSelf:'flex-end'}}>
                <BillingSummary
                    subtotal = {subTotal}
                    discount = {discount}
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
