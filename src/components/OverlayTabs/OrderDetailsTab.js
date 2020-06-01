import React,{  } from "react";
import { View, Text, StyleSheet } from "react-native";
import Record from "../common/Information Record/Record";
import ResponsiveRecord from "../common/Information Record/ResponsiveRecord";
import { formatDate } from "../../utils/formatter";

const order = {
    decscription : "",
    invoiceNumber : "IN-00000023",
    orderTotal : 63467.56,
    status : 'Complete',
    orderDate : new Date(2019, 11, 20),
    deliveryDate : new Date(2019, 11, 23),
    storageLocation : 'Warehouse',
    requestedBy : 'Anthony Brown',
    approvedBy : "Sandra Smith",
    receivedBy : "Anthony Brown",
    type: 'Repeating',
    configStatus : 'Active',
}
const OrderDetailsTab = () =>{

    const {
        decscription = "",
        invoiceNumber = "",
        orderTotal = 0,
        status  = "",
        orderDate = "",
        deliveryDate = "",
        storageLocation = "",
        requestedBy = "",
        approvedBy = "",
        receivedBy = "",
        type = "",
        configStatus = "",

    } = order

    return (
        <View style={{flex:1}}>

            <View style={styles.row}>
                <View style={{flex:1}}>
                    <Record
                        recordTitle = "Description"
                        recordValue  = {decscription}
                    />
                </View>
            </View>

           <View style={styles.row}>
               <View style={styles.inputWrapper}>
                   <ResponsiveRecord
                        recordTitle = "Invoice"
                        recordValue = {invoiceNumber}
                   />
               </View>

               <View style={styles.inputWrapper}>
                   <Record
                        recordTitle = "Order Total"
                        recordValue = {orderTotal}
                   />
               </View>

               <View style={styles.inputWrapper}>
                   <Record
                        recordTitle = "Status"
                        recordValue = {status}
                   />
               </View>
           </View>

           <View style={styles.row}>
               <View style={styles.inputWrapper}>
                   <Record
                        recordTitle = "Ordered On"
                        recordValue = {formatDate(orderDate, "DD/MM/YYYY")}
                   />
               </View>

               <View style={styles.inputWrapper}>
                   <Record
                        recordTitle = "Delivered On"
                        recordValue = {formatDate(deliveryDate, "DD/MM/YYYY")}
                   />
               </View>

               <View style={styles.inputWrapper}>
                   <ResponsiveRecord
                        recordTitle = "Storage Location"
                        recordValue = {storageLocation}
                   />
               </View>
           </View>

           <View style={styles.row}>
               <View style={styles.inputWrapper}>
                   <ResponsiveRecord
                        recordTitle = "Requested by"
                        recordValue = {requestedBy}
                   />
               </View>

               <View style={styles.inputWrapper}>
                   <ResponsiveRecord
                        recordTitle = "Approved by"
                        recordValue = {approvedBy}
                   />
               </View>

               <View style={styles.inputWrapper}>
                   <ResponsiveRecord
                        recordTitle = "Received by"
                        recordValue = {receivedBy}
                   />
               </View>
           </View>

           <View style = {{
                backgroundColor:'#CCD6E0',
                height:1,
                borderRadius:2,
                marginBottom:30
            }} />


            <View style={[styles.row,{justifyContent:"flex-start"}]}>
               <View style={[styles.inputWrapper,{flex:0, width:'33%'}]}>
                   <Record
                        recordTitle = "Type"
                        recordValue = {type}
                   />
               </View>

               <View style={[styles.inputWrapper,{flex:0}]}>
                   <Record
                        recordTitle = "Configuration Status"
                        recordValue = {configStatus}
                        valueColor = "#38A169"
                   />
               </View>
           </View>


        </View>
    )
}

export default OrderDetailsTab

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
        alignItems:"flex-start"
    },
    inputWrapper: {
        flex:1,
        paddingRight:15,
    }
})