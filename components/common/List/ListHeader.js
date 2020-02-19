import React,{Component, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Checkbox from '../Checkbox/Checkbox';
import { PartialCheckbox } from '../Checkbox/Checkboxes'
import { SuitesContext } from '../../../contexts/SuitesContext';

const ListHeader = () => {
    const suitesState = useContext(SuitesContext).state
    const width = 100/suitesState.listHeaders.length
    return ( 
        <View style = {styles.container}>
            {
                suitesState.checkedItemsList.length > 0 ?
                    <View style={{justifyContent:'center', alignSelf:'center'}}>
                        <PartialCheckbox/>
                    </View>
                    :
                    <TouchableOpacity style={{justifyContent:'center', alignSelf:'center'}}>
                        <Checkbox/>
                    </TouchableOpacity>
            }

            <View style={styles.headersContainer}>
                {suitesState.listHeaders.map((header,index)=>{
                    return(
                        <View style={[styles.item,{width:`${width}%`}]} key={index}>
                            <Text style={styles.headerText}>{header}</Text>
                        </View>
                    )
                })}
            </View>
        </View>
    );
}
 
export default ListHeader;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'flex-start',
        justifyContent:'center',
        padding:10,
        width:'100%'
    },
    headersContainer:{
        flex:1,
        marginLeft:10,
        flexDirection:'row',
    },
    item:{
        alignItems:'flex-start',
        justifyContent:'center',
    },
    headerText:{
        fontSize:12,
        color:'#718096'
    }
})