import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import styled from '@emotion/native';
import { useModal } from 'react-native-modalfy';
import { useTheme } from 'emotion-theming';

import moment from 'moment';
import OverlayDialog from '../../../components/common/Dialog/OverlayDialog';
import DateInputField from '../../../components/common/Input Fields/DateInputField';

import CalendarIcon from '../../../../assets/svg/calendar';
import InputField2 from '../../../components/common/Input Fields/InputField2';

function PrintSchedule({printOption}) {
    const modal = useModal();
    const theme = useTheme();

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [documentName, setDocumentName] = useState();

    useEffect(() => {
        let start;
        let end;
        let today = moment();
        if (printOption === 'Print Today') {
            start = today;
            end = today;
        } else if (printOption === 'Last Week') {
            start = moment().subtract(1, 'weeks').startOf('week');
            end = moment().subtract(1, 'weeks').endOf('week');
        } else if (printOption === 'This Month') {
            start = moment().startOf('month');
            end = moment().endOf('month');
        }
        console.log('Option, start, end: ', printOption, start, end);
        setStartDate(start);
        setEndDate(end);
    }, []);

    const onCloseModal = () => {
        modal.closeModals('OverlayInfoModal');
    };

    const onButtonPress = () => {};

    const onDocumentNameChange = value => {
        setDocumentName(value);
    };

    return (
        <View style={{minHeight: 230, width: 500}}>
            <OverlayDialog
                title="Print SchedulePage"
                onClose={onCloseModal}
                onPositiveButtonPress={onButtonPress}
                positiveText="PRINT"
            >
                <PrintContent theme={theme}>
                    <DatesContainer>
                        <Date>
                            <DateInputField
                                value={startDate}
                                onClear={() => setStartDate()}
                                keyboardType="number-pad"
                                mode="date"
                                format="DD/MM/YYYY"
                                placeholder="DD/MM/YYYY"
                                onDateChange={date => setStartDate(date)}
                                hasBorder={false}
                            />
                            <CalendarIcon/>
                        </Date>

                        <Date>
                            <DateInputField
                                value={endDate}
                                onClear={() => setEndDate()}
                                keyboardType="number-pad"
                                mode="date"
                                format="DD/MM/YYYY"
                                placeholder="DD/MM/YYYY"
                                onDateChange={date => setEndDate(date)}
                                hasBorder={false}
                                minDate={startDate}
                            />
                            <CalendarIcon/>
                        </Date>
                    </DatesContainer>

                    <NameContainer>
                        <InputField2
                            onChangeText={onDocumentNameChange}
                            value={documentName}
                            onClear={() => setDocumentName()}
                            hasBorder={false}
                            placeholder="SchedulePage"
                        />
                        <Extension>
                            .pdf
                        </Extension>
                    </NameContainer>

                </PrintContent>
            </OverlayDialog>
        </View>

    );
}

export default PrintSchedule;

const PrintContent = styled.View`
    display: flex;
    flex-direction: column;
    padding: ${({theme}) => theme.space['--space-24']};
    height: 142px;
`;

const DatesContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${({theme}) => theme.space['--space-16']};
`;

const Date = styled.View`
    min-width: 208px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: 8px;
    
    background: ${({theme}) => theme.colors['--color-white']};
    border: ${({theme}) => `1px solid ${theme.colors['--color-gray-300']}`};
    box-sizing: border-box;
    border-radius: 4px;
`;

const NameContainer = styled.View`
    display: flex;
    flex-direction: row;
    padding-right: ${({theme}) => theme.space['--space-12']};
    align-items: center;

    background: ${({theme}) => theme.colors['--color-white']};

    border: ${({theme}) => `1px solid ${theme.colors['--color-gray-300']}`};
    box-sizing: border-box;
    border-radius: 4px;

`;

const Extension = styled.Text`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: ${({theme}) => theme.colors['--color-gray-500']};
`;
