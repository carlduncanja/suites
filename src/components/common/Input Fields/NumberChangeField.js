import React,{  } from "react";
import { View, Text, StyleSheet } from "react-native";
import RightArrow from '../../../../assets/svg/rightArrow';
import LeftArrow from '../../../../assets/svg/leftArrow';
import IconButton from '../Buttons/IconButton'


const NumberChangeField = ({number, onIncreasePress, onDecreasePress}) =>{
    return (
        <View style={styles.inputWrapper}>
            <IconButton
                Icon = {<LeftArrow strokeColor = {'grey'}/>}
                onPress = {onDecreasePress}
                disabled = {false}
            />
            <View style={[styles.inputField,{borderColor:'#CCD6E0', backgroundColor:'#F8FAFB'}]}>
                <Text style={styles.text}>{number}</Text>
            </View>
            <IconButton
                Icon = {<RightArrow strokeColor = {'grey'}/>}
                onPress = {onIncreasePress}
                disabled = {false}
            />

        </View>
    )
}

export default NumberChangeField

const styles = StyleSheet.create({
    inputWrapper:{
        flexDirection:'row',
        alignItems:'center'
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