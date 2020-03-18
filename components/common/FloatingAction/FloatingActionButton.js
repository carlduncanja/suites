import React,{Component, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import SvgIcon from '../../../assets/SvgIcon'
import { SuitesContext } from '../../../contexts/SuitesContext';
import { withModal } from 'react-native-modalfy';
import { appActions } from '../../../reducers/suitesAppReducer'
import { CaseFileContext } from '../../../contexts/CaseFileContext';

const FloatingActionButton = ({backgroundColor, fillColor, modal, modalToOpen,toggleActionButton}) => {
    const [state,dispatch] = useContext(SuitesContext)
    return ( 
        <TouchableOpacity 
            style={[styles.container,{backgroundColor:backgroundColor}]} 
            onPress={()=>{
                toggleActionButton();
                modal.openModal(modalToOpen)
            }}
        >
            <SvgIcon iconName = "actionMenu" fillColor={fillColor}/>
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