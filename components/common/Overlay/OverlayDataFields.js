import React,{Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import InputField from '../Input Fields/InputField'
import DropdownField from '../Input Fields/DropdownField';

export default class OverlayDataFields extends Component{
    render(){
        return(
            <View style={styles.container}>
                <FlatList
                    data={this.props.fields}
                    numColumns={this.props.numColumns}
                    renderItem={({item})=>
                        item.fieldType === 'text'?
                        <View style={styles.fieldContainer}>
                            <InputField field={item.fieldName}/>
                        </View>
                        :
                        <View style={styles.fieldContainer}>
                            <DropdownField field={item.fieldName} fieldOptions={item.options} selected={item.selected}/> 
                        </View>
                    }
                    keyExtractor={item => item.fieldId}
                />
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container:{
        padding:10,
        paddingTop:25,
        backgroundColor:'#FFFFFF'
    },
    fieldContainer:{
        flex:1,
        paddingBottom:30, 
        paddingTop:20
    }
})