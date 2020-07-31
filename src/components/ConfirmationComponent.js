import React, { Component, useState } from "react";
import { Modal, Text, StyleSheet } from "react-native";
import ClearIcon from "../../assets/svg/clearIcon";
import IconButton from "../components/common/Buttons/IconButton";
import styled, { css } from "@emotion/native";
import { useTheme } from "emotion-theming";

import { TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native-animatable";

function ConfirmationComponent({
  onCancel,
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
    box-shadow: ${theme.shadow["--shadow-md"]};
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
  `;

  const MessageContainer = styled.Text`
    font: ${theme.font["--text-xl-medium"]};
    color: ${theme.colors["--color-gray-700"]};
    margin-top: 80px;
    align-self: center;
  `;

  const CancelButtonContainer = styled.TouchableOpacity`
    align-items: center;
    padding: 15px;
    border-radius: 10px;
    border-width: 1px;
    background-color: ${theme.colors["--color-gray-300"]};
    margin-right: 260px;
    margin-left: 20px;
    width: 150px;
    height: 70px;
    border-color: ${theme.colors["--default-shade-white"]};
  `;

  const ActionButtonContainer = styled.TouchableOpacity`
    background-color:${theme.colors["--color-blue-600"]};
    color:${theme.colors["--default-shade-white"]};
    width:150px;
    height70px;
    padding:15px;
    align-items:center;
    border-radius:10px;
    border-width:1px;
    border-color:${theme.colors["--default-shade-white"]};
  `;

  const GeneralText = styled.Text`
    font-size: 30px;
    font-weight: bold;
  `;

  const HeaderWrapper = styled.View`
    height: 45px;
  `;

  const ButtonView = styled.View`
    flex-direction: row;
    margin-top: 120px;
  `;

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

        <MessageContainer>{message}</MessageContainer>
        <ButtonView>
          <CancelButtonContainer onPress={onCancel}>
            <GeneralText style={{ color: theme.colors["--color-gray-500"] }}>
              Cancel
            </GeneralText>
          </CancelButtonContainer>

          <ActionButtonContainer>
            <GeneralText
              style={{ color: theme.colors["--default-shade-white"] }}
            >
              {action}
            </GeneralText>
          </ActionButtonContainer>
        </ButtonView>
      </ModalContainer>
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({});

export default ConfirmationComponent;
