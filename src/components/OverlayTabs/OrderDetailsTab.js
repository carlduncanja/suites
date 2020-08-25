import React,{  } from "react";
import { View, Text, StyleSheet } from "react-native";
import Record from "../common/Information Record/Record";
import Row from "../common/Row";
import ResponsiveRecord from "../common/Information Record/ResponsiveRecord";
import { formatDate } from "../../utils/formatter"; 
import { formatAmount } from "../../helpers/caseFilesHelpers";
import { transformToSentence } from "../../hooks/useTextEditHook";
import LineDivider from "../common/LineDivider";
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';


const LineDividerContainer = styled.View`
    margin-bottom : ${ ({theme}) => theme.space['--space-32']};
`;

const OrderDetailsTab = ({order = {} }) =>{ 

    const theme = useTheme();

    const {
        orderDate = "",
        deliveryDate = "",
        status  = "",
        total = 0,
        supplier = {},
        invoice = "",
        storageLocation = {},
        type = "",
        configStatus = "",
        approvedBy =  "",
        receivedBy = "",
        requestedBy = ""
    } = order

    // console.log("Order: ",order)

    const { decscription = "", representatives = [] } = supplier
    const { name = "" } = storageLocation

    return (
        <>
            
            <Row>
                <Record
                    recordTitle = "Description"
                    recordValue  = {decscription || "--"}
                />
            </Row>

            <Row>
                <ResponsiveRecord
                    recordTitle = "Invoice"
                    recordValue = {invoice || ""}
                />

                <Record
                    recordTitle = "Order Total"
                    recordValue = {formatAmount(total) || 0}
                />

                <Record
                    recordTitle = "Status"
                    recordValue = {transformToSentence(status) || ""}
                />
            </Row>

            <Row>
                <Record
                    recordTitle = "Ordered On"
                    recordValue = {formatDate(orderDate, "DD/MM/YYYY") || "--"}
                />

                <Record
                    recordTitle = "Delivered On"
                    recordValue = {formatDate(deliveryDate, "DD/MM/YYYY") || "--"}
                />

                <ResponsiveRecord
                    recordTitle = "Storage Location"
                    recordValue = {name || "--"}
                />
            </Row>

            <Row>
                <ResponsiveRecord
                    recordTitle = "Requested by"
                    recordValue = {requestedBy}
                />

                <ResponsiveRecord
                    recordTitle = "Approved by"
                    recordValue = {approvedBy}
                />

                <ResponsiveRecord
                    recordTitle = "Received by"
                    recordValue = {receivedBy}
                />
           </Row>

            <LineDividerContainer theme={theme}>
                <LineDivider/>
            </LineDividerContainer>
            

            <Row>
                <Record
                    recordTitle = "Type"
                    recordValue = {type}
                    flex = {0.5}
                />
                <Record
                    recordTitle = "Configuration Status"
                    recordValue = {configStatus}
                    valueColor = "#38A169"
                />
                
            </Row>

            {/* <View style={styles.row}>
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
                        recordValue = {invoice}
                   />
               </View>

               <View style={styles.inputWrapper}>
                   <Record
                        recordTitle = "Order Total"
                        recordValue = {formatAmount(total)}
                   />
               </View>

               <View style={styles.inputWrapper}>
                   <Record
                        recordTitle = "Status"
                        recordValue = {transformToSentence(status)}
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
                        recordValue = {name}
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
           </View> */}

           
            {/* <View style={[styles.row,{justifyContent:"flex-start"}]}>
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
 */}

        </>
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