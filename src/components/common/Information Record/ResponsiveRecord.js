import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ResponsiveRecord = ({recordTitle, recordValue = "--", valueFontSize = 16, titleFontSize = 14, titleColor = '#718096' , valueColor = '#3182CE', handleRecordPress = ()=>{}}) => {
    return ( 
        <View style={styles.container}>
            <Text style={[styles.recordTitle,{color:titleColor, fontSize:titleFontSize}]}>{recordTitle}</Text>
            <TouchableOpacity activeOpacity={1} onPress={()=>handleRecordPress()}>
                <Text style={{color:valueColor, fontSize: valueFontSize}}>{recordValue === "" ? "--" : recordValue}</Text>
            </TouchableOpacity>
            
        </View>
    )
}

export default ResponsiveRecord 

const styles = StyleSheet.create({
    container:{
        flexDirection:'column'
    },
    recordTitle:{
        paddingBottom:4,
    },
    
})