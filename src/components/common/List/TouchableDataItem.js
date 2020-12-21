import React from 'react';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import * as Linking from 'expo-linking';
import { useModal } from 'react-native-modalfy';
import ConfirmationComponent from '../../ConfirmationComponent';

const DataItemWrapper = styled.TouchableOpacity` 
    flex: ${({ flex }) => flex.toString()};
    height: 100%;
`;
const DataItemContainer = styled.View` 
    display: flex;
    height:100%; 
    justify-content: center;
    align-items: ${({ align }) => align};
`;

const DataText = styled.Text(({ theme, fontStyle, color }) => ({
    ...theme.font[fontStyle],
    color: theme.colors[color],
    paddingTop: 2,
}));

function TouchableDataItem({ text = "", flex = 1, align = 'flex-start', fontStyle = '--text-sm-regular', color = '--color-blue-600', onPress = () => { }, isDisabled = false, isPhone = false, isEmail = false }) {
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
                    console.log('Cant handle request')
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
                    console.log('Cant handle request')
                } else {
                    return Linking.openURL('message:')
                }
            })
            .catch(err => toggleError())
    }
    return (
        <DataItemWrapper flex={flex} theme={theme} onPress={() => { isPhone ? togglePhoneCall(text) : isEmail ? toggleEmail(text) : onPress }} disabled={isDisabled}>
            <DataItemContainer align={align}>
                <DataText numberOfLines={1} fontStyle={fontStyle} color={color} theme={theme}>{text}</DataText>
            </DataItemContainer>
        </DataItemWrapper>
    );
}

export default TouchableDataItem;
