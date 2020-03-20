import React,{Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {PersonalRecord, ContactRecord, MissingValueRecord} from '../Information Record/RecordStyles';
import BMIConverter from '../../CaseFiles/BMIConverter';

const Section = (props) => {
    return ( 
        <View style={{flexDirection:'row', width:"100%", flexWrap:'wrap'}}>
            {
                props.data.map((item, index)=>{
                    return ( item.field === 'Address Line 1' ?
                        <View key = {index} style={{paddingTop:20, width:"66%"}}>
                            <PersonalRecord
                                recordTitle={item.field}
                                recordValue={item.value === "" ? "--" : item.value}
                            />
                        </View>
                        :
                        <View key = {index} style={{paddingTop:20, width:"33%"}}>
                        {
                            item.field === 'BMI' ?
                                <BMIConverter bmiValue={item.value} recordTitle={item.field}/>
                            :
                            item.type === "optional" ? 
                                <PersonalRecord
                                    recordTitle={item.field}
                                    recordValue={item.value === "" ? "--" : item.value}
                                />
                                :
                                <ContactRecord
                                    recordTitle={item.field}
                                    recordValue={item.value}
                                />
                        }
                    </View>
                    )
                    
                })
            }
        </View>
    );
}

 
export default Section;