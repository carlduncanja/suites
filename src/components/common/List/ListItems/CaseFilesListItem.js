import React, {Component, useCallback, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ListItem from '../ListItem';

const CaseFileListItem = ({listItem}) =>{
    return (
        <>
            <View style={styles.item}>
                <Text style={{color:"#718096", fontSize:12}}>{listItem.id}</Text>
                <Text style={{color:"#3182CE", fontSize:16}}>{listItem.name}</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.itemText}>{listItem.balance}</Text>  
            </View>
            <View style={styles.item}>
                <Text style={styles.itemText}>{listItem.staff}</Text>  
            </View>
            <View style={styles.item}>
                <Text style={styles.itemText}>{listItem.nextVisit}</Text>  
            </View>
        </>
    )
}

export default CaseFileListItem

const styles = StyleSheet.create({
    item:{
        flex:1,
        //flexDirection:'row',
        alignItems:"flex-start",
        //justifyContent:'center',
    },
    itemText:{
        fontSize:14,
        color:"#4E5664",
    }
})