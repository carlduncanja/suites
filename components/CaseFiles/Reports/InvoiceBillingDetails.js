import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from "react-native";
import BillingDetails from './BillingDetails'
import { SuitesContext } from '../../../contexts/SuitesContext';

const InvoiceBillingDetails = () => {
    const suitesState = useContext(SuitesContext).state
    const suitesMethod = useContext(SuitesContext).methods
    return (  
        <View style={styles.container}>
            <View>
                <Text style={{color:"#718096", fontSize:16, paddingBottom:8}}>Invoice Terms</Text>
                <Text style={{color:"#323843", fontSize:14}}>{suitesState.report.reportInformation.reportTerms}</Text>
            </View>
            <BillingDetails/>
        </View>
    );
}
 
export default InvoiceBillingDetails;

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:'space-between',
    },
    item:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingBottom:10
    },
    text:{
        //flex:1
    }
})