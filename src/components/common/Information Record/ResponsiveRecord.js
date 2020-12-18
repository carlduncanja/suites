import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import * as Linking from 'expo-linking';
import { useModal } from 'react-native-modalfy';
import ConfirmationComponent from '../../ConfirmationComponent';

const RecordWrapper = styled.TouchableOpacity`
        flex:1;
        margin-right: ${({ theme }) => theme.space['--space-4']};
    `;
const RecordContainer = styled.View`
        display: flex;
        flex-direction:column;
    `;

const TitleText = styled.Text(({ theme, titleStyle, titleColor }) => ({
    ...theme.font[titleStyle],
    color: theme.colors[titleColor],
}));

const ValueText = styled.Text(({ theme, valueStyle, valueColor }) => ({
    ...theme.font[valueStyle],
    color: theme.colors[valueColor]
}))

const TitleWrapper = styled.View`
    height: 32px;
    justify-content: center;
`;

function ResponsiveRecord({
    recordTitle = "",
    recordValue = '--',
    titleStyle = "--text-xs-medium",
    valueStyle = "--text-base-medium",
    valueFontSize = 16,
    titleFontSize = 14,
    titleColor = '--color-gray-600',
    valueColor = '--color-blue-600',
    handleRecordPress = () => {
    },
    disabled = false,
    isPhone = false, isEmail = false,
    index
}) {
    const theme = useTheme();

    const modal = useModal();

    const toggleError = () => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isEditUpdate={false}
                    titleText={'Error'}
                    isError={true}
                    onCancel={() => {
                        modal.closeAllModals();
                    }}
                    onAction={() => {
                        modal.closeAllModals();
                    }}
                    message={`There was an issue launching the ${isEmail ? "Email" : "Phone"} client application.`}
                />,
                onClose: () => {
                    modal.closeModals('ConfirmationModal');
                }
            }
        );
    }

    const togglePhoneCall = (phoneNumber) => {
        Linking.openURL(`tel://${phoneNumber}`)
            .then(supported => {
                if (!supported) {
                    console.log('Cant handle url')
                } else {
                    return Linking.openURL('message:')
                }
            })
            .catch(err => toggleError())

    }

    const toggleEmail = (emailAddress) => {
        Linking.openURL(`mailto:${emailAddress}`)
            .then(supported => {
                if (!supported) {
                    console.log('Cant handle url')
                } else {
                    return Linking.openURL('message:')
                }
            })
            .catch(err => {
                toggleError()
            })
    }

    return (
        <RecordWrapper theme={theme} disabled={disabled} onPress={() => { isPhone ? togglePhoneCall(recordValue) : isEmail ? toggleEmail(recordValue) : handleRecordPress() }}>
            <RecordContainer>

                <TitleWrapper>
                    <TitleText theme={theme} titleStyle={titleStyle} titleColor={titleColor}>{recordTitle}</TitleText>
                </TitleWrapper>


                <ValueText theme={theme} valueStyle={valueStyle}
                    valueColor={valueColor}>{recordValue === "" ? "--" : recordValue}</ValueText>
            </RecordContainer>
        </RecordWrapper>
    );
}

export default ResponsiveRecord;

const styles = StyleSheet.create({
    container: { flexDirection: 'column' },
    recordTitle: { paddingBottom: 4 },
});
