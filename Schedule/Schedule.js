import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import RowCalendar from '../Calendar/RowCalendar';
import ScheduleListView from './ScheduleListView';
import Month from '../Calendar/Month';
import Button from '../components/Button';
import TransparentScreen from '../components/TransparentScreen';
import InputText from '../components/InputText';
import Icon from 'react-native-vector-icons/EvilIcons';



export default class Schedule extends Component {
    render() {    
        const content=(
            <View style={styles.searchContent}>
                <InputText 
                    changeText = {this.props.searchChangeText}
                    inputText = {this.props.searchValue}
                    placeholderTextColor = '#718096'
                    placeholder="Search by scheduled items or dates"
                />
                <Icon 
                    name="close" 
                    style={{marginLeft:5}} 
                    onPress={this.props.closeTransparent}
                />
            </View>
        )
        return (
           <ScrollView style={{flex:1}}>
                <View style={styles.topContainer}>
                    <View style={styles.buttonContainer}>
                        <Button 
                            title="Search" 
                            searchPress={this.props.searchPress}
                        />                        
                    </View>
                    <View style={{alignItems:'center', paddingBottom:20}}>
                        <Month 
                            currentDate={this.props.currentDate} 
                            decreaseMonthChange = {this.props.decreaseMonthChange}
                            increaseMonthChange = {this.props.increaseMonthChange}
                        />                     
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Go to Today"/>
                    </View>
                    <RowCalendar {...this.props}/>
                </View>
        
                <View style={styles.partition}/>

                <ScheduleListView 
                    currentDate={this.props.currentDate}
                    showScheduleDetails = {this.props.showScheduleDetails}
                />
                
                {this.props.transparent === false ? 
                    null 
                    : 
                    <TransparentScreen  content={content} /> 
                }
           </ScrollView>
        )
    }
}

const styles=StyleSheet.create({
    searchContent:{
        alignItems:'center',
        flexDirection:'row',
        backgroundColor:'white',
        padding:10,
    },
    topContainer:{
      
    },
    buttonContainer:{

    },
    partition:{

    }
})