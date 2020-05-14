import React, { } from 'react';
import { View, StyleSheet } from "react-native";
import Card from '../../../common/CardList/Card';
import { currencyFormatter } from '../../../../utils/formatter'
import Record from '../../../common/Information Record/Record';

const Insurance = ({tabDetails}) => { 
    console.log("Insurance")
    const {name, coverageLimit, policyNumber} = tabDetails

    return(
        <View style={styles.container}>
            <Record
                recordTitle = "Primary Insurer"
                recordValue = {name}
            />
            <View
                style={{
                    marginBottom:20,
                    marginTop:20,
                    backgroundColor:'#CCD6E0',
                    borderRadius:2,
                    height:1
                }}
            />
            <View style={{marginBottom:10}}>
                <Record
                    recordTitle = "Coverage Limit"
                    recordValue = {`$ ${currencyFormatter(coverageLimit)}`}
                />
            </View>
            
            <Record
                recordTitle = "Policy Number"
                recordValue = {policyNumber}
            />
        </View>
    )

        
 
    
}
 
export default Insurance;

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginBottom:15
    }
})