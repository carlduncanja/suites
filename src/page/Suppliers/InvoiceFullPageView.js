import React from 'react';
import { Image } from 'react-native';
import {useTheme} from 'emotion-theming';
import styled, {css} from '@emotion/native';

const PageViewWrapper = styled.View`
    flex: 1;
    background-color: 'rgba(50, 56, 67, 0.7)';
`;

const TitleContainer = styled.View`
    display: flex;
    align-items: center;
    background-color: ${({theme}) => theme.colors['--color-white']};
    padding: ${({theme}) => theme.space['--space-12']};
    padding-left: 0;
    padding-right: 0;
`;

const ImageContainer = styled.View`
    flex: 1;
    margin: ${({theme}) => theme.space['--space-20']};
    align-items: center;
    justify-content: center;
`;

const FullImage = styled.Image`
    height: 100%;
    width: 100%;
`;

const TitleText = styled.Text(({ theme, textColor = '--color-blue-600', font = '--text-lg-medium'}) => ({
    ...theme.font[font],
    color: theme.colors[textColor],
    paddingTop: 2,
}));

const InvoiceFullPageView = ({title = "", sourceImage=''}) => {
    const theme = useTheme();
    return (
        <PageViewWrapper theme={theme}>
            <TitleContainer>
                <TitleText>{title}</TitleText>
            </TitleContainer>
            <ImageContainer theme={theme}>
                <FullImage
                    resizeMode="contain"
                    source={{uri: sourceImage}}
                />
            </ImageContainer>
        </PageViewWrapper>
    );
};
export default InvoiceFullPageView;
