import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ListHeader from '../common/ListHeader';

export default class List extends Component{
    render(){
        return(
            <View>
                <View style={styles.header}>
                    <ListHeader listHeaders = {this.props.listHeaders}/>
                </View>
                <View style={styles.data}>
                    {this.props.data}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header:{
        marginBottom:25,
    },
    data:{
        //flex:1
    }
})