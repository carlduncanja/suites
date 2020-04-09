import React, { useContext } from 'react';
import { View, Text, StyleSheet } from "react-native";
import Table from '../../common/Table/Table'
import { CaseFileContext } from '../../../contexts/CaseFileContext';
import { formatAmount } from '../../../helpers/caseFilesHelpers';

const ReportDetails = ({reportList, reportTable, listItemFormat, tableHeaders}) => {
    const [state] = useContext(CaseFileContext)
    
    return (  
        <View style={styles.container}>
            <View style={styles.summaryDetails}>
                {reportList.map((detail,index) =>{
                    return( 
                        <View style={[styles.summaryItem,{backgroundColor:index % 2 === 0 ? '#F8FAFB':'#FFFFFF'}]} key={index}>
                            <Text style={styles.detailText}>{detail.charge}</Text>
                            <Text style={styles.detailText}>{formatAmount(detail.cost)}</Text>
                        </View>
                    )
                })}
            </View>
            <View style={styles.consumablesDetails}>
                <Table
                    data = {reportTable}
                    listItemFormat = {listItemFormat}
                    headers = {tableHeaders}
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