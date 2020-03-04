import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { withModal } from 'react-native-modalfy';

class Button extends Component {
    openModal = () => {
        console.log("Props:", this.props)
        const { modalToOpen, modal } = this.props
        modal.openModal(modalToOpen)
    }
    render() {
        // console.log("Modal:", this.props)
        return (
            <TouchableOpacity 
                style={[styles.button,{backgroundColor:this.props.backgroundColor}]} 
                // onPress={this.props.buttonPress}
                onPress = {this.openModal}
            >
                <Text style={{color:this.props.color}}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

export default withModal(Button)

const styles=StyleSheet.create({
    button:{
        //backgroundColor:'#F7FAFC',
        borderRadius:4,
        borderWidth:1,
        borderColor:'#CBD5E0',
        alignItems:'center',
        justifyContent:'center',
        //padding:10,
        alignSelf:'center',
        padding:5,
        //width:91,
        //height:24,

    },
    buttonText:{
        //color: '#4A5568',
    },
})
