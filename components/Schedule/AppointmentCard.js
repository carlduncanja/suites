import React, { Component } from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import moment from 'moment';
import SvgIcon from '../../assets/SvgIcon';
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
        const container = (
            <View style={{position:'absolute', bottom:60, right: -12}}>
                <ActionContainer
                    actionTitle = "Schedule Actions"
                    content = { 
                        <View style={{flex:1, justifyContent:'space-between'}}>
                            <ScheduleFloatingActionButtons
                                buttonSvg = {<SvgIcon iconName="actionDelete" strokeColor="#C53030"/>}
                                floatingAction = {this.props.deleteFloatingAction}
                                completeFloatingAction = {this.props.completeDeleteFloatingAction}
                                buttonText = "Hold to Delete"
                                deleteAppointment = {this.props.deleteAppointment}
                                completeDeleteAppointment = {this.props.completeDeleteAppointment}
                                exitDelete = {this.props.exitDelete}
                            />
                         </View> 
                    }
                />

            </View>
        )

        const doctorItemContainer = (title, name, position) =>{
            return (
                <View style={[styles.doctorContainer,{height:this.props.screenDimensions.width < this.props.screenDimensions.height ? '50%' : '20%'}]}>
                    <View style={styles.iconContainer}>
                        {position === 'doctor' ?
                            <SvgIcon iconName="staffDoctor" strokeColor="#718096"/>
                            :
                            <SvgIcon iconName="staffNurse" strokeColor="#718096"/>
                        }
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={[styles.detailText, {color:'#718096'}]}>{title}</Text>
                        <Text style={[styles.detailText, {color:'#0CB0E7'}]}>{name}</Text>
                    </View>
                </View>
            )
 
        }

        const personnel = [...this.props.scheduleDetails.surgeons, ...this.props.scheduleDetails.doctors]

        return(
            <TouchableOpacity onPress={this.props.closeActionButtons} style={{flex:1}} activeOpacity={1}>
                <ScrollView style={styles.container}>

                    <View style={styles.cardTitle}>
                        <Text style={{fontSize:20, color:'#104587', paddingBottom:5}}>{this.props.scheduleDetails.title}</Text>
                        <Text style={{fontSize:20, color:'#0CB0E7', paddingBottom:5}}>{this.props.scheduleDetails.responseEntity}</Text>
                    </View>

                    <View style={[styles.doctors,{height:this.props.screenDimensions.width < this.props.screenDimensions.height ? '50%' : null}]}>

                        <View style={styles.cardDescription}>
                            <Text style={[styles.detailText, {color: '#2D3748', width:'40%'}]}>{this.props.scheduleDetails.location}</Text>
                            <Text style={[styles.detailText, {color: '#104587', width:'40%'}]}>
                                {this.getTime(this.props.scheduleDetails.startTime)} - {this.getTime(this.props.scheduleDetails.endTime)}
                            </Text>
                            <Text style={[styles.detailText, {color: '#104587', width:'40%'}]}>{moment(this.props.scheduleDetails.startTime).format("MMM D, YYYY")}</Text>
                        </View>
                        {this.props.screenDimensions.width < this.props.screenDimensions.height ?
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
                            :
                            <View style={{marginTop:40}}>
                                {personnel.map((surgeon, index)=>{
                                    return(
                                        doctorItemContainer(surgeon.title, surgeon.name, 'doctor')
                                    )
                                })}
                                {this.props.scheduleDetails.nurses.map((nurse)=>{
                                    return(
                                            doctorItemContainer(nurse.title, nurse.name, 'nurse')
                                        )
                                })}
                            </View>
                            
                        }
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
                                    <SvgIcon iconName='actionMenuOpen' fillColor="#0CB0E7"/>
                                </TouchableOpacity>
                                :
                                    <View>
                                        { container }
                                        <TouchableOpacity
                                            onPress={this.props.showScheduleButtons}
                                            style={[styles.buttonController,
                                            {backgroundColor:'#A0AEC0'}]}
                                        >
                                            <SvgIcon iconName='actionMenuOpen' fillColor="white"/>
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
        flexDirection:'column',
    },
    doctors:{
        flexDirection:'column',
    },
    footerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingRight:'4%',
        marginTop:40,
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
        //height:'50%',
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
