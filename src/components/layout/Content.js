import React, { Component } from 'react'
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
import Schedule from '../../page/Schedule';
import CaseFiles from '../../page/CaseFiles';

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
                this.props.name === 'THEATRES' ?
                    <Text>THEATRES</Text>
                :
                this.props.name === 'INVENTORY' ?
                    <Text>INVENTORY</Text>
                :
                this.props.name === 'EQUIPMENT' ?
                    <Text>EQUIPMENT</Text>
                :
                this.props.name === 'ORDERS' ?
                    <Text>ORDERS</Text>
                :
                this.props.name === 'SUPPLIERS' ?
                    <Text>SUPPLIERS</Text>
                :
                this.props.name === 'INVOICES' ?
                    <Text>INVOICES</Text>
                :
                this.props.name === 'STORAGE' ?
                    <Text>STORAGE</Text>
                :
                this.props.name === 'PHYSICIANS' ?
                    <Text>PHYSICIANS</Text>
                :
                this.props.name === 'PROCEDURES' ?
                    <Text>PROCEDURES</Text>
                :
                this.props.name === 'ALERTS' ?
                    <Text>ALERTS</Text>
                :
                    null
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
