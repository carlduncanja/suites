import React, { Component } from 'react';
import {View, Text, FlatList} from 'react-native';
import ScheduleCard from './ScheduleCard';

export default class ScheduleList extends Component {
    render() {
        state={
        }
        return (           
            <FlatList 
                key={this.props.key}
                data={this.props.appointments}
                renderItem={({ item }) => <ScheduleCard appointment={item}/>}
                keyExtractor={item => item.id}
            />
        )
    }
}
