import React,{Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {PersonalRecord, ContactRecord, MissingValueRecord} from '../Information Record/RecordStyles';
import BMIConverter from '../../CaseFiles/BMIConverter';

const Section = (props) => {
    return ( 
        // <View >
        //     <FlatList
        //         //contentContainerStyle={{flex:1}}
        //         columnWrapperStyle={{justifyContent:'space-between'}}
        //         renderItem={({item})=>
        //             <View style={{paddingTop:20, width:"35%", borderRightColor:"red", borderRightWidth:2}}>
        //                 {
        //                     item.field === 'BMI' ?
        //                         <BMIConverter bmiValue={item.value} recordTitle={item.field}/>
        //                     :
        //                     item.type === "optional" && item.value !== ""? 
        //                     <PersonalRecord
        //                         recordTitle={item.field}
        //                         recordValue={item.value}
        //                     />
        //                     :
        //                     item.type === "primary"?
        //                         <ContactRecord
        //                             recordTitle={item.field}
        //                             recordValue={item.value}
        //                         />
        //                         :
        //                         item.type === "optional" && item.value === ""?
        //                             <MissingValueRecord
        //                                 recordTitle={item.field}
        //                             />
        //                             :
        //                             <PersonalRecord
        //                                 recordTitle={item.field}
        //                                 recordValue={item.value}
        //                             />
        //                 }
        //             </View>
        //         }
        //         data={props.data}
        //         numColumns={3}
        //         keyExtractor={(item,index) => `${item.field}${index}`}
        //     />
        // </View>
        <View style={{flexDirection:'row', width:"100%", flexWrap:'wrap'}}>
            {
                props.data.map((item, index)=>{
                    return ( item.field === 'Address 1' ?
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