import React,{Component, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Checkbox from '../Checkbox/Checkbox';
import { PartialCheckbox } from '../Checkbox/Checkboxes'
import { SuitesContext } from '../../../contexts/SuitesContext';
import Header from '../Table/Header';

const ListHeader = ({checkedItemList, listHeaders}) => {
    const [state] = useContext(SuitesContext)
    return ( 
        <View style = {styles.container}>
            {
                checkedItemList.length > 0 ?
                    <View style={styles.checkboxContainer}>
                        <PartialCheckbox/>
                    </View>
                    :
                    <TouchableOpacity style={styles.checkboxContainer}>
                        <Checkbox/>
                    </TouchableOpacity>
            }
           <Header headers={listHeaders}/>
        </View>
    );
}
 
export default ListHeader;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        //flexWrap:'wrap',
        alignItems:'flex-start',
        //justifyContent:'center',
        padding:10,
        //width:'100%'
    },
    checkboxContainer:{
        justifyContent:'center', 
        alignSelf:'center'
    },
})