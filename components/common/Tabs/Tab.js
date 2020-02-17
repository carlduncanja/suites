import React,{Component, useContext} from 'react';
import {View, Text,TouchableOpacity, StyleSheet} from 'react-native';
import SvgIcon from '../../../assets/SvgIcon'
import { SuitesContext } from '../../../contexts/SuitesContext';

const Tab = (props) => {
    const suitesMethods = useContext(SuitesContext).methods
    return ( 
        <View style={styles.container}>
            <View style={styles.corner}>
                <SvgIcon iconName="tabLeft" fillColor={props.backgroundColor}/>
            </View>
            <TouchableOpacity activeOpacity={1} style={[styles.tabContainer,{backgroundColor:props.backgroundColor}]} onPress={() => suitesMethods.handleOverlayTabChange(props.tab)}>
                <Text style={[styles.text,{color:props.textColor}]}>{props.tab}</Text>
            </TouchableOpacity>
            <View style={styles.corner}>
                <SvgIcon iconName="tabRight" fillColor={props.backgroundColor}/>
            </View>
        </View>
    );
}
 
export default Tab;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginRight:15,
    },
    tabContainer:{
        borderTopLeftRadius: 8,
        borderTopRightRadius:8,
        padding:5,
        paddingLeft:10,
        paddingRight:10
    },
    text:{
        fontSize:16,
        //color:'#3182CE'
    },
    corner:{
        alignSelf:'flex-end'
    }
})