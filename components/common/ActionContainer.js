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
            <View style={[styles.container]}>
                <View style={styles.actionTitleContainer}> 
                    <Text style={styles.title}>{this.props.actionTitle.toUpperCase()}</Text>
                </View>
               <View style={styles.actionButtonsContainer}>
                   {this.props.content}
               </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF', 
        width: 218, 
        height: 70, 
        borderRadius:8, 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,    
        elevation: 5,
        paddingLeft: 10,
        paddingRight:10,
        paddingBottom:8,
    }, 
    actionTitleContainer:{
        marginTop: 8,
        alignSelf:'flex-start',
    },
    title:{
        fontSize: 10,
        color:'#A0AEC0',
        //fontFamily: 'Metropolis',
    },
    actionButtonsContainer:{
        flex:1,
        justifyContent:'space-between',
        //marginTop:12,
        flexDirection:'column',
    }
})