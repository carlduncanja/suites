import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DayIdentifier from '../common/DayIdentifier';
import moment from 'moment';

export default class CalendarDay extends Component {
    render() {
        return (
            <View style={[styles.container, {width: this.props.screenDimensions.width > this.props.screenDimensions.height ? 98: 93 }]} key={this.props.unique}>
                {parseInt(this.props.highlightDay) === parseInt(this.props.day) && this.props.currentDate.format("M") === moment(new Date()).format("M")?
                    <View>
                        <TouchableOpacity onPress={e => this.props.onPressDay(e,this.props.day)}>
                            <View style={{marginTop:3}}>
                                <DayIdentifier color = "#A0AEC0"/>
                            </View>
                            <Text style={[styles.day, {color:'#2D3748', marginTop: 12}]}>{this.props.day}</Text>
                        </TouchableOpacity>
                    </View>

                    :

                    parseInt(this.props.highlightDay) + 1 === parseInt(this.props.day) && this.props.currentDate.format("M") === moment(new Date()).format("M") ?
                        <View style={{flex:1}}>
                            <TouchableOpacity onPress={e => this.props.onPressDay(e,this.props.day)} style={{ marginBottom:10}}>
                                <View style={{ marginTop: 3}}>
                                    <DayIdentifier color = "#3FC7F4"/>
                                </View>
                                <Text style={[styles.day, {color:'#2D3748', marginTop: 12}]}>{this.props.day}</Text>
                            </TouchableOpacity>
                            <View style={{flexDirection:'row', flex:1, marginLeft:11, marginRight:22, flexWrap:'wrap'}}>
                                {this.props.tomorrowView.map((tomorrow)=> tomorrow)}
                            </View>
                        </View>

                        :

                        parseInt(this.props.highlightDay) + 2 === parseInt(this.props.day) && this.props.currentDate.format("M") === moment(new Date()).format("M") ?
                            <View style={{flex:1}}>
                                <TouchableOpacity onPress={e => this.props.onPressDay(e,this.props.day)} style={{ alignItems:'flex-start', marginBottom:10}}>
                                    <Text style={[styles.day, {color:'#2D3748'}]}>{this.props.day}</Text>
                                </TouchableOpacity>
                                <View style={{flexDirection:'row', flex:1, marginBottom: 15, marginLeft:11, marginRight:22, flexWrap:'wrap'}}>
                                    {this.props.nextView.map((next)=> next)}
                                </View>
                            </View>

                            :

                            parseInt(this.props.highlightDay) + 3 === parseInt(this.props.day) && this.props.currentDate.format("M") === moment(new Date()).format("M") ?
                                <View style={{flex:1}}>
                                    <TouchableOpacity onPress={e => this.props.onPressDay(e,this.props.day)} style={{ alignItems:'flex-start', marginBottom:10}}>
                                        <Text style={[styles.day, {color:'#2D3748'}]}>{this.props.day}</Text>
                                    </TouchableOpacity>
                                    <View style={{flexDirection:'row', flex:1, marginBottom: 15, marginLeft:11, marginRight:22, flexWrap:'wrap'}}>
                                        {this.props.lastView.map((last)=> last)}
                                    </View>
                                </View>

                                :

                                this.props.day === this.props.selected.selected && this.props.currentDate.format("M") === moment(new Date()).format("M")?
                                    <TouchableOpacity onPress={e => this.props.onPressDay(e,this.props.day)}>
                                        <View style={styles.pressed}/>
                                        <Text style={[styles.day,{fontWeight:'bold',paddingTop:0}]}>{this.props.day}</Text>
                                    </TouchableOpacity>

                                :

                                    <TouchableOpacity onPress={e => this.props.onPressDay(e,this.props.day)}>
                                        <Text style={styles.day}>{this.props.day}</Text>
                                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        //flex:1,
        height:98,
        //width: 80,
        backgroundColor:'#FFFFFF',
        borderTopWidth:0.5,
        borderRightWidth:0.5,
        borderColor:'#EDF2F7',
    },
    day:{
        fontSize:24,
        marginTop:19,
        paddingLeft:18,
        color:'#718096',
    },
    pressed:{
        height: 4,
        backgroundColor: '#3FC7F4',
        borderRadius: 8,
        width:'90%',
        alignSelf:'center',
        marginTop:3,
    }
})
