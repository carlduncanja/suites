import React,{Component, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Header = (props) => {
    return ( 
        <View style={styles.headersContainer}>
            {props.headers.map((header,index)=>{
                return(
                    <View style={styles.item} key={index}>
                        <Text style={styles.headerText}>{header}</Text>
                    </View>
                )
            })}
        </View>
    );
}
 
export default Header;

const styles = StyleSheet.create({
    headersContainer:{
        //flex:1,
        marginLeft:10,
        flexDirection:'row',
        //width:'100%'
    },
    item:{
        flex:1,
        alignItems:'flex-start',
        justifyContent:'center',
    },
    headerText:{
        fontSize:12,
        color:'#718096'
    }
})