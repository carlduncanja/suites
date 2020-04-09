import React, { } from 'react';
import { View, StyleSheet } from "react-native";
import Card from '../../../common/CardList/Card';
import { formatAmount } from '../../../../helpers/caseFilesHelpers'

const Insurance = ({tabDetails}) => { 
    
    return ( 
        tabDetails.map((detailItem,index)=>{

            const headerObject = {
                title : "Primary Insurer",
                description : detailItem.name
            }

            const descriptionArray = [
                {
                    name : "Coverage Limit",
                    detail : formatAmount(detailItem.coverageLimit)
                },
                {
                    name : "Policy Number",
                    detail : detailItem.policyNumber
                }
            ]
            
            return(
                <View style={styles.container} key={index}>
                    <Card
                        headerObject = {headerObject}
                        itemsArray = {descriptionArray}
                    />
                </View>
            )

        })
 
    );
}
 
export default Insurance;

const styles = StyleSheet.create({
    container: {
        marginBottom:15
    }
})