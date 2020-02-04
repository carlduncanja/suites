import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native'

export default class PageTitle extends Component{
    render(){
        return(
            <View>
                <Text style={styles.pageTitle}>{this.props.pageTitle}</Text>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    pageTitle:{
        fontSize:24,
        color:'#104587',
    }
})