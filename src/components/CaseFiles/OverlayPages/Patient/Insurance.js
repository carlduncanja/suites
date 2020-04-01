import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from "react-native";
import SectionList from '../../../common/SlideOverlay/SectionList';
import { ScrollView } from 'react-native-gesture-handler';
import {PersonalRecord} from '../../../common/Information Record/RecordStyles'

const Insurance = ({tabDetails}) => { 
    const separator = () =>{
        return(
            <View
                style={{
                    backgroundColor: "#CCD6E0",
                    borderRadius:2,
                    height:1,
                    marginBottom:20,
                    marginTop:20
                }}
            />
        )
    }
    return ( 
        tabDetails.map((detailItem,index)=>{
            return(
                <View style={{}}>
                    <PersonalRecord
                        recordTitle = "Primary Insurer"
                        recordValue = {detailItem.name}
                    />
                    {separator()}
                    <View style={{marginBottom:20}}>
                        <PersonalRecord
                            recordTitle = "Coverage Limit"
                            recordValue = {detailItem.coverageLimit}
                        />
                    </View>
                    
                    <PersonalRecord
                        recordTitle = "Policy Number"
                        recordValue = {detailItem.policyNumber}
                    />

                </View>
            )

        })
 
    );
}
 
export default Insurance;

const styles= StyleSheet.create({

})