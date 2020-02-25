import React,{Component, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import SvgIcon from '../../../assets/SvgIcon'
import { SuitesContext } from '../../../contexts/SuitesContext';

const Action = (props) => {
    const suitesMethod = useContext(SuitesContext).methods
    return ( 
        props.action.disabled ?
            <View style={styles.container}>
                <SvgIcon iconName={props.action.action} strokeColor="#A0AEC0"/>
                <Text style={[styles.text, styles.disabledText]}>{props.action.actionName}</Text>
            </View>
            :
            <TouchableOpacity style={styles.container} onPress={()=>suitesMethod.transformAction()}>
                <SvgIcon iconName={props.action.action} strokeColor="#2F855A"/>
                <Text style={styles.text}>{props.action.actionName}</Text>
            </TouchableOpacity>

    );
}
 
export default Action;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row'
    },
    iconContainer:{

    },
    text:{
        marginLeft:15,
        fontSize:16
    },
    disabledText:{
        color:"#A0AEC0",
    }
})