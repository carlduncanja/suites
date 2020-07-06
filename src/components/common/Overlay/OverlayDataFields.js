import React,{Component, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import InputField from '../Input Fields/InputField'
import DropdownField from '../Input Fields/DropdownField';
import { CaseFileContext } from '../../../contexts/CaseFileContext';

const OverlayDataFields = (props) => {
    const [state] = useContext(CaseFileContext)
    const tabObject = state.newItemAction.currentStepTabs.filter((tab, index) => index === state.newItemAction.selectedTab)
    
    const getType = (item,index) =>{
        return (
            item.type === 'text' ?
                <InputField field={item.field}/>
                :
                item.type === 'select' ?
                    <DropdownField field={item.field} fieldOptions={item.options} selected={item.options[0]}/> 
                    :
                    <InputField field={item.field}/>
        )
    }

    return (  
        <View style={styles.container}>
            {
                tabObject[0].infoNeeded &&
                tabObject[0].infoNeeded.map((item,index)=>{
                    return (
                        item.section ?
                            <View style={{width:"100%"}} key={index}>
                                <Text>{item.section}</Text>
                                <View style={{flexDirection:'row', width:'100%', flexWrap:'wrap'}}>
                                    {item.fields.map((field,index)=>{
                                        return(
                                            <View style={styles.fieldContainer} key={index}>
                                                {getType(field)}
                                            </View>
                                        ) 
                                    })}
                                </View>
                            </View>
                        :
                        <View style={styles.fieldContainer} key={index}>
                            {getType(item)}
                        </View>
                        
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
        alignItems:'flex-start',
        flexWrap:'wrap',
        flexDirection:'row',
    },
    fieldContainer:{
        width:'50%',
        paddingBottom:35, 
        paddingTop:20,
    }
})