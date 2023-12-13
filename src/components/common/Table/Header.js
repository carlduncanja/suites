import React, { useState } from "react";
import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import CheckBoxComponent from "../Checkbox";

import HeaderItem from "./HeaderItem";

const HeaderWrapper = styled.View`
  width: 100%;
`;
const HeaderContainer = styled.View`
  align-items: flex-start;
  flex-direction: row;
  align-items: center;
  padding-left: 1px;
  padding-bottom: ${({ theme, hasCheckbox }) =>
    hasCheckbox === false ? theme.space["--space-14"] : 0};
`;

function Header({
  checked = false,
  headers = [],
  isChargeSheetTable,
  isCheckbox = true,
  isIndeterminate = false,
  toggleHeaderCheckbox = () => {},
}) {
  const [selectedHeader, setSelectedHeader] = useState("");
  const theme = useTheme();

  const onSelectHeader = (name) => {
    setSelectedHeader(name);
  };

  const paddingRight = isChargeSheetTable ? "2%" : "";

  return (
    <HeaderWrapper theme={theme}>
      <HeaderContainer hasCheckbox={isCheckbox}>
        {isCheckbox && (
          <CheckBoxComponent
            isIndeterminate={isIndeterminate}
            onPress={toggleHeaderCheckbox}
            isCheck={checked}
          />
        )}

        {headers.map((header, index) => (
          <HeaderItem
            header={header}
            index={index}
            isChargeSheetTable={isChargeSheetTable}
            key={index}
            onSelectHeader={onSelectHeader}
            paddingRight={paddingRight}
            selectedHeader={selectedHeader}
          />
        ))}
      </HeaderContainer>
    </HeaderWrapper>
  );
}

export default Header;
