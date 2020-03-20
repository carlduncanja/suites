import React,{ useContext} from 'react';
import {View, ScrollView} from 'react-native';
import OverlayListItem from './OverlayListItem';
import { CheckedBox } from '../Checkbox/Checkboxes';
import Checkbox from '../Checkbox/Checkbox';
import { SuitesContext } from '../../../contexts/SuitesContext';

const OverlayListData = () => {
    const [state] = useContext(SuitesContext)
    return ( 
        <ScrollView
            bounces={false}
            contentContainerStyle={{paddingBottom:300}}
            >
            {state.slideOverlay.slideOverlayList.slice(state.paginatorValues.sliceArrayStart, state.paginatorValues.sliceArrayEnd).map((item,index)=>{
                return(
                    <View key={index}>
                        <OverlayListItem
                            modalToOpen="ReportPreviewModal"
                            fields={item}
                            checkbox = {state.list.checkedItemStatus && state.list.checkedItemsList.includes(item.recordId) ? <CheckedBox/> : <Checkbox/>}
                        />
                    </View>
                )
            })}
        </ScrollView>
    );
}
 
export default OverlayListData;