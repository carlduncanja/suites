import React from 'react';
import { View, Text, StyleSheet } from "react-native";

const FrameTableItem = (props) => {
    return ( 
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{props.title.charAt(0).toUpperCase().concat(props.title.substring(1, props.title.length))}</Text>
            </View>
            <View style={styles.valueContainer}>
                <Text style={styles.value}>{props.value}</Text>
            </View>
        </View>
    );
}
 
export default FrameTableItem;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginBottom:10,
        marginRight:20,
    },
    titleContainer:{
        marginRight:10,
        width:'32%',
        alignItems:'flex-start',
        justifyContent:'center'
    },
    title:{
        color:'#718096',
        fontSize:16
    },
    valueContainer:{
        flex:1,
        backgroundColor:'#FFFFFF',
        borderColor:"#CCD6E0",
        borderWidth:1,
        borderRadius:4,
        padding:4,
    },
    value:{
        color: "#1D2129",
        fontSize:16
    }
})