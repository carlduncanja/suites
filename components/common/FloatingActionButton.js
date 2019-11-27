import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Animated} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export default class FloatingActionButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            timePassed: false,
        }
    }
    render(){
        return(
            <View>
                {this.props.deleteAppointment === true ?

                <View style={[styles.container, {bottom:this.props.bottomSize}]}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        {this.props.completeDeleteAppointment === true ? 
                            <View style={{flexDirection:'row', justifyContent:"flex-end", marginRight:10}}>
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
                            <TouchableOpacity style={{alignItems:'center', backgroundColor:this.props.completeDeleteAppointment === false ? '#EDF2F7' : null, width:100, height:16, borderRadius:8}}> 
                                <Text style={{fontSize: 12}}>{this.props.buttonText}</Text> 
                            </TouchableOpacity>
                        }

                        <TouchableOpacity 
                            style={[styles.button, {backgroundColor:'#C53030'}]}
                            onPress = {this.props.floatingAction}
                            onLongPress = {this.props.completeFloatingAction}
                            >
                            {this.props.buttonSvg}
                        </TouchableOpacity> 
                    </View>
                </View> 
                :
                <TouchableOpacity 
                    onPress = {this.props.floatingAction} 
                    style = {[styles.button, {backgroundColor:'#718096',bottom:this.props.bottomSize, marginBottom: 5, position:'absolute',left:2 ,backgroundColor:'#718096', padding:'2%'}]}
                    >
                    {this.props.buttonSvg}
                </TouchableOpacity>

                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        width:130,
        justifyContent:'space-between',
        position:'absolute',
        right: 10,
        marginBottom:5
    }, 
    button:{
        borderRadius:32/2,
        width:32,
        height:32,
        alignItems:'center',
        justifyContent:'center',
    },
    buttonDelete:{
        backgroundColor:'#FFFFFF',
        borderColor:'#E2E8F0',
        borderWidth: 1,
        marginLeft:12
    }
})