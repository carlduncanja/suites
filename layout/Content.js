import React, { Component } from 'react'
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
import moment from 'moment';
import Schedule from '../Schedule/Schedule';
import CaseFiles from '../CaseFiles/CaseFiles';
import Calendar from '../Calendar/Calendar';
import RowCalendar from '../Calendar/RowCalendar';
import SlideUpPanel from '../components/SideUpPanel';

export default class Content extends Component {
    constructor(props){
        super(props);
        this.state={
        }
    }

    render() {
        return (
            <View style = {styles.content}>
                {this.props.name === 'SCHEDULE' ? 
                    <Schedule {...this.props} />
                    :
                    this.props.name === 'CASE FILES' ?
                        <CaseFiles {...this.props}/>
                        :
                        this.props.name === 'PATIENTS' ?
                            <Calendar {...this.props}/>
                            :
                            this.props.name === 'INVENTORY' ?
                                <SlideUpPanel/>
                                :
                                this.props.name === 'DELIVERY' ?
                                    <Text>DELIVERY</Text>
                                    :
                                    this.props.name === 'EQUIPMENTS' ?
                                        <Text>DELIVERY</Text>
                                        :
                                        this.props.name === 'ALERTS' ?
                                            <Text>ALERTS</Text>
                                            :
                                            <Text>HOME</Text>
                } 
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content:{
        flex:3,
    }
})