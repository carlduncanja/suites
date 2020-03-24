import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Paginator from './Paginator';

 
const RoundedPaginator = ({totalItems}) => {
    return ( 
        <View style={styles.container}>
            <Paginator/>
        </View>
    );
}
 
export default RoundedPaginator;

const styles = StyleSheet.create({
    container:{
        paddingLeft:10,
        paddingRight:10,
        paddingTop:5,
        paddingBottom:5,
        borderRadius:32,
        backgroundColor:"#FFFFFF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,    
        elevation: 5,
    },
})