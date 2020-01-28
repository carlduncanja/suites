import React,{Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import InputText from '../InputText';
import InputField from '../InputField'
import DropdownField from '../DropdownField';

export default class OverlayDataCard extends Component{
    render(){
        return(
            <View style={styles.container}>
                <FlatList
                    data={this.props.fields}
                    numColumns={2}
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