import React,{Component} from 'react';
import {View, Text, StyleSheet, ScrollView, CheckBox} from 'react-native';
import ListItem from './ListItem';
import {CheckedBox, PartialCheckbox} from '../Checkbox/Checkboxes';
import Checkbox from '../Checkbox/Checkbox';

export default class ListData extends Component{
    render(){
        return(
            <ScrollView
                bounces={false}
                contentContainerStyle={{paddingBottom:300}}
            >
                {this.props.listDataItem.slice(this.props.sliceArrayStart, this.props.sliceArrayEnd).map((item,index)=>{
                    return(
                        <View key={index}>
                            <ListItem
                                fields={item}
                                setSelected = {this.props.setSelected}
                                toggleCheckbox = {this.props.toggleCheckbox}
                                checkbox = {this.props.checked && this.props.selectedCaseFile === item.recordId ? <CheckedBox/> : <Checkbox/>}
                            />
                        </View>
                    )
                })}
            </ScrollView>
        )
    }
}