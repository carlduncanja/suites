import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import styled from "@emotion/native";
import { useTheme } from "emotion-theming";

const tickSVG = (
    <Svg
        width="10"
        height="8"
        viewBox="0 0 10 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            d="M9.4001 1.99998L8.0001 0.599976L4.0001 4.59998L2.0001 2.59998L0.600098 3.99998L4.0001 7.39998L9.4001 1.99998Z"
            fill="#48BB78"
        />
    </Svg>
);

const indeterminateSvg = (
    <Svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="#718096"
        xmlns="http://www.w3.org/2000/svg"
    >
        <Path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
    </Svg>
);

const CheckboxWrapper = styled.TouchableOpacity`
    padding-left: ${({ theme, paddingLeft }) =>
        paddingLeft ? paddingLeft : theme.space["--space-16"]};
    padding-right: ${({ theme, paddingRight }) =>
        paddingRight ? paddingRight : theme.space["--space-16"]};
    padding-top: ${({ theme, paddingTop }) =>
        paddingTop ? paddingTop : theme.space["--space-18"]};
    padding-bottom: ${({ theme, paddingBottom }) =>
        paddingBottom ? paddingBottom : theme.space["--space-18"]};
    justify-content: center;
    align-items: center;
`;
const CheckboxContainer = styled.View`
    background-color: ${({ theme }) => theme.colors["--color-gray-100"]};
    border-color: ${({ theme }) => theme.colors["--color-gray-400"]};
    border-width: 1px;
    border-radius: 4px;
    height: ${({ theme }) => theme.space["--space-16"]};
    width: ${({ theme }) => theme.space["--space-16"]};
    align-items: center;
    justify-content: center;
`;

function CheckBoxComponent({
    isCheck,
    isIndeterminate,
    onPress,
    paddingLeft,
    paddingRight,
    paddingTop,
    isDisabled = false,
}) {
    const theme = useTheme();

    return (
        <CheckboxWrapper
            onPress={onPress}
            activeOpacity={0.8}
            theme={theme}
            paddingLeft={paddingLeft}
            paddingRight={paddingRight}
            paddingTop={paddingTop}
            disabled={isDisabled}
        >
            <CheckboxContainer theme={theme}>
                {isIndeterminate ? (
                    indeterminateSvg
                ) : isCheck ? (
                    tickSVG
                ) : (
                    <View />
                )}
            </CheckboxContainer>
        </CheckboxWrapper>
    );
}

export default CheckBoxComponent;
