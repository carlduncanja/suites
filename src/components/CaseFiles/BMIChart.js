import React,{  } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const BMIChart = ({bmiList, value, selected}) => {
    const ListItem = (item) => {
        return <View 
            style={{
                flexDirection:'row', 
                backgroundColor: selected === item.color ? '#EEF2F6' : null,
                // marginBottom:8,
                padding:12,
                paddingTop:10,
                paddingBottom:10,
                
            }}>
            <View style={{
                backgroundColor: item.color,
                borderRadius : 4,
                height : 16,
                width : 16
            }}/>
            <View style={{flexDirection:'row', paddingLeft:15, justifyContent:'space-evenly'}}>
                <Text style={{fontSize:14, fontWeight:'500'}}>{item.title}</Text>
                <Text style={{fontSize:14}}>{` (${item.description})`}</Text>
            </View>
        </View>
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{fontSize:14, color:'#323843'}}>BMI Chart</Text>
            </View>
            <View style={{paddingTop:20, }}>
                <View style={{flexDirection:'row', marginBottom:20, paddingLeft:12}}>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>Your BMI is</Text>
                    <Text style={{fontSize:14}}> {value}</Text>
                </View>
                <FlatList
                    data = {bmiList}
                    renderItem = {({ item }) => ListItem(item)}
                    keyExtractor = { item => item.title + Math.random().toString()}
                />
            </View>
        </View>
    )
}

export default BMIChart

const styles = StyleSheet.create({
    container : {
        borderRadius: 8,
        // paddingLeft:12,
        // paddingRight:12,
        backgroundColor:'#FFFFFF',
        paddingBottom:12
        // width:400
    },
    titleContainer : {
        // padding: 12,
        paddingBottom :8,
        paddingTop:8,
        paddingLeft:12,
        paddingRight:12,
        justifyContent:'space-between',
        borderBottomColor: '#CCD6E0',
        borderBottomWidth: 1
    }

})