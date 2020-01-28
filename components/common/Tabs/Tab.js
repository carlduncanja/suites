import React,{Component} from 'react';
import {View, Text,TouchableOpacity, StyleSheet} from 'react-native';
import SvgIcon from '../../../assets/SvgIcon'

export default class Tab extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.corner}>
                    <SvgIcon iconName="tabLeft" fillColor={this.props.backgroundColor}/>
                </View>
                <TouchableOpacity style={[styles.tabContainer,{backgroundColor:this.props.backgroundColor}]}>
                    <Text style={[styles.text,{color:this.props.textColor}]}>{this.props.tab}</Text>
                </TouchableOpacity>
                <View style={styles.corner}>
                    <SvgIcon iconName="tabRight" fillColor={this.props.backgroundColor}/>
                </View>
            </View>
           
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginRight:20,
    },
    tabContainer:{
        borderTopLeftRadius: 8,
        borderTopRightRadius:8,
        padding:5,
        paddingLeft:10,
        paddingRight:10
    },
    text:{
        fontSize:16,
        //color:'#3182CE'
    },
    corner:{
        alignSelf:'flex-end'
    }
})