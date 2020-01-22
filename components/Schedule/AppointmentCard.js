import React, { Component } from 'react';
import {View, Text, Animated, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';

export default class AppointmentCard extends Component {
    constructor(props){
        super(props);
        this.state={
        }
        
        this.animateSlide = this.animateSlide.bind(this);
        this.slideUpAnimValue = new Animated.Value(0);  
    }
 
    
    render(){
        return(
            <View>
                <Animated.View style={{bottom: this.slideUpAnimValue}}>
                    <SlideUpPanel
                        restartDrag = {this.restartDrag}
                        content={
                            <ScrollableAppointmentCard
                                scheduleDetails = {this.state.scheduleDetails}
                                showScheduleButtons = {this.showScheduleButtons}
                                //scheduleButtons={this.state.scheduleButtons}
                                deleteFloatingAction = {this.deleteFloatingAction}
                                completeDeleteFloatingAction = {this.completeDeleteFloatingAction}
                                deleteAppointment = {this.state.deleteAppointment}
                                completeDeleteAppointment = {this.state.completeDeleteAppointment}
                                exitDelete = {this.exitDelete}
                                closeActionButtons = {this.closeActionButtons}
                                screenDimensions = {this.props.screenDimensions}
                                transparent = {this.props.transparent}
                            />
                        }
                        slideUpAnimValue = {this.slideUpAnimValue}
                        slideValue = {this.state.slideValue}
                        stopScheduleDrag = {this.stopScheduleDrag}
                        draggable = {this.state.slideDraggable}
                    /> 
                </Animated.View>

                <View style={styles.footerContainer}>
                    <Text style={{fontSize: 12, color:'#A0AEC0'}}>Created by {this.props.scheduleDetails.createdBy}</Text>
                        {/* <View style={styles.footer}>
                        {this.props.scheduleButtons === false ?
                                <TouchableOpacity
                                    onPress={this.props.showScheduleButtons}
                                    style={[styles.buttonController,
                                    {backgroundColor:'#0CB0E7'}]}
                                >   
                                    <SvgIcon iconName='actionMenuOpen' fillColor="white"/>
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
                        </View>  */}
                </View> 
            </View>
        )
    }
}

const styles= StyleSheet.create({
       
    footerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingRight:'4%',
        paddingTop:20,
        paddingBottom:20,
        //marginBottom:'5%',
        //height:100,
    }
})
