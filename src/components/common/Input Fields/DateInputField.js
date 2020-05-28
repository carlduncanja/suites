import React,{useState} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet, TouchableOpacity, Text} from "react-native";
import ClearIcon from "../../../../assets/svg/clearIcon";
import DatePicker from 'react-native-datepicker'
import { formatDate } from "../../../utils/formatter"
import moment from 'moment'

/**
 *
 * @param label
 * @param onChangeText
 * @param value
 * @param placeholder
 * @param keyboardType
 * @param onClear
 * @returns {*}
 * @constructor
 */

function DateInputField({label, mode, onChangeText, placeholder}) {

    const [date, setDate] = useState(formatDate(new Date(), "DD/MM/YYYY"));
    // const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => { 
        console.log("Event: ",event)
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };
    
    return (
        <View style={styles.container}>
            <Text style={[
                styles.textLabel, {
                    marginRight: label ? 20 : 0
                }
            ]}>{label}</Text>

            {/* <View style={[styles.inputWrapper]}>
                <TouchableOpacity style={styles.inputField} onPress={()=>setShow(true)}>
                    <Text>{date}</Text>
                </TouchableOpacity>
            </View> */}
            {
                // show &&
                // <View style={styles.inputWrapper}>
                    <DatePicker
                        style={{width: 200, alignItems:'center'}}
                        date={moment().format("hh:mm")}
                        mode={mode}
                        placeholder={placeholder}
                        format="YYYY-MM-DD"
                        minDate={formatDate(new Date(),"YYYY-MM-DD")}
                        maxDate="2025-06-01"
                        confirmBtnText="Done"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateInput: {
                                // flex:1,
                                height:32,
                                alignItems:'flex-start',
                                // width:20,
                                // padding:0,
                                borderWidth:0,
                                // marginLeft: 36,
                                backgroundColor:"yellow"
                            }
                        // ... You can check the source to find the other keys.
                        }}
                        showIcon = {false}
                        onDateChange={(date) => {onChangeText(date); onChange}}
                        hideText={false}
                    />
                // </View>
            }

        </View>
    );
}

DateInputField.propTypes = {};
DateInputField.defaultProps = {};

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
    },
    inputField: {
        flex: 1,
        padding: 10,
        paddingTop: 2,
        paddingBottom: 2,
    },
    clearIcon: {
        position: 'absolute',
        right: 0,
        margin: 5
    }
});

export default DateInputField;
