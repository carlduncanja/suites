import React,{Component, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Checkbox from '../Checkbox/Checkbox';
import { SuitesContext } from '../../../contexts/SuitesContext';

const OverlayListHeader = () => {
    const [state] = useContext(SuitesContext)
    return ( 
        <View style = {styles.container}>
            <TouchableOpacity 
                style={{justifyContent:'center', alignSelf:'center'}}
            >
                <Checkbox/>
            </TouchableOpacity>
            <View style={styles.headersContainer}>
                {state.slideOverlay.slideOverlayListHeaders.map((header,index)=>{
                    return(
                        <View style={[styles.item,{flex:1}]} key={index}>
                            <Text style={styles.headerText}>{header}</Text>
                        </View>
                    )
                })}
            </View>
        </View>
    );
}
 
export default OverlayListHeader;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'flex-start',
        justifyContent:'center',
        padding:10,
        width:'100%',
        marginBottom:10,
        borderBottomColor:"#CCD6E0",
        borderBottomWidth:1,
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