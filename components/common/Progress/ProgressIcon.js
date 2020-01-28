import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SvgIcon from '../../../assets/SvgIcon';

export default class ProgressIcon extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View>{this.props.icon}</View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#FFFFFF",
        borderRadius:30,
        width:60, 
        height:60,
        alignItems:'center',
        justifyContent:"center",
        borderColor:'#B0C8D3',
        borderWidth:3,
        padding:10,
    }
})