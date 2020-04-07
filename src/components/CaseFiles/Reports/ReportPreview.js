import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ReportHeader from './ReportHeader'
import ReportHeaderSummary from './ReportHeaderSummary';
import ReportDetails from './ReportDetails';
import BillingSummary from './BillingSummary';
import { SuitesContext } from '../../../contexts/SuitesContext';
import { withModal } from 'react-native-modalfy';
import { CaseFileContext } from '../../../contexts/CaseFileContext';
import {caseActions} from '../../../redux/reducers/caseFilesReducer'
import { formatAmount } from '../../../helpers/caseFilesHelpers';

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

const ReportPreview = (props) => {

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

    const [appState] = useContext(SuitesContext)
    const [state, dispatch] = useContext(CaseFileContext)

    const report = state.report
    const billingDetails = report.billingDetails
    const billingSummary = report.billingSummary
    
    const listItemFormat = (item) =>{
        const total = item.unitPrice * item.quantity
        return (
            <View style={{marginBottom:10, flexDirection:'row', justifyContent:'space-between'}}>
                <View style={[styles.textContainer,{alignItems:"flex-start"}]}>
                    <Text style={[styles.text,{}]}>{item.itemName}</Text>
                </View>
                <View style={[styles.textContainer,{alignItems:"flex-start"}]}>
                    <Text style={[styles.text,{}]}>{item.quantity}</Text>
                </View>
                <View style={[styles.textContainer,{alignItems:"center"}]}>
                    <Text style={[styles.text,{}]}>{formatAmount(item.unitPrice)}</Text>
                </View>
                <View style={[styles.textContainer,{alignItems:"flex-end"}]}>
                    <Text style={[styles.text,{}]}>{formatAmount(total)}</Text>
                </View>
            </View>
        )
    }
  
    const { modal: {closeModal, closeModals, currentModal}} = props
    
    return (
        <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
            <ReportHeader/>
            <View style={{padding:25}}>
                <ReportHeaderSummary
                    billedTo = {billingDetails.billedTo}
                    billedFor = {billingDetails.billedFor}
                    reportDate = {billingDetails.reportDate}
                    invoiceNo = {report.reportId}
                    purchaseOrderNo = {billingDetails.purchaseOrderNo}
                />
                {Rectangle()}
                <ReportDetails
                    reportList = {report.reportList}
                    reportTable = {report.reportTable}
                    listItemFormat = {listItemFormat}
                    tableHeaders = {headers}
                />
                {Rectangle()}
            </View>
            <View style={{width:250, alignSelf:'flex-end'}}>
                <BillingSummary
                    subtotal = {formatAmount(billingSummary.subtotal)}
                    discount = {formatAmount(billingSummary.discount)}
                    tax = {billingSummary.tax}
                    total = {formatAmount(billingSummary.total)}
                />
            </View>

        </View>
    );
}

export default withModal(ReportPreview);

const styles = StyleSheet.create({
    textContainer:{
        flex:1,
    },
    text:{
        color:'#4E5664',
        fontSize:16
    }
})
