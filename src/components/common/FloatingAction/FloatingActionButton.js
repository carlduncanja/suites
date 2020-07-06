import React,{Component, useContext} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import SvgIcon from '../../../../assets/SvgIcon'
import { withModal } from 'react-native-modalfy';

const FloatingActionButton = ({isDisabled,toggleActionButton}) => {
    return (
        <TouchableOpacity
            style={[styles.container,{
                backgroundColor: isDisabled ?  "#A0AEC0" : "#4299E1"
            }]}
            onPress={()=>{toggleActionButton();}}
        >
            <SvgIcon iconName = "actionMenu" fillColor={"#FFFFFF"}/>
        </TouchableOpacity>
    );
} 

export default withModal(FloatingActionButton);

const styles = StyleSheet.create({
    container:{
        height:48,
        width:48,
        borderRadius:30,
        borderWidth:1,
        borderColor:'#E3E8EF',
        //backgroundColor:'#FFFFFF',
        justifyContent:'center',
        alignItems:'center'
    }
})
