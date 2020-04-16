import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableHighlight } from "react-native";
import FrameProcedureCard from '../../../common/Frames/FrameCards/FrameProcedureCard';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import PickListCard from '../../PickList/PickListCard';
import { withModal } from 'react-native-modalfy';

const Details = ({tabDetails, modal}) => {

    const listItemFormat = (item) => {
        return (
            <View style={[styles.listDataContainer,{marginBottom:10}]}>
                <View style={{}}>
                    <Text style={[styles.dataText,{color:"#3182CE"}]}>{item.item}</Text>
                </View>
                <View style={{alignItems:'flex-end', marginRight:5}}>
                    <Text style={[styles.dataText,{color:"#4A5568"}]}>{item.quantity}</Text>
                </View>
            </View>
        )
        
    }

    const tabs = ["Consumables", "Equipment"]
    const initialTab = tabs[0]

    const onOpenPickList = (details) => {

        const tabDetails = [
            {
                name : "Consumables",
                tabData : details.consumables,
                headers : [
                    {
                        name : "Consumables",
                        alignment : "flex-start"
                    },
                    {
                        name : "Amount",
                        alignment : "flex-end"
                    }
                ]
            },
            {
                name : "Equipment",
                tabData : details.equipments,
                headers : [
                    {
                        name : "Equipment",
                        alignment : "flex-start"
                    },
                    {
                        name : "Amount",
                        alignment : "flex-end"
                    }
                ]
            }
        ]

        modal.openModal('PickListModal',{ 
            initialTab ,
            tabDetails,
            listItemFormat,
            tabs
        })
    }

    return ( 
        <ScrollView style={{flex:1}}>
            {tabDetails.map((item,index)=>{
                return(
                    <View key={index} style={styles.procedureContainer}>
                        <FrameProcedureCard 
                            information = {item} 
                            onOpenPickList={onOpenPickList}
                        />
                    </View>
                )
            })}
        </ScrollView>
        
    );
}
 
export default withModal(Details) ;

const styles = StyleSheet.create({
    procedureContainer:{
        marginBottom:15
    },
    shadowContainer:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
    },
    pickListContainer:{
        ...StyleSheet.absoluteFillObject,
        zIndex:5,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#000'
    }
})