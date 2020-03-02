import React, { Component } from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Content from '../layout/Content';

export default TransparentScreen = (props) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={[styles.overlay,{backgroundColor: `rgba(0, 0, 0, 0.3)`}]}
                onPress={props.closeTransparent}>
                <View style={styles.content}>
                    {props.children}
                </View>
            </TouchableOpacity>
        )
}

const styles=StyleSheet.create({
    overlay:{
        flex:1,
        position:'absolute',
        width:'100%',
        height:'100%',
        //backgroundColor:'rgba(0, 0, 0, 0.33)',

    },
    content:{
        backgroundColor:'white',
    }
})
