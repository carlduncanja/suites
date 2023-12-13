import React from "react";
import styled from "@emotion/native";
import HeaderFilterGroup from "./HeaderFilterGroup";

const HeaderItemWrapper = styled.TouchableOpacity`
  flex: ${({ header }) => (header.flex ? header.flex.toString() : "1")};
  padding-right: ${({ paddingRight }) => paddingRight};
`;
const HeaderItemContainer = styled.View`
  flex-direction: row;
`;
function HeaderItem({
  header,
  index,
  isChargeSheetTable,
  onSelectHeader = () => {},
  paddingRight = { paddingRight },
  selectedHeader = "",
}) {
  return (
    <HeaderItemWrapper
      key={index}
      onPress={() => onSelectHeader(header?.name)}
      header={header}
      activeOpacity={header?.hasSort ? 0.5 : 1}
      paddingRight={paddingRight}
    >
      <HeaderItemContainer header={header}>
        <HeaderFilterGroup
          name={header?.name}
          alignment={header.alignment}
          isChargeSheetTable={isChargeSheetTable}
          isSelected={header?.name === selectedHeader}
          hasSort={header?.hasSort}
        />
      </HeaderItemContainer>
    </HeaderItemWrapper>
  );
}

export default HeaderItem;
