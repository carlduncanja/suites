import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CardItem from "./CardItem";

/**
 * @param itemsArray array of objects
 * @returns {*}  
 * @constructor
 */
const CardList = ({itemsArray}) => {
    return(
        <View style={styles.container}> 
            {
                itemsArray.map((item,index)=>{
                    return(
                        <View key={index} style={styles.item}>
                            <CardItem itemObject = {item}/>
                        </View>
                    ) 
                })
            }
        </View>
    )
}

export default CardList

const styles = StyleSheet.create({
    container:{

    },
    item:{
        marginBottom:15
    }
})