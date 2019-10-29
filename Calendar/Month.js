import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default class Month extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{marginRight:20}} onPress={e => this.props.decreaseMonthChange(e,this.props.currentDate)}>
                    <Icon name="arrow-left" size={20} />   
                </TouchableOpacity>
               
                <View style={styles.month}>
                    <Text style={styles.label}>{this.props.currentDate.format("MMMM")} {this.props.currentDate.format("YYYY")}</Text>
                </View>

                <TouchableOpacity style={{marginLeft:20}} onPress={this.props.increaseMonthChange}>
                    <Icon name="arrow-right" size={20} />
                </TouchableOpacity>
            </View>
            
        )
    }
}


const months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
    },
    label:{
        fontSize: 24,
    }


})