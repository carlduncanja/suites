import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DayIdentifier from '../common/DayIdentifier';
import moment from 'moment';

export default class CalendarDay extends Component {
    render() {
        return (
            <View style={[
                styles.container,{
                    width: this.props.screenDimensions.width > this.props.screenDimensions.height ? 98: 93,
                    
                    }
                ]} >
                
                {this.props.day.format("YYYY MM D") === this.props.selected.selected.format("YYYY MM D")  ?
                    <View>
                        <TouchableOpacity onPress={e => this.props.onPressDay(e,this.props.day)}>
                            <View style={{marginTop:3, alignItems:'center'}}>
                                <DayIdentifier color = "#3FC7F4"/>
                            </View>
                            <Text style={[styles.day, {color:'#2D3748', fontWeight: 'bold', marginTop: 12}]}>{this.props.day.format("D")}</Text>
                        </TouchableOpacity>
                        <View style={styles.dayLevel}>
                            {this.props.dayLevels.map((day)=> day)}
                        </View>
                    </View>

                    :
                    this.props.day.format("MM") !== this.props.currentDate.format("MM") ?
                        <View style={{ opacity: 0.4 }}>
                            <TouchableOpacity onPress={e => this.props.onPressDay(e,this.props.day)}>
                                {this.props.day.format("YYYY MM D") === this.props.selected.selected.format("YYYY MM D") ?
                                    <View>
                                        <View style={{marginTop:3, alignItems:'center'}}>
                                            <DayIdentifier color = "#3FC7F4"/>
                                        </View>
                                        <Text style={[styles.day, {color:'#2D3748', fontWeight: 'bold', marginTop: 12}]}>{this.props.day.format("D")}</Text>
                                    </View>
                                    :
                                    <Text style={styles.day}>{this.props.day.format("D")}</Text>
                                }
                            </TouchableOpacity>
                            <View style={styles.dayLevel}>
                                {this.props.dayLevels.map((day)=> day)}
                            </View>
                        </View>

                    :

                    <View>
                        <TouchableOpacity onPress={e => this.props.onPressDay(e,this.props.day)}>
                            <Text style={styles.day}>{this.props.day.format("D")}</Text>
                        </TouchableOpacity>
                        <View style={styles.dayLevel}>
                            {this.props.dayLevels.map((day)=> day)}
                        </View>
                    </View>
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
    },
    dayLevel:{
        flexDirection:'row', 
        flex:1, 
        marginTop:5,
        marginLeft:11, 
        marginRight:18, 
        flexWrap:'wrap'
    }
})
