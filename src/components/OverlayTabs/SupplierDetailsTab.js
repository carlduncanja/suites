import React,{ useState,useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Record from '../common/Information Record/Record';
import ResponsiveRecord from '../common/Information Record/ResponsiveRecord';
import Row from '../common/Row';
import LineDivider from '../common/LineDivider';

import { transformToSentence } from "../../utils/formatter";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

const LineDividerContainer = styled.View`
    margin-bottom : ${ ({theme}) => theme.space['--space-32']};
`;

const SupplierDetailsTab = ({order}) => { 
    
    const { supplier = {} , status = "" } = order
    const theme = useTheme();

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
        <>
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
                <Record
                    recordTitle = "Fax"
                    recordValue = {fax}
                />
            
                <ResponsiveRecord
                    recordTitle = "Email"
                    recordValue = {email}
                    handleRecordPress = {()=>{}}
                />
            </Row>

            <LineDividerContainer theme={theme}>
                <LineDivider/>
            </LineDividerContainer>

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
                )})
            }

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
            </View>
            
            
            <View style = {styles.row} key ={index}>
                <View style={styles.inputWrapper}>
                    <Record
                        recordTitle = "Representative"
                        recordValue = {item.name}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <ResponsiveRecord
                        recordTitle = "Rep. Telephone"
                        recordValue = {item.phone}
                        handleRecordPress = {()=>{}}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <ResponsiveRecord
                        recordTitle = "Rep. Email"
                        recordValue = {item.email}
                        handleRecordPress = {()=>{}}
                    />
                </View>
            </View> */}
                    
                
            
           
        </>
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