import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import styled, { css } from "@emotion/native";
import { useTheme } from "emotion-theming";
import OverlayDialogHeader from "./OverlayDialogHeader";
import OverlayDialogFooter from "./OverlayDialogFooter";

/**
 * Dialog component used in overlay modal.
 *
 * @param props
 * @returns {*}
 * @constructor
 */

const OverlayDialogWrapper = styled.View`
  flex: 1;
  max-width: ${({ maxWidth }) => `${maxWidth}px`};
`;
const OverlayDialogContainer = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors["--default-shade-white"]};
`;

const OverlayContentWrapper = styled.View`
  z-index: ${(props) => props.zIndex || 1};
  position: relative;
  width: 100%;
`;
const OverlayContentContainer = styled.View`
  flex-direction: column;
  padding-bottom: ${({ theme }) => theme.space["--space-56"]};
`;

function OverlayDialog(props) {
  const {
    title = " ",
    onClose = () => {},
    onPositiveButtonPress = () => {},
    positiveText = "DONE",
    buttonIcon = <View />,
    isButtonDisabled = false,
    isOpen = false,
    footerIndex,
    max = 100,
  } = props;

  const theme = useTheme();
  const [zIndex, setZindex] = useState(isOpen ? 11 : 1);
  const dimensions = Dimensions.get("window");

  const maxWidth = dimensions.width - max;

  useEffect(() => {
    setZindex(isOpen ? 11 : 1);
  }, [isOpen]);

  return (
    <OverlayDialogWrapper maxWidth={maxWidth}>
      <OverlayDialogContainer theme={theme}>
        <OverlayDialogHeader title={title} onClose={onClose} />

        <OverlayContentWrapper zIndex={zIndex}>
          <OverlayContentContainer theme={theme}>
            {props.children}
          </OverlayContentContainer>
        </OverlayContentWrapper>
        <View style={{ width: 100, height: 50 }}></View>

        <OverlayDialogFooter
          onPositiveButtonPress={onPositiveButtonPress}
          positiveText={positiveText}
          buttonIcon={buttonIcon}
          isButtonDisabled={isButtonDisabled}
          zIndex={footerIndex}
        />
      </OverlayDialogContainer>
    </OverlayDialogWrapper>
  );
}

OverlayDialog.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  onPositiveButtonPress: PropTypes.func.isRequired,
  positiveText: PropTypes.string.isRequired,
  isButtonDisabled: PropTypes.bool,
  isOpen: PropTypes.bool,
};
OverlayDialog.defaultProps = {};

export default OverlayDialog;
