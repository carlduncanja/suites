import React, {Component, useCallback, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Item = (props) => {
   
    return ( 
        <View style={{flex:1,flexDirection:"row", marginLeft:10, paddingBottom:12}}>
            {props.fields.recordInformation.map((field,index)=>{
                return typeof field === 'object'? 
                    <View style={[styles.item]} key={index}>
                        {Object.keys(field).map((key,index)=>{
                            return key === 'id'?
                                <Text style={[styles.itemText,{color:'#718096'}]} key={index}>{field[key]}</Text>
                                :
                                <Text style={{fontSize:16, color:'#3182CE'}} key={index}>{field[key]}</Text>
                        })}
                    </View>
                :                            
                
                    <View style={styles.item} key={index}>
                        <Text style={styles.itemText}>{field}</Text>
                    </View>
            })}
        </View>
    );
}
 
export default Item;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'flex-start',
        justifyContent:'center',
        padding:10,
        backgroundColor:'#FFFFFF',
        borderRadius:8,
        borderWidth:1,
        borderColor: "#E3E8EF",
        width:'100%',
        marginBottom:10
    },
    item:{
        flex:1,
        // width:'25%',
        alignItems:"flex-start",
        justifyContent:'center',
    },
    itemText:{
        fontSize:14,
        color:"#4E5664",
    }
})