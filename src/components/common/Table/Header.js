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
    headers = [],
    toggleHeaderCheckbox = () => {},
    isIndeterminate = false,
    checked = false,
    isCheckbox = true,
}) {
    const [selectedHeader, setSelectedHeader] = useState("");
    const theme = useTheme();

    const onSelectHeader = (name) => {
        setSelectedHeader(name);
    };

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
                        key={index}
                        selectedHeader={selectedHeader}
                        onSelectHeader={onSelectHeader}
                    />
                ))}
            </HeaderContainer>
        </HeaderWrapper>
    );
}

export default Header;
