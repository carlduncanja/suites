import React,{ useContext} from 'react';
import {View, ScrollView} from 'react-native';
import DataItem from './DataItem';
import { CaseFileContext } from '../../../contexts/CaseFileContext';

const Data = ({ data, listItemFormat }) => {
    const [state] = useContext(CaseFileContext)
    return ( 
        <ScrollView
            bounces={false}
            >
            {data.map((item,index)=>{
                return(
                    <View key={index}>
                        {listItemFormat(item)}
                    </View>
                )
            })}
        </ScrollView>
    );
}
 
export default Data;