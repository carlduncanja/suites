import React,{ useContext} from 'react';
import {View, ScrollView} from 'react-native';
import { CaseFileContext } from '../../../contexts/CaseFileContext';

const Data = (props) => {
    const {
        data,
        listItemFormat,
        currentListMax,
        currentListMin,
        toggleCheckbox
    } = props 

    const [state] = useContext(CaseFileContext)
    let sliceMin = currentListMin ? currentListMin : 0
    let sliceMax = currentListMax ? currentListMax : data.length
    return ( 
        <ScrollView
            bounces={false}
            >

            {data.slice(sliceMin,sliceMax).map((item,index)=>{
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