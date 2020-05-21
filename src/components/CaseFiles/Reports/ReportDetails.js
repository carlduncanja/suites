import React, { useContext } from 'react';
import { View, Text, StyleSheet } from "react-native";
import Table from '../../common/Table/Table'
import { CaseFileContext } from '../../../contexts/CaseFileContext';
import { formatAmount } from '../../../helpers/caseFilesHelpers';
import { currencyFormatter } from '../../../utils/formatter';

const ReportDetails = ({reportList, reportTable, listItemFormat, headers}) => {
    
    return (   
        <View style={styles.container}>
            <View style={styles.summaryDetails}>
                {reportList.map((detail,index) =>{
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
                    data = {reportTable}
                    listItemFormat = {listItemFormat}
                    headers = {headers}
                />
            </View>
        </View>
    );
}
 
export default ReportDetails;

const styles = StyleSheet.create({
    container:{
        //flex:1,
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