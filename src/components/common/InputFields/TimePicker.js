import React,{ useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import TimePicker from 'react-native-24h-timepicker';

const TimePickerField = ({time, label, onConfirm, refValue}) =>{

    let timePicker = refValue
    const onTimeConfirm = (hour, minute) =>{
        onConfirm(hour,minute)
        timePicker.close()
    }

    return (
        <View style={styles.container}>

            <Text style={[
                styles.textLabel, {
                    marginRight: label ? 20 : 0
                }
            ]}>{label}</Text>

            <View style={[styles.inputWrapper]}>
                <TouchableOpacity style={styles.inputField} onPress={()=>timePicker.open()}>
                    <Text>{time}</Text>
                </TouchableOpacity>
            </View> 

            <TimePicker
                ref={ref => {timePicker = ref;}}
                onCancel={() => timePicker.close()}
                onConfirm={(hour, minute) => onTimeConfirm(hour, minute)}
            />

        </View>

    )
}

export default TimePickerField

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textLabel: {
        fontSize: 12,
        color: '#718096',
        fontWeight: '500',
    },
    inputWrapper: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 4,
        height: 32,
        justifyContent:"center"
    },
    inputField: {
        flex: 1,
        padding: 10,
        paddingTop: 2,
        paddingBottom: 2,
        justifyContent:'center'
    },
})