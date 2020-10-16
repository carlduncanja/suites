import React, { useState } from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme} from 'emotion-theming';
import moment from 'moment';
import styled, {css} from '@emotion/native';
import AlertLeft from '../../../../assets/svg/alertsLeftArrow';
import AlertRight from '../../../../assets/svg/alertsRightArrow';
import OptionsField from '../../common/Input Fields/OptionsField';
import ListOptionsField from '../../common/Input Fields/ListOptionsField';
import { MenuOptions, MenuOption } from 'react-native-popup-menu';
import { value } from 'numeral';

const Controlsrapper = styled.View`
    width: 100%;
    height: 28px;
`;

const ControlsContainer = styled.View`
    height: 100%;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const ArrowContainer = styled.TouchableOpacity`
    height: 100%;
    width: 24px;
    border: ${ ({theme}) => theme.colors['--color-gray-400']};
    justify-content: center;
    align-items: center;
    border-radius: 4px;
`;

const DateContainer = styled.View`
    width: 210px;
    height: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const MonthContainer = styled.View`
    width: 105px;
`;

const YearContainer = styled.View`
    width: 84px;
`;

const OptionsContainer = styled.View`
    width: 105px;
`;

const TextItem = styled.Text(({theme, color = '--color-gray-800', font = '--text-base-regular'}) => ({
    ...theme.font[font],
    color: theme.colors[color],
    paddingTop: 2
}));

// const MONTHS = [
//     {
//         value: 1,
//         name: 'January',
//         text: 'Jan'
//     },
//     {
//         value: 2,
//         name: 'February',
//         text: 'Feb'
//     },
//     {
//         value: 3,
//         name: 'March',
//         text: 'Mar'
//     },
//     {
//         value: 4,
//         name: 'April',
//         text: 'April'
//     },
//     {
//         value: 5,
//         name: 'May',
//         text: 'May'
//     },
//     {
//         value: 6,
//         name: 'June',
//         text: 'June'
//     },
//     {
//         value: 7,
//         name: 'July',
//         text: 'July'
//     },
//     {
//         value: 8,
//         name: 'August',
//         text: 'Aug'
//     },
//     {
//         value: 9,
//         name: 'September',
//         text: 'Sep'
//     },
//     {
//         value: 10,
//         name: 'October',
//         text: 'Oct'
//     },
//     {
//         value: 11,
//         name: 'November',
//         text: 'Nov'
//     },
//     {
//         value: 12,
//         name: 'December',
//         text: 'Dec'
//     },
// ];

// const STARTYEARS = [
//     {
//         value: 2020,
//         text: '2020'
//     },
//     {
//         value: 2021,
//         text: '2021'
//     },
//     {
//         value: 2022,
//         text: '2022'
//     },
//     {
//         value: 2023,
//         text: '2023'
//     },
//     {
//         value: 2024,
//         text: '2024'
//     },
//     {
//         value: 2025,
//         text: '2025'
//     },
//     {
//         value: 2026,
//         text: '2026'
//     },
//     {
//         value: 2027,
//         text: '2027'
//     },
//     {
//         value: 2028,
//         text: '2028'
//     },
//     {
//         value: 2029,
//         text: '2029'
//     },
//     {
//         value: 2030,
//         text: '2030'
//     },
//     {
//         value: 2031,
//         text: '2031'
//     },
//     {
//         value: 2032,
//         text: '2032'
//     },
//     {
//         value: 2033,
//         text: '2033'
//     },
//     {
//         value: 2034,
//         text: '2034'
//     },
//     {
//         value: 2035,
//         text: '2035'
//     },
// ];

function Controls({ onMonthPress, onYearPress, selectedMonth, selectedYear, years, months, onMonthIncrement, onMonthDecrement}) {
    const theme = useTheme();

    // const [years, setYears] = useState(STARTYEARS);
    // const [selectedMonth, setSelectedMonth] = useState(MONTHS[0]);
    // const [selectedYear, setSelectedYear] = useState(years[0]);

    // const onMonthPress = value => {
    //     console.log("Month: ", value);
    //     setSelectedMonth(value);
    // };

    // const onYearPress = value => {
    //     setSelectedYear(value);
    // };

    const fetchMoreYears = () => {

    };

    return (
        <Controlsrapper>
            <ControlsContainer>

                <ArrowContainer
                    theme={theme}
                    style={css`padding-right: 2px;`}
                    onPress={() => { onMonthDecrement(); }}
                >
                    <AlertLeft/>
                </ArrowContainer>

                <DateContainer>

                    <MonthContainer theme={theme}>
                        <ListOptionsField
                            data={months}
                            text={selectedMonth.name}
                            onOptionSelected={onMonthPress}
                            selectedOption={selectedMonth}
                        />
                    </MonthContainer>

                    <YearContainer>
                        <ListOptionsField
                            data={years}
                            text={selectedYear.text}
                            onOptionSelected={onYearPress}
                            selectedOption={selectedYear}
                            isInfiniteScroll={true}
                            fetchMoreData={fetchMoreYears}
                        />
                    </YearContainer>

                </DateContainer>

                <ArrowContainer
                    theme={theme}
                    style={css`padding-left: 2px;`}
                    onPress={() => { onMonthIncrement(); }}
                >
                    <AlertRight/>
                </ArrowContainer>

            </ControlsContainer>
        </Controlsrapper>
    );
}

const styles = {
    optionsContainer: {
        width: 105,
        backgroundColor:"white",
    }
};

Controls.propTypes = {};
Controls.defaultProps = {};

export default Controls;
