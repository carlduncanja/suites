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

function ConfirmationComponent({
    isEditUpdate,
    isError,
    onCancel = () => {
    },
    onAction = () => {
    },
    message = 'There was an issue performing this action.',
    action = 'Save',
}) {
    const theme = useTheme();
    const ModalWrapper = styled.View`
    position: relative;
    background-color: white;
    border-radius: 8px;
    width: 440px;
    height: 267px;
    padding-bottom: 100px;
    box-shadow: ${theme.shadow['--shadow-lg']};
  `;

    const ModalContainer = styled.View`
    display: flex;
    height: 100%;
  `;

    const ClearIconContainer = styled.View`
  align-items:flex-end;
  `;

    const HeadingContainer = styled.View`
    height:40px;
    align-items:center;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 12px;
    padding-top: 10px;
    padding-right: 2px;
    padding-bottom: 10px;
    border-bottom-width: 0.25px;
    border-bottom-color: ${theme.colors['--color-gray-1000']};
  `;

    const TextHeaderContainer = styled.Text`
    font-size:16px;
    font-weight:600;
    line-height: 16px;
    color: ${theme.colors['--color-gray-600']};
  
  `;

    const MessageContainer = styled.View`
  height:100%;
  justify-content:center;
  align-content: center;
  padding:10px;
  `;

    const MessageText = styled.Text`
  align-self:center;
    line-height: 20px;
    font-size: 17px;
    font-weight: normal;
    color: ${theme.colors['--color-gray-700']};
    
  
  `;

    const CancelButtonContainer = styled.TouchableOpacity`
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    border-width: 1px;
    background-color: ${theme.colors['--color-gray-300']};
    width: 99px;
    height: 40px;
    border-color: ${theme.colors['--default-shade-white']};
    margin-left:5px;
  `;

    const ActionButton = styled.TouchableOpacity`
    background-color: ${theme.colors['--color-blue-600']};
    color: ${theme.colors['--default-shade-white']};
    width: 76px;
    height: 40px;
    padding: 5px;
    justify-content:center;
    border-radius: 10px;
    border-width: 1px;
    border-color: ${theme.colors['--default-shade-white']};
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
  margin:15px;

  `;

    const DeciderButtonContainer = styled.TouchableOpacity`
  height:45%;
  justifyContent:flex-end;
  
  `;

    const DeciderButton = styled.View`
  align-self:center;
  
  border-radius: 10px;
  padding:15px;
  background-color:${theme.colors['--color-blue-600']};
  color:${theme.colors['--default-shade-white']};
  width:409px;
  height:46px;

  `;

    const AlertText = styled.Text`
    align-self:center;
    justifyContent:center;
    font-size:18px;
    font-weight:bold;
    color:${theme.colors['--color-gray-800']};
   

  `;

    const HeaderWrapper = styled.View`
    height: 45px;
  `;

    const ButtonView = styled.View`
    flex-direction: row;
   
  
  `;

    const typeDecipher = () => {
        if (isEditUpdate) {
            return (<>
                <MessageContainer>
                    <MessageText>{message}</MessageText>
                </MessageContainer>
                <ButtonView>
                    <CancelButtonContainer onPress={onCancel}>
                        <GeneralText style={{color: theme.colors['--color-gray-500']}}>
                            Cancel
                        </GeneralText>
                    </CancelButtonContainer>
                    <ActionButtonContainer>
                        <ActionButton onPress={onAction}>
                            <GeneralText
                                style={{color: theme.colors['--default-shade-white']}}
                            >
                                {action}
                            </GeneralText>
                        </ActionButton>
                    </ActionButtonContainer>
                </ButtonView>
            </>);
        }
        if (!isEditUpdate && !isError) {
            return (
                <>
                    <IconContainer><TickIcon/></IconContainer>
                    <AlertText>Completed Successfully!</AlertText>
                    <DeciderButtonContainer onPress={onAction}>
                        <DeciderButton>
                            <GeneralText style={{
                                color: theme.colors['--default-shade-white'],
                                alignSelf: 'center'
                            }}
                            >
                                CONTINUE
                            </GeneralText>

                        </DeciderButton>
                    </DeciderButtonContainer>

                </>
            );
        }
        if (!isEditUpdate && isError) {
            return (
                <>
                    <IconContainer><ErrorIcon/></IconContainer>
                    <AlertText>{message}</AlertText>
                    <DeciderButtonContainer onPress={onCancel}>
                        <DeciderButton>
                            <GeneralText style={{
                                color: theme.colors['--default-shade-white'],
                                alignSelf: 'center'
                            }}
                            >
                                CLOSE
                            </GeneralText>

                        </DeciderButton>
                    </DeciderButtonContainer>

                </>
            );
        }
    };

    //add a wrapper for header

    return (
        <ModalWrapper>
            <ModalContainer>
                <HeaderWrapper>
                    <HeadingContainer>
                        <TextHeaderContainer>Confirm Action</TextHeaderContainer>
                        <ClearIconContainer>
                            <IconButton Icon={<ClearIcon/>} onPress={onCancel}/>
                        </ClearIconContainer>
                    </HeadingContainer>
                </HeaderWrapper>

                {typeDecipher()}

            </ModalContainer>
        </ModalWrapper>
    );
}

const styles = StyleSheet.create({});

export default ConfirmationComponent;
