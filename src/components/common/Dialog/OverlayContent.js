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


const OverlayContentWrapper = styled.View`
  flex:1;
  width : 100%;
  min-height : ${ ({minHeight}) => `${minHeight}px`};
  padding-top : ${ ({theme}) => theme.space['--space-40']};
  padding-bottom : ${ ({theme}) => theme.space['--space-40']};
  padding-right : ${ ({theme}) => theme.space['--space-24']};
  padding-left : ${ ({theme}) => theme.space['--space-24']};
`;

const OverlayContentContainer = styled.View`
  height: 100%;
  width: 100%;
  flex-direction : column;
`;



function OverlayDialogContent({ children, height = 350 }) {

  const theme = useTheme();

  return (
   
    <OverlayContentWrapper theme = {theme} minHeight = {height}>
        <OverlayContentContainer>
            {children}
        </OverlayContentContainer>
    </OverlayContentWrapper> 
       
  );
}


export default OverlayDialogContent;
