import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from "react-native";
import { SuitesContext } from '../../../../contexts/SuitesContext';
import OverlayList from '../../../common/List/OverlayList'
import { ScrollView } from 'react-native-gesture-handler';

const Quotations = () => {
    const suitesState = useContext(SuitesContext).state
    const suitesMethod = useContext(SuitesContext).methods

    useEffect(()=>{
        const headers = ["Quotation", "Date", "Value", "Actions"]
        const dataList = []
        {suitesState.overlayTabInfo.forEach(info=>
            dataList.push(info.list)
        )}
        const list = suitesMethod.getList(dataList, headers)
        suitesMethod.setListTabData(list,headers)
    },[suitesState.overlayTabInfo])
    
   
    return ( 
        <ScrollView>
            <OverlayList/>
        </ScrollView>
    );
}
 
export default Quotations;