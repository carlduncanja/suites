import React, { useContext } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { SuitesContext } from '../../../contexts/SuitesContext';
import { CaseFileContext } from '../../../contexts/CaseFileContext';

const ReportHeaderSummary = () => {
    const caseState = useContext(CaseFileContext).state
    const suitesState = useContext(SuitesContext).state
    const billingDetails = caseState.report.reportInformation.billingDetails
    const name = suitesState.overlayMenu.selectedMenuItemTabs[suitesState.overlayMenu.selectedMenuItemCurrentTab]

    return (  
        <View style={styles.container}>
            <View style={styles.billing}>
                <Text style={styles.contentHeader}>Billed To</Text>
                <Text style={styles.text}>{billingDetails.billedTo.name}</Text>
                <Text style={styles.text}>{billingDetails.billedTo.addressLine1}</Text>
                <Text style={styles.text}>{billingDetails.billedTo.addressLine2}</Text>
                <Text style={styles.text}>{billingDetails.billedTo.addressLine3}</Text>
            </View>
            <View style={styles.billing}>
                {name === 'Quotation' ?
                    <>
                        <Text style={styles.contentHeader}>For</Text>
                        <Text style={styles.text}>{billingDetails.for}</Text>
                    </>
                    :
                    <View style={{justifyContent:'space-between'}}>
                        <>
                            <Text style={styles.contentHeader}>Invoice No</Text>
                            <Text style={styles.text}>{billingDetails.invoiceNo}</Text>
                        </>
                        <>
                            <Text style={styles.contentHeader}>Purchase Order No</Text>
                            <Text style={styles.text}>{billingDetails.purchaseOrderNo}</Text>
                        </>

                    </View>
                }
                
            </View>
            <View style={[styles.billing,{alignItems:"flex-end", justifyContent:'space-between'}]}>
                <>
                    <Text style={styles.contentHeader}>Date</Text>
                    <Text style={styles.text}>{billingDetails.date}</Text>
                </>
                <>
                    <Text style={styles.contentHeader}>Total</Text>
                    <Text style={styles.text}>{billingDetails.total}</Text>
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