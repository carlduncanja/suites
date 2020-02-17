import React,{ useContext} from 'react';
import {View, ScrollView} from 'react-native';
import ListItem from './ListItem';
import { CheckedBox } from '../Checkbox/Checkboxes';
import Checkbox from '../Checkbox/Checkbox';
import { SuitesContext } from '../../../contexts/SuitesContext';

const ListData = () => {
    const suitesState = useContext(SuitesContext).state
    return ( 
        <ScrollView
            bounces={false}
            contentContainerStyle={{paddingBottom:300}}
            >
            {suitesState.listData.slice(suitesState.paginatorValues.sliceArrayStart, suitesState.paginatorValues.sliceArrayEnd).map((item,index)=>{
                return(
                    <View key={index}>
                        <ListItem
                            fields={item}
                            checkbox = {suitesState.checkedItem && suitesState.checkedItemsList.includes(item.recordId) ? <CheckedBox/> : <Checkbox/>}
                        />
                    </View>
                )
            })}
        </ScrollView>
    );
}
 
export default ListData;