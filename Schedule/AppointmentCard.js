import React, { Component } from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, ScrollView } from 'react-native';
import moment from 'moment';
import Svg, {Path} from 'react-native-svg';

export default class Schedule extends Component {
    constructor(props){
        super(props);
        this.state={

        }
        this.getTime = this.getTime.bind(this);
    }

    getTime(appointment){
        let timePeriod;
        let time;
        let hour = appointment.substring(11,13);
        let minutes = appointment.substring(14,16);
        if (parseInt(hour) > 11){
            timePeriod = "pm";
            if (parseInt(hour) === 12){
                time = `${hour}:${minutes}`
            }else{
                time = `${(parseInt(hour) - 12).toString()}:${minutes}`
            }
            
        }else{
            timePeriod = "am"
            time = `${(parseInt(hour)).toString()}:${minutes}`
        }

        return (`${time} ${timePeriod}`)
    }

    render(){
        const actionButtons = (
            <View style={{}}>
                <View style={[styles.actionButton,{bottom:50}]}>
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M8 4.5C11.5899 4.5 14.5 3.60457 14.5 2.5C14.5 1.39543 11.5899 0.5 8 0.5C4.41015 0.5 1.5 1.39543 1.5 2.5C1.5 3.60457 4.41015 4.5 8 4.5Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M1.5 5.5V13.5C1.5 14.605 4.41 15.5 8 15.5C11.59 15.5 14.5 14.605 14.5 13.5V5.5" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M5.5 7.5L10.5 12.5" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M10.5 7.5L5.5 12.5" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                </View>
                <View style={[styles.actionButton, {bottom:6}]}>
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M13 7L9 3" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M5.5 14.5L0.5 15.5L1.5 10.5L11.5 0.5L15.5 4.5L5.5 14.5Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                </View>
            </View>
        )
        return(
            <ScrollView style={styles.container}>
               
                <View style={styles.cardTitle}>
                    <Text style={{fontSize:20, color:'#104587', paddingBottom:5}}>{this.props.scheduleDetails.title}</Text>
                    <Text style={{fontSize:20, color:'#0CB0E7', paddingBottom:5}}>{this.props.scheduleDetails.responseEntity}</Text>
                </View>
             
                <View style={styles.doctors}>
                    <View style={styles.cardDescription}>
                        <Text style={[styles.detailText, {color: '#2D3748', width:'40%'}]}>{this.props.scheduleDetails.location}</Text>
                        <Text style={[styles.detailText, {color: '#104587', width:'40%'}]}>
                            {this.getTime(this.props.scheduleDetails.startTime)} - {this.getTime(this.props.scheduleDetails.endTime)}
                        </Text>
                        <Text style={[styles.detailText, {color: '#104587', width:'40%'}]}>{moment(this.props.scheduleDetails.startTime).format("MMM D, YYYY")}</Text>                  
                    </View>

                    <View style={styles.cardDoctors}>
                        <View style={styles.doctorContainer}>
                            <View style={styles.iconContainer}/>
                            <View style={styles.detailsContainer}>
                                <Text style={[styles.detailText, {color:'#718096'}]}>Lead Surgeon</Text>
                                <Text style={[styles.detailText, {color:'#0CB0E7'}]}>{this.props.scheduleDetails.leadSurgeon}</Text>
                            </View>
                        </View>

                        <View style={styles.doctorContainer}>
                            <View style={styles.iconContainer}/>
                                <View style={styles.detailsContainer}>
                                <Text style={[styles.detailText, {color:'#718096'}]}>Anaesthesiologist</Text>
                                <Text style={[styles.detailText, {color:'#0CB0E7'}]}>{this.props.scheduleDetails.anaesthesiologist}</Text>
                            </View>
                        </View> 

                    </View> 

                    <View style={styles.secondaryDoctors}>
                        <View style={styles.doctorContainer}>
                            <View style={styles.iconContainer}/>
                            <View style={styles.detailsContainer}>
                                <Text style={[styles.detailText, {color:'#718096'}]}>Assistant Surgeon</Text>
                                <Text style={[styles.detailText, {color:'#0CB0E7'}]}>{this.props.scheduleDetails.assistantSurgeon}</Text>
                            </View>
                        </View>

                        <View style={styles.doctorContainer}>
                            <View style={styles.iconContainer}/>
                            <View style={styles.detailsContainer}>
                                <Text style={[styles.detailText, {color:'#718096'}]}>Nurse 1</Text>
                                <Text style={[styles.detailText, {color:'#0CB0E7'}]}>{this.props.scheduleDetails.nurse1}</Text>
                            </View>
                        </View>

                        <View style={styles.doctorContainer}>
                            <View style={styles.iconContainer}/>
                            <View style={styles.detailsContainer}>
                                <Text style={[styles.detailText, {color:'#718096'}]}>Nurse2</Text>
                                <Text style={[styles.detailText, {color:'#0CB0E7'}]}>{this.props.scheduleDetails.nurse2}</Text>
                            </View>
                        </View>
                    </View> 
                </View>
 
                <View style={styles.footerContainer}> 
                    <Text style={{fontSize: 12, color:'#A0AEC0'}}>Created by {this.props.scheduleDetails.createdBy}</Text>
                    
                    <View style={{flexDirection:'column', position:'relative', alignItems:'center', justifyContent:'space-between'}}>
                       {this.props.scheduleButtons === true ? 
                            actionButtons : null
                        }
                        <TouchableOpacity onPress={this.props.showScheduleButtons} style={{height:40, width:40, backgroundColor:'#A0AEC0', borderRadius:40/2, alignItems:'center', justifyContent:'center'}}>
                            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M15 0H1C0.4 0 0 0.4 0 1V15C0 15.6 0.4 16 1 16H15C15.6 16 16 15.6 16 15V1C16 0.4 15.6 0 15 0ZM14 14H2V2H14V14Z" fill="white"/>
                                <Path d="M12 5H4V7H12V5Z" fill="white"/>
                                <Path d="M12 9H4V11H12V9Z" fill="white"/>
                            </Svg> 
                        </TouchableOpacity> 
                    </View>

                    
                    
                </View>

            </ScrollView>

        )
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1, 
        padding:'2%', 
        paddingLeft:'4%', 
        flexDirection:'column'
    },
    doctors:{
        flexDirection:'column', 
    },
    footerContainer:{
        flex: 1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        top:'10%',
        paddingRight:'4%',
        //position:'relative'
    },
    cardTitle:{
        flexDirection:'column',
        paddingBottom:16,
        paddingTop:10,
    },
    cardDescription:{
        borderBottomColor:'#CBD5E0',
        borderBottomWidth: 1,
        paddingBottom:15,
        flexDirection:'row',
    },
    cardDoctors:{
        flexDirection:'row',
        marginLeft:0,
    },
    secondaryDoctors:{
        flexDirection:'row',
        marginLeft:0,
    },
    doctorContainer:{
        flexDirection:'row',
        marginTop: 30,
        width:'40%',
    },
    iconContainer:{
        height:40, 
        width: 40, 
        borderColor:'#CBD5E0',
        borderWidth:1, 
        borderRadius:8
    },
    detailsContainer:{
        flexDirection:'column', 
        marginLeft:10, 
        justifyContent:'space-between',
        alignItems:'flex-start'
    },
    detailText:{
        fontSize:16,
    },
    actionButton:{
        backgroundColor:'#718096',
        padding:'2%',
        borderRadius:32/2,
        width:32,
        height:32,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:5,
        //marginLeft:10,
        position:'absolute',
        //marginLeft:'-35%',
        //bottom:'10%',
        left: '-40%',

    }
})