import React,{Component} from 'react';
import {View, ProgressViewIOS, StyleSheet} from 'react-native';

export default class ProgressBar extends Component{
    render(){
        return(
            <ProgressViewIOS 
                progress={this.props.progressNumber} 
                progressTintColor="#0CB0E7" 
                trackTintColor="#E3E8EF"
                progressViewStyle={'bar'}
                style={{height:60}}
            /> 
        )
    }
}