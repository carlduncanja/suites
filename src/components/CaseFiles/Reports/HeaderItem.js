import React from 'react'; 
import { View, Text, StyleSheet } from "react-native";

const HeaderItem = ({data}) => {
    return (  
        <View style={styles.container}>
            {
                Object.keys(data).map((key,index)=>{
                return(
                    <Text key={index} style={styles.text}>{data[key]}</Text>
                )})
            }
        </View>
    );
}
 
export default HeaderItem;

const styles = StyleSheet.create({
    text:{
        color:'#FFFFFF',
        marginBottom:6
    }
})