import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {useTheme} from 'emotion-theming';
import moment from 'moment';
import styled, {css} from '@emotion/native';
import { formatDate } from '../../../utils/formatter';

const DayContainer = styled.TouchableOpacity`
    height: 57px;
    width: 51.3px;
    border: ${ ({theme}) => `0.8px solid ${theme.colors['--color-gray-300']}`};
    border-left-width: 0;
    border-top-width: 0;
    padding-top: ${ ({theme}) => theme.space['--space-12']};
    padding-left: ${ ({theme}) => theme.space['--space-10']};
    background-color: ${ ({theme, backgroundColor}) => theme.colors[backgroundColor]};
`;

const Day = styled.Text(({theme, color, font}) => ({
    ...theme.font[font],
    color: theme.colors[color],
}));

const testData = [
    {
        weekday: 1,
        day: '26'
    },
    {
        weekday: 2,
        day: '27'
    },
    {
        weekday: 3,
        day: '28'
    },
    {
        weekday: 4,
        day: '29'
    },
    {
        weekday: 5,
        day: '30'
    },
    {
        weekday: 6,
        day: '31'
    },
    {
        weekday: 7,
        day: '1'
    },
    {
        weekday: 1,
        day: '2'
    },
    {
        weekday: 2,
        day: '3'
    },
    {
        weekday: 3,
        day: '4'
    },
    {
        weekday: 4,
        day: '5'
    },
    {
        weekday: 5,
        day: '6'
    },
    {
        weekday: 6,
        day: '7'
    },
    {
        weekday: 7,
        day: '8'
    },
    {
        weekday: 1,
        day: '9'
    },
    {
        weekday: 2,
        day: '10'
    },
    {
        weekday: 3,
        day: '11'
    },
    {
        weekday: 4,
        day: '12'
    },
    {
        weekday: 5,
        day: '13'
    },
    {
        weekday: 6,
        day: '14'
    },
    {
        weekday: 7,
        day: '15'
    },
    {
        weekday: 1,
        day: '16'
    },
    {
        weekday: 2,
        day: '17'
    },
    {
        weekday: 3,
        day: '18'
    },
    {
        weekday: 4,
        day: '19'
    },
    {
        weekday: 5,
        day: '20'
    },
    {
        weekday: 6,
        day: '21'
    },
    {
        weekday: 7,
        day: '22'
    },
    {
        weekday: 1,
        day: '23'
    },
    {
        weekday: 2,
        day: '24'
    },
    {
        weekday: 3,
        day: '25'
    },
    {
        weekday: 4,
        day: '26'
    },
    {
        weekday: 5,
        day: '27'
    },
    {
        weekday: 6,
        day: '28'
    },
    {
        weekday: 7,
        day: '29'
    },
    {
        weekday: 1,
        day: '30'
    },
    {
        weekday: 2,
        day: '31'
    },
    {
        weekday: 3,
        day: '1'
    },
    {
        weekday: 4,
        day: '2'
    },
    {
        weekday: 5,
        day: '3'
    },
    {
        weekday: 6,
        day: '4'
    },
    {
        weekday: 7,
        day: '5'
    },
];

function CalendarView({days=[...testData], onDayPress, month, selectedStartDay, selectedEndDay, selectedDays}) {

    const theme = useTheme();

    const getColor = day => {
        if (day === selectedStartDay || day === selectedEndDay || selectedDays.includes(day)) {
            return '--default-shade-white';
        }
        if (formatDate(day, 'M') === (month + 1).toString()) {
            return '--color-gray-600';
        }
        return '--color-gray-400';
        
    };

    const getBackgroundColor = day => {
        if (day === selectedStartDay || day === selectedEndDay) {
            return '--color-blue-500';
        }
        if (selectedDays.includes(day)) {
            return '--color-blue-300';
        }
        return '--default-shade-white';
    };

    return (
        <FlatList
            style={{}}
            data={days}
            renderItem={({item}) => (
                <DayContainer
                    theme={theme}
                    backgroundColor={getBackgroundColor(item)}
                    onPress={() => onDayPress(item)}
                >
                    {/* <Day>{formatDate(item.day, 'D') }</Day> */}
                    <Day
                        font="--text-xl-medium"
                        color={getColor(item)}
                    >
                        {formatDate(item, 'D') }
                    </Day>
                </DayContainer>
            )}
            //Setting the number of column
            numColumns={7}
            keyExtractor={(item, index) => index}
        />
    );
}

export default CalendarView;
