import React, { Component } from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import DayIdentifier from '../common/DayIdentifier';
import moment from 'moment';
import { parse } from 'qs';

export default RowCalendarDays = (props) => {

    opacity = 0.2;
    color= "inherit";
    marginTop = 0;
    fontWeight = "bold";
    
        return (
            <View style={[styles.container]} >

                <TouchableOpacity style={{width:"100%",}} onPress={e => props.onPressDay(e,props.day)} >
                <View style={{alignItems:'center', opacity:0.2}}>
                            
                            <Text style={[styles.day, {color:"#3FC7F4", marginTop:13}]}>{props.day.format("D")}</Text>
                            <Text style={{color: "#3FC7F4", fontWeight:"bold"}}>{props.weekday.toUpperCase()}</Text>
                            {props.filterStatus === true &&
                                    <View style={{height:2, alignSelf:'center', width: '100%', backgroundColor:'#CBD5E0', borderRadius:2, marginTop:10}}/>
                                    
                      
                                }
                            {
                                 <View style={{height:2, alignSelf:'center', width: '100%', backgroundColor:'#CBD5E0', borderRadius:2, marginTop:10}}/>
                            }
                        </View>
                
                    {props.selected.selected.format("YYYY MM D") === props.day.format("YYYY MM D") ?
                        // <View style={{alignItems:'center'}}>
                        //     {/* <DayIdentifier color="#3FC7F4"/> */}
                        //     <Text style={[styles.day, {color:'#2D3748', marginTop:13}]}>{props.day.format("D")}</Text>
                        //     <Text style={{color:"#718096", fontWeight:'bold'}}>{props.weekday.toUpperCase()}</Text>
                        // </View>
                        <Text>Hi</Text>
                        
                        :

                        // props.day.format("MM") !== props.currentDate.format("MM") ?
                        <Text>Hi</Text>

                            // <View style={{alignItems:'center', opacity:0.2}}>
                            //     {props.selected.selected.format("YYYY MM D") === props.day.format("YYYY MM D") &&
                            //         <DayIdentifier color="#3FC7F4"/>
                                   
                            //     }
                            //     <Text style={[styles.day, {color:'#2D3748', marginTop:13}]}>{props.day.format("D")}</Text>
                            //     <Text style={{color:"#718096"}}>{props.weekday.toUpperCase()}</Text>
                            //     {props.selected.selected.format("YYYY MM D") === props.day.format("YYYY MM D") ?
                            //         null
                            //         :
                            //         <View style={{height:2, alignSelf:'center', width: '100%', backgroundColor:'#CBD5E0', borderRadius:2, marginTop:10}}/>
                            //     }
                            // </View>

                            // :

                            // <View style = {{alignItems:'center'}}>
                            //     <Text style={styles.day}>{props.day.format("D")}</Text>
                            //     <Text style={{color:'#CBD5E0'}}>{props.weekday.toUpperCase()}</Text>
                            //     {props.filterStatus === true &&
                            //         <View style={{height:2, alignSelf:'center', width: '100%', backgroundColor:'#CBD5E0', borderRadius:2, marginTop:10}}/>
                                    
                      
                            //     }
                                
                            // </View>
                        
                    }

                </TouchableOpacity>                
            </View>
        )
}

const styles = StyleSheet.create({
    container:{
        //flex:1,
        //width:90,
        // paddingRight:'6.2%',
        // backgroundColor:'#FFFFFF',
        // borderTopWidth:0.5,
        // borderRightWidth:0.5,
        // borderBottomWidth:0.5,
        // borderColor:'#EDF2F7',
        // paddingTop:3,
        // paddingBottom:20,
    },
    day:{
        fontSize:28,
        alignSelf:'center',
        marginTop:17,
        color:'#718096',
    },
    weekday:{
        color:'#CBD5E0'
    }
})
