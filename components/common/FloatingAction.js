import React,{Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import SvgIcon from '../../assets/SvgIcon'

export default class FloatingAction extends Component{
    render(){
        return(
            <TouchableOpacity style={[styles.container,{backgroundColor:this.props.backgroundColor}]}>
                <SvgIcon iconName = "actionMenu" fillColor={this.props.fillColor}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        height:48,
        width:48,
        borderRadius:30,
        borderWidth:1,
        borderColor:'#E3E8EF',
        //backgroundColor:'#FFFFFF',
        justifyContent:'center',
        alignItems:'center'
    }
})