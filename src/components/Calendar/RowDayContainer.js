import React, {Component} from 'react';
import { formatDate } from '../../utils/formatter';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function RowDayContainer({day, isSelected, isInSelectMonth}){
    const theme = useTheme();

    const RowDayWrapper = styled.View`
        padding-top: ${ isSelected? '21px' : '25px'};
        padding-bottom : 12px;
        margin:0;
        width: 100%;
    `;
    
    const DayContainer = styled.View`
        align-items: center;
        justify-content: space-between;
    `;
    
    const NumberDay = styled.Text(
        isSelected ? {
            ...theme.font['--text-3xl-bold'],
            color: theme.colors['--color-gray-800'],
        }
        :
        {
            ...theme.font['--text-3xl-medium'],
            color: isInSelectMonth ?  theme.colors['--color-gray-600']:theme.colors['--color-gray-400'],
        }
    );

    const DayOfWeekTitle = styled.Text(
        isSelected ? {
            ...theme.font['--text-xs-bold'],
            color: theme.colors['--color-gray-600'],
        }
        :
        {
            ...theme.font['--text-xs-bold'],
            color: theme.colors['--color-gray-400'],
        }
    )
    return (
        <RowDayWrapper>
            <DayContainer>
                <NumberDay>{formatDate(day,"D")}</NumberDay>
                <DayOfWeekTitle>{formatDate(day,"ddd").toUpperCase()}</DayOfWeekTitle>
            </DayContainer>
        </RowDayWrapper>
    )
}

export default RowDayContainer