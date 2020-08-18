import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import ClearIcon from "../../../../assets/svg/clearIcon";
import RightArrow from "../../../../assets/svg/rightArrow";

import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import IconButton from "../Buttons/IconButton";

/**
 * Dialog component used in overlay modal.
 *
 * @param props
 * @returns {*}
 * @constructor
 */


const OverlayHeaderWrapper = styled.View`
  height : 33px;
  width : 100%;
`;
const OverlayHeaderContainer = styled.View`
  height: 100%;
  width : 100%;
  flex-direction : row;
  padding : ${ ({theme}) => `${theme.space['--space-8']} ${theme.space['--space-12']}`};
  border-bottom-width : 1px;
  border-bottom-color : ${ ({theme}) => theme.colors['--color-gray-400']};
  justify-content : space-between;
`;

const DialogText = styled.Text( ({theme}) =>({
  ...theme.font['--text-base-regular'],
  color: theme.colors['--color-gray-800'],
}))

const IconContainer = styled.View`
  flex:1;
  align-items: flex-end;
`;


function OverlayDialogHeader({ title = '', onClose = ()=>{} }) {
  
  const theme = useTheme();

  return (
    
    <OverlayHeaderWrapper>
        <OverlayHeaderContainer theme = {theme}>

            <DialogText>{title}</DialogText>
            <IconContainer>
              <IconButton
              Icon = {<ClearIcon/>}
              onPress = {onClose}
            />
            </IconContainer>
            
        </OverlayHeaderContainer>
    </OverlayHeaderWrapper>
  );
}


export default OverlayDialogHeader;
