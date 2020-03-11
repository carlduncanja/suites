import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import DayIdentifier from '../common/DayIdentifier';
import moment from 'moment';
import {parse} from 'qs';

/**
 *
 * @param day : A date object
 * @param isSelected
 * @param hasAppointment
 * @param onDayPress
 * @param isInSelectMonth
 * @returns {*}
 * @constructor
 */
const RowCalendarDay = ({day, isSelected, hasAppointment, onDayPress, isInSelectMonth}) => {

    const defaultColor = '#718096';
    const selectedColor = '#323843';

    const opacity = isInSelectMonth ? 1 : 0.25;
    const color = isSelected ? selectedColor : defaultColor;
    const marginTop = 13;
    const fontWeight = isSelected ? 'bold' : 'normal';

    return (
        <TouchableOpacity style={[{width: "100%",}, isSelected ? styles.daySelected : {}]} onPress={onDayPress}>
            <View style={[styles.dayWrapper, {opacity}]}>
                {
                    isSelected &&
                    <DayIdentifier color="#3FC7F4"/>
                }

                <Text style={[styles.day, {color: color, marginTop: marginTop}]}>
                    {moment(day).format("D")}
                </Text>
                <Text style={{color: defaultColor, fontWeight: fontWeight}}>
                    {moment(day).format("ddd").toUpperCase()}
                </Text>

                {
                    hasAppointment &&
                    <View
                        style={{
                            height: 2,
                            alignSelf: 'center',
                            width: 24,
                            backgroundColor: '#CBD5E0',
                            borderRadius: 2,
                            marginTop: 10
                        }}
                    />
                }
            </View>
        </TouchableOpacity>
    )
};

export default RowCalendarDay

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
        shadowOpacity: 0,
    },
    dayWrapper: {
        alignItems: 'center',
        paddingBottom: 10,
        // paddingTop: 3,
        // borderColor: '#EDF2F7',
        // borderRightWidth: 0.5,
        // borderBottomWidth: 0.5,
        // borderTopWidth: 0.5,
    },
    daySelected: {
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 5.5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});
