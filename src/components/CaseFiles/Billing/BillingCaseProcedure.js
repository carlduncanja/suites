import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const BillingCaseProcedure = ({procedure,physicians, formatAmount}) =>{
    const equipments = procedure.equipments
    const consumables = procedure.consumables
    
    const totalPrice = (quantity,price) =>{
        return quantity * price
    }

    const tableItem = (charge,cost) =>{
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.itemValue}>{charge}</Text>
                <Text style={[styles.itemValue, {fontSize:16, alignSelf:'flex-end'}]}>{formatAmount(cost)}</Text>
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
                   return (
                       <View key = {index}>
                           {tableItem(physician.staff.lastName, physician.staff.cost)}
                       </View>
                   )
                })}
            </View>
            <View style={styles.procedureItemContainer}>
                <View style={{marginBottom:6}}>
                    <Text style={styles.procedureItemTitle}>EQUIPMENT</Text>
                </View>
                
                {equipments.map((equipment, index)=>{
                    return(
                        <View key={index}>
                            {tableItem(equipment.item,totalPrice(equipment.quantity,equipment.unitPrice))}
                        </View>
                    )   
                })}
            </View>
            <View style={styles.procedureItemContainer}>
                <View style={{marginBottom:6}}>
                    <Text style={styles.procedureItemTitle}>CONSUMABLES</Text>
                </View>
                
                {consumables.map((consumable, index)=>{
                    return(
                        <View key={index}>
                            {tableItem(consumable.item, totalPrice(consumable.quantity,consumable.unitPrice))}
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