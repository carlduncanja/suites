import React,{Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import SvgIcon from '../../../assets/SvgIcon'

export default class OverlayFooter extends Component{
    render(){
        return(
            <TouchableOpacity style={styles.container}>
                <Text style={styles.title}>{this.props.footerTitle.toUpperCase()}</Text>
                <SvgIcon iconName = "paginationNext" strokeColor="#3182CE"/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 10,
        paddingRight:10,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    title:{
        fontSize:16,
        color:'#3182CE',
        fontWeight:'bold'
    }
})