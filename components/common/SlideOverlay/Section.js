import React,{Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {PersonalRecord, ContactRecord, MissingValueRecord} from '../Information Record/RecordStyles';

export default class Section extends Component{
    render(){
        return(
            <View style={{padding:10}}>
                <FlatList
                    renderItem={({item})=>
                        item.type === "optional" && item.value !== ""? 
                            <View style={{width:'35%', paddingTop:20}}>
                                <PersonalRecord
                                    recordTitle={item.field}
                                    recordValue={item.value}
                                />
                            </View>
                            :
                            item.type === "primary"?
                                <View style={{width:'35%', paddingTop:20}}>
                                    <ContactRecord
                                        recordTitle={item.field}
                                        recordValue={item.value}
                                    />
                                </View>
                                :
                                item.type === "optional" && item.value === ""?
                                    <View style={{width:'35%', paddingTop:20}}>
                                        <MissingValueRecord
                                            recordTitle={item.field}
                                        />
                                    </View>
                                    :
                                    null

                    }
                    data={this.props.data}
                    numColumns={3}
                    keyExtractor={(item,index) => `${item.field}${index}`}
                />
            </View>
        )
    }
}