import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';

const RecordWrapper = styled.TouchableOpacity`
        flex:1;
        margin-right: ${({theme}) => theme.space['--space-4']};
    `;
const RecordContainer = styled.View`
        display: flex;
        flex-direction:column;
    `;

const TitleText = styled.Text(({theme, titleStyle, titleColor}) => ({
    ...theme.font[titleStyle],
    color: theme.colors[titleColor],
}));

const ValueText = styled.Text(({theme, valueStyle, valueColor}) => ({
    ...theme.font[valueStyle],
    color: theme.colors[valueColor]
}))

const TitleWrapper = styled.View`
    height: 32px;
    justify-content: center;
`;

const ContentWrapper = styled.View`
    flex:1;
`;

function ContentResponsiveRecord({
    recordTitle = "",
    titleStyle = "--text-xs-medium",
    titleColor = '--color-gray-600',
    handleRecordPress = () => {
    },
    disabled = false,
    content = () => {}
}) {
    const theme = useTheme();

    return (
        <RecordWrapper theme={theme} disabled={disabled} onPress={() => handleRecordPress()}>
            <RecordContainer>

                <TitleWrapper>
                    <TitleText theme={theme} titleStyle={titleStyle} titleColor={titleColor}>{recordTitle}</TitleText>
                </TitleWrapper>

                <ContentWrapper>
                    {content}
                </ContentWrapper>
                
            </RecordContainer>
        </RecordWrapper>
    );
}

export default ContentResponsiveRecord;
