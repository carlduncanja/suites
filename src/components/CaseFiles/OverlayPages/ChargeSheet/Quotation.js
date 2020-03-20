import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from "react-native";
import { SuitesContext } from '../../../../contexts/SuitesContext';
import OverlayList from '../../../common/List/OverlayList'
import { ScrollView } from 'react-native-gesture-handler';
import { getReportList } from '../../../../hooks/useListHook'
import { appActions } from '../../../../redux/reducers/suitesAppReducer'

const Quotations = () => {
    const [state,dispatch] = useContext(SuitesContext)
    const setListTabData = (list,headers) => {
        dispatch({
            type: appActions.SETSLIDEOVERLAYLIST,
            newState : {
                slideOverlayList : list,
                slideOverlayListHeaders : headers
            }
        })
        return true
    }

    useEffect(()=>{
        const headers = ["Quotation", "Date", "Value", "Actions"]
        const list = getReportList(state.slideOverlay.slideOverlayTabInfo, headers)
        setListTabData(list,headers)
    },[state.slideOverlay.slideOverlayTabInfo])
    
   
    return ( 
        <ScrollView>
            <OverlayList/>
        </ScrollView>
    );
}
 
export default Quotations;
