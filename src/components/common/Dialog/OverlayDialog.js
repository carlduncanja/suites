import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
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
    width : 636px;
    backgound-color: red;
`;
const OverlayDialogContainer = styled.View`
    display : flex;
    width : 100%;
    position : relative;
    border-radius: 8px;
    background-color : ${ ({theme}) => theme.colors['--default-shade-white']};
`;


const OverlayContentWrapper = styled.View`
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
    // handlePopovers = () =>{}
  } = props;

  const theme = useTheme();

  return (
    <OverlayDialogWrapper>
      <OverlayDialogContainer theme = {theme}>

        <OverlayDialogHeader
          title = {title}
          onClose = {onClose}
        />

        
        <OverlayDialogFooter
          onPositiveButtonPress = {onPositiveButtonPress}
          positiveText = {positiveText}
          buttonIcon = {buttonIcon}
        />
      
        <OverlayContentWrapper>
          <OverlayContentContainer theme = {theme}> 
            {props.children}
          </OverlayContentContainer>
        </OverlayContentWrapper>

     
    
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
