import React, { Component } from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, ScrollView } from 'react-native';
import AnimatedDivider from '../components/AnimatedDivider';

export default class ActionCalendar extends Component {
    render(){
        return(
            <View>
                {this.props.statusLastRow === false ?
                    <View>
                        {this.props.lastRow}
                    </View>

                    :
                    null
                }
                
                <View style={{width: '100%', height:'100%',position:'absolute', marginTop:0, alignItems:'center'}}>
                    <AnimatedDivider 
                        showLastCalendarRow = {this.props.showLastCalendarRow}
                        statusLastRow = {this.props.statusLastRow}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   
})