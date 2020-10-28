import React from 'react';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import NotFoundIcon from '../../../../assets/svg/notFoundIcon';
import ToastComponent from '../ToastComponent';

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
    width: 354px;
    height: 118px;
    margin-top: ${({theme}) => theme.space['--space-48']};
    align-items:center;
    justify-content:space-between;
`;

const BodyContainer = styled.View`
    height: 60px;
    width:100%;
    justify-content:space-between;
`;

const ReturnLink = styled.TouchableOpacity`
    /* background-color: red; */
`;

const PageText = styled.Text(({theme, color = '--color-gray-700', font = '--text-base-regular', isUnderline = false}) => ({
    ...theme.font[font],
    color: theme.colors[color],
    display: 'flex',
    textAlign: 'center',
    textDecorationLine: isUnderline ? 'underline' : 'none'
    // alignItems: 'center',
}));

const NotFoundPage = ({navigation}) => {
    const theme = useTheme();
    console.log("Navigation: ", navigation);
    return (
        <PageWrapper>
            <PageContainer>
                <NotFoundIcon/>
                <ContentContainer>
                    <PageText theme={theme} font="--text-lg-bold">Oops!</PageText>

                    <BodyContainer>
                        <PageText>
                            The page you requested could not be found.
                        </PageText>
                        <ReturnLink onPress={() => navigation.navigate("Schedule")}>
                            <PageText isUnderline={true} color="--company">
                                Return to Schedule
                            </PageText>
                        </ReturnLink>
                        
                    </BodyContainer>
                    
                </ContentContainer>

            </PageContainer>
        </PageWrapper>
    );
};

export default NotFoundPage;
