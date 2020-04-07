import React,{ useState } from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";

/**
 * @param listItemArray array of object properties
 */

const Item = (listItemArray) =>{
    return(
        <View> 
            {listItemArray.map((item,index)=>{
                return(
                    <View style={{}} key={index}>
                        <Text>{item}</Text>
                    </View>
                )
            })}
        </View>
    )
}

export default Item

const styles = StyleSheet.create({

})