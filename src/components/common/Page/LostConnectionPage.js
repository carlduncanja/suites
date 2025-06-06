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

const TouchableText = styled.TouchableOpacity`
    justify-content:center;
    margin-Top: 15;
`;

const ContentContainer = styled.View`
    width: 366px;
    height: 102px;
    margin-top: ${({ theme }) => theme.space['--space-48']};
    align-items:center;
    justify-content:space-between;
`;

const BodyContainer = styled.View`
    height: 50px;
    width:100%;
    justify-content:space-between;
`;

const PageText = styled.Text(({ theme, color = '--color-gray-600', font = '--text-base-regular', textDecorationLine = '' }) => ({
    ...theme.font[font],
    color: theme.colors[color],
    display: 'flex',
    textAlign: 'center',
    // alignItems: 'center',
    marginBottom: 20,
    textDecorationLine: textDecorationLine
}));

const LostConnectionPage = ({ navigation }) => {
    const theme = useTheme();
    const targetRoute = navigation.getState().routes;
    const route = targetRoute[targetRoute.length - 1];

    return (
        <PageWrapper>
            <PageContainer>
                <ConnectionIcon />
                <ContentContainer>
                    <PageText theme={theme} font="--text-lg-bold">No Internet Connection!</PageText>

                    <BodyContainer>
                        <PageText>
                            You seem to have lost your internet connection.
                        </PageText>
                        <PageText>
                            Some features may not work as expected.
                        </PageText>
                        <TouchableText onPress={() => { navigation.navigate(route.name) }}>
                            <PageText color="--color-blue-700" textDecorationLine='underline'>
                                Reload Page
                            </PageText>
                        </TouchableText>
                    </BodyContainer>

                </ContentContainer>
            </PageContainer>
        </PageWrapper>
    );
};

export default LostConnectionPage