import React, { useContext, useEffect,useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import Table from '../../../common/Table/Table';
import SvgIcon from '../../../../../assets/SvgIcon'
import Checkbox from '../../../common/Checkbox/Checkbox';
import { useCheckBox, formatAmount, calcBillingValues } from '../../../../helpers/caseFilesHelpers';
import { CheckedBox, PartialCheckbox} from '../../../common/Checkbox/Checkboxes';
import { caseActions } from '../../../../redux/reducers/caseFilesReducer';
import { CaseFileContext } from '../../../../contexts/CaseFileContext';
import { withModal } from 'react-native-modalfy';
import moment from 'moment';

import { formatDate, currencyFormatter } from '../../../../utils/formatter';

const Invoices = ({tabDetails, modal}) => {
    const [checkBoxList, setCheckBoxList] = useState([])
    const [state, dispatch] = useContext(CaseFileContext)

    const headers = [
        {
            name :"Invoice Number",
            alignment : "flex-start"
        },
        {
            name :"Status",
            alignment : "center"
        },
        {
            name :"Date",
            alignment : "center"
        },
        {
            name :"Value",
            alignment : "center"
        },
        {
            name :"Actions",
            alignment : "flex-end"
        },
            
    ]
    
    const openModal = () =>{
        modal.openModal("ReportPreviewModal")
    }

    const listItem = (item) => {
        // const reportId = item.invoiceNumber
        // const reportExpenses = item.reportDetails.reportExpenses
        // const billingDetails = item.reportDetails.billingDetails
        // let date = moment(billingDetails.reportDate).format("DD/MM/YYYY")

        // const reportList = [...reportExpenses.physicians,...reportExpenses.procedures,...reportExpenses.labWork]
        // const reportTable = [...reportExpenses.consumables, ...reportExpenses.equipments]
        // const tax = reportExpenses.tax
        // const discountPercent = reportExpenses.discount

        // let subTotal = 0
        // let taxValue = `${tax * 100}%`

        // reportList.forEach(item => subTotal+= item.cost)
        // reportTable.forEach(item => subTotal += (item.unitPrice * item.quantity))
        
        // let {discount, total} = calcBillingValues(subTotal, tax, discountPercent)

        // const billingSummary = {
        //     subtotal:subTotal,
        //     tax : taxValue,
        //     discount : discount,
        //     total :total
        // }
        
        const { invoiceNumber = "", status = "", value = 0, date = "" } = item

        return (
            <View style={styles.container}>
                <TouchableOpacity style={{marginRight:20}} onPress={()=>toggleCheckbox(item)}>
                    { checkBoxList.includes(item) ? <CheckedBox/> : <Checkbox/> }
                </TouchableOpacity>
                <View style={styles.dataContainer}>
                    <View style={styles.item}>
                        <Text style={[styles.itemText,{color:'#3182CE'}]}>{invoiceNumber}</Text>
                    </View>
                    <View style={[styles.item,{alignItems:'flex-start'}]}>
                        <Text style={[styles.itemText,{color: item.status === 'Complete' ? "#319795" : "#DD6B20"}]}>{status}</Text>
                    </View>
                    <View style={[styles.item,{alignItems:'flex-start'}]}>
                        <Text style={styles.itemText}>{formatDate(date,'DD/MM/YYYY') }</Text>
                    </View>
                    <View style={[styles.item,{alignItems:'center'}]}>
                        <Text style={styles.itemText}>{`$ ${currencyFormatter(value)}`}</Text>
                    </View>
                    <View style={[styles.item,{alignItems:'flex-end', marginRight:10}]}>
                        <TouchableOpacity
                            style={{}}
                            onPress={()=>{
                                dispatch({
                                    type : caseActions.SETREPORTDETAILS,
                                    newState:{
                                        reportStatus :true,
                                        reportId : reportId,
                                        billingDetails : billingDetails,
                                        reportList : reportList,
                                        reportTable : reportTable,
                                        billingSummary :billingSummary
                                    }
                                })
                                openModal();
                                // this.openModal(props);
                                // openReportAction(props.fields.recordId)
                            }}>
                            <SvgIcon iconName = "actions"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    
    const toggleCheckbox = (item) =>{
        let checkedList = useCheckBox(item,checkBoxList)
        setCheckBoxList(checkedList)
    }

    const toggleHeaderCheckbox = () =>{
        checkBoxList.length > 0 ?
            setCheckBoxList([])
            :
            setCheckBoxList(tabDetails)
    }
    
    return ( 
        <ScrollView>
            <Table
                data = {tabDetails}
                listItemFormat = {listItem}
                headers = {headers}
                toggleHeaderCheckbox = {toggleHeaderCheckbox} 
                checkBoxList = {checkBoxList}
                dataLength = {tabDetails.length}
            />
        </ScrollView>
    );
}
 
export default withModal(Invoices) ;

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        padding:10,
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        marginBottom:10
    },
    dataContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:"flex-start",
        justifyContent:"space-between"
    },
    item:{
        flex:1
        // alignItems:"flex-start",
        // justifyContent:'center',
    },
    itemText:{
        fontSize:16,
        color:"#4A5568",
    },
    headersContainer:{
        //flex:1,
        marginLeft:10,
        flexDirection:'row',
        //width:'100%'
    },
    headerItem:{
        flex:1,
        alignItems:'flex-start',
        justifyContent:'center',
    },
    headerText:{
        fontSize:12,
        color:'#718096'
    }
})