import React, { Component, useState } from "react";
import { Modal, Text, StyleSheet } from "react-native";
import ClearIcon from "../../assets/svg/clearIcon";
import IconButton from "../components/common/Buttons/IconButton";
import ErrorIcon from "../../assets/svg/ErrorIcon"
import styled, { css } from "@emotion/native";
import { useTheme } from "emotion-theming";
import TickIcon from "../../assets/svg/tickIcon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native-animatable";

function ConfirmationComponent({
  isEditUpdate,
  isError,
  onCancel = () => { },
  onAction = () => { },
  message = "Are you sure you want to?",
  action = "Save",
}) {
  const theme = useTheme();
  const ModalWrapper = styled.View`
    position: relative;
    background-color: white;
    border-radius: 8px;
    width: 440px;
    height: 267px;
    padding-bottom: 100px;
    box-shadow: ${theme.shadow["--shadow-lg"]};
  `;

  const ModalContainer = styled.View`
    display: flex;
    height: 100%;
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
    border-bottom-color: ${theme.colors["--color-gray-1000"]};
  `;

  const TextHeaderContainer = styled.Text`
    font-size:16px;
    font-weight:600;
    line-height: 16px;
    color: ${theme.colors["--color-gray-600"]};
    margin-right: 260px;
  `;

  const MessageContainer = styled.Text`
  display:flex;
    line-height: 20px;
    font-size: 17px;
    font-weight: normal;
    color: ${theme.colors["--color-gray-700"]};
    align-self: center;
    margin-top:80px;
  `;

  const CancelButtonContainer = styled.TouchableOpacity`
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    border-width: 1px;
    background-color: ${theme.colors["--color-gray-300"]};
    margin-right: 230px;
    margin-left: 20px;
    width: 99px;
    height: 40px;
    border-color: ${theme.colors["--default-shade-white"]};
  `;

  const ActionButtonContainer = styled.TouchableOpacity`
    background-color: ${theme.colors["--color-blue-600"]};
    color: ${theme.colors["--default-shade-white"]};
    width: 76px;
    height: 40px;
    padding: 5px;
    justify-content:center;
    align-items: center;
    border-radius: 10px;
    border-width: 1px;
    border-color: ${theme.colors["--default-shade-white"]};
  `;

  const GeneralText = styled.Text`
    font-size: 16px;
    line-height: 16px;
    font-weight: bold;
    align-self:center;
   
  `;

  const IconContainer = styled.View`
  margin-top:20px;
  align-self:center;

  `;


  const DeciderButtonContainer = styled.TouchableOpacity`
  align-self:center;
  align-items:center;
  border-radius: 10px;
  margin-top:20px;
  padding:15px;
  background-color:${theme.colors["--color-blue-600"]};
  color:${theme.colors["--default-shade-white"]};
  width:409px;
  height:46px;

  `;

  const AlertText = styled.Text`
    align-self:center;
    font-size:18px;
    font-weight:bold;
    color:${theme.colors["--color-gray-800"]};
    margin-top:25px;

  `;

  const HeaderWrapper = styled.View`
    height: 45px;
  `;

  const ButtonView = styled.View`
    flex-direction: row;
    margin-top: 60px;
  `;

  const typeDecipher = () => {
    if (isEditUpdate) {
      return (<>
        <MessageContainer>{message}</MessageContainer>
        <ButtonView>
          <CancelButtonContainer onPress={onCancel}>
            <GeneralText style={{ color: theme.colors["--color-gray-500"] }}>
              Cancel
            </GeneralText>
          </CancelButtonContainer>

          <ActionButtonContainer onPress={onAction}>
            <GeneralText
              style={{ color: theme.colors["--default-shade-white"], }}
            >
              {action}
            </GeneralText>
          </ActionButtonContainer>
        </ButtonView>
      </>)
    } else if (!isEditUpdate && !isError) {
      return (
        <>
          <IconContainer><TickIcon /></IconContainer>
          <AlertText>Completed Successfully!</AlertText>
          <DeciderButtonContainer onPress={onAction}>
            <GeneralText style={{ color: theme.colors["--default-shade-white"], alignSelf: "center" }}>
              CONTINUE
           </GeneralText>

          </DeciderButtonContainer>

        </>
      )
    } else if (!isEditUpdate && isError) {
      return (
        <>
          <IconContainer><ErrorIcon /></IconContainer>
          <AlertText>There was an error performing this action</AlertText>
          <DeciderButtonContainer onPress={onCancel}>
            <GeneralText style={{ color: theme.colors["--default-shade-white"], alignSelf: "center" }}>
              CLOSE
         </GeneralText>

          </DeciderButtonContainer>

        </>
      )

    }

  }

  //add a wrapper for header

  return (
    <ModalWrapper>
      <ModalContainer>
        <HeaderWrapper>
          <HeadingContainer>
            <TextHeaderContainer>Confirm Action</TextHeaderContainer>
            <IconButton Icon={<ClearIcon />} onPress={onCancel} />
          </HeadingContainer>
        </HeaderWrapper>

        {typeDecipher()}


      </ModalContainer>
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({});

export default ConfirmationComponent;
