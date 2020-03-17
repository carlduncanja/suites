import React from 'react';
import { View, Text, StyleSheet,FlatList } from "react-native";


const BillingCardContent = (props) => {
    return ( 
        <View>
            <View style={{justifyContent:'center'}}>
                {props.billingContent.map((item,index)=>{
                    return(
                        <View key={index} style={styles.itemContainer}>
                            <View style={{flexDirection:'row', flex:1, justifyContent:'space-between'}}>
                                <Text style={[styles.charge,{width:'30%'}]}>{item.charge}</Text>
                                <View style={{}}>
                                    {
                                    item.details ?
                                        item.details.map((detail, index)=>{
                                        return(
                                            <View key={index} style={{flexDirection:'row', marginBottom:5, marginLeft:15, alignItems:'flex-start'}}>
                                                <Text style={[styles.charge,{width:'50%'}]}>{detail.item}</Text>
                                                <Text style={[styles.charge,{width:'8%' }]}>{detail.quantity}</Text>
                                                <View style={{width:'25%',alignItems:'flex-end'}}>
                                                    <Text style={[styles.cost,]}>{detail.cost}</Text>
                                                </View>
                                                
                                            </View>
                                        )
                                    })
                                    :
                                    <Text style={styles.cost}>{item.cost}</Text>
                                }
                                    
                                </View>
                                
                            </View>
                            
                        </View>
                    )
                    
                })}
            </View>
        </View>
        
        
    );
}
 
export default BillingCardContent;

const styles = StyleSheet.create({
    
    itemContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10
    },
    charge:{
        color:'#4E5664',
        fontSize:16
    },
    cost:{
        color:'#4A5568',
        fontSize:18,
        alignSelf:'flex-end'
    }
})