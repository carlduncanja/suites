import React, { useState, useEffect } from 'react';
import {Text} from 'react-native';
import {useTheme} from 'emotion-theming';
import styled, {css} from '@emotion/native';
import moment from 'moment';
import MultipleShadowsContainer from '../common/MultipleShadowContainer';
import Controls from './Calendar/Controls';
import CalendarView from './Calendar/CalendarView';
import { getDaysForMonth } from '../../utils';
import { set } from 'numeral';
import { formatDate } from '../../utils/formatter';
import { useCurrentDays } from '../../hooks/useScheduleService';
import _ from 'lodash';

const PickerWrapper = styled.View`
    width: 392px;
    height: 745px;
    position: relative;
    background-color: ${ ({theme}) => theme.colors['--default-shade-white']};
    padding: ${ ({theme}) => theme.space['--space-16']};
    border-radius: 8px;
`;
const PickerContainer = styled.View`
    flex:1;
    flex-direction: column;
`;

const CalendarContainer = styled.View`
    height: 417px;
    width: 100%;
`;

const Weekdays = styled.View`
    width: 100%;
    height: 16px;
    flex-direction: row;
    margin-top: ${ ({theme}) => theme.space['--space-32']};
    z-index: -1;
`;

const WeekDay = styled.View`
    width: 51.3px;
    height: 100%;
    align-items: center;
`;

const MonthView = styled.View`
    display: flex;
    width: 100%;
    margin-top: ${ ({theme}) => theme.space['--space-4']};
    border-right-width: 0;
    z-index: -1;
    border: ${ ({theme}) => `0.8px solid ${theme.colors['--color-gray-300']}`};
`;
/* border: ${ ({theme}) => `0.8px solid ${theme.colors['--color-gray-300']}`}; */


const ActionsContainer = styled.View`
    display: flex;
    margin-top: ${ ({theme}) => theme.space['--space-32']};
    height: 264px;
    justify-content: space-between;
`;

const Button = styled.TouchableOpacity`
    width: 100%;
    height: 40px;
    border: ${ ({theme, borderColor = '--color-gray-500', hasBorder = true}) => hasBorder ? `1px solid ${theme.colors[borderColor]}` : 'none'};

    background-color: ${ ({theme, backgroundColor = '--default-shade-white'}) => theme.colors[backgroundColor] };
    border-radius: 8px;
    align-items:center;
    justify-content: center;
`;

const TextItem = styled.Text(({theme, color = '--color-gray-600', font = '--text-base-medium'}) => ({
    ...theme.font[font],
    color: theme.colors[color],
    paddingTop: 2,
}));

const shadows = [
    {
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 15
    },
    {
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 0 },
        shadowOpacity: 0.05,
        shadowRadius: 6
    },
];

const WEEKDAYS = [
    {
        value: 1,
        weekday: 'MON'
    },
    {
        value: 2,
        weekday: 'TUE'
    },
    {
        value: 3,
        weekday: 'WED'
    },
    {
        value: 4,
        weekday: 'THU'
    },
    {
        value: 5,
        weekday: 'FRI'
    },
    {
        value: 6,
        weekday: 'SAT'
    },
    {
        value: 7,
        weekday: 'SUN'
    },
];

const MONTHS = [
    {
        value: 0,
        name: 'January',
        text: 'Jan'
    },
    {
        value: 1,
        name: 'February',
        text: 'Feb'
    },
    {
        value: 2,
        name: 'March',
        text: 'Mar'
    },
    {
        value: 3,
        name: 'April',
        text: 'April'
    },
    {
        value: 4,
        name: 'May',
        text: 'May'
    },
    {
        value: 5,
        name: 'June',
        text: 'June'
    },
    {
        value: 6,
        name: 'July',
        text: 'July'
    },
    {
        value: 7,
        name: 'August',
        text: 'Aug'
    },
    {
        value: 8,
        name: 'September',
        text: 'Sep'
    },
    {
        value: 9,
        name: 'October',
        text: 'Oct'
    },
    {
        value: 10,
        name: 'November',
        text: 'Nov'
    },
    {
        value: 11,
        name: 'December',
        text: 'Dec'
    },
];

const STARTYEARS = [
    {
        value: 2020,
        text: '2020'
    },
    {
        value: 2021,
        text: '2021'
    },
    {
        value: 2022,
        text: '2022'
    },
    {
        value: 2023,
        text: '2023'
    },
    {
        value: 2024,
        text: '2024'
    },
    {
        value: 2025,
        text: '2025'
    },
    {
        value: 2026,
        text: '2026'
    },
    {
        value: 2027,
        text: '2027'
    },
    {
        value: 2028,
        text: '2028'
    },
    {
        value: 2029,
        text: '2029'
    },
    {
        value: 2030,
        text: '2030'
    },
    {
        value: 2031,
        text: '2031'
    },
    {
        value: 2032,
        text: '2032'
    },
    {
        value: 2033,
        text: '2033'
    },
    {
        value: 2034,
        text: '2034'
    },
    {
        value: 2035,
        text: '2035'
    },
];

const BUTTONTYPES = [
    {
        name: 'Today',
        type: 'today'
    },
    {
        name: 'This Week',
        type: 'week'
    },
    {
        name: 'This Month',
        type: 'month'
    },
    {
        name: 'Custom',
        type: 'custom'
    },
];

function CustomDateRangePicker({ getDates, onSelectDates }) {
    const theme = useTheme();
    
    const [years, setYears] = useState(STARTYEARS);
    const [selectedMonth, setSelectedMonth] = useState(MONTHS[0]);
    const [selectedYear, setSelectedYear] = useState(years[0]);
    const [monthDays, setMonthDays] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedStartDay, setSelectedStartDay] = useState('');
    const [selectedEndtDay, setSelectedEndDay] = useState('');
    const [isCustom, setIsCustom] = useState(false);
    const [canApply, setCanApply] = useState(false);
    const [typeSelected, setTypeSelected] = useState();

    useEffect(() => {
        const monthNum = moment().format('M');
        const startOfMonth = moment().startOf('month');
        const days = getDaysForMonth(startOfMonth);
        const filterYear = years.filter(year => year.text === moment().format('YYYY'));
        setSelectedMonth(MONTHS[monthNum - 1]);
        setMonthDays([...days]);
        setSelectedYear(filterYear[0]);
    }, []);

    const onMonthPress = value => {
        setSelectedMonth(value);
        const startOfMonth = moment(moment().month(value.value)).startOf('month');
        const days = getDaysForMonth(startOfMonth);
        setMonthDays([...days]);
        // console.log("Days: ", days);
        // console.log(" Start Month: ", startOfMonth);
    };

    const onYearPress = value => {
        const month = moment().month(selectedMonth.value);
        const startOfMonth = moment(month).startOf('month');
        const year = moment(startOfMonth).year(value.value);
        const days = getDaysForMonth(year);
        setSelectedYear(value);
        setMonthDays([...days]);
    };

    const applyDates = () => {
        const start = selectedStartDay ? moment(selectedStartDay) : '';
        const end = selectedEndtDay ? moment(selectedEndtDay) : '';
        // console.log("Satrt: ", moment(selectedStartDay), moment(selectedEndtDay));
        getDates(start, end);
    };

    const getMonth = () => {
        const currentDate = moment();
        const monthNum = currentDate.month();
        const monthObj = MONTHS[monthNum];
        const currentYear = years.filter(year => year.text === currentDate.format('YYYY'))[0];
        const days = getDaysForMonth(currentDate);

        setSelectedMonth(monthObj);
        setMonthDays([...days]);
        setSelectedYear(currentYear);
    };

    const onDateActionPressed = action => {
        let start = '';
        let end = '';
        let type = '';
        let days = [];
        const currentMonth = moment().startOf('month');

        if (action === 'today') {
            type = 'today';
            start = new Date();
            end = new Date();
        } else if (action === 'month') {
            type = 'month';
            const date = new Date();
            start = new Date(date.getFullYear(), date.getMonth(), 1);
            end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            days = useCurrentDays(currentMonth.month() + 1, currentMonth.year());
        } else if (action === 'week') {
            type = 'week';
            const startCurrent = moment().startOf('week');
            const endCurrent = moment().endOf('week');
            const updateMonthDays = getDaysForMonth(moment());
            start = startCurrent;
            end = endCurrent;
            days = updateMonthDays.filter(item => moment(item).isSame(startCurrent) || moment(item).isSame(endCurrent) || moment(item).isBetween(startCurrent, endCurrent));
        }

        start = formatDate(start, 'YYYY-MM-DD');
        end = formatDate(end, 'YYYY-MM-DD');

        // console.log("Start month: ", start);

        if (selectedMonth.value !== currentMonth.month()) {
            getMonth();
        }

        setSelectedStartDay(start);
        setSelectedEndDay(end);
        setSelectedDays(days);

        setTypeSelected(type);
        setCanApply(true);
        // onSelectDates();
        // getDates(start, end);
    };

    const onMonthDecrement = () => {
        if ((selectedYear.value !== 2020) || (selectedMonth.value !== 0)) {
            let newYear = selectedYear;
            const newMonth = moment(moment().month(selectedMonth.value)).subtract(1, 'month');
            const days = getDaysForMonth(newMonth);
            const newMonthObj = selectedMonth.value === 0 ? 11 : selectedMonth.value - 1;
            const currentYear = newMonth.format('YYYY');
            if (currentYear !== selectedYear.text) {
                const filterYear = years.filter(item => item.text === currentYear);
                newYear = filterYear[0] || selectedYear;
            }
            setSelectedMonth(MONTHS[newMonthObj]);
            setMonthDays([...days]);
            setSelectedYear(newYear);
        }
    };

    const onMonthIncrement = () => {
        let newYear = selectedYear;
        const newMonth = moment(moment().month(selectedMonth.value)).add(1, 'month');
        const days = getDaysForMonth(newMonth);
        const newMonthObj = selectedMonth.value === 11 ? 0 : selectedMonth.value + 1;
        const currentYear = newMonth.format('YYYY');
        if (currentYear !== selectedYear.text) {
            const filterYear = years.filter(item => item.text === currentYear);
            newYear = filterYear[0] || selectedYear;
        }
        setSelectedMonth(MONTHS[newMonthObj]);
        setMonthDays([...days]);
        setSelectedYear(newYear);
    };

    const getSelectedDays = (start, end) => {
        const startIndex = monthDays.indexOf(start);
        const endIndex = monthDays.indexOf(end);
        const slicedDays = monthDays.slice(startIndex, endIndex + 1);
        return slicedDays;
    };

    const onDayPress = day => {
        if (selectedDays.length >= 2) {
            let newSelectedDays = selectedDays;
            if (moment(day).isBefore(moment(selectedStartDay))) {
                setSelectedStartDay(day);
                newSelectedDays = getSelectedDays(day, selectedEndtDay);
            } else if (moment(day).isBefore(moment(selectedEndtDay)) && day !== selectedStartDay && moment(day).isAfter(moment(selectedStartDay))) {
                setSelectedStartDay(day);
                newSelectedDays = getSelectedDays(day, selectedEndtDay);
            } else if (moment(day).isAfter(moment(selectedEndtDay))) {
                // setSelectedStartDay(selectedEndtDay);
                setSelectedEndDay(day);
                newSelectedDays = getSelectedDays(selectedStartDay, day);
            }

            setSelectedDays([...newSelectedDays]);
        }
        if (selectedDays.length === 0) {
            if (selectedStartDay) {
                let days = [];
                if (moment(selectedStartDay).isBefore(moment(day))) {
                    setSelectedEndDay(day);
                    days = getSelectedDays(selectedStartDay, day);
                } else {
                    setSelectedEndDay(selectedStartDay);
                    setSelectedStartDay(day);
                    days = getSelectedDays(day, selectedStartDay);
                }

                setSelectedDays([...days]);
            } else {
                setSelectedStartDay(day);
                setSelectedDays([day]);
            }
        } else if (moment(selectedStartDay).isBefore(moment(day)) && selectedDays.length === 1) {
            setSelectedEndDay(day);
            const slicedDays = getSelectedDays(selectedStartDay, day);
            setSelectedDays([...slicedDays]);
        }

        setIsCustom(true);
        setCanApply(true);
        setTypeSelected('custom');
    };

    return (
        <MultipleShadowsContainer shadows={shadows}>
            <PickerWrapper theme={theme}>
                <PickerContainer theme={theme}>

                    <CalendarContainer>
                        <Controls
                            onMonthPress={onMonthPress}
                            onYearPress={onYearPress}
                            selectedMonth={selectedMonth}
                            selectedYear={selectedYear}
                            months={MONTHS}
                            years={years}
                            onMonthDecrement={onMonthDecrement}
                            onMonthIncrement={onMonthIncrement}
                        />

                        <Weekdays theme={theme}>
                            {
                                WEEKDAYS.map((item, index) => (
                                    <WeekDay key={index}>
                                        <TextItem
                                            color="--color-gray-500"
                                            font="--calendar-weekday"
                                        >
                                            {item.weekday}
                                        </TextItem>
                                    </WeekDay>
                                ))
                            }
                        </Weekdays>

                        <MonthView theme={theme}>
                            <CalendarView
                                days={[...monthDays]}
                                onDayPress={onDayPress}
                                month={selectedMonth.value}
                                selectedStartDay={selectedStartDay}
                                selectedEndDay={selectedEndtDay}
                                selectedDays={selectedDays}
                                isCustom={isCustom}
                            />
                        </MonthView>
                    
                    </CalendarContainer>

                    <ActionsContainer theme={theme}>

                        {
                            BUTTONTYPES.map((button, index) => {
                                const isSelected = typeSelected === button.type;
                                return (
                                    <Button
                                        key={index}
                                        onPress={() => onDateActionPressed(button.type)}
                                        disabled={button.type === 'custom'}
                                        backgroundColor={isSelected ? '--color-blue-100' : '--default-shade-white'}
                                        borderColor={isSelected ? '--color-blue-400' : '--color-gray-500'}
                                    >
                                        <TextItem
                                            color={isSelected ? '--color-blue-600' : '--color-gray-600'}
                                        >
                                            {button.name}
                                        </TextItem>
                                    </Button>
                                );
                            })
                        }

                        {/* <Button
                            onPress={() => { onDateActionPressed('today'); }}
                        >
                            <TextItem>Today</TextItem>
                        </Button>

                        <Button
                            onPress={() => { onDateActionPressed('week'); }}
                        >
                            <TextItem>Last Week</TextItem>

                        </Button>

                        <Button
                            onPress={() => { onDateActionPressed('month'); }}
                        >
                            <TextItem>This Month</TextItem>
                        </Button>

                        <Button
                            onPress={() => {}}
                            backgroundColor={isCustom ? '--color-blue-100' : '--default-shade-white'}
                            borderColor={isCustom ? '--color-blue-400' : '--color-gray-500'}
                        >
                            <TextItem
                                color={isCustom ? '--color-blue-600' : '--color-gray-600'}
                            >
                                Custom
                            </TextItem>
                        </Button> */}

                        <Button
                            disabled={!canApply}
                            backgroundColor={canApply ? '--color-blue-400' : '--default-shade-white'}
                            hasBorder={!canApply}
                            onPress={() => { applyDates(); }}
                        >
                            <TextItem
                                color={canApply ? '--default-shade-white' : '--color-gray-600'}
                            >
                                Apply
                            </TextItem>
                        </Button>

                    </ActionsContainer>
                  
                </PickerContainer>
            </PickerWrapper>
        </MultipleShadowsContainer>
        
    );
}

export default CustomDateRangePicker;
