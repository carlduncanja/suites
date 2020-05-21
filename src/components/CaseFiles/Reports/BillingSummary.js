import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { currencyFormatter } from "../../../utils/formatter";

const BillingDetails = ({subtotal, discount, tax, total}) =>{
    
    const billingDetails = [
        {
            name: "Subtotal",
            value : `$ ${currencyFormatter(subtotal)}`
        },
        {
            name: "Discount",
            value : `-$ ${currencyFormatter(discount)}`
        },
        {
            name: "Tax",
            value : tax*100
        },
        {
            name: "Total",
            value : `$ ${currencyFormatter(total)}`
        }
    ] 
    return(
        <View style={styles.container}>
            {
                billingDetails.map((detail, index)=>{
                    return(
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:10}} key={index}>
                            <View style={{flex:1}}>
                                <Text style={{fontWeight:'500', fontSize:16, color:'#3182CE'}}>{detail.name}</Text>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end'}}>
                                <Text style={{fontSize:16, color:'#323843'}}>{detail.value}</Text>
                            </View>
                        </View>
                    )})
            }
            
        </View>
    )
}

export default BillingDetails

const styles = StyleSheet.create({
    container:{
        marginRight:20
    }
})

