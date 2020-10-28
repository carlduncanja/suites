import React from 'react';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

const MonthWrapper = styled.View`
    width: 191px;
    margin-right:30;
    margin-left:30;
`;

const MonthContainer = styled.View`
    align-items: center;
    display: flex;
`;
const Title = styled.Text(({theme}) => ({
    ...theme.font['--text-2xl-medium'],
    color: theme.colors['--company']
}));

function MonthTitleContainer({ month = "" }) {
    const theme = useTheme();

    return (
        <MonthWrapper>
            <MonthContainer>
                <Title theme={theme}>{month}</Title>
            </MonthContainer>
        </MonthWrapper>
    );
}

export default MonthTitleContainer;
