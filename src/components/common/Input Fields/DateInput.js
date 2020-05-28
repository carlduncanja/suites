import React,{ useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

const DateInput = () => {

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [display, setDisplay] = useState('default');

    const showDatepicker = () => {
        showMode('date');
        setDisplay('default');
      };

      const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
    
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };

    return (
        <View>
            <View>
                <Button
                    testID="datePickerButton"
                    onPress={showDatepicker}
                    title="Show date picker default!"
                  />
            </View>

            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                onChange={onChange}
                //   style={styles.windowsPicker}
                //   firstDayOfWeek={firstDayOfWeek}
                //   maxDate={maxDate}
                //   minDate={minDate}
                //   dateFormat={dateFormat}
                //   dayOfWeekFormat={dayOfWeekFormat}
                  placeholderText="select date"
                /> 
        </View>
    )
}

export default DateInput

const styles = StyleSheet.create({

})