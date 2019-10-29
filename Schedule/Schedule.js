import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import RowCalendar from '../Calendar/RowCalendar';
import ScheduleListView from './ScheduleListView';
import Month from '../Calendar/Month';
import Button from '../components/Button';
import TransparentScreen from '../components/TransparentScreen';
import SlideUpPanel from '../components/SideUpPanel';
import InputText from '../components/InputText';
import Icon from 'react-native-vector-icons/EvilIcons';
import SideUpPanel from '../components/SideUpPanel';



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
        //let surgeonObject = Object.entries(this.props.scheduleDetails.surgeons);
        const slideContent=(
            <View style={{padding:'2%', flex:1}}>
                <View style={styles.cardTitle}>
                    <Text style={{fontSize:20, color:'#104587'}}>{this.props.scheduleDetails.title}</Text>
                    <Text style={{fontSize:20, color:'#0CB0E7'}}>{this.props.scheduleDetails.responseEntity}</Text>
                </View>
                <View style={styles.cardDescription}>
                    <Text>{this.props.scheduleDetails.location}</Text>
                    <Text>{this.props.scheduleDetails.startTime}</Text>
                    <Text>{this.props.scheduleDetails.endTime}</Text>
                </View>
                <View style={styles.cardDoctors}>
                    <Text>Lead Surgeon</Text>
                    <Text>{this.props.scheduleDetails.leadSurgeon}</Text>

                    <Text>Assistant Surgeon</Text>
                    <Text>{this.props.scheduleDetails.assistantSurgeon}</Text>

                    <Text>Anaesthesiologist</Text>
                    <Text>{this.props.scheduleDetails.anaesthesiologist}</Text>

                </View>
            </View>
        )
        return (
            <View style={{height:'100%'}}>
                <ScrollView>
                    <View style={styles.topContainer}>
                        <View style={styles.buttonContainer}>
                            <Button 
                                title="Search" 
                                searchPress={this.props.searchPress}
                            />                        
                        </View>
                        <View style={{alignItems:'center'}}>
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

                    <RowCalendar {...this.props}/>
        
                    <View style={styles.partition}/>
                
                    <ScheduleListView 
                        currentDate={this.props.currentDate}
                        showSlider = {this.props.showSlider}
                        showScheduleDetails = {this.props.showScheduleDetails}
                    />
             
                    {this.props.transparent === false ? 
                        null 
                        : 
                        <TransparentScreen  content={content} /> 
                    }
                    
                </ScrollView>

                {this.props.sliderTransparent === true ?
                    <TransparentScreen/> 
                   :
                    null
                }
                {this.props.showSlider === true ?
                    <SlideUpPanel content={slideContent}/> 
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
        backgroundColor:'white',
        padding:10,
    },
    topContainer:{
        marginLeft:'5%',
        marginRight:'5%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    cardTitle:{
        flexDirection:'column',
        paddingBottom:16,
    },
    cardDescription:{
        //flex:1,
        borderBottomColor:'#CBD5E0',
        borderBottomWidth: 1,
        paddingBottom:15,
        alignItems:'center',
        flexDirection:'row',
        justifyContent: 'space-between',

    },
    cardDoctors:{

    },
    buttonContainer:{

    },
    partition:{

    }
})