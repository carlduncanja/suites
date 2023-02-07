import React, {Component, useState} from 'react';
import {Modal, Text, StyleSheet} from 'react-native';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View} from 'react-native-animatable';
import ClearIcon from '../../assets/svg/clearIcon';
import IconButton from './common/Buttons/IconButton';
import ErrorIcon from '../../assets/svg/ErrorIcon';
import TickIcon from '../../assets/svg/tickIcon';
import WarningIcon from '../../assets/svg/warningIcon';
import MultipleShadowsContainer from './common/MultipleShadowContainer';

const ModalWrapper = styled.View`
    width: ${({isWarning}) => isWarning ? '460px': '440px'};
    height: ${({isWarning}) => isWarning ? '300px': '276px'};
    position: relative;
    background-color: white;
    border-radius: 8px;
    /* padding-bottom: 100px; */
    /* box-shadow: ${({theme}) => theme.shadow['--shadow-lg']}; */
`;

const ModalContainer = styled.View`
    display: flex;
    height: 100%;
`;

const HeaderWrapper = styled.View`
    height: 40px;
    width: 100%;
    border-bottom-width: 0.25px;
    border-bottom-color: ${({theme}) => theme.colors['--color-gray-1000']};
`;

const HeadingContainer = styled.View`
    height : 100%;
    align-items:center;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 12px;
    /* padding-top: 10px; */
    padding-right: 2px;
    /* padding-bottom: 10px; */
    
`;

const ModalText = styled.Text(({textColor = '--color-gray-600', theme, font = '--confirm-title', messagePadding=0, messageAlign="center", messageMargin=0}) => ({
    ...theme.font[font],
    color: theme.colors[textColor],
    paddingTop: 2,
    paddingLeft: messagePadding,
    paddingRight: messagePadding,
    textAlign: messageAlign,
    marginTop: messageMargin
}));

const ClearIconContainer = styled.View`
    align-items:flex-end;
`;

const TextHeaderContainer = styled.Text`
    font-size:16px;
    font-weight:600;
    line-height: 16px;
    color: ${({theme}) => theme.colors['--color-gray-600']};
  
  `;

const MessageWrapper = styled.View`
    height: 108px;
    width: 100%;
    margin-top : ${({theme}) => theme.space['--space-32']};
    margin-bottom : ${({theme}) => theme.space['--space-32']};
    align-items: center;
`;
const MessageContainer = styled.View`
    display:flex;
    height: 100%;
    width: 318px;
    justify-content:center;
    align-items: center;
    background-color: ${({theme}) => theme.colors['--default-shade-white']};

    /* border-bottom-left-radius :8px;
    border-bottom-right-radius :8px; */
`;

const IconMessageContainer = styled.View`
    height: 128px;
    width: 100%;
    justify-content:space-between;
    align-items: ${({textAlign}) => textAlign};
    background-color: ${({theme}) => theme.colors['--default-shade-white']};
    margin-top : ${({theme}) => theme.space['--space-20']};
    margin-bottom : ${({theme}) => theme.space['--space-20']};
    padding-top:8px;
    padding-bottom:8px;
`;

const MessageText = styled.Text`
    align-self:center;
    line-height: 20px;
    font-size: 17px;
    font-weight: normal;
    color: ${({theme}) => theme.colors['--color-gray-700']};
`;

const ButtonView = styled.View`
    position : absolute;
    bottom: 0;
    left:0;
    right:0;
    height:40px;
    margin: ${({theme}) => theme.space['--space-16']};
    margin-top: 0;
    flex-direction: row;
    justify-content:space-between;
`;

const ButtonContainer = styled.TouchableOpacity`
    height : 40px;
    width : ${({fullWidth}) => fullWidth === true ? '100%' : null};
    display:flex;
    align-items: center;
    justify-content: center;
    padding: ${({theme}) => `0 ${theme.space['--space-16']}`};
    border-radius: 8px;
    background-color: ${({background, theme}) => theme.colors[background]};
    border: ${({theme, borderColor}) => borderColor ? `1px solid ${theme.colors[borderColor]}` : null};

`;

const CancelButtonContainer = styled.TouchableOpacity`
    align-items: center;
    padding: 10px;
    padding-top : 12px;
    border-radius: 10px;
    border-width: 1px;
    background-color: ${({theme}) => theme.colors['--color-gray-300']};
    width: 99px;
    height: 40px;
    border-color: ${({theme}) => theme.colors['--default-shade-white']};
    /* margin-left:5px; */
`;

const ActionButton = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.colors['--color-blue-600']};
    color: ${({theme}) => theme.colors['--default-shade-white']};
    width: 76px;
    height: 40px;
    padding: 5px;
    padding-top:7px;
    justify-content:center;
    border-radius: 10px;
    border-width: 1px;
    border-color: ${({theme}) => theme.colors['--default-shade-white']};
`;

const ActionButtonContainer = styled.View`
    align-items:flex-end;
    width:75%;
 `;

const GeneralText = styled.Text`
    font-size: 16px;
    line-height: 16px;
    font-weight: bold;
    align-self:center;
`;

const IconContainer = styled.View`
    align-self:center;
    margin-bottom:${({isWarning, theme}) => !isWarning ? theme.space['--space-10'] : 'none'};
`;

const DeciderButtonContainer = styled.TouchableOpacity`
    height:45%;
    justify-content:flex-end;
`;

const DeciderButton = styled.View`
    align-self:center;
    border-radius: 10px;
    padding:15px;
    background-color:${({theme}) => theme.colors['--color-blue-600']};
    color:${({theme}) => theme.colors['--default-shade-white']};
    width:409px;
    height:46px;
`;

const AlertText = styled.Text`
    align-self:center;
    justify-content:center;
    font-size:18px;
    font-weight:bold;
    color:${({theme}) => theme.colors['--color-gray-800']};
`;

const WarningText = styled.Text`
    align-self:center;
    justify-content:center;
    font-size:18px;
    font-weight:bold;
    color:${({theme}) => theme.colors['--color-black-800']};
`;

const shadows = [
    {
        shadowColor: 'black',
        shadowOffset: {width: 10, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 15
    },
    {
        shadowColor: 'black',
        shadowOffset: {width: 4, height: 0},
        shadowOpacity: 0.05,
        shadowRadius: 6
    },
];

function ConfirmationComponent({
    isEditUpdate,
    textPadding=0,
    textAlign='center',
    isError,
    isWarning,
    onCancel = () => {
    },
    onAction = () => {
    },
    titleText = 'Confirm Action',
    message = '',
    secondaryMessage = '',
    action = 'Save',
    type = ''
}) {
    const theme = useTheme();
    const typeDecipher = () => {
        if (isEditUpdate) {
            return (<>
                <MessageWrapper>
                    <MessageContainer theme={theme}>
                        <ModalText theme={theme} color="--color-gray-700" font="--confirm-message">{message}</ModalText>
                    </MessageContainer>
                </MessageWrapper>

                <ButtonView theme={theme}>
                    <ButtonContainer onPress={onCancel} theme={theme} background='--color-gray-300'>
                        <ModalText theme={theme} textColor="--color-gray-500" font="--text-base-bold">{type === 'binary' ? 'NO' : 'CANCEL'}</ModalText>

                    </ButtonContainer>
                    <ButtonContainer
                        onPress={onAction}
                        theme={theme}
                        background="--color-blue-600"
                    >
                        <ModalText theme={theme} textColor="--default-shade-white" font="--text-base-bold">{type === 'binary' ? 'YES' : 'SAVE'}</ModalText>
                    </ButtonContainer>
                </ButtonView>
            </>);
        }
        if (isWarning) {
            return (<>
                    <IconMessageContainer textAlign={textAlign === 'center' ? 'center' : 'end'}>
                        <IconContainer theme={theme}><WarningIcon/></IconContainer>
                        <ModalText messageAlign={textAlign} messagePadding={textPadding}  theme={theme} textColor="--color-gray-800" font="--text-base-regular">{message || `The insurance coverage amount provided to authorize this procedure will impact the patient's bill.`}</ModalText>
                        <ModalText messageMargin={textAlign === 'left' ? 10 : 0} messageAlign={textAlign} messagePadding={textPadding} theme={theme} textColor="--color-gray-800" font="--text-base-bold">{secondaryMessage || 'Do you wish to continue?'}</ModalText>
                    </IconMessageContainer>
               

                <ButtonView theme={theme}>
                    <ButtonContainer onPress={onCancel} theme={theme} background='--default-shade-white' borderColor='--color-blue-600' >
                        <ModalText theme={theme} textColor="--color-blue-600" font="--text-base-bold">{type === 'binary' ? 'NO' : 'CANCEL'}</ModalText>

                    </ButtonContainer>
                    <ButtonContainer
                        onPress={onAction}
                        theme={theme}
                        background="--color-blue-600"
                    >
                        <ModalText theme={theme} textColor="--default-shade-white" font="--text-base-bold">{type === 'binary' ? 'YES' : 'CONFIRM'}</ModalText>
                    </ButtonContainer>
                </ButtonView>
            </>);
        }
        if (!isEditUpdate && !isError) {
            return (
                <>
                    <IconMessageContainer>
                        <IconContainer theme={theme}><TickIcon/></IconContainer>
                        <ModalText theme={theme} textColor="--color-gray-800" font="--confirm-message"> {message || 'Completed Successfully!'} </ModalText>
                    </IconMessageContainer>

                    <ButtonView>
                        <ButtonContainer onPress={onAction} theme={theme} background='--color-blue-500' fullWidth={true}>
                            <ModalText theme={theme} textColor="--default-shade-white" font="--text-base-bold">CONTINUE</ModalText>
                        </ButtonContainer>
                    </ButtonView>
                </>
            );
        }
        if (!isEditUpdate && isError) {
            return (
                <>
                    <IconMessageContainer>
                        <IconContainer theme={theme}><ErrorIcon/></IconContainer>
                        <ModalText theme={theme} textColor="--color-gray-800" font="--confirm-message">{message || 'There was an issue performing this action.'}</ModalText>
                    </IconMessageContainer>
                    <ButtonView>
                        <ButtonContainer onPress={onCancel} theme={theme} background="--color-blue-500" fullWidth={true}>
                            <ModalText theme={theme} textColor="--default-shade-white" font="--text-base-bold">CLOSE</ModalText>
                        </ButtonContainer>
                    </ButtonView>
                </>
            );
        }
    };

    //add a wrapper for header
    return (
        <MultipleShadowsContainer shadows={shadows}>
            <ModalWrapper theme={theme} isWarning={isWarning}>
                <ModalContainer>
                    <HeaderWrapper theme={theme}>
                        <HeadingContainer theme={theme}>
                            <ModalText theme={theme}>{titleText}</ModalText>
                            <ClearIconContainer>
                                <IconButton Icon={<ClearIcon/>} onPress={onCancel}/>
                            </ClearIconContainer>
                        </HeadingContainer>
                    </HeaderWrapper>
                    {typeDecipher()}
                </ModalContainer>
            </ModalWrapper>
        </MultipleShadowsContainer>

    );
}

const styles = StyleSheet.create({});

export default ConfirmationComponent;
