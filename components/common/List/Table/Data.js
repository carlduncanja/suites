import React,{ useContext} from 'react';
import {View, ScrollView} from 'react-native';
import Item from './Item';
// import { CheckedBox } from '../Checkbox/Checkboxes';
// import Checkbox from '../Checkbox/Checkbox';
import { SuitesContext } from '../../../../contexts/SuitesContext';

const Data = () => {
    const suitesState = useContext(SuitesContext).state
    return ( 
        <ScrollView
            bounces={false}
            //contentContainerStyle={{}}
            >
            {suitesState.report.reportConsumablesList.map((item,index)=>{
                return(
                    <View key={index}>
                        <Item fields={item} />
                    </View>
                )
            })}
        </ScrollView>
    );
}
 
export default Data;