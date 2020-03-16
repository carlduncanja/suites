import React,{ useContext} from 'react';
import {View, ScrollView} from 'react-native';
import ListItem from './ListItem';
import { CheckedBox } from '../Checkbox/Checkboxes';
import Checkbox from '../Checkbox/Checkbox';
import { SuitesContext } from '../../../contexts/SuitesContext';

const ListData = () => {
    const [state] = useContext(SuitesContext)
    return ( 
        <ScrollView
            bounces={false}
            contentContainerStyle={{paddingBottom:300}}
            >
            {state.list.listData.slice(state.paginatorValues.sliceArrayStart, state.paginatorValues.sliceArrayEnd).map((item,index)=>{
                return(
                    <View key={index}>
                        <ListItem
                            modalToOpen = "OverlaySlidePanelModal"
                            fields={item}
                            checkbox = {state.list.checkedItemStatus && state.list.checkedItemsList.includes(item.recordId) ? <CheckedBox/> : <Checkbox/>}
                        />
                    </View>
                )
            })}
        </ScrollView>
    );
}
 
export default ListData;