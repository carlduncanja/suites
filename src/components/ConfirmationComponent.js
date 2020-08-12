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
  type,
  error,
  onCancel = ()=>{},
  onAction = ()=>{},
  message = "Are you sure you want to?",
  action = "Save",
}) {
  const theme = useTheme();
  const ModalWrapper = styled.View`
    position: relative;
    background-color: white;
    border-radius: 8px;
    width: 600px;
    height: 370px;
    padding-bottom: 67px;
    box-shadow: ${theme.shadow["--shadow-lg"]};
  `;

  const ModalContainer = styled.View`
    display: flex;
    height: 100%;
  `;

  const HeadingContainer = styled.View`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 12px;
    padding-top: 8px;
    padding-right: 2px;
    padding-bottom: 8px;
    border-bottom-width: 0.25px;
    border-bottom-color: ${theme.colors["--color-gray-1000"]};
  `;

  const TextHeaderContainer = styled.Text`
    font: ${theme.font["--text-2xl-medium"]};
    color: ${theme.colors["--color-gray-600"]};
    margin-right: 380px;
  `;

  const MessageContainer = styled.Text`
    line-height: 20px;
    font-size: 21px;
    font-weight: normal;
    color: ${theme.colors["--color-gray-700"]};
    margin-top: 100px;
    align-self: center;
  `;

  const CancelButtonContainer = styled.TouchableOpacity`
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    border-width: 1px;
    background-color: ${theme.colors["--color-gray-300"]};
    margin-right: 310px;
    margin-left: 20px;
    width: 130px;
    height: 55px;
    border-color: ${theme.colors["--default-shade-white"]};
  `;

  const ActionButtonContainer = styled.TouchableOpacity`
    background-color: ${theme.colors["--color-blue-600"]};
    color: ${theme.colors["--default-shade-white"]};
    width: 120px;
    height: 55px;
    padding: 10px;
    align-items: center;
    border-radius: 10px;
    border-width: 1px;
    border-color: ${theme.colors["--default-shade-white"]};
  `;

  const GeneralText = styled.Text`
    font-size: 25px;
    font-weight: bold;
  `;

  const IconContainer = styled.View`
  margin-top:50px;
  align-self:center;

  `;


  const DeciderButtonContainer = styled.TouchableOpacity`
  align-self:center;
  border-radius: 10px;
  margin-top:50px;
  padding:10px;
  background-color:${theme.colors["--color-blue-600"]};
  color:${theme.colors["--default-shade-white"]};
  width:550px;

  `;

  const AlertText = styled.Text`
    align-self:center;
    font:${theme.font["--text-2xl-medium"]};
    color:${theme.colors["--color-gray-800"]};
    margin-top:50px;

  `;

  const HeaderWrapper = styled.View`
    height: 45px;
  `;

  const ButtonView = styled.View`
    flex-direction: row;
    margin-top: 120px;
  `;

  const typeDecipher = (type) => {
    if (type === "edit-update") {
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
    } else if (type !== "edit-update" && !error) {
      return (
        <>
          <IconContainer><TickIcon /></IconContainer>
          <AlertText>Completed Successfully!</AlertText>
          <DeciderButtonContainer>
            <GeneralText style={{ color: theme.colors["--default-shade-white"], alignSelf: "center" }}>
              CONTINUE
           </GeneralText>

          </DeciderButtonContainer>

        </>
      )
    } else if (type !== "edit-update" && error) {
      return (
        <>
          <IconContainer><ErrorIcon /></IconContainer>
          <AlertText>There was an error performing this action</AlertText>
          <DeciderButtonContainer>
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

        {typeDecipher(type)}


      </ModalContainer>
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({});

export default ConfirmationComponent;
