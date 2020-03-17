import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import BillingCardContent from './BillingCardContent'


const BillingCard = (props) => {
    return ( 
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{props.title.toUpperCase()}</Text>
            </View>
            <BillingCardContent billingContent = {props.billingContent}/>
        </View>
    );
}
 
export default BillingCard;

const styles = StyleSheet.create({
    container:{
        paddingTop:25,
        paddingBottom:15,
        borderBottomColor:"#E3E8EF",
        borderBottomWidth:1
    },
    titleContainer:{
        marginBottom:12
    },
    title:{
        color:"#4299E1",
        fontSize:12
    }
})