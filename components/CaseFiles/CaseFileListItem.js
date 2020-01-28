import React,{Component} from 'react';
import {View, Text} from 'react-native';
import ListItem from '../common/List/ListItem'
import ListName from '../common/List/ListName';

export default class CaseFileListItem extends Component{
    render(){
        //console.log("Props: ", this.props)
        const name = <ListName name = {this.props.caseDetails.patientName} id={this.props.caseDetails.patientId}/>
        return(
            <ListItem 
                name = {name}
                caseDetails = {this.props.caseDetails}
            />
        )
    }
}