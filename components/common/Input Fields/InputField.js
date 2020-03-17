import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import InputText from '../InputText';

const InputField = (props) => {
    return (  
        <View style={styles.container}>
                <Text style={styles.fieldText}>{props.field}</Text>
                <View style={styles.inputContainer}>
                    <InputText placeholder="" placeholderTextColor="#323843"/>
                </View>
            </View>
    );
}
 
export default InputField;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
    },
    fieldText:{
        fontSize:12,
        color:"#718096"
    },
    inputContainer:{
        backgroundColor:'#FFFFFF',
        borderRadius:4,
        borderWidth:1,
        borderColor:'#E3E8EF',
        padding:5,
        width:"50%",
        position:'absolute',
        left:'40%',
    }
})