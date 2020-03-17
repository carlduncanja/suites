import React, { useContext } from 'react';
import { View, Text, StyleSheet } from "react-native";
import Table from '../../common/List/Table/Table'
import { CaseFileContext } from '../../../contexts/CaseFileContext';

const ReportDetails = () => {
    const [state] = useContext(CaseFileContext)
    return (  
        <View style={styles.container}>
            <View style={styles.summaryDetails}>
                {state.report.reportInformation.quotationDetails.summaryList.map((detail,index) =>{
                    return( 
                        <View style={[styles.summaryItem,{backgroundColor:index % 2 === 0 ? '#F8FAFB':'#FFFFFF'}]} key={index}>
                            <Text style={styles.detailText}>{detail.charge}</Text>
                            <Text style={styles.detailText}>{detail.cost}</Text>
                        </View>
                    )
                })}
            </View>
            <View style={styles.consumablesDetails}>
                <Table/>
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