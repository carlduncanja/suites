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
 * @returns {*}
 * @constructor
 */
const RowCalendarDay = ({day, isSelected, hasAppointment, onDayPress}) => {

    // const generateView = (opacity, color, color2, marginTop, fontWeight) => {
    //     return <View style={{alignItems: 'center', opacity: opacity}}>
    //         <Text style={[styles.day, {color: color, marginTop: marginTop}]}>{props.day.format("D")}</Text>
    //         <Text style={{color: color2, fontWeight: fontWeight}}>{props.weekday.toUpperCase()}</Text>
    //         {
    //             props.filterStatus &&
    //             <View
    //                 style={{
    //                     height: 2,
    //                     alignSelf: 'center',
    //                     width: '100%',
    //                     backgroundColor: '#CBD5E0',
    //                     borderRadius: 2,
    //                     marginTop: 10
    //                 }}
    //             />
    //         }
    //         {
    //             <View style={{
    //                 height: 2,
    //                 alignSelf: 'center',
    //                 width: '100%',
    //                 backgroundColor: '#CBD5E0',
    //                 borderRadius: 2,
    //                 marginTop: 10
    //             }}/>
    //         }
    //     </View>
    // };

    const color1 = '#2D3748';
    const color2 = '#718096';
    const color3 = '#CBD5E0';

    const opacity = 1;
    const color = color1;
    const marginTop = 13;
    const fontWeight = 'bold';

    return (
        <View style={[styles.dayWrapper, isSelected ? styles.daySelected : {} ]}>
            <TouchableOpacity style={{width: "100%",}} onPress={e => onDayPress}>
                <View style={{alignItems: 'center', opacity: opacity}}>

                    {
                        isSelected &&
                        <DayIdentifier color="#3FC7F4"/>
                    }

                    <Text style={[styles.day, {color: color, marginTop: marginTop}]}>{moment(day).format("D")}</Text>
                    <Text style={{color: color2, fontWeight: fontWeight}}>{moment(day).format("ddd").toUpperCase()}</Text>
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
        </View>
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
    },
    dayWrapper: {
        alignItems: 'center',
        paddingBottom: 20,
        paddingTop: 3,
        borderColor: '#EDF2F7',
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
    },
    daySelected: {
        shadowColor: "#000",
        shadowOffset: {
            width: 3.5,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    weekday: {
        color: '#CBD5E0'
    }
});
