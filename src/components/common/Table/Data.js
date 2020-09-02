import React,{ useContext} from 'react';
import {View, ScrollView} from 'react-native';
import { CaseFileContext } from '../../../contexts/CaseFileContext';
import Item from './Item';

const Data = ({data = [], listItemFormat = ()=>{}}) => {
    

    // const sliceMin = currentListMin ? currentListMin : 0
    // const sliceMax = currentListMax ? currentListMax : data.length

    return ( 
        <ScrollView
            bounces={false}
            >
                
            {/* {data.slice(sliceMin,sliceMax).map((item,index)=>{ */}
            {data.map((item,index)=>{
            
                return(
                    <View key={index}>
                        {listItemFormat(item,index)}
                    </View>
                    )
                })
            }
        </ScrollView>
    );
}
 
export default Data;