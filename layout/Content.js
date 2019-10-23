import React, { Component } from 'react'
import {View, Text} from 'react-native';

export default class Content extends Component {
    render() {
        console.log("Props", this.props.children);
        return (
            <View>
                <Text>{this.props.name}</Text>
            </View>
        )
    }
}
