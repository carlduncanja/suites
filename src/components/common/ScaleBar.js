import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

const ScaleBar = ({ endScaleNumber, currentScaleNumber, numberOfDivisions}) => {

    const data = []
    for (i = 1; i <= numberOfDivisions; i++){
        data.push({
            section : i,
        })
    }
    
    const squareWidth = endScaleNumber / numberOfDivisions
    const sectionsMatch = data.filter( item =>  currentScaleNumber <= (squareWidth * item.section))
    const selectedSection = sectionsMatch[0]
    

    const ScaleItem = (index) => {
        return index < selectedSection.section - 1 ?
            <View 
                key = {index}
                style={{
                    width : 80/data.length,
                    backgroundColor:"#ECC94B"
                }}
            />
            :
            index === selectedSection.section - 1 ?
            <View 
                key = {index}
                style={{
                    width : 80/data.length,
                    backgroundColor:"red"
                }}
            />
            :
            <View 
                key = {index}
                style={{
                    width : 80/data.length,
                    backgroundColor:"#4E5664"
                }}
            />
        
    }
    
    return(
        <View style={{alignItems:'center', justifyContent:'center', }}>
            <FlatList
                contentContainerStyle={styles.container}
                renderItem={({item, index})=> ScaleItem(index)}
                ItemSeparatorComponent={() => <View style={{backgroundColor:"#E3E8EF",width:1}}/> }
                data={data}
                horizontal={true}
                keyExtractor={(item,index) => `${index}`}
            />
        </View>
        
    )
}

export default ScaleBar

const styles = StyleSheet.create({
    container: {
        //flex:1,
        // flexDirection:'row',
        alignSelf:'center',
        width : 80,
        height : 5,
        borderRadius : 12,
        backgroundColor:'green'
    }
})