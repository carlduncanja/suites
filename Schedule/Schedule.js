import React, { Component } from 'react';
import {View, StyleSheet, ScrollView } from 'react-native';
import RowCalendar from '../Calendar/RowCalendar';
import Calendar from '../Calendar/Calendar';
import ScheduleListView from './ScheduleListView';
import Month from '../Calendar/Month';
import Button from '../components/Button';
import TransparentScreen from '../components/TransparentScreen';
import SlideUpPanel from '../components/SideUpPanel';
import Divider from '../components/Divider';
import AppointmentCard from './AppointmentCard';
import ExtendedCalendar from '../Calendar/ExtendedCalendar';
import SearchBar from '../components/SearchBar';
import SlideLeftPanel from '../components/SlideLeftPanel';



export default class Schedule extends Component {
    render() {    
        const searchContent=(
            <SearchBar 
                placeholderTextColor = '#718096'
                placeholder="Search by scheduled items or dates"
                changeText = {this.props.searchChangeText}
                inputText = {this.props.searchValue}
                closeSearch = {this.props.closeTransparent}
            />
        )
            
        return (
            <View style={{flex:1}}>
                <ScrollView style={{flex:1}}>
                    <View style={{flex:1}}>   
                        <View style={[styles.topContainer, {paddingTop: this.props.screenDimensions.width > this.props.screenDimensions.height ? 0: '1%'}]}>
                            <View style={styles.buttonContainer}>
                                <Button 
                                    title="Search" 
                                    buttonPress={this.props.searchPress}
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
                                <Button 
                                    title= {this.props.displayTodayAppointment === true ? "Go Back" : "Go to Today"}
                                    buttonPress={this.props.showTodayAppointment}
                                />
                            </View>
                        </View>
                        
                        <View style={{marginLeft: this.props.screenDimensions.width > this.props.screenDimensions.height ? '2%':0, marginBottom: 5}}>

                            {this.props.displayFullCalendar === false ?
                                <RowCalendar 
                                    {...this.props}
                                    currentDay = {this.props.currentDate}
                                />
                                :
                                this.props.screenDimensions.width > this.props.screenDimensions.height ?
                                    <ExtendedCalendar {...this.props}/>
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
                            
                            marginTop : this.props.displayFullCalendar === true && this.props.statusLastRow === true ? 25 : 0,
                            height:'100%'}}
                        >
                        <ScheduleListView 
                            displayTodayAppointment = {this.props.displayTodayAppointment}
                            currentDate={this.props.currentDate}
                            showSlider = {this.props.showSlider}
                            showScheduleDetails = {this.props.showScheduleDetails}
                        />

                        
                    </View>

                   { this.props.screenDimensions.width > this.props.screenDimensions.height && this.props.showSlider === true?
                        <SlideLeftPanel content = "Orientation Content" {...this.props}/>
                       
                    :
                    null}

                    
                </ScrollView>
           
                {this.props.transparent === false ? 
                    null 
                    : 
                    this.props.searchOpen === true ? 

                        <TransparentScreen  content={searchContent} showScheduleDetails = {this.props.closeTransparent} /> 
                        :
                        <TransparentScreen  showScheduleDetails = {this.props.closeTransparent} /> 

                }
                {this.props.showSlider === true ?
                    <SlideUpPanel 
                        restartDrag = {this.props.restartDrag}
                        content={
                            <AppointmentCard 
                                scheduleDetails = {this.props.scheduleDetails}   
                                showScheduleButtons = {this.props.showScheduleButtons} 
                                scheduleButtons={this.props.scheduleButtons}
                                deleteFloatingAction = {this.props.deleteFloatingAction}
                                completeDeleteFloatingAction = {this.props.completeDeleteFloatingAction}
                                deleteAppointment = {this.props.deleteAppointment}
                                completeDeleteAppointment = {this.props.completeDeleteAppointment}
                                exitDelete = {this.props.exitDelete}
                                />
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