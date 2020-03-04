import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import DayIdentifier from '../common/DayIdentifier';
import moment from 'moment';
import { parse } from 'qs';

export default RowCalendarDays = (props) => {

    const generateView = (opacity, color, color2, marginTop, fontWeight) => {
        return <View style={{ alignItems: 'center', opacity: opacity }}>

            <Text style={[styles.day, { color: color, marginTop: marginTop }]}>{props.day.format("D")}</Text>
            <Text style={{ color: color2, fontWeight: fontWeight }}>{props.weekday.toUpperCase()}</Text>
            {props.filterStatus &&
                <View style={{ height: 2, alignSelf: 'center', width: '100%', backgroundColor: '#CBD5E0', borderRadius: 2, marginTop: 10 }} />

            }
            {
                <View style={{ height: 2, alignSelf: 'center', width: '100%', backgroundColor: '#CBD5E0', borderRadius: 2, marginTop: 10 }} />
            }
        </View>
    }

    return (
        <View style={[styles.container]} >

            <TouchableOpacity style={{ width: "100%", }} onPress={e => props.onPressDay(e, props.day)} >

                {props.selected.selected.format("YYYY MM D") === props.day.format("YYYY MM D") ?
                    generateView(1, '#718096', '#2D3748', 13, 'bold')

                    :

                    props.day.format("MM") !== props.currentDate.format("MM") ?
                        generateView(0.2, '#2D3748', '#718096', 13, 'normal')

                        :
                        generateView(1, '#CBD5E0', '#CBD5E0', 13, 'normal')



                }

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
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
    day: {
        fontSize: 28,
        alignSelf: 'center',
        marginTop: 17,
        color: '#718096',
    },
    weekday: {
        color: '#CBD5E0'
    }
})
