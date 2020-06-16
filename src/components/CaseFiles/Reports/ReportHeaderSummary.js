import React, { useContext } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { SuitesContext } from '../../../contexts/SuitesContext';
import { CaseFileContext } from '../../../contexts/CaseFileContext';
import moment from "moment";
import { formatDate, currencyFormatter } from '../../../utils/formatter'; 

const ReportHeaderSummary = ({billedTo = "", address = {}, billedFor = "", reportNumber = "",reportDate = "", type = "", purchaseOrderNo = "", total}) => { 
   
    const { city = "", country = "", line1 = "", line2 = "", parish="", postalCode="" } = address

    return (  
        <View style={styles.container}>
            <View style={styles.billing}>
                <Text style={styles.contentHeader}>Billed To</Text>
                <Text style={styles.text}>{billedTo}</Text>
                <Text style={styles.text}>{line1}</Text>
                <Text style={styles.text}>{line2}</Text>
                <Text style={styles.text}>{city}</Text>
                <Text style={styles.text}>{postalCode}</Text>
            </View>
            
            <View style={styles.billing}>
                {type === 'Quotation' ?
                    <View style={{justifyContent:'space-between'}}>
                        <>
                            <Text style={styles.contentHeader}>For</Text>
                            <Text style={styles.text}>{billedFor}</Text>
                        </>
                        <>
                            <Text style={styles.contentHeader}>Quotation Number</Text>
                            <Text style={styles.text}>{reportNumber}</Text>
                        </>
                    </View>
                    
                    :
                    <View style={{justifyContent:'space-between'}}>
                        <>
                            <Text style={styles.contentHeader}>Invoice No</Text>
                            <Text style={styles.text}>{reportNumber}</Text>
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
                    <Text style={styles.text}>$ {currencyFormatter(total)}</Text>
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