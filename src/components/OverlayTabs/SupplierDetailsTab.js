import React,{ useState,useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Record from '../common/Information Record/Record';
import ResponsiveRecord from '../common/Information Record/ResponsiveRecord';
import Row from '../common/Row';
import { transformToSentence } from "../../utils/formatter";

const testData = { 
    description : "",
    _id : 'SP-129031',
    name : 'Medical Suppliers Ltd.',
    status : 'active',
    contactInfo:{
        phone : '876 920 1270',
        fax : '876 920 1278',
        email : 'support@meds.com'
    },
    representative: {
        name : 'Jason Biggs',
        phone : '876 317 2142',
        email : 'jason.biggs@meds.com'
    }
}

const SupplierDetailsTab = ({order}) => { 
    
    const { supplier = {} , status = "" } = order
    console.log("Supplier: ", order)
    const {
        description = "",
        supplierNumber = "",
        name = "",
        phone = "",
        fax = "",
        email = "",
        representatives = []
    } = supplier


    return(
        <View>
            <Row>
                <Record
                    recordTitle = "Description"
                    recordValue = {description || "--"}
                    flex = {1}
                />
            </Row>

            <Row>
                <Record
                    recordTitle = "Supplier ID"
                    recordValue = {supplierNumber || "--"}
                />
                <Record
                    recordTitle = "Supplier Name"
                    recordValue = {name || "--"}
                />
                <Record
                    recordTitle = "Status"
                    recordValue = {transformToSentence(status) || "--"}
                />
            </Row>

            <Row>
                <ResponsiveRecord
                    recordTitle = "Telephone"
                    recordValue = {phone}
                    handleRecordPress = {()=>{}}
                />
                <ResponsiveRecord
                    recordTitle = "Fax"
                    recordValue = {fax}
                    handleRecordPress = {()=>{}}
                />
            
                <ResponsiveRecord
                    recordTitle = "Email"
                    recordValue = {email}
                    handleRecordPress = {()=>{}}
                />
            </Row>


            {/* <View style = {styles.row}>
                <View style={{flex:1}}>
                    <Record
                        recordTitle = "Description"
                        recordValue = {description}
                    />
                </View>
            </View> 


            <View style = {styles.row}>
                <View style={styles.inputWrapper}>
                    <Record
                        recordTitle = "Supplier ID"
                        recordValue = {supplierNumber}
                    />
                </View>
                
                <View style={styles.inputWrapper}>
                    <Record
                        recordTitle = "Supplier Name"
                        recordValue = {name}
                    />
                </View>
               
                <View style={styles.inputWrapper}>
                    <Record
                        recordTitle = "Status"
                        recordValue = {transformToSentence(status)}
                    />
                </View>
            </View>

            <View style = {styles.row}>
                <View style={styles.inputWrapper}>
                    <ResponsiveRecord
                        recordTitle = "Telephone"
                        recordValue = {phone}
                        handleRecordPress = {()=>{}}
                    />
                </View>
               
                <View style={styles.inputWrapper}>
                    <ResponsiveRecord
                        recordTitle = "Fax"
                        recordValue = {fax}
                        handleRecordPress = {()=>{}}
                    />
                </View>
                
                <View style={styles.inputWrapper}>
                    <ResponsiveRecord
                        recordTitle = "Email"
                        recordValue = {email}
                        handleRecordPress = {()=>{}}
                    />
                </View> 
            </View> */}
            
            <View style = {{
                backgroundColor:'#CCD6E0',
                height:1,
                borderRadius:2,
                marginBottom:30,
                marginTop:15
            }} />
            {
                representatives.map( (item, index) => {

                    return(
                        <Row key={index}>
                            <Record
                                recordTitle = "Representative"
                                recordValue = {item.name}
                            />
                            <ResponsiveRecord
                                recordTitle = "Rep. Telephone"
                                recordValue = {item.phone}
                                handleRecordPress = {()=>{}}
                            />
                            <ResponsiveRecord
                                recordTitle = "Rep. Email"
                                recordValue = {item.email}
                                handleRecordPress = {()=>{}}
                            />
                        </Row>
                        // <View style = {styles.row} key ={index}>
                        //     <View style={styles.inputWrapper}>
                        //         <Record
                        //             recordTitle = "Representative"
                        //             recordValue = {item.name}
                        //         />
                        //     </View>
                        //     <View style={styles.inputWrapper}>
                        //         <ResponsiveRecord
                        //             recordTitle = "Rep. Telephone"
                        //             recordValue = {item.phone}
                        //             handleRecordPress = {()=>{}}
                        //         />
                        //     </View>
                        //     <View style={styles.inputWrapper}>
                        //         <ResponsiveRecord
                        //             recordTitle = "Rep. Email"
                        //             recordValue = {item.email}
                        //             handleRecordPress = {()=>{}}
                        //         />
                        //     </View>
                        // </View>
                    )
                })
            }
           
        </View>
    )
}

SupplierDetailsTab.propTypes = {};
SupplierDetailsTab.defaultProps = {};

export default SupplierDetailsTab;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
        alignItems:"flex-start",
    },
    inputWrapper: {
        flex:1,
        paddingRight:15
    }
})