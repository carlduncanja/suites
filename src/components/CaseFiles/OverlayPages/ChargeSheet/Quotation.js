import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from "react-native";
import Table from '../../../common/Table/Table';
import SvgIcon from '../../../../../assets/SvgIcon'
import Checkbox from '../../../common/Checkbox/Checkbox';
import { useCheckBox, formatAmount, calcBillingValues } from '../../../../helpers/caseFilesHelpers';
import { CheckedBox, PartialCheckbox} from '../../../common/Checkbox/Checkboxes';
import moment from 'moment';
import { withModal } from 'react-native-modalfy';
import { CaseFileContext } from '../../../../contexts/CaseFileContext';
import { caseActions } from '../../../../redux/reducers/caseFilesReducer';


const Quotations = ({tabDetails, modal}) => {
    const [checkBoxList, setCheckBoxList] = useState([])
    const [state, dispatch] = useContext(CaseFileContext)

    //difference
    const headers = [
        {
            name: "Quotation",
            alignment : "flex-start"
        },
        {
            name: "Date",
            alignment : "flex-start"
        },
        {
            name: "Value",
            alignment : "center"
        },
        {
            name: "Actions",
            alignment : "flex-end"
        }
    ]

    const openModal = () =>{
        modal.openModal("ReportPreviewModal")
    }

    // const headerItem = () =>{
    //     return(
    //         <View style={styles.headersContainer}>
    //             <View style={{marginRight:20}}>
    //                 {checkBoxList.length > 0 ? <PartialCheckbox/> : <Checkbox/>}
    //             </View>
            
    //             <View style={styles.headerItem}>
    //                 <Text style={styles.headerText}>Quotation</Text>
    //             </View>
    //             <View style={[styles.headerItem,{alignItems:'flex-start'}]}>
    //                 <Text style={styles.headerText}>Date</Text>
    //             </View>
    //             <View style={[styles.headerItem,{alignItems:'center'}]}>
    //                 <Text style={styles.headerText}>Value</Text>
    //             </View>
    //             <View style={[styles.headerItem,{alignItems:'flex-end'}]}>
    //                 <Text style={styles.headerText}>Actions</Text>
    //             </View>
    //         </View>
    //     )
    // }

 
    const listItem = (item) => {
        const reportId = item.quotationNumber
        const reportExpenses = item.reportDetails.reportExpenses
        const billingDetails = item.reportDetails.billingDetails
        let date = moment(billingDetails.reportDate).format("DD/MM/YYYY")

        const reportList = [...reportExpenses.physicians,...reportExpenses.procedures,...reportExpenses.labWork]
        const reportTable = [...reportExpenses.consumables, ...reportExpenses.equipments]
        const tax = reportExpenses.tax
        const discountPercent = reportExpenses.discount

        let subTotal = 0
        let taxValue = `${tax * 100}%`

        reportList.forEach(item => subTotal+= item.cost)
        reportTable.forEach(item => subTotal += (item.unitPrice * item.quantity))
        
        let {discount, total} = calcBillingValues(subTotal, tax, discountPercent)

        const billingSummary = {
            subtotal:subTotal,
            tax : taxValue,
            discount : discount,
            total :total
        }
        
        //difference
        return(
            <View style={styles.container}>
                <TouchableOpacity style={{marginRight:20}} onPress={()=>toggleCheckbox(item)}>
                    { checkBoxList.includes(item) ? <CheckedBox/> : <Checkbox/> }
                </TouchableOpacity>
                <View style={styles.dataContainer}>
                    <View style={styles.item}>
                        <Text style={[styles.itemText]}>{item.quotationNumber}</Text>
                    </View>
                    <View style={[styles.item,{alignItems:'flex-start'}]}>
                        <Text style={styles.itemText}>{date}</Text>
                    </View>
                    <View style={[styles.item,{alignItems:'center'}]}>
                        <Text style={styles.itemText}>{formatAmount(total)}</Text>
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
                                // openReportAction(props.fields.recordId)
                            }}>
                            <SvgIcon iconName = "actions"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
   
    const toggleCheckbox = (itemId) =>{
        let checkedList = useCheckBox(itemId,checkBoxList)
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
 
export default withModal(Quotations);

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
        flex:1,
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