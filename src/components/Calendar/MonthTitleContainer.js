import React from 'react';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function MonthTitleContainer({ month = "" }) {

    const theme = useTheme();

    const MonthWrapper = styled.View`
        width: 191px;
        margin-right:30;
        margin-left:30;

    `;
    const MonthContainer = styled.View`
        align-items: center;
        display: flex;
    `;

    const Title = styled.Text({
        ...theme.font['--text-2xl-medium'],
        color: theme.colors['--company']
    })

    return (
        <MonthWrapper>
            <MonthContainer>
                <Title>{month}</Title>
            </MonthContainer>
        </MonthWrapper>
    )
}

export default MonthTitleContainer