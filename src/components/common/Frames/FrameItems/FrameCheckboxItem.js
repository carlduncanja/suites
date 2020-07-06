import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import {CheckedBox} from '../../Checkbox/Checkboxes';
import Checkbox from '../../Checkbox/Checkbox';

const FrameCheckboxItem = (props) => {
    return ( 
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{props.title.charAt(0).toUpperCase().concat(props.title.substring(1, props.title.length))}</Text>
            </View>
            <View style={styles.valueContainer}>
                {props.status === true ?
                    <CheckedBox/>:
                    <Checkbox/>
                }
            </View>
        </View>
    );
}
 
export default FrameCheckboxItem;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginBottom:10,
        marginRight:20,
    },
    titleContainer:{
        marginRight:10,
        //width:'32%',
        alignItems:'flex-start',
        justifyContent:'center'
    },
    title:{
        color:'#718096',
        fontSize:16
    },
    valueContainer:{
      alignItems:'center',
      justifyContent:'center'
    },
    value:{
        color: "#1D2129",
        fontSize:16
    }
})