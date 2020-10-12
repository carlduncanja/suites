import React from 'react';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import Page from '../components/common/Page/Page';
import { View } from 'react-native';

const PageWrapper = styled.View`
    display : flex;
    height: 100%;
    flex-direction : column;
    margin-left : 0px;
    padding-left: ${({ theme }) => theme.space['--space-32']};
    padding-top: 28px;
    padding-right: 32px;
    padding-bottom: 28px;
    background-color : ${({ theme }) => theme.colors['--color-gray-100']};
`;
const PageContainer = styled.View`
    display: flex;
    height: 100%;
`;

function Alerts() {
    const theme = useTheme();

    return (
        <Page
            routeName="Alerts"
            hasSearch={false}
            hasList={false}
            pageContent={<View style={{backgroundColor: 'red', flex:1}}/>}
        />
    );
}

export default Alerts;
