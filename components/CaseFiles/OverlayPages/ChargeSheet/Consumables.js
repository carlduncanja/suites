import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from "react-native";
import { SuitesContext } from '../../../../contexts/SuitesContext';
import OverlayList from '../../../common/List/OverlayList'
import { ScrollView } from 'react-native-gesture-handler';

const Consumables = () => {
    const suitesState = useContext(SuitesContext).state
    const suitesMethod = useContext(SuitesContext).methods

    useEffect(()=>{
        const headers = ["Item Name", "Type", "Quantity", "Unit Price"]
        const list = suitesMethod.getList(suitesState.overlayTabInfo, headers)
        suitesMethod.setListTabData(list,headers)
    })
    
   
    return ( 
        <ScrollView>
            <OverlayList/>
        </ScrollView>
    );
}
 
export default Consumables;