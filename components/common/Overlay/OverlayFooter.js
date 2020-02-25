import React,{Component, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import SvgIcon from '../../../assets/SvgIcon'
import { SuitesContext } from '../../../contexts/SuitesContext';

const OverlayFooter = () => {
    const suitesState = useContext(SuitesContext).state
    const suitesMethod = useContext(SuitesContext).methods
    return (  
        <TouchableOpacity style={styles.container} onPress={()=>{suitesMethod.handleNewItemTabChange()}}>
            <Text style={styles.title}>{suitesState.overlayText.toUpperCase()}</Text>
            <SvgIcon iconName = "paginationNext" strokeColor="#3182CE"/>
        </TouchableOpacity>
    );
}
 
export default OverlayFooter;

const styles = StyleSheet.create({
    container:{
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 10,
        paddingRight:10,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    title:{
        fontSize:16,
        color:'#3182CE',
        fontWeight:'bold'
    }
})