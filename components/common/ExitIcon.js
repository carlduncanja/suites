import React,{Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import SvgIcon from '../../assets/SvgIcon';

export default class ExitIcon extends Component{
    render(){
        return(
            <TouchableOpacity>
                <SvgIcon iconName = "searchExit" strokeColor = "#718096"/>
            </TouchableOpacity>
        )
    }
}