import React,{  } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import RightArrow from '../../../../assets/svg/rightArrow';
import LeftArrow from '../../../../assets/svg/leftArrow';
import IconButton from '../Buttons/IconButton'


const NumberChangeField = ({ onChangePress = () => {}, onAmountChange = () => {}, value=0 }) =>{
    return ( 

        <View style={styles.inputWrapper}>
            <View style={{}}>
                <IconButton
                Icon = {<LeftArrow strokeColor = {'#718096'}/>}
                onPress = {()=>onChangePress('sub')}
                disabled = {false}
            />
            </View>
            

            <TextInput 
                style={styles.editTextBox}
                onChangeText = {(value)=>onAmountChange(value)}
                value = {value}
                keyboardType = "number-pad"
            />
            <View style={{}}>
                <IconButton
                Icon = {<RightArrow strokeColor="#718096"/>}
                onPress = {()=>{onChangePress('add')}}
                disabled = {false}
            />
            </View>
            
        </View>
    )
}

export default NumberChangeField

const styles = StyleSheet.create({
    inputWrapper:{
        flexDirection:'row',
        alignItems:'center',
        // backgroundColor:'red'
    },
    editTextBox:{
        backgroundColor:'#F8FAFB',
        borderColor:'#CCD6E0',
        borderWidth:1,
        borderRadius:4,
        padding:6,
        paddingTop:2,
        paddingBottom:2,
        // marginLeft:10,
        // marginRight:10
    },
    inputField : {
        height:30,
        width:30,
        borderWidth:1,
        borderRadius:4,
        // padding:5,
        // paddingBottom:2,
        // paddingTop:2,
        marginLeft:8,
        marginRight:8,
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        fontWeight:'500',
        fontSize:16,
        color:'#4A5568'
    }
})