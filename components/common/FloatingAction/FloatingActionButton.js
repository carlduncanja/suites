import React,{Component, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import SvgIcon from '../../../assets/SvgIcon'
import { SuitesContext } from '../../../contexts/SuitesContext';
import { withModal } from 'react-native-modalfy';

openModal = (props) => {
    const { modalToOpen, modal } = props
    modal.openModal(modalToOpen)
}

const FloatingActionButton = (props) => {
    const suitesMethod = useContext(SuitesContext).methods
    return ( 
        <TouchableOpacity style={[styles.container,{backgroundColor:props.backgroundColor}]} onPress={()=>{suitesMethod.toggleActionButton();this.openModal(props)}}>
            <SvgIcon iconName = "actionMenu" fillColor={props.fillColor}/>
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