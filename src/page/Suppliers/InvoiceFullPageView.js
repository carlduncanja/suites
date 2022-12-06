import React from 'react';
import { Image } from 'react-native';
import { useTheme } from 'emotion-theming';
import styled, { css } from '@emotion/native';
import PDFReader from 'rn-pdf-reader-js'

const PageViewWrapper = styled.View`
    flex: 1;
    background-color: 'rgba(50, 56, 67, 0.7)';
`;

const TitleContainer = styled.View`
    display: flex;
    align-items: center;
    background-color: ${({ theme }) => theme.colors['--color-white']};
    padding: ${({ theme }) => theme.space['--space-12']};
    padding-left: 0;
    padding-right: 0;
`;

const PdfContainer = styled.View`
    width: 100%;
    height: 100%;
`;

const ImageContainer = styled.View`
    width: 100%;
    height: 600px;
    border: ${({ theme }) => `1px solid ${theme.colors['--color-gray-400']}`};
    background-color: ${({ theme }) => theme.colors['--color-gray-300']};
    border-radius: 4px;
`;

const FullImage = styled.Image`
    height: 100%;
    width: 100%;
`;

const TitleText = styled.Text(({ theme, textColor = '--color-blue-600', font = '--text-lg-medium' }) => ({
    ...theme.font[font],
    color: theme.colors[textColor],
    paddingTop: 2,
}));

const InvoiceFullPageView = ({ title = "", source = '', isPdf = false }) => {
    const theme = useTheme();
    return (
        <PageViewWrapper theme={theme}>
            <TitleContainer>
                <TitleText>{title}</TitleText>
            </TitleContainer>
                {
                    isPdf ?
                        (
                            <PdfContainer>
                            <PDFReader
                                source={{
                                    base64: source
                                }}
                            />
                            </PdfContainer>
                        ) :
                        (
                            <ImageContainer theme={theme}>
                            <FullImage
                                resizeMode="contain"
                                source={{ uri: source }}
                            />
                                  </ImageContainer>
                        )
                }
      
        </PageViewWrapper>
    );
};
export default InvoiceFullPageView;
