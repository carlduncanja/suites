import React, { useContext } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { SuitesContext } from '../../../contexts/SuitesContext';
import { CaseFileContext } from '../../../contexts/CaseFileContext';
import moment from "moment";
import { formatDate } from '../../../utils/formatter';

const ReportHeaderSummary = (props) => {

    const {
        billedTo,
        billedFor,
        reportDate,
        invoiceNo,
        purchaseOrderNo
    } = props
   
    // const [state] = useContext(CaseFileContext)
    // const [appState] = useContext(SuitesContext)
    // const billingDetails = state.report.reportInformation.billingDetails
    // const name = appState.overlayMenu.selectedMenuItemTabs[appState.overlayMenu.selectedMenuItemCurrentTab]

    return (  
        <View style={styles.container}>
            <View style={styles.billing}>
                <Text style={styles.contentHeader}>Billed To</Text>
                <Text style={styles.text}>{billedTo.name}</Text>
                <Text style={styles.text}>{billedTo.addressLine1}</Text>
                <Text style={styles.text}>{billedTo.addressLine2}</Text>
                <Text style={styles.text}>{billedTo.addressLine3}</Text>
            </View>
            
            <View style={styles.billing}>
                {billedFor ?
                    <>
                        <Text style={styles.contentHeader}>For</Text>
                        <Text style={styles.text}>{billedFor}</Text>
                    </>
                    :
                    <View style={{justifyContent:'space-between'}}>
                        <>
                            <Text style={styles.contentHeader}>Invoice No</Text>
                            <Text style={styles.text}>{invoiceNo}</Text>
                        </>
                        <>
                            <Text style={styles.contentHeader}>Purchase Order No</Text>
                            <Text style={styles.text}>{purchaseOrderNo}</Text>
                        </>

                    </View>
                }
                
            </View>
           
            <View style={[styles.billing,{alignItems:"flex-end", justifyContent:'space-between'}]}>
                <>
                    <Text style={styles.contentHeader}>Date</Text>
                    <Text style={styles.text}>{formatDate(reportDate,"DD/MM/YYYY")}</Text>
                </>
                <>
                    <Text style={styles.contentHeader}>Total</Text>
                    <Text style={styles.text}>{}</Text>
                </>
            </View>
        </View>
    );
}
 
export default ReportHeaderSummary;

const styles = StyleSheet.create({
    container:{
        //flex:1,
        flexDirection:'row',
        justifyContent:'space-evenly'
        //paddingBottom:20,
    },
    contentHeader:{
        color:'#718096',
        fontSize:16,
        paddingBottom:8
    },
    billing:{
        flex:1,
    },
    text:{
        paddingBottom:8
    }
})