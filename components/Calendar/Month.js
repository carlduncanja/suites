import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export default class Month extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{marginRight:44, padding:10}} onPress={this.props.decreaseMonthChange}>
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M10.5 0.5L5.5 8L10.5 15.5" stroke="#2D3748" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                </TouchableOpacity>
               
                {this.props.calendarLayoutMeasure <= 350 ?
                    <View style={styles.month}>
                        <Text style={styles.label}>{this.props.prevMonthDate().format("MMMM")} {this.props.prevMonthDate().format("YYYY")}</Text>
                    </View>
                    :
                    this.props.calendarLayoutMeasure >= 1100 ?
                        <View style={styles.month}>
                            <Text style={styles.label}>{this.props.nextMonthDate().format("MMMM")} {this.props.nextMonthDate().format("YYYY")}</Text>
                        </View>
                        :
                        <View style={styles.month}>
                            <Text style={styles.label}>{this.props.currentDate.format("MMMM")} {this.props.currentDate.format("YYYY")}</Text>
                        </View>
                }
              
                <TouchableOpacity style={{marginLeft:44, padding:10}} onPress={this.props.increaseMonthChange}>
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M5.5 0.5L10.5 8L5.5 15.5" stroke="#2D3748" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
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
        color:'#104587',
    }


})