import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Record extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.recordTitle}>{this.props.recordTitle}</Text>
                <Text style={[styles.recordValue,{color:this.props.valueColor}]}>{this.props.recordValue}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'column'
    },
    recordTitle:{
        paddingBottom:4,
        color:'#718096',
        fontSize:14,
    },
    recordValue:{
        fontSize:16,
    }
})