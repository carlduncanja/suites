import React,{ useContext} from 'react';
import {View, ScrollView} from 'react-native';
import Item from './Item';
// import { CheckedBox } from '../Checkbox/Checkboxes';
// import Checkbox from '../Checkbox/Checkbox';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { CaseFileContext } from '../../../../contexts/CaseFileContext';

const Data = () => {
    const caseState = useContext(CaseFileContext).state
    return ( 
        <ScrollView
            bounces={false}
            //contentContainerStyle={{}}
            >
            {caseState.report.reportConsumablesList.map((item,index)=>{
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