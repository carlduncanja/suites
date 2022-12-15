import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import ClearIcon from "../../../../assets/svg/clearIcon";
import RightArrow from "../../../../assets/svg/rightArrow";

import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import IconButton from "../Buttons/IconButton";
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
    flex : 1;
    max-width: ${({maxWidth}) => `${maxWidth}px`};
`;
const OverlayDialogContainer = styled.View`
    display : flex;
    width : 100%;
    height: 100%;
    position : relative;
    border-radius: 8px;
    background-color : ${ ({theme}) => theme.colors['--default-shade-white']};
`;


const OverlayContentWrapper = styled.View`
  z-index: ${(props) => props.zIndex || 1};
  position: relative;
  width : 100%;
`;
const OverlayContentContainer = styled.View`
  flex-direction : column;
  padding-bottom: ${ ({theme}) => theme.space['--space-56']};
`;


function OverlayDialog(props) { 
  const {
    title = " ",
    onClose = () => {},
    onPositiveButtonPress = () => {}, 
    positiveText = "DONE",
    buttonIcon = <View />,
    isButtonDisabled = false,
    // handlePopovers = () =>{},
    isOpen = false,
    footerIndex
  } = props;

  const theme = useTheme();
  const [zIndex, setZindex] = useState(isOpen ? 11 : 1);
  const dimensions = Dimensions.get("window");

  const maxWidth = dimensions.width - 100;
  
  useEffect(() => {
    setZindex(isOpen ? 11 : 1)
  }, [isOpen])

  return (
    <OverlayDialogWrapper maxWidth={maxWidth}>
      <OverlayDialogContainer theme = {theme}>

        <OverlayDialogHeader
          title = {title}
          onClose = {onClose}
        />

        <OverlayContentWrapper zIndex={zIndex}>
          <OverlayContentContainer theme = {theme}> 
            {props.children}
          </OverlayContentContainer>
        </OverlayContentWrapper>
        <View style={{width: 100, height: 20}}>
        </View>

        <OverlayDialogFooter
          onPositiveButtonPress = {onPositiveButtonPress}
          positiveText = {positiveText}
          buttonIcon = {buttonIcon}
          isButtonDisabled={isButtonDisabled}
          zIndex={footerIndex}
        />

     
    
      {/* <View style={styles.headingContainer}>
        <Text>{title}</Text>

        <TouchableOpacity onPress={onClose}>
          <ClearIcon />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.footerButton}
        onPress={onPositiveButtonPress}
      >
        <View>
          <Text style={styles.positiveText}>{positiveText}</Text>
          {buttonIcon}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          console.log("Touched");
          // handlePopovers(false)()
        }}
        activeOpacity={1}
      >
        {props.children}
      </TouchableOpacity>
       */}
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
  isOpen: PropTypes.bool
};
OverlayDialog.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    maxWidth: 636,
    paddingBottom: 67,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    // height: 60,
    // alignItems:'center',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 12,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E3E8EF",
  },
  footerButton: {
    position: "absolute",
    height: 57,
    width: "100%",
    bottom: 0,
    flexDirection: "row",
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopWidth: 1,
    borderTopColor: "#E3E8EF",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0,
  },
  positiveText: {
    fontSize: 16,
    marginRight: 10,
    marginLeft: 10,
    fontWeight: "bold",
    color: "#3182CE",
  },
});

export default OverlayDialog;
