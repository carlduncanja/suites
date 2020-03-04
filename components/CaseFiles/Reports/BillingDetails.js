import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { SuitesContext } from '../../../contexts/SuitesContext';

const BillingDetails = () => {
    const suitesState = useContext(SuitesContext).state
    const suitesMethod = useContext(SuitesContext).methods
    return (  
        <View style={styles.container}>
            {
                Object.keys(suitesState.billingSummary).map((key,index) =>{
                    return(
                        <View key={index} style={styles.item}>
                            <Text style={[styles.text,{fontSize:16, alignSelf:'flex-start',color:'#3182CE', paddingRight:20}]}>{suitesMethod.transformToSentence(key)}</Text>
                            <Text style={[styles.text, {fontSize:18, alignSelf:'flex-end',color:'#323843'}]}>{suitesState.billingSummary[key]}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}
 
export default BillingDetails;

const styles = StyleSheet.create({
    container:{
        //width:'45%',
        alignSelf:'flex-end',
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