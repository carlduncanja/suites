import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Table from '../../common/Table/Table'
import { CaseFileContext } from '../../../contexts/CaseFileContext';
import { formatAmount } from '../../../helpers/caseFilesHelpers';
import { currencyFormatter } from '../../../utils/formatter';

const ReportDetails = ({reportList, reportTable, listItemFormat, headers}) => {

    let physiciansArray = []
    let proceduresArray = []
    let servicesArray = []
    let inventoriesArray = []

    reportList.map( item => {
        const {physicians = [], services = [], procedures=[],inventories = [] } = item
        physicians.map( physician => {
            physiciansArray.push({
                name : physician.name || "",
                cost : physician.cost || 0
            })
        })
        procedures.map( procedure => {
            proceduresArray.push({
                name : procedure.name || "",
                cost : procedure.cost || 0
            })
        })
        services.map( service => {
            servicesArray.push({
                name : service.name || "",
                cost : service.cost || 0
            })
        })
        inventoriesArray = [...inventories]
        // console.log("In:", inventories)
    })
    
    return (   
        <ScrollView style={styles.container}>
            <View style={styles.summaryDetails}>
                {physiciansArray.map((detail,index) =>{
                    return( 
                        <View style={[styles.summaryItem,{backgroundColor:index % 2 === 0 ? '#F8FAFB':'#FFFFFF'}]} key={index}>
                            <Text style={styles.detailText}>{detail.name}</Text>
                            <Text style={styles.detailText}>$ {currencyFormatter(detail.cost)}</Text>
                        </View>
                    )
                })}
                {proceduresArray.map((detail,index) =>{
                    return( 
                        <View style={[styles.summaryItem,{backgroundColor:index % 2 === 0 ? '#F8FAFB':'#FFFFFF'}]} key={index}>
                            <Text style={styles.detailText}>{detail.name}</Text>
                            <Text style={styles.detailText}>$ {currencyFormatter(detail.cost)}</Text>
                        </View>
                    )
                })}
                {servicesArray.map((detail,index) =>{
                    return( 
                        <View style={[styles.summaryItem,{backgroundColor:index % 2 === 0 ? '#F8FAFB':'#FFFFFF'}]} key={index}>
                            <Text style={styles.detailText}>{detail.name}</Text>
                            <Text style={styles.detailText}>$ {currencyFormatter(detail.cost)}</Text>
                        </View>
                    )
                })}
            </View>
            <View style={styles.consumablesDetails}>
                <Table
                    isCheckbox = {false}
                    data = {inventoriesArray}
                    listItemFormat = {listItemFormat}
                    headers = {headers}
                />
            </View>
        </ScrollView>
    );
}
 
export default ReportDetails;

const styles = StyleSheet.create({
    container:{
        //flex:1,
        height: 400
    },
    summaryDetails:{
        //flex:1,
        marginBottom:20
    },
    summaryItem:{
        flexDirection:'row',
        padding:14,
        paddingLeft:10, 
        paddingRight:10,
        justifyContent:'space-between'
    },
    detailText:{
        color:'#4E5664',
        fontSize:16
    },
    consumablesDetails:{
        //flex:1,
    }
})