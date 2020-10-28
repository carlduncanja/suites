import React from 'react';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import ConnectionIcon from '../../../../assets/svg/lostConnection';

const PageWrapper = styled.View`
    height: 100%;
    width: 100%;
    margin: 0;
`;

const PageContainer = styled.View`
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding-bottom: 100px;
`;

const ContentContainer = styled.View`
    width: 366px;
    height: 102px;
    margin-top: ${({theme}) => theme.space['--space-48']};
    align-items:center;
    justify-content:space-between;
`;

const BodyContainer = styled.View`
    height: 50px;
    width:100%;
    justify-content:space-between;
`;

const PageText = styled.Text(({theme, color = '--color-gray-700', font = '--text-base-regular'}) => ({
    ...theme.font[font],
    color: theme.colors[color],
    display: 'flex',
    textAlign: 'center',
    // alignItems: 'center',
}));

const LostConnectionPage = () => {
    const theme = useTheme();
    return (
        <PageWrapper>
            <PageContainer>
                <ConnectionIcon/>
                <ContentContainer>
                    <PageText theme={theme} font="--text-lg-bold">No Internet Connection!</PageText>

                    <BodyContainer>
                        <PageText>
                            You seem to have lost your internet connection.
                        </PageText>
                        <PageText>
                            Some features may not work as expected.
                        </PageText>

                    </BodyContainer>
                    
                </ContentContainer>
            </PageContainer>
        </PageWrapper>
    );
};

export default LostConnectionPage