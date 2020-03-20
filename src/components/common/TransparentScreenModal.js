import React, { Component } from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Content from '../layout/Content';

export default class TransparentScreenModal extends Component {
    render() {
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={[styles.overlay,{backgroundColor: `rgba(0, 0, 0, 0.3)`}]}
                onPress={()=>{this.props.showScheduleDetails();this.props.animateSlide()}}>
                <View style={styles.content}>
                    {this.props.content}
                </View>
            </TouchableOpacity>
        )
    }
}

const styles=StyleSheet.create({
    overlay:{
        //flex:1,
        //position:'absolute',
        //width:'100%',
        //height:'100%',
        //backgroundColor:'rgba(0, 0, 0, 0.33)',

    },
    content:{
        backgroundColor:'white',
    }
})
