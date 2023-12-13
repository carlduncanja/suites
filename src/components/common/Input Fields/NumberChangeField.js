import React from "react";
import LeftArrow from "../../../../assets/svg/leftArrow";
import RightArrow from "../../../../assets/svg/rightArrow";
import IconButton from "../Buttons/IconButton";

import styled from "@emotion/native";
import { useTheme } from "emotion-theming";

const ChangeFieldWrapper = styled.View`
  flex: ${({ flex }) => flex.toString()};
  justify-content: center;
  align-items: ${({ isChargeSheetField }) =>
    isChargeSheetField ? "flex-end" : "center"};
  width: 100%;
  height: 100%;
  margin-right: ${({ theme }) => theme.space["--space-4"]};
`;
const ChangeFieldContainer = styled.View`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: ${({ align }) => align};
  flex-direction: row;
`;

const NumberContainer = styled.TextInput`
  border-color: ${({ borderColor, theme }) => theme.colors[borderColor]};
  background-color: ${({ backgroundColor, theme }) =>
    theme.colors[backgroundColor]};
  border-width: 1px;
  border-radius: 4px;
  padding: ${({ theme }) => theme.space["--space-6"]};
  padding-top: ${({ theme }) => theme.space["--space-2"]};
  padding-bottom: ${({ theme }) => theme.space["--space-2"]};
  width: 30px;
  text-align: center;
`;
const IconContainer = styled.View`
  height: 100%;
  align-items: center;
`;

function NumberChangeField({
  align = "center",
  backgroundColor = "--color-gray-100",
  borderColor = "--color-gray-400",
  flex = 1,
  isChargeSheetField = false,
  leftArrowColor = "--color-gray-600",
  onAmountChange = () => {},
  onChangePress = () => {},
  rightArrowColor = "--color-green-600",
  value = 0,
}) {
  const theme = useTheme();
  return (
    <ChangeFieldWrapper isChargeSheetField={isChargeSheetField} flex={flex}>
      <ChangeFieldContainer align={align} theme={theme}>
        <IconContainer>
          <IconButton
            Icon={<LeftArrow strokeColor={theme.colors[leftArrowColor]} />}
            onPress={() => onChangePress("sub")}
            disabled={isLeftArrowDisabled}
          />
        </IconContainer>

        <NumberContainer
          backgroundColor={backgroundColor}
          theme={theme}
          borderColor={borderColor}
          onChangeText={(value) => onAmountChange(value)}
          value={value}
          keyboardType="numeric"
        />
        <IconContainer>
          <IconButton
            Icon={<RightArrow strokeColor={theme.colors[rightArrowColor]} />}
            onPress={() => {
              onChangePress("add");
            }}
            disabled={false}
          />
        </IconContainer>
      </ChangeFieldContainer>
    </ChangeFieldWrapper>
  );
}

export default NumberChangeField;
