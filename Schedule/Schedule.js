import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import RowCalendar from '../Calendar/RowCalendar';
import ScheduleListView from './ScheduleListView';
import Month from '../Calendar/Month';
import Button from '../components/Button';
import PopoverClass from '../components/Popover';



export default class Schedule extends Component {
    render() {
        // console.log("Visible:", this.props.visibleSearchPopover);
        const content = 
            <View>
                <TouchableOpacity onPress={this.props.searchClosePopover}>
                    <Text style={{padding:20}}>Hello</Text>
                </TouchableOpacity>
            </View>
        return (
           <ScrollView>
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
               {/* {this.props.visibleSearchPopover === true ? 
                <PopoverClass {...this.props} content={content}/>
                :
                null
               } */}
            
               <Modal
               transparent={false}
               onRequestClose={()=>this.props.searchClosePopover}
               visible={this.props.visibleSearchPopover}
               >
                   {content}
               </Modal>     

               <ScheduleListView currentDate={this.props.currentDate}/>
           </ScrollView>
        )
    }
}

const styles=StyleSheet.create({
    topContainer:{
        
    },
    buttonContainer:{

    },
    partition:{

    }
})