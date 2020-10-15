import React, { useState } from 'react';
import {Text} from 'react-native';
import {useTheme} from 'emotion-theming';
import styled, {css} from '@emotion/native';
import moment from 'moment';
import MultipleShadowsContainer from '../common/MultipleShadowContainer';
import Controls from './Calendar/Controls';

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
    width: 366px;
`;

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

const TextItem = styled.Text(({theme, color='--color-gray-600', font='--text-base-medium'}) => ({
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

function CustomDateRangePicker({ getDates }) {
    const theme = useTheme();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const onDateActionPressed = action => {
        let start = '';
        let end = '';

        if (action === 'today') {
            start = new Date();
            end = new Date();
        } else if (action === 'month') {
            const date = new Date();
            start = new Date(date.getFullYear(), date.getMonth(), 1);
            end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            // start = moment().startOf('month');
            // end = moment().endOf('month');
        } else if (action === 'week') {
            const startCurrent = moment().startOf('week');
            const endCurrent = moment().endOf('week');
            start = moment(startCurrent).subtract(7, 'days');
            end = moment(endCurrent).subtract(7, 'days');
            console.log(" S Week: ", start, end);
        }
        
        setStartDate(start);
        setEndDate(end);
    };

    const applyDates = () => {
        getDates(startDate, endDate);
    };

    return (
        <MultipleShadowsContainer shadows={shadows}>
            <PickerWrapper theme={theme}>
                <PickerContainer theme={theme}>

                    <CalendarContainer>
                        <Controls/>

                    </CalendarContainer>

                    <ActionsContainer theme={theme}>

                        <Button
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
                        >
                            <TextItem>Custom</TextItem>
                        </Button>

                        <Button
                            backgroundColor="--color-blue-400"
                            hasBorder={false}
                            onPress={() => { applyDates(); }}
                        >
                            <TextItem color="--default-shade-white">
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
