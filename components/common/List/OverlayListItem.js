import React, {Component, useCallback, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { SuitesContext } from '../../../contexts/SuitesContext';
import SvgIcon from '../../../assets/SvgIcon';

const OverlayListItem = (props) => {
    const suitesState = useContext(SuitesContext).state
    const suitesMethods = useContext(SuitesContext).methods
    const width = 100/props.fields.recordInformation.length
    return ( 
        <TouchableOpacity onPress={()=>{suitesMethods.handleSelectedListItem(props.fields.recordId); }}>
                <View style={styles.container}>
                    <TouchableOpacity style={{alignSelf:'center', justifyContent:'center'}} onPress={()=>suitesMethods.toggleCheckbox(props.fields.recordId)}>
                        {props.checkbox}
                    </TouchableOpacity>
                    
                    <View style={{flex:1,flexDirection:"row", marginLeft:10}}>
                        {props.fields.recordInformation.map((field,index)=>{
                            return typeof field === 'object'? 
                                <View style={[styles.item,{width:`${width}%`}]} key={index}>
                                    {Object.keys(field).map((key,index)=>{
                                        return key === 'id'?
                                            <Text style={[styles.itemText,{color:'#718096'}]} key={index}>{field[key]}</Text>
                                            :
                                            key === 'actions'?
                                                <View key = {index} style={[styles.item,{width:`${width}%`}]}>
                                                    <SvgIcon iconName = "actions"/>
                                                </View>
                                                
                                                :
                                                <Text style={{fontSize:16, color:'#3182CE'}} key={index}>{field[key]}</Text>
                                    })}
                                </View>
                            :                            
                                index === 0 ?
                                    <View style={[styles.item,{width:`${width}%`}]} key={index}>
                                        <Text style={[styles.itemText,{color:"#3182CE"}]}>{field}</Text>
                                    </View>
                                    :
                                        <View style={[styles.item,{width:`${width}%`}]} key={index}>
                                            <Text style={styles.itemText}>{field}</Text>
                                        </View>
                        })}
                    </View>
                </View>
            </TouchableOpacity>
    );
}
 
export default OverlayListItem;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'flex-start',
        justifyContent:'center',
        padding:10,
        backgroundColor:'#FFFFFF',
        width:'100%',
        marginBottom:10
    },
    item:{
        
        alignItems:"flex-start",
        justifyContent:'center',
    },
    itemText:{
        fontSize:14,
        color:"#4A5568",
    }
})