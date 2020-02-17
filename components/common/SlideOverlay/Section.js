import React,{Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {PersonalRecord, ContactRecord, MissingValueRecord} from '../Information Record/RecordStyles';
import BMIConverter from '../../CaseFiles/BMIConverter';

const Section = (props) => {
    return ( 
        <View style={{padding:10}}>
            <FlatList
                //contentContainerStyle={{flex:1}}
                columnWrapperStyle={{justifyContent:'space-between'}}
                renderItem={({item})=>
                    <View style={{flexGrow:1, paddingTop:20, width:"35%"}}>
                        {
                            item.field === 'BMI' ?
                                <BMIConverter bmiValue={item.value} recordTitle={item.field}/>
                            :
                            item.type === "optional" && item.value !== ""? 
                            <PersonalRecord
                                recordTitle={item.field}
                                recordValue={item.value}
                            />
                            :
                            item.type === "primary"?
                                <ContactRecord
                                    recordTitle={item.field}
                                    recordValue={item.value}
                                />
                                :
                                item.type === "optional" && item.value === ""?
                                    <MissingValueRecord
                                        recordTitle={item.field}
                                    />
                                    :
                                    <PersonalRecord
                                        recordTitle={item.field}
                                        recordValue={item.value}
                                    />
                        }
                    </View>
                }
                data={props.data}
                numColumns={3}
                keyExtractor={(item,index) => `${item.field}${index}`}
            />
        </View>
    );
}

 
export default Section;