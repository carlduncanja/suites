import React, { Component } from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import moment from 'moment';
import Svg, {Path} from 'react-native-svg';
import FloatingActionButton from '../common/FloatingActionButton';
import ScheduleFloatingActionButtons from '../common/ScheduleFloatingActionButtons'
import ActionContainer from '../common/ActionContainer';

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
        const buttonsController = ( fillColor) => {
            return(
                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M15 0H1C0.4 0 0 0.4 0 1V15C0 15.6 0.4 16 1 16H15C15.6 16 16 15.6 16 15V1C16 0.4 15.6 0 15 0ZM14 14H2V2H14V14Z" fill={fillColor}/>
                    <Path d="M12 5H4V7H12V5Z" fill={fillColor}/>
                    <Path d="M12 9H4V11H12V9Z" fill={fillColor}/>
                </Svg>
            )

        }

        const deleteButton = (strokeColor) => {
            return(
                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M8 4.5C11.5899 4.5 14.5 3.60457 14.5 2.5C14.5 1.39543 11.5899 0.5 8 0.5C4.41015 0.5 1.5 1.39543 1.5 2.5C1.5 3.60457 4.41015 4.5 8 4.5Z" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                    <Path d="M1.5 5.5V13.5C1.5 14.605 4.41 15.5 8 15.5C11.59 15.5 14.5 14.605 14.5 13.5V5.5" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                    <Path d="M5.5 7.5L10.5 12.5" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                    <Path d="M10.5 7.5L5.5 12.5" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                </Svg>
            )

        }

        const editButton = (strokeColor) => {
            return(
                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M13 7L9 3" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                    <Path d="M5.5 14.5L0.5 15.5L1.5 10.5L11.5 0.5L15.5 4.5L5.5 14.5Z" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                </Svg>
            )

        }

        const actionButtons = (
            <View style={{flex:1, justifyContent:'space-between'}}>
                <ScheduleFloatingActionButtons
                    buttonSvg = {deleteButton("#C53030")}
                    floatingAction = {this.props.deleteFloatingAction}
                    completeFloatingAction = {this.props.completeDeleteFloatingAction}
                    buttonText = "Hold to Delete"
                    deleteAppointment = {this.props.deleteAppointment}
                    completeDeleteAppointment = {this.props.completeDeleteAppointment}
                    exitDelete = {this.props.exitDelete}

                />
                {/* <View style={{backgroundColor:'#E2E8F0', borderRadius:2, height:1, width:'100%'}}/>

                <ScheduleFloatingActionButtons
                    buttonSvg = {editButton("#2F855A")}
                    buttonText = "Edit Item"
                /> */}
            </View>
        )

        const container = (
            <View style={{position:'absolute', bottom:60, right: -12}}>
                <ActionContainer
                    actionTitle = "Schedule Actions"
                    content = { actionButtons }
                />

            </View>
        )

        const doctorItemContainer = (title, name, position) =>{
            return position === 'doctor' ?
            (
                <View style={styles.doctorContainer}>
                    <View style={styles.iconContainer}>
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M8 16V23H20V17" stroke="#718096" stroke-miterlimit="10" stroke-linecap="square"/>
                            <Path d="M20 17C21.6569 17 23 15.6569 23 14C23 12.3431 21.6569 11 20 11C18.3431 11 17 12.3431 17 14C17 15.6569 18.3431 17 20 17Z" stroke="#718096" stroke-miterlimit="10" stroke-linecap="square"/>
                            <Path d="M11 2H13.8C14.4 2 14.9 2.5 14.8 3.1L13.2 14.2C13.1 15.2 12.2 15.9 11.2 15.9H4.70001C3.70001 15.9 2.90001 15.2 2.70001 14.2L1.20001 3.1C1.10001 2.5 1.50001 2 2.20001 2H5.00001" stroke="#718096" stroke-miterlimit="10" stroke-linecap="square"/>
                            <Path d="M5 1V3" stroke="#718096" stroke-miterlimit="10" stroke-linecap="square"/>
                            <Path d="M11 1V3" stroke="#718096" stroke-miterlimit="10" stroke-linecap="square"/>
                        </Svg>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={[styles.detailText, {color:'#718096'}]}>{title}</Text>
                        <Text style={[styles.detailText, {color:'#0CB0E7'}]}>{name}</Text>
                    </View>
                </View>
            )

            :

            <View style={styles.doctorContainer}>
                    <View style={styles.iconContainer}>
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M5 12V16C5 19.9 8.1 23 12 23C15.9 23 19 19.9 19 16V12" stroke="#718096" stroke-miterlimit="10" stroke-linecap="square"/>
                            <Path d="M19 12H5V4L12 2L19 4V12Z" stroke="#718096" stroke-miterlimit="10" stroke-linecap="square"/>
                            <Path d="M12 5V9" stroke="#718096" stroke-miterlimit="10" stroke-linecap="square"/>
                            <Path d="M10 7H14" stroke="#718096" stroke-miterlimit="10" stroke-linecap="square"/>
                        </Svg>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={[styles.detailText, {color:'#718096'}]}>{title}</Text>
                        <Text style={[styles.detailText, {color:'#0CB0E7'}]}>{name}</Text>
                    </View>
                </View>


        }

        const personnel = [...this.props.scheduleDetails.surgeons, ...this.props.scheduleDetails.doctors]

        return(
            <TouchableOpacity onPress={this.props.closeActionButtons} style={{flex:1}} activeOpacity={1}>
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
                            {personnel.map((surgeon, index)=>{
                                return(
                                    doctorItemContainer(surgeon.title, surgeon.name, 'doctor')
                                )

                            })}
                            <View style={{flexDirection:'row'}}>
                                {this.props.scheduleDetails.nurses.map((nurse)=>{
                                return(
                                        doctorItemContainer(nurse.title, nurse.name, 'nurse')
                                    )
                                })}
                            </View>

                        </View>
                    </View>

                    <View style={styles.footerContainer}>
                        <Text style={{fontSize: 12, color:'#A0AEC0'}}>Created by {this.props.scheduleDetails.createdBy}</Text>
                        <View style={styles.footer}>
                        {this.props.scheduleButtons === false ?
                                <TouchableOpacity
                                    onPress={this.props.showScheduleButtons}
                                    style={[styles.buttonController,
                                    {backgroundColor:'white'}]}
                                >
                                    {buttonsController('#0CB0E7')}
                                </TouchableOpacity>
                                :
                                    <View>
                                        { container }
                                        <TouchableOpacity
                                            onPress={this.props.showScheduleButtons}
                                            style={[styles.buttonController,
                                            {backgroundColor:'#A0AEC0'}]}
                                        >
                                            {buttonsController('white')}
                                        </TouchableOpacity>
                                    </View>
                            }
                        </View>

                    </View>

                </ScrollView>
            </TouchableOpacity>


        )
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        //padding:'2%',
        paddingRight:'2%',
        paddingBottom:'2%',
        paddingLeft:'4%',
        flexDirection:'column'
    },
    doctors:{
        flexDirection:'column',
        height:'50%',
    },
    footerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingRight:'4%',
        marginTop:40
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
        flexWrap:'wrap',
        flexDirection:'column',
        marginLeft:0,
        marginTop: 20,

    },
    doctorContainer:{
        height:'50%',
        alignItems:'flex-start',
        flexDirection:'row',
        marginRight:'5%',
        width:'35%',
    },
    iconContainer:{
        height:40,
        width: 40,
        borderColor:'#CBD5E0',
        borderWidth:1,
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center'
    },
    detailsContainer:{
        flexDirection:'column',
        marginLeft:20,
        justifyContent:'space-between',
        alignItems:'flex-start'
    },
    detailText:{
        fontSize:16,
    },
    buttonController:{
        height:40,
        width:40,
        borderRadius:40/2,
        alignItems:'center',
        justifyContent:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    footer:{
        flexDirection:'column',
        position:'relative',
        alignItems:'center',
        justifyContent:'space-between',
        marginRight: 10,
    }
})
