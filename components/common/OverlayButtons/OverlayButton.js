import React, { Component, useContext } from 'react';
import {View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { appActions } from '../../../reducers/suitesAppReducer';
import { SuitesContext } from '../../../contexts/SuitesContext';

const Button = (props) =>{
    const [state, dispatch] = useContext(SuitesContext)
    const buttonPress = () => {
        dispatch({
            type : appActions.SETEDITMODE,
            newState : { status : !state.editMode.status}
        })
    }
    
    return(
        <TouchableOpacity 
            style={[styles.button,{backgroundColor:props.backgroundColor}]} 
            onPress={()=>buttonPress()}
        >
            <Text style={{color:props.color, fontSize:14}}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles=StyleSheet.create({
    button:{
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        padding:5,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:6,
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