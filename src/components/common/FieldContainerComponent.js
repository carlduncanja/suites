import React, { useState, useEffect } from "react";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

const ItemWrapper = styled.View`
    flex: ${({ flex }) => { flex.toString() }};
    max-width : 282px;
`;
const ItemContainer = styled.View`
    width : 100%;
    flex-direction : row;
`;

function FieldContainer({ children, flex = 1 }) {

    const theme = useTheme();

    return (
        <ItemWrapper flex={flex}>
            <ItemContainer>
                {children}
            </ItemContainer>
        </ItemWrapper>
    )
}

export default FieldContainer