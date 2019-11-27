import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
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

export default class SlidingPanel extends Component{
    
    render(){
        const Drawer = require("react-native-drawer-menu").default;
       
        const scheduleContent = (
            <View 
                style=
                    {{
                    flex:1,
                    position:'relative',
                    zIndex:-1,
                    top: this.props.displayFullCalendar === false && this.props.statusLastRow === false ? 0 
                        : 
                        this.props.displayFullCalendar === true && this.props.statusLastRow === false ? -60
                            :
                            0,
                    
                    marginTop : this.props.displayFullCalendar === true && this.props.statusLastRow === true ? 10 : 0,
                    }}
                >
                
                <ScheduleListView 
                    displayTodayAppointment = {this.props.displayTodayAppointment}
                    currentDate={this.props.currentDate}
                    showSlider = {this.props.showSlider}
                    showScheduleDetails = {this.props.showScheduleDetails}
                />
        
            </View>
        )
        const searchContent=(
            <SearchBar 
                placeholderTextColor = '#718096'
                placeholder="Search by scheduled items or dates"
                changeText = {this.props.searchChangeText}
                inputText = {this.props.searchValue}
                closeSearch = {this.props.closeTransparent}
            />
        )

        return(
            <Drawer
                style={styles.container}
                drawerWidth={600}
                drawerContent={
                    <AppointmentCard 
                        scheduleDetails = {this.props.scheduleDetails}   
                        showScheduleButtons = {this.props.showScheduleButtons} 
                        scheduleButtons={this.props.scheduleButtons}
                        deleteFloatingAction = {this.props.deleteFloatingAction}
                        completeDeleteFloatingAction = {this.props.completeDeleteFloatingAction}
                        deleteAppointment = {this.props.deleteAppointment}
                        completeDeleteAppointment = {this.props.completeDeleteAppointment}
                        exitDelete = {this.props.exitDelete}
                        closeActionButtons = {this.props.closeActionButtons}
                    />
                }
                type={Drawer.types.Overlay}
                customStyles={{drawer: styles.drawer}}
                drawerPosition={Drawer.positions.Right}
                onDrawerOpen={() => {console.log('Drawer is opened');}}
                onDrawerClose={() => {console.log('Drawer is closed')}}
                ref = {(ref) => this.drawer = ref}
                >
               <ScrollView>
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
                                    calendarLayoutMeasure = {this.props.calendarLayoutMeasure}
                                    currentDate={this.props.currentDate} 
                                    prevMonthDate={this.props.prevMonthDate}
                                    nextMonthDate = {this.props.nextMonthDate}
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
                                    <ExtendedCalendar 
                                        {...this.props} 
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
                   
                   {scheduleContent}

                </ScrollView>
            </Drawer>
        )
    }
}

const styles=StyleSheet.create({
    drawer: {
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 10,
        paddingLeft: 49,
        paddingTop:32,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius:16,
        borderBottomLeftRadius:16,
      },
      mask: {
          backgroundColor:'#E5E5E5'
      }, 
      main: {
      }, // style of main board
    searchContent:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',
        padding:15,
    },
    topContainer:{
        marginLeft:'2%',
        marginRight:'2%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingBottom:20,
        marginTop: 18
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