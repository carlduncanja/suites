import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import IconButton from '../../Buttons/IconButton'

const FrameItem = ({itemContent = "", icon, backgroundColor = "#FFFFFF", onPressButton = ()=>{}}, isEditMode = false) => {
        return (
        <View style={[styles.container,{ backgroundColor:backgroundColor}]}>
            <Text style={styles.text}>{itemContent}</Text>
            {
                isEditMode && <IconButton Icon = {icon} onPress = {onPressButton} />
            }
        </View>
    ) 
}
export default  FrameItem 
  
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        borderColor:'#CCD6E0',
        borderWidth:1,
        backgroundColor:"#FFFFFF",
        borderRadius:4,
        alignItems:'center',
        justifyContent:'space-between',
        padding:5
    },
    text:{
        fontSize:16, 
        color:'#1D2129',
        //fontFamily:'Metropolis'
    }
})