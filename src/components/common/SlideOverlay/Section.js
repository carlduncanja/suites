import React,{Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {PersonalRecord, ContactRecord, MissingValueRecord} from '../Information Record/RecordStyles';
import BMIConverter from '../../CaseFiles/BMIConverter'; 
import moment from 'moment';

const Section = ({data}) => {
    return ( 
        <View style={{flexDirection:'row', width:"100%", flexWrap:'wrap'}}>
            {
                Object.keys(data).map((itemKey, index)=>{
                    return ( itemKey === 'Address Line 1' ?
                        <View key = {index} style={{paddingTop:20, width:"66%"}}>
                            <PersonalRecord
                                recordTitle={itemKey}
                                recordValue={data[itemKey] === "" ? "--" : data[itemKey]}
                            />
                        </View> 
                        :
                        <View key = {index} style={{paddingTop:20, width:"33%"}}>
                        {
                            itemKey === 'BMI' ?
                                <BMIConverter bmiValue={data[itemKey]} recordTitle={itemKey}/>
                            :
                            // item.type === "optional" ? 
                                <PersonalRecord
                                    recordTitle={itemKey}
                                    recordValue={
                                        data[itemKey] instanceof Date ? 
                                           moment(data[itemKey]).format("YYYY/MM/D") :
                                        data[itemKey] === "" ? "--" : data[itemKey]
                                    }
                                />
                                // :
                                // <ContactRecord
                                //     recordTitle={item.field}
                                //     recordValue={item.value}
                                // />
                        }
                    </View>
                    )
                    
                })
            }
        </View>
    );
}

 
export default Section;