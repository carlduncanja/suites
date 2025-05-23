import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import CheckBoxComponent from "../Checkbox";
import Collapsible from "react-native-collapsible";
import CollapsibleListItemParentView from "./CollapsibleListItemParentView";
import PropTypes from "prop-types";

import styled, { css } from "@emotion/native";
import { useTheme } from "emotion-theming";
import CollapsibleListItemChildView from "./CollapsibleListItemChildView";

/**
 *
 * @param hasCheckBox{bool}
 * @param isChecked{bool}
 * @param onCheckBoxPress{function}
 * @param onItemPress{function}
 * @param childView{node}
 * @param render{function} function to render item view that take collapse a s call back.
 * @returns {*}
 * @constructor
 */

const CollapsibleListItemWrapper = styled.View`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.space["--space-12"]};
`;
const CollapsibleListItemContainer = styled.TouchableOpacity`
  display: flex;
  width: 100%;

  flex-direction: column;
  border-radius: ${({ theme, isCollapsed }) => theme.space["--space-8"]};
  border: ${({ theme, isCollapsed }) =>
    `${isCollapsed ? "1px" : "1px"} solid ${theme.colors["--color-gray-300"]}`};
  //border-bottom-width : ${({ isCollapsed }) =>
    isCollapsed === true ? 0 : null};
  background-color: ${({ theme }) => theme.colors["--default-shade-white"]};
`;

function CollapsibleListItem({
  backgroundColor,
  children = () => {},
  childView,
  collapsed = true,
  hasCheckBox = true,
  isChecked: isParentChecked = false,
  isIndeterminate: isParentIndeterminate = false,
  onCheckBoxPress: onPressParentCheckbox = () => {},
  onCollapsedEnd,
  onItemPress = () => {},
  render = () => {},
}) {
  const [isCollapsed, setCollapsed] = useState(collapsed);
  const theme = useTheme();

  const collapse = () => {
    console.log("collapse press");
    setCollapsed(!isCollapsed);
  };

  return (
    <CollapsibleListItemWrapper theme={theme}>
      <CollapsibleListItemContainer
        theme={theme}
        onPress={() => onItemPress(collapse)}
        isCollapsed={isCollapsed}
      >
        <CollapsibleListItemParentView
          hasCheckBox={hasCheckBox}
          isChecked={isParentChecked}
          isIndeterminate={isParentIndeterminate}
          onCheckBoxPress={onPressParentCheckbox}
          collapse={collapse}
          isCollapsed={isCollapsed}
          render={render}
          backgroundColor={backgroundColor}
        />

        <CollapsibleListItemChildView
          isCollapsed={isCollapsed}
          onAnimationEnd={onCollapsedEnd}
          children={children}
        />
      </CollapsibleListItemContainer>
    </CollapsibleListItemWrapper>
  );
}

export default CollapsibleListItem;

CollapsibleListItem.propTypes = {
  hasCheckBox: PropTypes.bool,
  isChecked: PropTypes.bool,
  onCheckBoxPress: PropTypes.func,
  onItemPress: PropTypes.func,
  childView: PropTypes.node,
  render: PropTypes.func,
};
CollapsibleListItem.defaultProps = {};
