import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SvgIcon from '../../../../assets/SvgIcon';

const FrameTitle = (props) => {
    const {
        backgroundColor,
        borderColor,
        color,
        frameTitle,
        icon
    } = props

    const FrameIcon = icon
    
    return (
        <View style={[styles.container,{backgroundColor:backgroundColor, borderColor:borderColor}]}>
            {/* <SvgIcon iconName={this.props.iconName} fillColor={this.props.iconFillColor}/> */}
            <FrameIcon fillColor = {color}/>
            <Text style={[styles.text,{color:color}]}>{frameTitle}</Text>
        </View>
    )
}

export default FrameTitle

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
