import React,{Component} from 'react';
import {View, Text,TouchableOpacity} from 'react-native';

export default class TouchableMenuItem extends Component{
    render(){
        return(
            <TouchableOpacity>
                {this.props.menuIcon}
            </TouchableOpacity>
        )
    }
}