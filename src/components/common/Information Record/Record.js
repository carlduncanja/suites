import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Record = ({recordTitle, recordValue , valueFontSize = 16, titleFontSize = 14, titleColor = '#718096' , valueColor = '#323843'}) => {
    return ( 
        <View style={styles.container}>
            <Text style={[styles.recordTitle,{color:titleColor, fontSize:titleFontSize}]}>{recordTitle}</Text>
            <Text style={{color:valueColor, fontSize: valueFontSize}}>{recordValue}</Text>
        </View>
    )
}

export default Record 

const styles = StyleSheet.create({
    container:{
        flexDirection:'column'
    },
    recordTitle:{
        paddingBottom:4,
    },
    
})