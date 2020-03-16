import React,{Component, useContext} from 'react';
import {View, Text,TouchableOpacity, StyleSheet} from 'react-native';
import SvgIcon from '../../../assets/SvgIcon'

const Tab = (props) => {
   
    return ( 
        <View style={styles.container}>
            <View style={styles.corner}>
                <SvgIcon iconName="tabLeft" fillColor={props.backgroundColor}/>
            </View>
            <View style={[styles.tabContainer,{backgroundColor:props.backgroundColor}]}>
                <Text style={[styles.text,{color:props.textColor}]}>{props.tabName}</Text>
            </View>
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
        marginRight:0,
    },
    tabContainer:{
        borderTopLeftRadius: 8,
        borderTopRightRadius:8,
        padding:5,
        paddingLeft:8,
        paddingRight:8
    },
    text:{
        fontSize:16,
        //color:'#3182CE'
    },
    corner:{
        alignSelf:'flex-end'
    }
})