import React,{ useContext} from 'react';
import {View, ScrollView} from 'react-native';
import OverlayListItem from './OverlayListItem';
import { CheckedBox } from '../Checkbox/Checkboxes';
import Checkbox from '../Checkbox/Checkbox';
import { SuitesContext } from '../../../contexts/SuitesContext';

const OverlayListData = () => {
    const suitesState = useContext(SuitesContext).state
    return ( 
        <ScrollView
            bounces={false}
            contentContainerStyle={{paddingBottom:300}}
            >
            {suitesState.slideOverlay.slideOverlayList.slice(suitesState.paginatorValues.sliceArrayStart, suitesState.paginatorValues.sliceArrayEnd).map((item,index)=>{
                return(
                    <View key={index}>
                        <OverlayListItem
                            modalToOpen="ReportPreviewModal"
                            fields={item}
                            checkbox = {suitesState.list.checkedItemStatus && suitesState.list.checkedItemsList.includes(item.recordId) ? <CheckedBox/> : <Checkbox/>}
                        />
                    </View>
                )
            })}
        </ScrollView>
    );
}
 
export default OverlayListData;