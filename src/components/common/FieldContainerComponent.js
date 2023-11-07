import React, { useState, useEffect } from "react";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

const ItemWrapper = styled.View`
    flex: ${({ flex }) => { flex.toString() }};
    max-width: ${({ maxWidth }) => maxWidth};
    padding: 0px 10px;
`;
const ItemContainer = styled.View`
    width : 100%;
    flex-direction : row;
`;

function FieldContainer({ children, flex = 1, maxWidth = '80%' }) {

    const theme = useTheme();


    return (
        <ItemWrapper flex={flex} maxWidth={maxWidth}>
            <ItemContainer>
                {children}
            </ItemContainer>
        </ItemWrapper>
    )
}

export default FieldContainer