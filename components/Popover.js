import React, { Component } from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Popover from 'react-native-popover-view';

export default class PopoverClass extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    render() {
        return (
            <Popover
                isVisible={this.props.visibleSearchPopover}
                onRequestClose={()=>this.props.searchClosePopover}
            >
                <View>
                    {this.props.content}
                </View>
            </Popover>
        )
    }
}
