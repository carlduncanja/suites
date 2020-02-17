import React, {Component, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import SvgIcon from '../../../assets/SvgIcon';
import { SuitesContext } from '../../../contexts/SuitesContext';

const Paginator = (props) => {
    const suitesMethod = useContext(SuitesContext).methods
    const suitesState = useContext(SuitesContext).state
    return ( 
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>suitesMethod.dispatchPaginator({type:'GO_TO_PREVIOUS_PAGE'})}>
                <SvgIcon iconName = "paginationPrev" strokeColor="#104587"/>
            </TouchableOpacity>
            
            <View style={styles.numbersContainer}>
                <Text style={styles.numbers}>{suitesState.paginatorValues.currentPage} of {suitesState.paginatorValues.totalPages}</Text>
            </View>
            <TouchableOpacity onPress={()=>suitesMethod.dispatchPaginator({type:'GO_TO_NEXT_PAGE'})}>
                <SvgIcon iconName = "paginationNext" strokeColor="#104587"/>
            </TouchableOpacity>
        </View>
    );
}
 
export default Paginator;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    numbersContainer:{
        backgroundColor:'#FAFAFA',
        borderWidth:1,
        borderColor:'#CCD6E0',
        borderRadius:4,
        paddingLeft:7,
        paddingRight:7,
        paddingBottom:2, 
        paddingTop:2,
        marginLeft:10,
        marginRight:10,
        flexDirection:'row'
    },
    numbers:{
        fontSize:14,
        color:'#313539'
    }
})