import React, {Component, useCallback, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CaseFilesListItem from './ListItems/CaseFilesListItem';

const Item = ({listItem, routeName}) => {
    return ( 
        <View style={{flex:1,flexDirection:"row", marginLeft:10}}>
            {routeName === 'CaseFiles' ?
                <CaseFilesListItem listItem = {listItem}/>
                :
                null
            }       
        </View>
    );
}
 
export default Item;

const styles = StyleSheet.create({
    item:{
        flex:1,
        //alignItems:"flex-start",
        justifyContent:'center',
    },
    itemText:{
        fontSize:14,
        color:"#4E5664",
    }
})