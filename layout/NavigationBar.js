import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import styled, {css} from '@emotion/native';
import NavigationTab from './NavigationTab';

const tabs=['schedule','case files','patients','inventory','delivery','equipments','alerts'];

export default class NavigationBar extends Component {
    handlePress=()=>{
        this.props.navigation.navigate('schedule')
    }
    
    render() {
        return (
            <View style={styles.container}>
                {tabs.map((tab,index)=>{
                    return (
                       <NavigationTab 
                            key={index} 
                            tabName = {tab}
                            {...this.props}
                        /> 
                                              
                    )                      
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,  
        flexDirection: 'column',
        alignItems:'center',
        justifyContent:'flex-start',
        marginTop:50,
        width:'100%',
    },
})