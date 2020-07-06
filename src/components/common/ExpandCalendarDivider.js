import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class ExpandCalendarDivider extends Component {
    render() {
        return (
            <TouchableOpacity 
                style={{paddingBottom:12, paddingTop:12}}
                onLongPress = {this.props.longPressAction}
                onPress = {this.props.pressAction}
                >
                <View style={[styles.divider]}>
                    <Text style={styles.text}>{this.props.content}</Text>
                </View>
            </TouchableOpacity>
            
        )
    }
}

const styles = StyleSheet.create({
    divider:{
        flex:1,
        backgroundColor: '#EDF2F7',
        paddingTop:6,
        paddingBottom:6,
        paddingLeft:15, 
        paddingRight:15,
        borderWidth:1,
        borderColor:'#CBD5E0',
        borderRadius:4,
        //width: 70,
        //height: 6,
    },
    text:{
        color: '#718096',
        fontSize:12,
    }
})