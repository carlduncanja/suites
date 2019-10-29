import React, { Component } from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity} from 'react-native'; 
import Content from '../layout/Content';

export default class TransparentScreen extends Component {
    render() {
        return (
            <View style={styles.overlay}>
                <View style={styles.content}>
                   {this.props.content}
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    overlay:{
        flex:1,
        position:'absolute',
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(0, 0, 0, 0.5)',

    },
    content:{
        backgroundColor:'white',
    }
})
