import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Animated} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export default class ScheduleFloatingActionButtons extends Component{
    constructor(props){
        super(props);
        this.state = {
            timePassed: false,
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity 
                    onLongPress = {this.props.completeFloatingAction}    
                    style = {[styles.buttonContainer, {marginBottom: 5}]}>
                    {this.props.buttonSvg}
                    <View style={styles.buttonTextContainer}>
                        {this.props.completeDeleteAppointment === true ?
                            <View style={{flexDirection:"row" }}>
                                <TouchableOpacity 
                                    style={[styles.button, styles. buttonDelete]}
                                    onPress = {this.props.exitDelete}
                                >
                                    <Svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M0.5 0.5L9.5 9.5" stroke="#0CB0E7" stroke-linecap="round" stroke-linejoin="round"/>
                                        <Path d="M9.5 0.5L0.5 9.5" stroke="#0CB0E7" stroke-linecap="round" stroke-linejoin="round"/>
                                    </Svg>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.button, styles.buttonDelete]}>
                                    <Svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M1 7L4 10L12 1" stroke="#0CB0E7" stroke-linecap="round" stroke-linejoin="round"/>
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                            :
                            <Text style={styles.buttonText}>{this.props.buttonText}</Text>
                        }
                    </View>
                </TouchableOpacity>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginTop:6,
    }, 
    buttonContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
    },
    buttonTextContainer:{
        marginLeft:15,
        borderRadius: 4,
        padding:4
    },
    buttonText:{
        fontSize:16,
        color:'#2D3748'
    },
    buttonDelete:{
        backgroundColor:'#FFFFFF',
        borderColor:'#E2E8F0',
        borderWidth: 1,
        width:20,
        height:20,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginRight:14
    }
})