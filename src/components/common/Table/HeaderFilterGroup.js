import React from "react";
import { StyleSheet, View } from "react-native";

import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import SortFilter from "./SortFilterIcon";

const HeaderGoupWrapper = styled.View`
  flex: 1;
  height: 100%;
  align-items: ${({ alignment }) => (alignment ? alignment : "flex-start")};
`;

const HeaderGroupContainer = styled.View`
  display: flex;
  padding-top: ${({ theme, isSelected, hasSort }) =>
    isSelected && hasSort ? theme.space["--space-4"] : 0};
  padding-bottom: ${({ theme, isSelected, hasSort }) =>
    isSelected && hasSort ? theme.space["--space-4"] : 0};
  padding-left: ${({ theme, isSelected, hasSort }) =>
    isSelected && hasSort ? theme.space["--space-8"] : 0};
  padding-right: ${({ theme, isSelected, hasSort }) =>
    isSelected && hasSort ? theme.space["--space-8"] : 0};
  background-color: ${({ theme, isSelected, hasSort }) =>
    isSelected && hasSort ? theme.colors["--color-gray-300"] : null};
  border-radius: ${({ isSelected, hasSort }) =>
    isSelected && hasSort ? "12px" : null};
  flex-direction: row;
  justify-content: center;
`;

const HeaderText = styled.Text(({ theme, alignment, hasSort }) => ({
  ...theme.font["--text-sm-medium"],
  color: theme.colors["--color-gray-600"],
  paddingRight: hasSort ? 12 : 0,
  paddingTop: 2,
  textAlign:
    alignment === "flex-start"
      ? "left"
      : alignment === "flex-end"
      ? "right"
      : "center",
}));

function HeaderFilterGroup({
  alignment,
  hasSort = false,
  isChargeSheetTable = false,
  isSelected = false,
  name = "",
}) {
  const theme = useTheme();

  const nameElements = name.split(" ");

  const styles = StyleSheet.create({
    textContainer: {
      justifyContent: "center",
    },
  });

  return (
    name !== "" && (
      <HeaderGoupWrapper alignment={alignment}>
        <HeaderGroupContainer
          theme={theme}
          isSelected={isSelected}
          hasSort={hasSort}
        >
          {isChargeSheetTable ? (
            <View style={styles.textContainer}>
              {nameElements.map((name) => (
                <HeaderText
                  theme={theme}
                  isSelected={isSelected}
                  hasSort={hasSort}
                  alignment
                >
                  {name}
                </HeaderText>
              ))}
            </View>
          ) : (
            <HeaderText theme={theme} isSelected={isSelected} hasSort={hasSort}>
              {name}
            </HeaderText>
          )}
          {hasSort && <SortFilter isSelected={isSelected} />}
        </HeaderGroupContainer>
      </HeaderGoupWrapper>
    )
  );
}

export default HeaderFilterGroup;
