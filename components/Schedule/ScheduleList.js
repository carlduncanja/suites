import React, { Component } from 'react';
import {View, Text, FlatList} from 'react-native';
import ScheduleCard from './ScheduleCard';

export default class ScheduleList extends Component {
    render() {
        return (           
            <FlatList 
                key={this.props.key}
                data={this.props.appointments}
                renderItem={({ item }) => 
                    <ScheduleCard 
                        getDrawerRef = {this.props.getDrawerRef}
                        appointment={item} 
                        showScheduleDetails={this.props.showScheduleDetails}
                    />
                }
                keyExtractor={item => item.id}
            />
        )
    }
}
