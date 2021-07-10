import React from 'react';
import Logo from '../../../../assets/svg/logo';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

const ReportHeaderWrapper = styled.View`
    width : 100%;
    height : 148px;
    padding : ${ ({theme}) => theme.space['--space-32']};
    background-color : ${ ({theme}) => theme.colors['--company']};
`;
const ReportHeaderContainer = styled.View`
    height : 100%;
    width  :100%;
    flex-direction : row;
    align-items : center;
`;

const LogoContainer = styled.View`
    height : 56px;
    width : 56px;
    background-color : ${ ({theme}) => theme.colors['--default-shade-white']};
    border-radius : 28px;
    align-items : center;
    justify-content : center;
`;

const InformationContainer = styled.View`
    flex : 1;
    height : 100%;
    justify-content : space-between;
    flex-direction : row;
    margin-left : 60px;
`;

const InformationContentContainer = styled.View`
    height : 100%;
    flex:1;
    flex-direction : column;
    justify-content : space-evenly;
    align-items : ${ ({align}) => align };
`;

const InformationText = styled.Text( ({theme}) => ({
    ...theme.font['--text-lg-regular'],
    color : theme.colors['--default-shade-white']
}));

function ReportHeader () {
    const theme = useTheme();
    const header = require('../../../../assets/db.json').companyInformation;

    return (
        <ReportHeaderWrapper theme = {theme}>
            <ReportHeaderContainer>

                <LogoContainer theme = {theme}>
                    <Logo height = "50" width = "50"/>
                </LogoContainer>

                <InformationContainer>

                    <InformationContentContainer align = {'flex-start'}>
                        <InformationText>876-324-9087</InformationText>
                        <InformationText>thesuites@gmail.com</InformationText>
                        <InformationText>thesuites.com</InformationText>
                    </InformationContentContainer>

                    <InformationContentContainer align = "flex-end">
                        <InformationText>12 Ruthven Road</InformationText>
                        <InformationText>Halfway Tree Road</InformationText>
                        <InformationText>Kingston 10</InformationText>
                    </InformationContentContainer>

                </InformationContainer>

            </ReportHeaderContainer>
        </ReportHeaderWrapper>
    );
}

export default ReportHeader;

