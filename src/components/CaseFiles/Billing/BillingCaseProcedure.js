import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { currencyFormatter } from "../../../utils/formatter";

const BillingCaseProcedure = ({physicians, equipments, inventories}) =>{

    // const equipments = procedure.equipments
    // const consumables = procedure.consumables
    
    const totalPrice = (quantity,price) =>{
        return quantity * price
    }
 
    const tableItem = (charge,cost) =>{
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.itemValue}>{charge}</Text>
                <Text style={[styles.itemValue, {fontSize:16, alignSelf:'flex-end'}]}>{`$ ${currencyFormatter(cost)}`}</Text>
            </View>
        )
    }

    return(
        <View>
            <View style={styles.procedureItemContainer}>
                <View style={{marginBottom:6}}>
                    <Text style={styles.procedureItemTitle}>PHYSICIANS</Text>
                </View>
                
                {physicians.map((physician, index)=>{
                    const { name = "", cost = "" } = physician
                   return (
                       <View key = {index}>
                           {tableItem(name, cost)}
                       </View>
                   )
                })}
            </View>
            <View style={styles.procedureItemContainer}>
                <View style={{marginBottom:6}}>
                    <Text style={styles.procedureItemTitle}>EQUIPMENT</Text>
                </View>
                
                {equipments.map((equipment, index)=>{
                    const { name, amount, unitPrice} = equipment
                    return(
                        <View key={index}>
                            {tableItem(name,totalPrice(amount,unitPrice))}
                        </View>
                    )   
                })}
            </View>
            <View style={styles.procedureItemContainer}>
                <View style={{marginBottom:6}}>
                    <Text style={styles.procedureItemTitle}>CONSUMABLES</Text>
                </View>
                
                {inventories.map((inventory, index)=>{
                    const { name, amount, unitPrice} = inventory
                    return(
                        <View key={index}>
                            {tableItem(name, totalPrice(amount,unitPrice))}
                        </View>
                    ) 
                })}
            </View>
        </View>
    )
}

export default BillingCaseProcedure

const styles = StyleSheet.create({
    procedureItemContainer:{
        paddingTop:5,
        paddingBottom:5,
        borderBottomColor:'#E3E8EF',
        borderBottomWidth:1,
    },
    procedureItemTitle:{
        color:'#4299E1',
        fontSize:12, 
        fontWeight:'500'
    },
    itemContainer:{
        flexDirection:'row',
        justifyContent:'space-between', 
        marginBottom:6
    },
    itemValue:{
        fontSize:14,
        color:'#4E5664'
    }
})