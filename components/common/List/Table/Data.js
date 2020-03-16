import React,{ useContext} from 'react';
import {View, ScrollView} from 'react-native';
import Item from './Item';
import { CaseFileContext } from '../../../../contexts/CaseFileContext';

const Data = () => {
    const [state] = useContext(CaseFileContext)
    return ( 
        <ScrollView
            bounces={false}
            >
            {state.report.reportConsumablesList.map((item,index)=>{
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