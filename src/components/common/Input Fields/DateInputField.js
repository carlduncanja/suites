import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTheme} from 'emotion-theming';
import Styled from '@emotion/native';
import { format as formatDate, parse } from 'date-fns';

import ClearIcon from '../../../../assets/svg/clearIcon';
import InputLabelComponent from '../InputLablel';
import InputErrorComponent from '../InputErrorComponent';

const LabelContainer = Styled.View(({theme, label}) => ({
    minWidth: 70,
    marginRight: label ? 20 : 0
}));

/**
 *
 * @param label
 * @param onChangeText
 * @param value
 * @param placeholder
 * @param onClear
 * @returns {*}
 * @constructor
 */
function DateInputField({
    label,
    labelWidth,
    onDateChange,
    value,
    enabled = true,
    placeholder,
    onClear,
    hasError = false,
    errorMessage = '',
    minDate,
    mode,
    format,
    maxDate,
    borderColor = '--color-gray-300',
    hasBorder = true,
    minuteInterval = 5
}) {
    const theme = useTheme();

    const [date, setDate] = useState(() => {
        if (value) {
            try {
                // Attempt to parse the value using the provided format
                format = format.toLowerCase();
                const parsedDate = parse(value, format, new Date());
                return parsedDate;
            } catch (error) {
                console.error("Error parsing date:", error);
                return new Date(); // Fallback to current date
            }
        } else {
            return new Date();
        }
    });

    const handleOnDateChange = (dateString, dateObj) => {
        if (!onDateChange) {
            setDate(dateObj)
        } else {
        onDateChange(dateObj);
        }
    };

    return (
        <View style={styles.container}>
            {
                label &&
                <LabelContainer theme={theme} lable={!!label}>
                    <InputLabelComponent label={label} width={labelWidth}/>
                </LabelContainer>
            }

            <View
                style={{
                    flex: 1,
                    position: 'relative',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >

            <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={handleOnDateChange}
            />

                {
                    hasError &&
                    <View style={{position: 'absolute', top: 1}}>
                        <InputErrorComponent errorMessage={errorMessage}/>
                    </View>
                }

                {
                    !!value && enabled &&
                    <TouchableOpacity
                        style={styles.clearIcon}
                        onPress={onClear}
                    >
                        <ClearIcon/>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
}

DateInputField.propTypes = {};
DateInputField.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textLabel: {
        fontSize: 12,
        color: '#718096',
        fontWeight: '500',
    },
    inputWrapper: {
        flex: 1,
        height: 32,
        paddingLeft: 10,
        alignItems: 'flex-start',
    },
    clearIcon: {
        position: 'absolute',
        right: 0,
        margin: 9
    },
    errorView: {
        paddingTop: 3,
        paddingLeft: 15
    }
});

export default DateInputField;
