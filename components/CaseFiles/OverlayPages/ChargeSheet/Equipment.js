import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from "react-native";
import { SuitesContext } from '../../../../contexts/SuitesContext';
import OverlayList from '../../../common/List/OverlayList'
import { ScrollView } from 'react-native-gesture-handler';
import { getList } from '../../../../hooks/useListHook'

const Equipment = () => {
    const suitesState = useContext(SuitesContext).state
    const suitesMethod = useContext(SuitesContext).methods

    useEffect(()=>{
        const headers = ["Item Name", "Type", "Quantity", "Unit Price"]
        const list = getList(suitesState.slideOverlay.slideOverlayTabInfo, headers)
        suitesMethod.setListTabData(list,headers)
    },[suitesState.slideOverlay.slideOverlayTabInfo])
    
   
    return ( 
        <ScrollView>
            <OverlayList/>
        </ScrollView>
    );
}
 
export default Equipment;