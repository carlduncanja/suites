import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import styled, {css} from '@emotion/native';
import NavigationTab from './NavigationTab';

const tabs=['schedule','case files','patients','theatres','inventory','delivery','equipment','alerts', 'more'];

export default class NavigationBar extends Component {
    handlePress=()=>{
        this.props.navigation.navigate('schedule')
    }
        
    render() {
        return (
            <View style={[styles.container,{marginTop:this.props.screenDimensions.width > this.props.screenDimensions.height ? 10:95}]}>
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
        width:'100%',
        height:'100%'
    },
})