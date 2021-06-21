import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import ClearIcon from "../../../../assets/svg/clearIcon";
import RightArrow from "../../../../assets/svg/rightArrow";

import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import IconButton from "../Buttons/IconButton";
import OverlayDialogHeader from "./OverlayDialogHeader";

/**
 * Dialog component used in overlay modal.
 *
 * @param props
 * @returns {*}
 * @constructor
 */


const OverlayFooterWrapper = styled.TouchableOpacity`
  height : 57px;
  width : 100%;
  position : absolute;
  bottom:0;
  z-index : 3;
`;

const OverlayFooterContainer = styled.View`
  height: 100%;
  width: 100%;
  flex-direction : row;
  align-items: center;
  justify-content: center;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-top-width : 1px;
  border-top-color : ${ ({theme}) => theme.colors['--color-gray-400']};
  
`;
 
const FooterText = styled.Text( ({theme, disabled}) =>({
  ...theme.font['--text-base-bold'],
  color: disabled ? theme.colors['--color-gray-600'] : theme.colors['--color-blue-600'],
  marginRight : 10,
}));


function OverlayDialogFooter({ 
  onPositiveButtonPress = () => {}, 
  positiveText = "DONE",
  buttonIcon = <View />,
  isButtonDisabled = false
}) {

  const theme = useTheme();
  
  return (
   
    <OverlayFooterWrapper onPress = {onPositiveButtonPress}>
        <OverlayFooterContainer>
            <FooterText disabled={isButtonDisabled}>{positiveText}</FooterText>
            {buttonIcon}
        </OverlayFooterContainer>
    </OverlayFooterWrapper> 
       
  );
}


export default OverlayDialogFooter;
