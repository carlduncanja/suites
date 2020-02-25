import React,{Component, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import InputField from '../Input Fields/InputField'
import DropdownField from '../Input Fields/DropdownField';
import { SuitesContext } from '../../../contexts/SuitesContext';

const OverlayDataFields = (props) => {
    const suitesState = useContext(SuitesContext).state   
    const getType = (item,index) =>{
        return (
            item.type === 'text' ?
                <View style={styles.fieldContainer} key={index}>
                    <InputField field={item.field}/>
                </View>
                :
                item.type === 'select' ?
                    <View style={styles.fieldContainer} key={index}>
                        <DropdownField field={item.field} fieldOptions={item.options} selected={item.options[0]}/> 
                    </View>
                    :
                    <View style={styles.fieldContainer} key={index}>
                        <InputField field={item.field}/>
                    </View>
        )
    }

    return (  
        <View style={styles.container}>
            {
                suitesState.currentSelectedStepTabObject.infoNeeded &&
                suitesState.currentSelectedStepTabObject.infoNeeded.map((item,index)=>{
                    return (
                        item.section ?
                            <View style={{width:"100%"}} key={index}>
                                <Text>{item.section}</Text>
                                <View style={{flexDirection:'row', width:'100%', flexWrap:'wrap'}}>
                                    {item.fields.map((field,index)=>{
                                        return(
                                            getType(field,index)
                                        ) 
                                    })}
                                </View>
                            </View>
                        :
                        getType(item, index)
                    )
                })
            }
        </View>
    );
}
 
export default OverlayDataFields;

const styles = StyleSheet.create({
    container:{
        padding:10,
        paddingTop:25,
        backgroundColor:'#FFFFFF',
        justifyContent:'flex-start',
        alignItems:'center',
        flexWrap:'wrap',
        flexDirection:'row'
    },
    fieldContainer:{
        width:'50%',
        paddingBottom:35, 
        paddingTop:20,
    }
})