import React, { Component } from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, ScrollView } from 'react-native';
import RowCalendar from '../Calendar/RowCalendar';
import Calendar from '../Calendar/Calendar';
import ScheduleListView from './ScheduleListView';
import Month from '../Calendar/Month';
import Button from '../components/Button';
import TransparentScreen from '../components/TransparentScreen';
import SlideUpPanel from '../components/SideUpPanel';
import InputText from '../components/InputText';
import Divider from '../components/Divider';
import Svg, {Path} from 'react-native-svg';
import AppointmentCard from './AppointmentCard';



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

                <TouchableOpacity onPress={this.props.closeTransparent}>
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M13.5 2.5L2.5 13.5" stroke="#4A5568" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M2.5 2.5L13.5 13.5" stroke="#4A5568" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                </TouchableOpacity>
                
            </View>
        )
     
        return (
            <View style={{height:'100%'}}>
                <ScrollView >
                    <View>   
                        <View style={[styles.topContainer, {paddingTop: this.props.screenDimensions.width > this.props.screenDimensions.height ? 0: '1%'}]}>
                            <View style={styles.buttonContainer}>
                                <Button 
                                    title="Search" 
                                    searchPress={this.props.searchPress}
                                />                        
                            </View>
                            <View style={{alignItems:'center' }}>
                                <Month 
                                    currentDate={this.props.currentDate} 
                                    decreaseMonthChange = {this.props.decreaseMonthChange}
                                    increaseMonthChange = {this.props.increaseMonthChange}
                                />                     
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button title="Go to Today"/>
                            </View>
                        </View>
                        
                        <View style={{marginLeft: this.props.screenDimensions.width > this.props.screenDimensions.height ? '2%':0, marginBottom: 5}}>

                            {this.props.displayFullCalendar === false ?
                                <RowCalendar 
                                    {...this.props}
                                    currentDay = {this.props.currentDate}
                                />
                                :
                                <Calendar {...this.props}/>
                            }
                            
                        </View>    
                    </View>
                    
                    {this.props.displayFullCalendar === false ?
                        <View style={{alignSelf: 'center', marginBottom: 20}}>
                            <Divider pressAction = {this.props.showFullCalendar}/>
                        </View>

                        :
                        null
                    }
                   
                    
                    <View 
                        style=
                            {{
                            top: this.props.displayFullCalendar === false && this.props.statusLastRow === false ? 0 
                                : 
                                this.props.displayFullCalendar === true && this.props.statusLastRow === false ? -60
                                    :
                                    0,
                            
                            marginTop : this.props.displayFullCalendar === true && this.props.statusLastRow === true ? 25 : 0
                            }}
                        >
                        <ScheduleListView 
                            currentDate={this.props.currentDate}
                            showSlider = {this.props.showSlider}
                            showScheduleDetails = {this.props.showScheduleDetails}
                        />
                    </View>
                    
                    
                </ScrollView>

                {this.props.transparent === false ? 
                    null 
                    : 
                    <TransparentScreen  content={content} /> 
                }
                {this.props.sliderTransparent === true ?
                    <TransparentScreen 
                        showScheduleDetails = {this.props.showScheduleDetails}/> 
                   :
                    null
                }
                {this.props.showSlider === true ?
                    <SlideUpPanel 
                        restartDrag = {this.props.restartDrag}
                        content={<AppointmentCard 
                            scheduleDetails = {this.props.scheduleDetails}   
                            showScheduleButtons = {this.props.showScheduleButtons} 
                            scheduleButtons={this.props.scheduleButtons}/>
                        } 
                        stopScheduleDrag = {this.props.stopScheduleDrag}
                        draggable = {this.props.slideDraggable}/> 
                   :
                    null

                }

            </View>
            
        )
    }
}

const styles=StyleSheet.create({
    searchContent:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',
        padding:15,
    },
    topContainer:{
        marginLeft:'2%',
        marginRight:'5%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        //paddingTop:'1%',
        paddingBottom:35,
    },
    
    buttonContainer:{

    },
    partition:{
        backgroundColor:'#CBD5E0',
        borderRadius: 8,
        height: 6,
        width: 70,
        alignSelf:'center',
        marginTop:15,
        marginBottom: 24,

    }
})