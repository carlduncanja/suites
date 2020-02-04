import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SvgIcon from '../../../assets/SvgIcon';

export default class FrameTitle extends Component{
    render(){
        return(
            <View style={[styles.container,{backgroundColor:this.props.backgroundColor, borderColor:this.props.borderColor}]}>
                <SvgIcon iconName={this.props.iconName}/>
                <Text style={[styles.text,{color:this.props.color}]}>{this.props.frameTitle}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        padding:16,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"flex-start",
        borderWidth:1,
        borderTopLeftRadius:8,
        borderTopRightRadius:8
    },
    text:{
        fontSize:16,
        marginLeft:8,
        fontWeight:'500'
    }
})