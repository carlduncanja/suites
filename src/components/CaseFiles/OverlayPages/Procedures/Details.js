import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableHighlight } from "react-native";
import FrameProcedureCard from '../../../common/Frames/FrameCards/FrameProcedureCard';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import PickListCard from '../../PickList/PickListCard';
import { withModal } from 'react-native-modalfy';
import ProceduresPickList from '../../ProceduresPickList'
import ProcedureIcon from '../../../../../assets/svg/frameProcedures';

const Details = ({tabDetails, modal}) => {
    // ############# Data declaration
    console.log("Tab Details: ", tabDetails)
    const tabs = ["Consumables", "Equipment"]

    const onOpenPickList = (details) => { 

        modal.openModal('OverlayInfoModal',{ 
            overlayContent : <ProceduresPickList 
                details = {details}  
                tabs = {tabs}  
            />,
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
                            icon = {ProcedureIcon}
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
        marginBottom:25
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